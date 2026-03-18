import { NextResponse } from "next/server";
import { getCheckoutSession } from "@/lib/stripe";
import { startFlowPackages, type StartFlowPackageKey } from "@/lib/startflow-packages";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const session = await getCheckoutSession(sessionId);
    const packageType = session.metadata?.packageType as StartFlowPackageKey | undefined;
    const pkg = packageType ? startFlowPackages[packageType] : null;

    return NextResponse.json({
      sessionId: session.id,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email ?? "",
      packageType: packageType ?? "",
      packageName: pkg?.name ?? "",
      amountTotal: session.amount_total ?? null
    });
  } catch (error) {
    console.error("Checkout session lookup failed", error);
    return NextResponse.json(
      { error: "Unable to look up checkout session." },
      { status: 500 }
    );
  }
}
