import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  normalizeContactFormData,
  type ContactFormData,
  validateContactFormSubmission
} from "@/lib/contact-form";

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

  const body = (await request.json().catch(() => null)) as Partial<ContactFormData> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const normalizedBody = normalizeContactFormData(body);
  const fieldErrors = validateContactFormSubmission(normalizedBody);

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Please complete the required fields.", fieldErrors },
      { status: 400 }
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: normalizedBody.email,
      subject: `New StartFlow lead from ${normalizedBody.name}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #171717; line-height: 1.6;">
          <h2 style="margin-bottom: 20px;">New StartFlow Lead</h2>
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
    });

    if (error) {
      console.error("Resend email error", error);
      return NextResponse.json(
        { error: "Unable to send your details right now. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed", error);
    return NextResponse.json(
      { error: "Unable to send your details right now. Please try again." },
      { status: 500 }
    );
  }
}
