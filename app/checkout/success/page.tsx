import { CheckCircle2 } from "lucide-react";
import { PaidOnboardingForm } from "@/components/paid-onboarding-form";
import { getCheckoutSession } from "@/lib/stripe";
import {
  startFlowPackages,
  type StartFlowPackageKey
} from "@/lib/startflow-packages";

export default async function CheckoutSuccessPage({
  searchParams
}: {
  searchParams: Promise<{ session_id?: string; package?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id ?? "";
  const packageFromQuery = params.package as StartFlowPackageKey | undefined;

  let packageType: StartFlowPackageKey | "" = packageFromQuery ?? "";
  let customerEmail = "";
  let paymentStatus = "paid";

  if (sessionId) {
    try {
      const session = await getCheckoutSession(sessionId);
      const metadataPackage = session.metadata?.packageType as StartFlowPackageKey | undefined;

      packageType = metadataPackage ?? packageType;
      customerEmail = session.customer_details?.email ?? "";
      paymentStatus = session.payment_status || paymentStatus;
    } catch (error) {
      console.error("Success page session lookup failed", error);
    }
  }

  const pkg = packageType ? startFlowPackages[packageType] : null;

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950 text-white">
              <CheckCircle2 size={28} />
            </div>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              Payment Received
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              You're officially in.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
              Thank you for your payment. Your StartFlow package is confirmed, and your onboarding can begin right away.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Package
                </p>
                <p className="mt-2 text-base font-semibold text-neutral-950">
                  {pkg?.name ?? "Confirmed"}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Payment Status
                </p>
                <p className="mt-2 text-base font-semibold capitalize text-neutral-950">
                  {paymentStatus}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Session ID
                </p>
                <p className="mt-2 truncate text-base font-semibold text-neutral-950">
                  {sessionId || "Unavailable"}
                </p>
              </div>
            </div>
          </div>

          <PaidOnboardingForm
            packageType={packageType}
            packageName={pkg?.name ?? ""}
            sessionId={sessionId}
            customerEmail={customerEmail}
          />
        </div>
      </section>
    </main>
  );
}
