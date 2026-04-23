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

export const runtime = "nodejs";

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
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!resendApiKey || !toEmail || !fromEmail) {
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

  const submittedAt = new Date()
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, " UTC");

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await withTimeout(
      resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: normalizedBody.email,
        subject: `StartFlow Lead - ${normalizedBody.name} - ${submittedAt}`,
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; color: #171717; line-height: 1.6;">
            <h2 style="margin-bottom: 20px;">New Contact Inquiry - ${formatValue(normalizedBody.name)}</h2>
            <p><strong>Name:</strong> ${formatValue(normalizedBody.name)}</p>
            <p><strong>Email:</strong> ${formatValue(normalizedBody.email)}</p>
            <p><strong>Phone:</strong> ${formatValue(normalizedBody.phone)}</p>
            <p><strong>Business Name:</strong> ${formatValue(normalizedBody.businessName)}</p>
            <p><strong>Business Type:</strong> ${formatValue(normalizedBody.businessType)}</p>
            <p><strong>Current Stage:</strong> ${formatValue(normalizedBody.currentStage)}</p>
            <p><strong>Goals / What They Need Help With:</strong></p>
            <p style="white-space: pre-wrap;">${formatValue(normalizedBody.goals)}</p>
          </div>
        `
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
