import { CheckCircle2, Rocket, Sparkles } from "lucide-react";
import { PaidOnboardingForm } from "@/components/paid-onboarding-form";
import { getCheckoutSession } from "@/lib/stripe";
import {
  getStartFlowPackageName,
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
  const packageName = getStartFlowPackageName(packageType) || pkg?.name || "";
  const isBuild = packageType === "growth";
  const successGradient = isBuild
    ? "bg-[radial-gradient(circle_at_top,rgba(184,150,86,0.13),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8f1e3_100%)]"
    : "bg-[radial-gradient(circle_at_top,rgba(184,150,86,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#faf7f0_100%)]";
  const summaryCardClass = isBuild
    ? "border-[#d9bd81] bg-[linear-gradient(180deg,#fffdfb_0%,#f8edd6_100%)]"
    : "border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfa_0%,#f9f3e8_100%)]";
  const statusBadgeClass = isBuild
    ? "border-[#d9bd81] bg-[linear-gradient(180deg,#fff8ea_0%,#f3e2bd_100%)] text-[#8f6a2f]"
    : "border-[#eadfcb] bg-[#f9f3e7] text-[#8f6a2f]";
  const packageIconBubbleClass = isBuild
    ? "border border-[#a9722f]/15 bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] text-white shadow-[0_8px_16px_rgba(169,114,47,0.18)]"
    : "border border-[#d9bd81] bg-[linear-gradient(180deg,#fff3d3_0%,#e7c17a_52%,#b98743_100%)] text-white shadow-[0_8px_16px_rgba(185,135,67,0.16)]";
  const packageBadgeClass = isBuild
    ? "border-[#d9bd81] bg-white/80"
    : "border-[#eadfcb] bg-white/80";
  const packageTextClass = isBuild
    ? "bg-[linear-gradient(180deg,#cf9b53_0%,#8f5f24_100%)] bg-clip-text text-transparent"
    : "text-[#8f6a2f]";
  const packageTextStyle = isBuild ? undefined : { color: "#8f6a2f" };

  return (
    <main className={successGradient}>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2.15rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffefd_0%,#faf6ee_100%)] p-6 shadow-[0_24px_70px_rgba(80,61,28,0.06)] sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#a9722f]/15 bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] text-white shadow-[0_14px_30px_rgba(169,114,47,0.22)]">
              <CheckCircle2 size={28} />
            </div>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
              Payment Confirmed
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              Welcome to StartFlow - your <span className="bg-[linear-gradient(180deg,#cf9b53_0%,#a9722f_100%)] bg-clip-text text-transparent">setup</span> starts now
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              Your package has been confirmed. Use the short intake form below so we can
              review your business and prepare the right setup.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className={`rounded-[1.5rem] border px-5 py-4 ${summaryCardClass}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f6a2f]">
                  Selected Package
                </p>
                <div
                  className={`mt-3 inline-flex items-center gap-3 rounded-full border px-3 py-2 shadow-[0_10px_24px_rgba(80,61,28,0.04)] ${packageBadgeClass}`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${packageIconBubbleClass}`}
                  >
                    {isBuild ? <Sparkles size={16} /> : <Rocket size={16} />}
                  </span>
                  <span className={`text-sm font-semibold ${packageTextClass}`} style={packageTextStyle}>
                    {packageName || "Confirmed"}
                  </span>
                </div>
              </div>
              <div className={`rounded-[1.5rem] border px-5 py-4 ${summaryCardClass}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f6a2f]">
                  Status
                </p>
                <div
                  className={`mt-3 inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] ${statusBadgeClass}`}
                >
                  {paymentStatus}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.85rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffefd_0%,#faf6ee_100%)] px-6 py-5 shadow-[0_20px_60px_rgba(80,61,28,0.05)] sm:px-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className={`rounded-[1.5rem] border px-4 py-4 ${summaryCardClass}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f6a2f]">
                  Step 1
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-neutral-950">
                  Payment <span className="bg-[linear-gradient(180deg,#cf9b53_0%,#a9722f_100%)] bg-clip-text text-transparent">confirmed</span>
                </p>
              </div>
              <div
                className={`rounded-[1.5rem] border px-4 py-4 shadow-[0_10px_28px_rgba(80,61,28,0.05)] ${summaryCardClass}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f6a2f]">
                  Step 2
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-neutral-950">
                  Business <span className="bg-[linear-gradient(180deg,#cf9b53_0%,#a9722f_100%)] bg-clip-text text-transparent">intake</span>
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Answer a few short questions so we can get started.
                </p>
              </div>
              <div className={`rounded-[1.5rem] border px-4 py-4 ${summaryCardClass}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f6a2f]">
                  Step 3
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-neutral-950">
                  We review and <span className="bg-[linear-gradient(180deg,#cf9b53_0%,#a9722f_100%)] bg-clip-text text-transparent">follow up</span>
                </p>
              </div>
            </div>
          </div>

          <PaidOnboardingForm
            packageType={packageType}
            packageName={packageName}
            sessionId={sessionId}
            customerEmail={customerEmail}
          />
        </div>
      </section>
    </main>
  );
}
