import { NextResponse } from "next/server";
import { Resend } from "resend";
import { badRequest, serverError } from "@/lib/api-response";
import {
  normalizeOnboardingFormData,
  type OnboardingFormData,
  validateOnboardingFormSubmission
} from "@/lib/onboarding-form";
import {
  startFlowPackages,
  type StartFlowPackageKey
} from "@/lib/startflow-packages";
import { getCheckoutSession } from "@/lib/stripe";
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

const onboardingSenderEmail = "StartFlow <contact@startflowhq.com>";
const onboardingReplyToEmail = "contact@startflowhq.com";
const onboardingLogoUrl = "https://startflowhq.com/startflow-logo-email.png";

const allowedOnboardingKeys = [
  "fullName",
  "email",
  "phone",
  "businessName",
  "businessType",
  "websiteOrSocial",
  "whatBuilding",
  "currentStage",
  "helpNeeded",
  "mainGoal",
  "preferredCommunication",
  "anythingElse",
  "packageType",
  "sessionId",
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

function formatValue(value: string) {
  return value.trim() ? escapeHtml(value.trim()) : "N/A";
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "onboarding", 5, 10 * 60 * 1000);

  if (!rateLimit.ok) {
    return createRateLimitResponse(rateLimit.retryAfterSeconds);
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim();

    if (!resendApiKey || !toEmail) {
      logServerError("onboarding-config", "Missing onboarding email configuration.");
      return serverError("Service temporarily unavailable. Please try again later.");
    }

    const parsed = await parseJsonBody(request, { maxBytes: 14_000 });

    if (!parsed.ok) {
      return badRequest("Invalid onboarding submission.");
    }

    const unexpectedKeys = validateAllowedKeys(parsed.data, allowedOnboardingKeys);

    if (unexpectedKeys.length > 0) {
      return badRequest("Invalid onboarding submission.");
    }

    const body = normalizeOnboardingFormData({
      fullName: sanitizePlainText(parsed.data.fullName, { maxLength: 100 }),
      email: sanitizeEmail(parsed.data.email),
      phone: sanitizePhone(parsed.data.phone),
      businessName: sanitizePlainText(parsed.data.businessName, { maxLength: 120 }),
      businessType: sanitizePlainText(parsed.data.businessType, { maxLength: 120 }),
      websiteOrSocial: sanitizePlainText(parsed.data.websiteOrSocial, { maxLength: 300 }),
      whatBuilding: sanitizePlainText(parsed.data.whatBuilding, { maxLength: 1200, multiline: true }),
      currentStage: sanitizePlainText(parsed.data.currentStage, { maxLength: 600, multiline: true }),
      helpNeeded: sanitizePlainText(parsed.data.helpNeeded, { maxLength: 1200, multiline: true }),
      mainGoal: sanitizePlainText(parsed.data.mainGoal, { maxLength: 1200, multiline: true }),
      preferredCommunication: sanitizePlainText(parsed.data.preferredCommunication, { maxLength: 80 }),
      anythingElse: sanitizePlainText(parsed.data.anythingElse, { maxLength: 1200, multiline: true }),
      packageType: sanitizePlainText(parsed.data.packageType, { maxLength: 20 }) as StartFlowPackageKey | "",
      sessionId: sanitizePlainText(parsed.data.sessionId, { maxLength: 255 }),
      companyWebsite: sanitizePlainText(parsed.data.companyWebsite, { maxLength: 200 }),
      formStartedAt: String(parsed.data.formStartedAt ?? "")
    } satisfies Partial<OnboardingFormData>);

    if (isLikelyBot(body.companyWebsite, parseStartedAt(parsed.data.formStartedAt))) {
      return badRequest("Unable to process onboarding submission.");
    }

    if (!isValidEmail(body.email)) {
      return badRequest("Please complete all required onboarding fields.", {
        email: "Please enter a valid email address."
      });
    }

    const fieldErrors = validateOnboardingFormSubmission(body);

    if (Object.keys(fieldErrors).length > 0) {
      return badRequest("Please complete all required onboarding fields.", fieldErrors);
    }

    if ((body.packageType !== "starter" && body.packageType !== "growth") || !body.sessionId) {
      return badRequest("Invalid onboarding submission.");
    }

    if (!/^cs_[A-Za-z0-9_]+$/.test(body.sessionId)) {
      return badRequest("Invalid onboarding submission.");
    }

    const session = await withTimeout(
      getCheckoutSession(body.sessionId),
      10_000,
      "Checkout verification timed out."
    );

    if (
      session.payment_status !== "paid" ||
      session.metadata?.packageType !== body.packageType
    ) {
      return badRequest("Unable to verify this onboarding session.");
    }

    const packageName = startFlowPackages[body.packageType].name;
    const resend = new Resend(resendApiKey);

    const html = wrapEmailTemplate(`
      <div style="margin: 0; background-color: #f8f4ec; padding: 32px 18px; font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif; color: #2d2014; -webkit-text-fill-color: #2d2014;">
        <div style="margin: 0 auto; max-width: 680px; overflow: hidden; border: 1px solid #eadfcb; border-radius: 28px; background: linear-gradient(180deg, #fffefd 0%, #faf6ee 100%); box-shadow: 0 18px 50px rgba(80, 61, 28, 0.08);">
          <div style="padding: 32px 32px 22px; text-align: center;">
            <img src="${onboardingLogoUrl}" alt="StartFlow logo" width="72" height="57" style="display: block; margin: 0 auto 18px; width: 72px; height: auto;" />
            <p style="margin: 0; font-size: 14px; font-weight: 700; letter-spacing: -0.01em; color: #8f6a2f;">StartFlow</p>
            <h2 style="margin: 12px 0 0; font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 800; line-height: 1.25; letter-spacing: 0; color: #21160c; -webkit-text-fill-color: #21160c; text-rendering: geometricPrecision; -webkit-font-smoothing: antialiased; mso-line-height-rule: exactly;">New Onboarding Submission</h2>
          </div>

          <div style="padding: 0 32px 32px;">
            <div style="padding-top: 22px; border-top: 1px solid #eadfcb;">
              <p style="margin: 0 0 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #8f6a2f;">Client Details</p>
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Package:</strong> ${formatValue(packageName)}</p>
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Full Name:</strong> ${formatValue(body.fullName)}</p>
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Email:</strong> ${formatValue(body.email)}</p>
              <p style="margin: 0; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Phone:</strong> ${formatValue(body.phone)}</p>
            </div>

            <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #eadfcb;">
              <p style="margin: 0 0 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #8f6a2f;">Business Overview</p>
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Business Name:</strong> ${formatValue(body.businessName)}</p>
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Business Type:</strong> ${formatValue(body.businessType)}</p>
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Website or Social Link:</strong> ${formatValue(body.websiteOrSocial)}</p>
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">What are they building?</strong></p>
              <p style="margin: 0 0 14px; font-size: 16px; font-weight: 500; line-height: 1.75; white-space: pre-wrap; color: #2d2014; -webkit-text-fill-color: #2d2014;">${formatValue(body.whatBuilding)}</p>
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Current Stage:</strong></p>
              <p style="margin: 0; font-size: 16px; font-weight: 500; line-height: 1.75; white-space: pre-wrap; color: #2d2014; -webkit-text-fill-color: #2d2014;">${formatValue(body.currentStage)}</p>
            </div>

            <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #eadfcb;">
              <p style="margin: 0 0 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #8f6a2f;">Goals &amp; Needs</p>
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">What do they need the most help with right now?</strong></p>
              <p style="margin: 0 0 14px; font-size: 16px; font-weight: 500; line-height: 1.75; white-space: pre-wrap; color: #2d2014; -webkit-text-fill-color: #2d2014;">${formatValue(body.helpNeeded)}</p>
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Main goal for the next 30-60 days:</strong></p>
              <p style="margin: 0 0 14px; font-size: 16px; font-weight: 500; line-height: 1.75; white-space: pre-wrap; color: #2d2014; -webkit-text-fill-color: #2d2014;">${formatValue(body.mainGoal)}</p>
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Anything else we should know?</strong></p>
              <p style="margin: 0; font-size: 16px; font-weight: 500; line-height: 1.75; white-space: pre-wrap; color: #2d2014; -webkit-text-fill-color: #2d2014;">${formatValue(body.anythingElse)}</p>
            </div>

            <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #eadfcb;">
              <p style="margin: 0 0 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #8f6a2f;">Action</p>
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: 500; line-height: 1.65; color: #2d2014; -webkit-text-fill-color: #2d2014;"><strong style="font-weight: 700; color: #21160c; -webkit-text-fill-color: #21160c;">Preferred communication method:</strong> ${formatValue(body.preferredCommunication)}</p>
              <p style="margin: 0; font-size: 16px; font-weight: 500; line-height: 1.7; color: #4f4233; -webkit-text-fill-color: #4f4233;">Review this intake and follow up with the client using their preferred contact method.</p>
            </div>
          </div>

          <div style="border-top: 1px solid #eadfcb; background: #fffaf1; padding: 18px 32px; text-align: center;">
            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #6d6255;">StartFlow - Simplifying the process of starting your business</p>
          </div>
        </div>
      </div>
    `);

    const { error } = await withTimeout(
      resend.emails.send({
        from: onboardingSenderEmail,
        to: [toEmail],
        subject: `StartFlow Inquiry - ${body.fullName}`,
        html,
        replyTo: onboardingReplyToEmail
      }),
      12_000,
      "Onboarding email request timed out."
    );

    if (error) {
      logServerError("onboarding-resend", error);
      return serverError("Unable to send onboarding details right now. Please try again.");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    logServerError("onboarding-route", error);
    return serverError("Unable to process onboarding submission. Please try again.");
  }
}
