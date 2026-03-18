import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  normalizeOnboardingFormData,
  type OnboardingFormData,
  validateOnboardingFormSubmission
} from "@/lib/onboarding-form";
import { startFlowPackages, type StartFlowPackageKey } from "@/lib/startflow-packages";

export const runtime = "nodejs";

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
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      { error: "Missing email configuration on the server." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as Partial<OnboardingFormData> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const normalizedBody = normalizeOnboardingFormData(body);
  const fieldErrors = validateOnboardingFormSubmission(normalizedBody);

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Please complete the required onboarding fields.", fieldErrors },
      { status: 400 }
    );
  }

  const packageType = normalizedBody.packageType as StartFlowPackageKey | "";
  const packageName = packageType ? startFlowPackages[packageType]?.name ?? packageType : "Unknown";
  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: normalizedBody.email,
      subject: `New StartFlow onboarding form - ${normalizedBody.fullName}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #171717; line-height: 1.6;">
          <h2 style="margin-bottom: 20px;">New Paid Client Onboarding Submission</h2>
          <p><strong>Package Purchased:</strong> ${formatValue(packageName)}</p>
          <p><strong>Stripe Session ID:</strong> ${formatValue(normalizedBody.sessionId)}</p>
          <p><strong>Full Name:</strong> ${formatValue(normalizedBody.fullName)}</p>
          <p><strong>Email:</strong> ${formatValue(normalizedBody.email)}</p>
          <p><strong>Phone:</strong> ${formatValue(normalizedBody.phone)}</p>
          <p><strong>Business Name:</strong> ${formatValue(normalizedBody.businessName)}</p>
          <p><strong>Business Type:</strong> ${formatValue(normalizedBody.businessType)}</p>
          <p><strong>Website or Social Link:</strong> ${formatValue(normalizedBody.websiteOrSocial)}</p>
          <p><strong>What are they building?</strong></p>
          <p style="white-space: pre-wrap;">${formatValue(normalizedBody.whatBuilding)}</p>
          <p><strong>Current Stage:</strong></p>
          <p style="white-space: pre-wrap;">${formatValue(normalizedBody.currentStage)}</p>
          <p><strong>What do they need the most help with right now?</strong></p>
          <p style="white-space: pre-wrap;">${formatValue(normalizedBody.helpNeeded)}</p>
          <p><strong>Main goal for the next 30-60 days:</strong></p>
          <p style="white-space: pre-wrap;">${formatValue(normalizedBody.mainGoal)}</p>
          <p><strong>Preferred communication method:</strong> ${formatValue(normalizedBody.preferredCommunication)}</p>
          <p><strong>Anything else we should know?</strong></p>
          <p style="white-space: pre-wrap;">${formatValue(normalizedBody.anythingElse)}</p>
        </div>
      `
    });

    if (error) {
      console.error("Resend onboarding email error", error);
      return NextResponse.json(
        { error: "Unable to send onboarding details right now. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Onboarding submission failed", error);
    return NextResponse.json(
      { error: "Unable to send onboarding details right now. Please try again." },
      { status: 500 }
    );
  }
}
