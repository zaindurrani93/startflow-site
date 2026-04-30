import Link from "next/link";
import { ArrowLeft, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { CheckoutButton } from "@/components/checkout-button";
import type { StartFlowPackage } from "@/lib/startflow-packages";

export function CheckoutPageShell({ pkg }: { pkg: StartFlowPackage }) {
  const isGrowth = pkg.key === "growth";
  const packageHeadlineClass = isGrowth
    ? "bg-[linear-gradient(180deg,#cf9b53_0%,#8f5f24_100%)] bg-clip-text text-transparent"
    : "text-[#8f6a2f]";
  const packageHeadlineStyle = isGrowth ? undefined : { color: "#8f6a2f" };
  const shellGradient = isGrowth
    ? "bg-[radial-gradient(circle_at_top,rgba(184,150,86,0.13),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8f1e3_100%)]"
    : "bg-[radial-gradient(circle_at_top,rgba(184,150,86,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#faf7f0_100%)]";
  const iconBubbleClass = isGrowth
    ? "border border-[#a9722f]/15 bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] text-white shadow-[0_12px_28px_rgba(169,114,47,0.22)]"
    : "border border-[#d9bd81] bg-[linear-gradient(180deg,#fff3d3_0%,#e7c17a_52%,#b98743_100%)] text-white shadow-[0_12px_26px_rgba(185,135,67,0.2)]";
  const includedPanelClass = isGrowth
    ? "border-[#d9bd81] bg-[linear-gradient(180deg,#fffdfb_0%,#f8edd6_100%)]"
    : "border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)]";
  const summaryPanelClass = isGrowth
    ? "border-[#d9bd81] bg-[linear-gradient(180deg,#fffdfb_0%,#f6e7ca_100%)]"
    : "border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfa_0%,#f9f3e8_100%)]";

  return (
    <main className={shellGradient}>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2.15rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffefd_0%,#faf6ee_100%)] p-6 shadow-[0_24px_70px_rgba(80,61,28,0.06)] sm:p-10">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
            >
              <ArrowLeft size={16} />
              Back to Pricing
            </Link>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
                  Checkout
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                  <span className={packageHeadlineClass} style={packageHeadlineStyle}>{pkg.name}</span>{" "}
                  <span className="text-neutral-950">-</span>{" "}
                  <span className={packageHeadlineClass} style={packageHeadlineStyle}>{pkg.priceDisplay}</span>
                </h1>
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${iconBubbleClass}`}>
                {isGrowth ? <Sparkles size={28} /> : <Rocket size={28} />}
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              {pkg.summary}
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className={`rounded-[1.75rem] border p-6 shadow-[0_12px_30px_rgba(80,61,28,0.04)] sm:p-8 ${includedPanelClass}`}>
                <h2 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                  What&apos;s included
                </h2>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-neutral-700">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className={`mt-[0.6rem] inline-block h-[1.5px] w-2 shrink-0 rounded-full ${isGrowth ? "bg-[#8f6a2f]" : "bg-[#b89656]"}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`rounded-[1.75rem] border border-dashed p-6 shadow-[0_12px_30px_rgba(80,61,28,0.04)] sm:p-8 ${summaryPanelClass}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#a9722f]/15 bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] text-white shadow-[0_12px_26px_rgba(169,114,47,0.2)]">
                  <ShieldCheck size={22} />
                </div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                  Secure checkout coming next
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-600">
                  You are one step away from locking in your package. Continue to secure checkout to complete your payment.
                </p>
                <div className={`mt-8 rounded-2xl border px-5 py-4 ${includedPanelClass}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f6a2f]">
                    Selected Package
                  </p>
                  <p className="mt-2 text-base font-semibold text-neutral-950">
                    <span className={packageHeadlineClass} style={packageHeadlineStyle}>{pkg.name}</span>{" "}
                    <span className="text-neutral-950">-</span>{" "}
                    <span className={packageHeadlineClass} style={packageHeadlineStyle}>{pkg.priceDisplay}</span>
                  </p>
                </div>
                <CheckoutButton packageType={pkg.key} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
