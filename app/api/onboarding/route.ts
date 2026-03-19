import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type OnboardingBody = {
  fullName?: string;
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
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function formatValue(value: unknown) {
  const cleaned = clean(value);
  return cleaned || "N/A";
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "Unknown error";
}

export async function POST(request: Request) {
  try {
    const resendApiKey = clean(process.env.RESEND_API_KEY);
    const fromEmail = clean(process.env.CONTACT_FROM_EMAIL);

    if (!resendApiKey || !fromEmail) {
      return NextResponse.json(
        { error: "Missing email configuration on the server." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const rawBody = (await request.json().catch(() => null)) as OnboardingBody | null;

    if (!rawBody) {
      return NextResponse.json(
        { error: "Invalid onboarding submission." },
        { status: 400 }
      );
    }

    const body = {
      fullName: clean(rawBody.fullName),
      email: clean(rawBody.email),
      phone: clean(rawBody.phone),
      businessName: clean(rawBody.businessName),
      businessType: clean(rawBody.businessType),
      websiteOrSocial: clean(rawBody.websiteOrSocial),
      whatBuilding: clean(rawBody.whatBuilding),
      currentStage: clean(rawBody.currentStage),
      helpNeeded: clean(rawBody.helpNeeded),
      mainGoal: clean(rawBody.mainGoal),
      preferredCommunication: clean(rawBody.preferredCommunication),
      anythingElse: clean(rawBody.anythingElse),
      packageType: clean(rawBody.packageType),
    };

    if (
      !body.fullName ||
      !body.email ||
      !body.businessType ||
      !body.whatBuilding ||
      !body.currentStage ||
      !body.helpNeeded ||
      !body.mainGoal ||
      !body.preferredCommunication
    ) {
      return NextResponse.json(
        { error: "Please complete all required onboarding fields." },
        { status: 400 }
      );
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2>New StartFlow Onboarding Submission</h2>

        <p><strong>Package:</strong> ${formatValue(body.packageType)}</p>
        <p><strong>Full Name:</strong> ${formatValue(body.fullName)}</p>
        <p><strong>Email:</strong> ${formatValue(body.email)}</p>
        <p><strong>Phone:</strong> ${formatValue(body.phone)}</p>
        <p><strong>Business Name:</strong> ${formatValue(body.businessName)}</p>
        <p><strong>Business Type:</strong> ${formatValue(body.businessType)}</p>
        <p><strong>Website or Social Link:</strong> ${formatValue(body.websiteOrSocial)}</p>

        <p><strong>What are they building?</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.whatBuilding)}</p>

        <p><strong>Current Stage:</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.currentStage)}</p>

        <p><strong>What do they need the most help with right now?</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.helpNeeded)}</p>

        <p><strong>Main goal for the next 30–60 days:</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.mainGoal)}</p>

        <p><strong>Preferred communication method:</strong> ${formatValue(body.preferredCommunication)}</p>

        <p><strong>Anything else we should know?</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.anythingElse)}</p>
      </div>
    `;

    // TEMP DEBUG: hardcoded recipient so we can isolate Resend behavior
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: "zaindurrani93@gmail.com",
      subject: "STARTFLOW HARDCODED EMAIL TEST 123",
      html,
      replyTo: body.email,
    });

    if (error) {
      const errorMessage = getErrorMessage(error);

      console.error("Resend onboarding email error:", {
        message: errorMessage,
        error,
        fromEmail,
        onboardingEmail: body.email,
      });

      return NextResponse.json(
        { error: `Unable to send onboarding email: ${errorMessage}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Email sent successfully",
      id: data?.id,
    });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);

    console.error("Onboarding route error:", {
      message: errorMessage,
      error,
    });

    return NextResponse.json(
      { error: `DEBUG: NEW ONBOARDING ROUTE IS LIVE - ${errorMessage}` },
      { status: 500 }
    );
  }
}