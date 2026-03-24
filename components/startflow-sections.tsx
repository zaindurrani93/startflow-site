import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Lightbulb,
  Mail,
  Palette,
  Rocket,
  Settings,
  Sparkles,
  Target
} from "lucide-react";

const accent = {
  bg: "bg-[#f6efe0]",
  text: "text-[#b89656]",
  border: "border-[#e7d8b8]",
  ring: "ring-[#efe3cb]",
  soft: "bg-[#fffbf3]"
};

const services = [
  {
    title: "Idea Clarity",
    icon: Lightbulb,
    desc: "Get clear on your business idea, who it is for, and how to position it in a simple, confident way."
  },
  {
    title: "Brand Direction",
    icon: Palette,
    desc: "We shape your brand direction so your business has a look and feel that feels clear, polished, and consistent."
  },
  {
    title: "Website Setup",
    icon: Settings,
    desc: "Launch with a simple landing page or a multi-page website, depending on the level of support you need."
  },
  {
    title: "Audience + Offer Clarity",
    icon: Target,
    desc: "Define your target audience, content direction, and offer structure so your business makes sense to the right people."
  },
  {
    title: "Launch Planning",
    icon: Rocket,
    desc: "Walk away with a practical launch plan, pricing guidance, and next steps so you know what to do after setup."
  },
  {
    title: "1:1 Support",
    icon: CheckCircle2,
    desc: "Get guided support throughout the process so you are not trying to piece everything together on your own."
  }
];

const steps = [
  {
    num: "01",
    title: "Choose Your Package",
    desc: "Select the plan that fits your current stage. We’ll handle the rest."
  },
  {
    num: "02",
    title: "Complete Onboarding",
    desc: "Answer a few simple questions so we understand your business and goals."
  },
  {
    num: "03",
    title: "Strategy & Setup",
    desc: "We take your inputs and turn them into a clear strategy and setup."
  },
  {
    num: "04",
    title: "Execution & Growth",
    desc: "We execute, refine, and support you as you move forward with confidence."
  }
];

const workflowItems = [
  { label: "Idea", icon: Lightbulb },
  { label: "Brand", icon: Palette },
  { label: "Setup", icon: Settings },
  { label: "Launch", icon: Rocket }
];

const pageLinks = [
  {
    href: "/services",
    label: "Services",
    icon: BriefcaseBusiness,
    desc: "Everything is designed to help beginners move with clarity, structure, and a professional setup."
  },
  {
    href: "/workflow",
    label: "How It Works",
    icon: Settings,
    desc: "Follow a guided process that takes you from onboarding to execution without the overwhelm."
  },
  {
    href: "/pricing",
    label: "Pricing",
    icon: Sparkles,
    desc: "Choose between Starter and Growth based on the level of setup, support, and momentum you need."
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
    desc: "Reach out when you are ready for a guided setup with clear next steps and hands-on support."
  }
];

export function HomeHero() {
  return (
  <section className="relative overflow-hidden border-b border-neutral-200">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 to-transparent" />
    <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Simplicity starts here.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
          Turn an idea into a clean, professional system — without the confusion.
          <br className="hidden sm:block" />
          We simplify the process so our clients can focus on growing there business.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
          <Link
            href="/contact"
            className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-neutral-800"
          >
            Start Now
          </Link>

          <Link
            href="/services"
            className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-neutral-100"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  </section>
);
}

export function WorkflowStrip() {
  return (
    <section className="border-b border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">How It Works</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {workflowItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4">
                  <Link
                    href="/workflow"
                    className={`flex items-center gap-2 rounded-full border bg-white px-5 py-3 text-sm font-medium text-neutral-800 shadow-[0_14px_30px_rgba(17,24,39,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(17,24,39,0.09)] ${accent.border}`}
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
                      <Icon size={15} />
                    </span>
                    {item.label}
                  </Link>
                  {index < 3 && <div className="hidden h-[1px] w-10 bg-[#dcc9a1] sm:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePageLinks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Explore</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Everything you need, organized clearly.
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Browse the core parts of StartFlow to understand the service, the process, and the support behind each package.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {pageLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-[1.85rem] border border-neutral-200 bg-white p-6 shadow-[0_18px_45px_rgba(17,24,39,0.05)] transition hover:-translate-y-1 hover:border-[#e7d8b8] hover:shadow-[0_24px_55px_rgba(17,24,39,0.08)]"
          >
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${accent.border} ${accent.soft} ${accent.text}`}>
              <item.icon size={20} />
            </div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight text-neutral-950">{item.label}</h3>
              <ArrowRight size={18} className="mt-1 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-[#b89656]" />
            </div>
            <p className="mt-3 leading-7 text-neutral-600">{item.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Services</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">What StartFlow helps you with.</h2>
        <p className="mt-4 text-lg text-neutral-600">
          Every part of the service is designed to give beginners clarity, structure, and a setup that feels polished from day one.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="group rounded-[1.85rem] border border-neutral-200 bg-white p-6 shadow-[0_18px_45px_rgba(17,24,39,0.05)] transition hover:-translate-y-1 hover:border-[#e7d8b8] hover:shadow-[0_24px_55px_rgba(17,24,39,0.08)]"
          >
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${accent.border} ${accent.soft} ${accent.text}`}>
              <service.icon size={20} />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-950">{service.title}</h3>
            <p className="mt-3 leading-7 text-neutral-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="border-y border-neutral-200 bg-[linear-gradient(180deg,#fcfbf8_0%,#f8f6f1_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">How It Works</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">We make it simple - from start to execution</h2>
          <p className="mt-4 text-lg text-neutral-600">
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-[#dcc9a1] xl:block" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.num} className="relative rounded-[1.9rem] border border-neutral-200 bg-white p-7 shadow-[0_18px_45px_rgba(17,24,39,0.05)] transition hover:-translate-y-1 hover:border-[#e7d8b8] hover:shadow-[0_24px_55px_rgba(17,24,39,0.08)]">
                <div className="relative z-10 flex items-center">
                  <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">{step.title}</h3>
                <p className="mt-4 leading-7 text-neutral-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-7 text-neutral-500">
          You focus on your business - we handle the structure, strategy, and direction.
        </p>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Pricing</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Simple pricing for getting started.</h2>
        <p className="mt-4 text-lg text-neutral-600">
          Choose the level of support that matches your stage, with a clear path from setup to momentum.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl rounded-[2.25rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffdf9_0%,#faf7f1_100%)] p-5 shadow-[0_22px_70px_rgba(80,61,28,0.08)] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="flex h-full flex-col rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-[0_14px_34px_rgba(17,24,39,0.05)] sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
                <BriefcaseBusiness size={28} />
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950">$299</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">Starter</h3>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                For beginners who want clarity, structure, and a clean starting point.
              </p>
              <div className="mt-5 rounded-full bg-[#b89656] px-5 py-2 text-sm font-medium text-white shadow-sm">
                Starting Package
              </div>
            </div>

            <ul className="mt-8 flex-1 space-y-3 text-sm leading-6 text-neutral-700">
              {[
                "Business idea clarity & positioning",
                "Target audience definition",
                "Brand direction",
                "Simple landing page",
                "Basic website structure",
                "Launch plan",
                "1:1 guidance"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#b89656]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/checkout/starter"
              className="group mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-center text-sm font-medium text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-950 hover:shadow-md"
            >
              Select Package
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className={`relative flex h-full flex-col rounded-[2rem] border bg-white p-7 shadow-[0_18px_40px_rgba(80,61,28,0.10)] ring-1 sm:p-8 ${accent.border} ${accent.ring}`}>
            <div className="absolute right-5 top-5 rounded-full bg-[#b89656] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white">
              Most Popular
            </div>

            <div className="flex flex-col items-center text-center">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
                <Sparkles size={28} />
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950">$499</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">Growth</h3>
              <p className="mt-4 max-w-md text-base leading-7 text-neutral-600">
                For people who want a more complete setup and stronger brand presence.
              </p>
              <div className="mt-5 rounded-full bg-[#b7aadf] px-5 py-2 text-sm font-medium text-white shadow-sm">
                Premium Package
              </div>
            </div>

            <ul className="mt-8 flex-1 space-y-3 text-sm leading-6 text-neutral-700">
              {[
                "Everything in Starter",
                "Multi-page website",
                "Social media setup",
                "Content direction",
                "Offer/pricing guidance",
                "Launch strategy",
                "Priority support"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#b89656]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/checkout/growth"
              className="group mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#b89656] bg-white px-5 py-3 text-center text-sm font-medium text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-[#8f6a2f] hover:shadow-md"
            >
              Select Package
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-5xl px-5 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="rounded-[2rem] border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f1_100%)] px-8 py-14 shadow-[0_24px_60px_rgba(17,24,39,0.08)] sm:px-12">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${accent.border} ${accent.soft} ${accent.text}`}>
            <Mail size={20} />
          </div>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Next Step</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to turn your idea into a real business?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
            StartFlow gives you a guided setup with strategy, structure, and hands-on support so your next steps feel clear from day one.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-7 py-3.5 text-center text-sm font-medium text-white transition hover:opacity-90"
            >
              Start My Business Setup
            </Link>
            <Link
              href="/workflow"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-center text-sm font-medium text-neutral-900 transition hover:border-[#b89656] hover:text-[#8f6a2f]"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MinimalCtaSection() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-[1.75rem] border border-neutral-200 bg-white px-6 py-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Ready to get started?
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Start My Business Setup
          </Link>
        </div>
      </div>
    </section>
  );
}
