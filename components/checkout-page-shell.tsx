import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, ShieldCheck, Sparkles } from "lucide-react";
import { CheckoutButton } from "@/components/checkout-button";
import type { StartFlowPackage } from "@/lib/startflow-packages";

export function CheckoutPageShell({ pkg }: { pkg: StartFlowPackage }) {
  const isGrowth = pkg.key === "growth";

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-10">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
            >
              <ArrowLeft size={16} />
              Back to Pricing
            </Link>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Checkout
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                  {pkg.name} - {pkg.priceDisplay}
                </h1>
              </div>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${
                  isGrowth
                    ? "bg-[#f1edfb] text-[#8e79be]"
                    : "bg-[#f6efe0] text-[#b89656]"
                }`}
              >
                {isGrowth ? <Sparkles size={28} /> : <BriefcaseBusiness size={28} />}
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              {pkg.summary}
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  What&apos;s included
                </h2>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-neutral-700">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-950" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-dashed border-neutral-300 bg-white p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white">
                  <ShieldCheck size={22} />
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">
                  Secure checkout coming next
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-600">
                  You are one step away from locking in your package. Continue to secure checkout to complete your payment.
                </p>
                <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Selected Package
                  </p>
                  <p className="mt-2 text-base font-semibold text-neutral-950">
                    {pkg.name} - {pkg.priceDisplay}
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
