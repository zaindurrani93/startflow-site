import { NextResponse } from "next/server";
import { badRequest, serverError } from "@/lib/api-response";
import { getCheckoutSession } from "@/lib/stripe";
import {
  getStartFlowPackageName,
  startFlowPackages,
  type StartFlowPackageKey
} from "@/lib/startflow-packages";
import {
  checkRateLimit,
  createRateLimitResponse,
  logServerError,
  withTimeout
} from "@/lib/server-security";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const rateLimit = checkRateLimit(request, "checkout-session", 20, 10 * 60 * 1000);

  if (!rateLimit.ok) {
    return createRateLimitResponse(rateLimit.retryAfterSeconds);
  }

  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId) || sessionId.length > 255) {
    return badRequest("Missing or invalid session_id.");
  }

  try {
    const session = await withTimeout(
      getCheckoutSession(sessionId),
      8_000,
      "Checkout lookup timed out."
    );
    const packageType = session.metadata?.packageType as StartFlowPackageKey | undefined;
    const pkg = packageType ? startFlowPackages[packageType] : null;
    const packageName = getStartFlowPackageName(packageType) || pkg?.name || "";

    return NextResponse.json({
      sessionId: session.id,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email ?? "",
      packageType: packageType ?? "",
      packageName,
      amountTotal: session.amount_total ?? null
    });
  } catch (error) {
    logServerError("checkout-session-lookup", error);
    return serverError("Unable to look up checkout session.");
  }
}
