import { NextResponse } from "next/server";
import { Resend } from "resend";
import { badRequest, serverError } from "@/lib/api-response";
import {
  normalizeContactFormData,
  type ContactFormData,
  validateContactFormSubmission
} from "@/lib/contact-form";
import {
  checkRateLimit,
  createRateLimitResponse,
  isLikelyBot,
  isValidEmail,
  logServerError,
  parseJsonBody,
  parseStartedAt,
  sanitizeEmail,
  sanitizePhone,
  sanitizePlainText,
  validateAllowedKeys,
  withTimeout
} from "@/lib/server-security";
import {
  buildEmailField,
  buildEmailFooter,
  buildEmailHeader,
  buildEmailLongField,
  buildEmailSection,
  buildEmailShell,
  wrapEmailTemplate
} from "@/lib/email-template";

export const runtime = "nodejs";

const contactLogoUrl = "https://startflowhq.com/logo.png";
const contactSenderEmail = "StartFlow <contact@startflowhq.com>";
const contactReplyToEmail = "contact@startflowhq.com";

const allowedContactKeys = [
  "name",
  "email",
  "phone",
  "businessName",
  "businessType",
  "currentStage",
  "goals",
  "companyWebsite",
  "formStartedAt"
] as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatValue(value?: string) {
  return value && value.trim() ? escapeHtml(value.trim()) : "Not provided";
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "contact", 5, 10 * 60 * 1000);

  if (!rateLimit.ok) {
    return createRateLimitResponse(rateLimit.retryAfterSeconds);
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();

  if (!resendApiKey || !toEmail) {
    logServerError("contact-config", "Missing contact email configuration.");
    return serverError("Service temporarily unavailable. Please try again later.");
  }

  const parsed = await parseJsonBody(request, { maxBytes: 8_000 });

  if (!parsed.ok) {
    return badRequest(parsed.error);
  }

  const unexpectedKeys = validateAllowedKeys(parsed.data, allowedContactKeys);

  if (unexpectedKeys.length > 0) {
    return badRequest("Invalid request body.");
  }

  const normalizedBody = normalizeContactFormData({
    name: sanitizePlainText(parsed.data.name, { maxLength: 100 }),
    email: sanitizeEmail(parsed.data.email),
    phone: sanitizePhone(parsed.data.phone),
    businessName: sanitizePlainText(parsed.data.businessName, { maxLength: 120 }),
    businessType: sanitizePlainText(parsed.data.businessType, { maxLength: 80 }),
    currentStage: sanitizePlainText(parsed.data.currentStage, { maxLength: 120 }),
    goals: sanitizePlainText(parsed.data.goals, { maxLength: 1200, multiline: true }),
    companyWebsite: sanitizePlainText(parsed.data.companyWebsite, { maxLength: 200 }),
    formStartedAt: String(parsed.data.formStartedAt ?? "")
  } satisfies Partial<ContactFormData>);

  if (isLikelyBot(normalizedBody.companyWebsite, parseStartedAt(parsed.data.formStartedAt))) {
    return badRequest("Unable to process this submission.");
  }

  if (!isValidEmail(normalizedBody.email)) {
    return badRequest("Please complete the required fields.", {
      email: "Please enter a valid email address."
    });
  }

  const fieldErrors = validateContactFormSubmission(normalizedBody);

  if (Object.keys(fieldErrors).length > 0) {
    return badRequest("Please complete the required fields.", fieldErrors);
  }

  const resend = new Resend(resendApiKey);
  const submittedAt = new Date()
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, " UTC");

  const html = wrapEmailTemplate(
    buildEmailShell(`
      ${buildEmailHeader("New Contact Inquiry", contactLogoUrl)}
      ${buildEmailSection(
        "CLIENT DETAILS",
        [
          buildEmailField("Name", formatValue(normalizedBody.name)),
          buildEmailField("Email", formatValue(normalizedBody.email)),
          buildEmailField("Phone", formatValue(normalizedBody.phone))
        ].join("")
      )}
      ${buildEmailSection(
        "BUSINESS OVERVIEW",
        [
          buildEmailField("Business Name", formatValue(normalizedBody.businessName)),
          buildEmailField("Business Type", formatValue(normalizedBody.businessType)),
          buildEmailField("Current Stage", formatValue(normalizedBody.currentStage))
        ].join("")
      )}
      ${buildEmailSection(
        "GOALS & NEEDS",
        buildEmailLongField("Goals / What They Need Help With", formatValue(normalizedBody.goals))
      )}
      ${buildEmailSection(
        "ACTION",
        [
          buildEmailField("Submitted By", formatValue(normalizedBody.name)),
          buildEmailField("Reply To", contactReplyToEmail)
        ].join("")
      )}
      ${buildEmailFooter()}
    `)
  );

  try {
    const { error } = await withTimeout(
      resend.emails.send({
        from: contactSenderEmail,
        to: [toEmail],
        replyTo: contactReplyToEmail,
        subject: `StartFlow Lead — ${normalizedBody.name} — ${submittedAt}`,
        html
      }),
      12_000,
      "Email request timed out."
    );

    if (error) {
      logServerError("contact-resend", error);
      return serverError("Unable to send your details right now. Please try again.");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    logServerError("contact-email", error);
    return serverError("Unable to send your details right now. Please try again.");
  }
}
