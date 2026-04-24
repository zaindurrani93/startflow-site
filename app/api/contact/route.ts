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
import { wrapEmailTemplate } from "@/lib/email-template";

export const runtime = "nodejs";

const contactLogoUrl = "https://startflowhq.com/startflow-logo-email.png";

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

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await withTimeout(
      resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: normalizedBody.email,
        subject: `StartFlow Inquiry - ${normalizedBody.name}`,
        html: wrapEmailTemplate(`
          <div style="margin: 0; background-color: #f8f4ec; padding: 32px 18px; font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif; color: #4c3d2d; -webkit-text-fill-color: #4c3d2d;">
            <div style="margin: 0 auto; max-width: 680px; overflow: hidden; border: 1px solid #eadfcb; border-radius: 28px; background: linear-gradient(180deg, #fffefd 0%, #faf6ee 100%); box-shadow: 0 18px 50px rgba(80, 61, 28, 0.08);">
              <div style="padding: 32px 32px 22px; text-align: center;">
                <img src="${contactLogoUrl}" alt="StartFlow logo" width="72" height="57" style="display: block; margin: 0 auto 18px; width: 72px; height: auto;" />
                <p style="margin: 0; font-size: 14px; font-weight: 700; letter-spacing: -0.01em; color: #8f6a2f;">StartFlow</p>
                <h2 style="margin: 12px 0 0; font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 700; line-height: 1.25; letter-spacing: 0; color: #3b2d1f; -webkit-text-fill-color: #3b2d1f; text-rendering: geometricPrecision; -webkit-font-smoothing: antialiased; mso-line-height-rule: exactly;">New Contact Inquiry - ${formatValue(normalizedBody.name)}</h2>
              </div>

              <div style="padding: 0 32px 32px;">
                <div style="padding-top: 22px; border-top: 1px solid #eadfcb;">
                  <p style="margin: 0 0 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #8f6a2f;">Client Details</p>
                  <p style="margin: 0 0 10px; font-size: 15px; line-height: 1.65; color: #4c3d2d; -webkit-text-fill-color: #4c3d2d;"><strong style="color: #3b2d1f; -webkit-text-fill-color: #3b2d1f;">Name:</strong> ${formatValue(normalizedBody.name)}</p>
                  <p style="margin: 0 0 10px; font-size: 15px; line-height: 1.65; color: #4c3d2d; -webkit-text-fill-color: #4c3d2d;"><strong style="color: #3b2d1f; -webkit-text-fill-color: #3b2d1f;">Email:</strong> ${formatValue(normalizedBody.email)}</p>
                  <p style="margin: 0; font-size: 15px; line-height: 1.65; color: #4c3d2d; -webkit-text-fill-color: #4c3d2d;"><strong style="color: #3b2d1f; -webkit-text-fill-color: #3b2d1f;">Phone:</strong> ${formatValue(normalizedBody.phone)}</p>
                </div>

                <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #eadfcb;">
                  <p style="margin: 0 0 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #8f6a2f;">Business Overview</p>
                  <p style="margin: 0 0 10px; font-size: 15px; line-height: 1.65; color: #4c3d2d; -webkit-text-fill-color: #4c3d2d;"><strong style="color: #3b2d1f; -webkit-text-fill-color: #3b2d1f;">Business Name:</strong> ${formatValue(normalizedBody.businessName)}</p>
                  <p style="margin: 0 0 10px; font-size: 15px; line-height: 1.65; color: #4c3d2d; -webkit-text-fill-color: #4c3d2d;"><strong style="color: #3b2d1f; -webkit-text-fill-color: #3b2d1f;">Business Type:</strong> ${formatValue(normalizedBody.businessType)}</p>
                  <p style="margin: 0; font-size: 15px; line-height: 1.65; color: #4c3d2d; -webkit-text-fill-color: #4c3d2d;"><strong style="color: #3b2d1f; -webkit-text-fill-color: #3b2d1f;">Current Stage:</strong> ${formatValue(normalizedBody.currentStage)}</p>
                </div>

                <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #eadfcb;">
                  <p style="margin: 0 0 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #8f6a2f;">Goals &amp; Needs</p>
                  <p style="margin: 0 0 8px; font-size: 15px; line-height: 1.65; color: #4c3d2d; -webkit-text-fill-color: #4c3d2d;"><strong style="color: #3b2d1f; -webkit-text-fill-color: #3b2d1f;">Goals / What They Need Help With:</strong></p>
                  <p style="margin: 0; font-size: 15px; line-height: 1.75; white-space: pre-wrap; color: #4c3d2d; -webkit-text-fill-color: #4c3d2d;">${formatValue(normalizedBody.goals)}</p>
                </div>
              </div>

              <div style="border-top: 1px solid #eadfcb; background: #fffaf1; padding: 18px 32px; text-align: center;">
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #6d6255;">StartFlow - Simplifying the process of starting your business</p>
              </div>
            </div>
          </div>
        `)
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
