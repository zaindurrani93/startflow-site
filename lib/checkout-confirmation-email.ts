import { Resend } from "resend";
import type Stripe from "stripe";
import { withTimeout } from "@/lib/server-security";
import type { StartFlowPackage } from "@/lib/startflow-packages";
import {
  buildEmailField,
  buildEmailFooter,
  buildEmailHeader,
  buildEmailLongField,
  buildEmailSection,
  buildEmailShell,
  wrapEmailTemplate
} from "@/lib/email-template";

const confirmationLogoUrl = "https://startflowhq.com/logo.png";
const confirmationSenderEmail = "StartFlow <contact@startflowhq.com>";
const confirmationReplyToEmail = "contact@startflowhq.com";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatValue(value?: string | null) {
  return value && value.trim() ? escapeHtml(value.trim()) : "Not provided";
}

function getTimeline(packageKey: StartFlowPackage["key"]) {
  return packageKey === "growth" ? "5-10 business days" : "3-5 business days";
}

export async function sendCheckoutConfirmationEmail(params: {
  customerEmail: string;
  packageData: StartFlowPackage;
  session: Stripe.Checkout.Session;
}) {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY for checkout confirmation email.");
  }

  const { customerEmail, packageData, session } = params;
  const amountTotal =
    typeof session.amount_total === "number"
      ? `$${(session.amount_total / 100).toFixed(2)}`
      : packageData.priceDisplay;

  const html = wrapEmailTemplate(
    buildEmailShell(`
      ${buildEmailHeader("Payment Confirmed", confirmationLogoUrl)}
      ${buildEmailSection(
        "ORDER SUMMARY",
        [
          buildEmailField("Package", formatValue(packageData.name)),
          buildEmailField("Amount Paid", amountTotal),
          buildEmailField("Email", formatValue(customerEmail)),
          buildEmailField("Status", formatValue(session.payment_status || "paid"))
        ].join("")
      )}
      ${buildEmailSection(
        "WHAT HAPPENS NEXT",
        [
          buildEmailLongField(
            "Next Step",
            "Your payment is confirmed. Complete the onboarding form on the confirmation page so we can review your business and begin your setup."
          ),
          buildEmailField("Estimated Timeline", getTimeline(packageData.key)),
          buildEmailField("Support", "Reply to this email if you need help before submitting onboarding.")
        ].join("")
      )}
      ${buildEmailSection(
        "STARTFLOW",
        buildEmailLongField(
          "What To Expect",
          "Once your onboarding form is submitted, we review your details, organize the right next steps, and follow up with clarity on how your setup will move forward."
        )
      )}
      ${buildEmailFooter()}
    `)
  );

  const resend = new Resend(resendApiKey);

  const { error } = await withTimeout(
    resend.emails.send({
      from: confirmationSenderEmail,
      to: [customerEmail],
      replyTo: confirmationReplyToEmail,
      subject: `StartFlow Payment Confirmed (${packageData.name})`,
      html
    }),
    12_000,
    "Checkout confirmation email timed out."
  );

  if (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}
