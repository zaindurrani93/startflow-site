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

const onboardingSenderEmail = "StartFlow <contact@startflowhq.com>";
const onboardingReplyToEmail = "contact@startflowhq.com";
const onboardingLogoUrl = "https://startflowhq.com/logo.png";

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
    const html = wrapEmailTemplate(
      buildEmailShell(`
        ${buildEmailHeader("New Onboarding Submission", onboardingLogoUrl)}
        ${buildEmailSection(
          "CLIENT DETAILS",
          [
            buildEmailField("Package", formatValue(packageName)),
            buildEmailField("Full Name", formatValue(body.fullName)),
            buildEmailField("Email", formatValue(body.email)),
            buildEmailField("Phone", formatValue(body.phone))
          ].join("")
        )}
        ${buildEmailSection(
          "BUSINESS OVERVIEW",
          [
            buildEmailField("Business Name", formatValue(body.businessName)),
            buildEmailField("Business Type", formatValue(body.businessType)),
            buildEmailField("Website or Social Link", formatValue(body.websiteOrSocial)),
            buildEmailLongField("What Are They Building?", formatValue(body.whatBuilding)),
            buildEmailLongField("Current Stage", formatValue(body.currentStage))
          ].join("")
        )}
        ${buildEmailSection(
          "GOALS & NEEDS",
          [
            buildEmailLongField("What Do They Need the Most Help With Right Now?", formatValue(body.helpNeeded)),
            buildEmailLongField("Main Goal for the Next 30-60 Days", formatValue(body.mainGoal)),
            buildEmailLongField("Anything Else We Should Know?", formatValue(body.anythingElse))
          ].join("")
        )}
        ${buildEmailSection(
          "ACTION",
          [
            buildEmailField("Preferred Communication Method", formatValue(body.preferredCommunication)),
            buildEmailField("Reply To", onboardingReplyToEmail)
          ].join("")
        )}
        ${buildEmailFooter()}
      `)
    );

    const { error } = await withTimeout(
      resend.emails.send({
        from: onboardingSenderEmail,
        to: [toEmail],
        subject: `New StartFlow Onboarding (${body.fullName})`,
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
