import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, ShieldCheck, Sparkles } from "lucide-react";

const planContent = {
  starter: {
    name: "Starter",
    price: "$299",
    summary:
      "A clear starting package for founders who want structure, positioning, and a clean online presence.",
    accent: "gold",
    includes: [
      "Business idea clarity & positioning",
      "Target audience definition",
      "Brand direction",
      "Simple landing page",
      "Basic website structure",
      "Launch plan",
      "1:1 guidance"
    ]
  },
  growth: {
    name: "Growth",
    price: "$499",
    summary:
      "A fuller setup for businesses that want a stronger brand presence and more complete launch support.",
    accent: "violet",
    includes: [
      "Everything in Starter",
      "Multi-page website",
      "Social media setup",
      "Content direction",
      "Offer/pricing guidance",
      "Launch strategy",
      "Priority support"
    ]
  }
} as const;

type PlanKey = keyof typeof planContent;

export function generateStaticParams() {
  return Object.keys(planContent).map((plan) => ({ plan }));
}

export default async function CheckoutPlanPage({
  params
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan } = await params;
  const content = planContent[plan as PlanKey];

  if (!content) {
    notFound();
  }

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
                  {content.name} - {content.price}
                </h1>
              </div>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${
                  content.accent === "gold"
                    ? "bg-[#f6efe0] text-[#b89656]"
                    : "bg-[#f1edfb] text-[#8e79be]"
                }`}
              >
                {content.accent === "gold" ? <BriefcaseBusiness size={28} /> : <Sparkles size={28} />}
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              {content.summary}
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  What&apos;s included
                </h2>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-neutral-700">
                  {content.includes.map((item) => (
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
                  This is where payment processing will be integrated next. Your selected package and checkout flow are ready to connect.
                </p>
                <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Selected Package
                  </p>
                  <p className="mt-2 text-base font-semibold text-neutral-950">
                    {content.name} - {content.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
