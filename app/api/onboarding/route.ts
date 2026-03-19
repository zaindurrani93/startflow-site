import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type OnboardingRequestBody = {
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  websiteOrSocial?: string;
  whatBuilding?: string;
  currentStage?: string;
  helpNeeded?: string;
  mainGoal?: string;
  preferredCommunication?: string;
  anythingElse?: string;
  packageType?: string;
  sessionId?: string;
};

function extractEmailAddress(value: string) {
  const trimmedValue = value.trim();
  const match = trimmedValue.match(/<([^<>]+)>/);

  return match ? match[1].trim() : trimmedValue;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(extractEmailAddress(value));
}

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

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) {
      return message;
    }
  }

  return "Unknown error";
}

function getEmailConfig() {
  const resendApiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() ?? "";
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";

  if (!resendApiKey || !toEmail || !fromEmail) {
    return {
      error: "Missing email configuration on the server.",
      status: 500 as const
    };
  }

  if (!isValidEmail(toEmail)) {
    return {
      error: "CONTACT_TO_EMAIL is not a valid email address.",
      status: 500 as const
    };
  }

  if (!isValidEmail(fromEmail)) {
    return {
      error:
        "CONTACT_FROM_EMAIL must be a valid email address or use the format \"Name <email@example.com>\".",
      status: 500 as const
    };
  }

  return { resendApiKey, toEmail, fromEmail };
}

export async function POST(request: Request) {
  const emailConfig = getEmailConfig();

  if ("error" in emailConfig) {
    console.error("Onboarding email configuration error:", emailConfig.error);

    return NextResponse.json(
      { error: emailConfig.error },
      { status: emailConfig.status }
    );
  }

  try {
    const body = (await request.json().catch(() => null)) as OnboardingRequestBody | null;

    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const fullName = body.fullName?.trim() || body.name?.trim() || "";
    const customerEmail = body.email?.trim().toLowerCase() || "";

    const resend = new Resend(emailConfig.resendApiKey);

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #171717; line-height: 1.6;">
        <h2 style="margin-bottom: 20px;">New StartFlow Onboarding Submission</h2>

        <p><strong>Name:</strong> ${formatValue(fullName)}</p>
        <p><strong>Email:</strong> ${formatValue(customerEmail)}</p>
        <p><strong>Phone:</strong> ${formatValue(body.phone)}</p>
        <p><strong>Package:</strong> ${formatValue(body.packageType)}</p>
        <p><strong>Stripe Session:</strong> ${formatValue(body.sessionId)}</p>

        <hr />

        <p><strong>Business Name:</strong> ${formatValue(body.businessName)}</p>
        <p><strong>Business Type:</strong> ${formatValue(body.businessType)}</p>
        <p><strong>Website / Social:</strong> ${formatValue(body.websiteOrSocial)}</p>

        <p><strong>What are they building?</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.whatBuilding)}</p>

        <p><strong>Current Stage:</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.currentStage)}</p>

        <p><strong>What do they need help with?</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.helpNeeded)}</p>

        <p><strong>Main goal (30-60 days):</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.mainGoal)}</p>

        <p><strong>Preferred communication:</strong> ${formatValue(body.preferredCommunication)}</p>

        <p><strong>Anything else:</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.anythingElse)}</p>
      </div>
    `;

   const { error } = await resend.emails.send({
  from: "StartFlow <onboarding@resend.dev>",
  to: "zaindurrani93@gmail.com",
  subject: "STARTFLOW HARDCODED EMAIL TEST 123",
  html: "<p>Hardcoded test from onboarding route.</p>",
});

    if (error) {
      const errorMessage = getErrorMessage(error);

      console.error("Resend onboarding email error:", {
        message: errorMessage,
        error,
        onboardingEmail: customerEmail,
        toEmail: emailConfig.toEmail,
        fromEmail: emailConfig.fromEmail
      });

     return NextResponse.json({ ok: true, message: "HARDCODED EMAIL TEST RAN" });
        { error: `Unable to send onboarding email: ${errorMessage}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);

    console.error("Onboarding route error:", {
      message: errorMessage,
      error
    });

    return NextResponse.json(
      { error: `Onboarding request failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
