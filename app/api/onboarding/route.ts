import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function formatValue(value: any) {
  if (!value) return "N/A";
  return String(value);
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendApiKey || !toEmail || !fromEmail) {
      return NextResponse.json(
        { error: "Missing email configuration on the server." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const body = await request.json();

    const html = `
      <div>
        <h2>New StartFlow Onboarding Submission</h2>

        <p><strong>Name:</strong> ${formatValue(body.name)}</p>
        <p><strong>Email:</strong> ${formatValue(body.email)}</p>
        <p><strong>Phone:</strong> ${formatValue(body.phone)}</p>

        <hr/>

        <p><strong>Business Name:</strong> ${formatValue(body.businessName)}</p>
        <p><strong>Business Type:</strong> ${formatValue(body.businessType)}</p>
        <p><strong>Website / Social:</strong> ${formatValue(body.websiteOrSocial)}</p>

        <p><strong>What are they building?</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.whatBuilding)}</p>

        <p><strong>Current Stage:</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.currentStage)}</p>

        <p><strong>What do they need help with?</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.helpNeeded)}</p>

        <p><strong>Main goal (30–60 days):</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.mainGoal)}</p>

        <p><strong>Preferred communication:</strong> ${formatValue(body.preferredCommunication)}</p>

        <p><strong>Anything else:</strong></p>
        <p style="white-space: pre-wrap;">${formatValue(body.anythingElse)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "🚀 New StartFlow Client Onboarding",
      html,
    });

    // 🔥 THIS IS THE CRITICAL DEBUG FIX
    if (error) {
      console.error("Resend onboarding email error:", error);

      return NextResponse.json(
        {
          error: error.message || "Failed to send email",
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error("ONBOARDING ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Server error",
        details: error,
      },
      { status: 500 }
    );
  }
}