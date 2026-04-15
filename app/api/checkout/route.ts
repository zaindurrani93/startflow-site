import { NextResponse } from "next/server";
import { badRequest, serverError } from "@/lib/api-response";
import {
  startFlowPackages,
  type StartFlowPackageKey
} from "@/lib/startflow-packages";
import { getStripe } from "@/lib/stripe";
import {
  checkRateLimit,
  createRateLimitResponse,
  logServerError,
  parseJsonBody,
  validateAllowedKeys,
  withTimeout
} from "@/lib/server-security";

export const runtime = "nodejs";

function getSiteUrl() {
  const siteUrl =
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  if (!siteUrl) {
    throw new Error("Site URL is not configured.");
  }

  return siteUrl.replace(/\/$/, "");
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "checkout", 10, 10 * 60 * 1000);

  if (!rateLimit.ok) {
    return createRateLimitResponse(rateLimit.retryAfterSeconds);
  }

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      logServerError("checkout-config", "Missing Stripe secret key.");
      return serverError("Secure checkout is temporarily unavailable.");
    }

    const parsed = await parseJsonBody(request, { maxBytes: 2_000 });

    if (!parsed.ok) {
      return badRequest(parsed.error);
    }

    const unexpectedKeys = validateAllowedKeys(parsed.data, ["packageType"]);

    if (unexpectedKeys.length > 0) {
      return badRequest("Invalid package selected.");
    }

    const packageType = parsed.data.packageType as StartFlowPackageKey | undefined;

    if (!packageType || !(packageType in startFlowPackages)) {
      return badRequest("Invalid package selected.");
    }

    const pkg = startFlowPackages[packageType];
    const siteUrl = getSiteUrl();
    const stripe = getStripe();

    const session = await withTimeout(
      stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&package=${pkg.key}`,
        cancel_url: `${siteUrl}/checkout/cancel?package=${pkg.key}`,
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: pkg.priceCents,
              product_data: {
                name: `StartFlow ${pkg.name} Package`,
                description: pkg.summary
              }
            }
          }
        ],
        metadata: {
          packageType: pkg.key
        }
      }),
      10_000,
      "Secure checkout timed out."
    );

    if (!session.url) {
      return serverError("Unable to start secure checkout right now.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    logServerError("checkout-session", error);
    return serverError("Unable to start secure checkout right now.");
  }
}
