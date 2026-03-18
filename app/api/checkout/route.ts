import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  startFlowPackages,
  type StartFlowPackageKey
} from "@/lib/startflow-packages";

export const runtime = "nodejs";

function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not configured.");
  }

  return siteUrl.replace(/\/$/, "");
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured on the server." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { packageType?: string }
    | null;

  const packageType = body?.packageType as StartFlowPackageKey | undefined;

  if (!packageType || !(packageType in startFlowPackages)) {
    return NextResponse.json(
      { error: "Invalid package selected." },
      { status: 400 }
    );
  }

  const pkg = startFlowPackages[packageType];
  const siteUrl = getSiteUrl();
  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${siteUrl}/checkout/success?package=${pkg.key}`,
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
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Unable to start Stripe checkout." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error", error);
    return NextResponse.json(
      { error: "Unable to start secure checkout right now." },
      { status: 500 }
    );
  }
}
