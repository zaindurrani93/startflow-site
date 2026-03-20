import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Lightbulb, Palette, Rocket, Settings, Sparkles } from "lucide-react";

const services = [
  {
    title: "Idea Clarity",
    desc: "Get clear on your business idea, who it is for, and how to position it in a simple, confident way."
  },
  {
    title: "Brand Direction",
    desc: "We shape your brand direction so your business has a look and feel that feels clear, polished, and consistent."
  },
  {
    title: "Website Setup",
    desc: "Launch with a simple landing page or a multi-page website, depending on the level of support you need."
  },
  {
    title: "Audience + Offer Clarity",
    desc: "Define your target audience, content direction, and offer structure so your business makes sense to the right people."
  },
  {
    title: "Launch Planning",
    desc: "Walk away with a practical launch plan, pricing guidance, and next steps so you know what to do after setup."
  },
  {
    title: "1:1 Support",
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
    desc: "Everything is designed to help beginners get moving with clarity, structure, and a clean setup."
  },
  {
    href: "/workflow",
    label: "Workflow",
    desc: "Follow a clear progression that takes you from an idea to something real."
  },
  {
    href: "/pricing",
    label: "Pricing",
    desc: "Choose between Starter and Growth based on how much setup, support, and online presence you need."
  },
  {
    href: "/contact",
    label: "Contact",
    desc: "Reach out when you are ready to choose your package and build your business with a clear, strong foundation."
  }
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.06),_transparent_55%)]" />
  <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <h1 className="max-w-2xl text-4xl sm:text-5xl font-semibold tracking-tight">
        Simplicity starts here.
      </h1>

      <p className="mt-5 max-w-xl text-base sm:text-lg leading-7 text-neutral-600">
        Turn your idea into a clean, professional system — without the confusion.
        <br className="hidden sm:block" />
        We simplify everything so you can focus on growing your business.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
        <Link
          href="/contact"
          className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-all duration-200"
        >
          Start Now
        </Link>

        <Link
          href="/services"
          className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-black hover:bg-neutral-100 transition-all duration-200"
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
    <section className="border-b border-neutral-200 bg-gradient-to-b from-white to-neutral-50">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Simple workflow</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {workflowItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4">
                  <Link
                    href="/workflow"
                    className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-800 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg"
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                  {index < 3 && <div className="hidden h-[1px] w-10 bg-neutral-300 sm:block" />}
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
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Everything has its own page now.</h2>
        <p className="mt-4 text-lg text-neutral-600">
          Browse services, workflow, pricing, and contact details to see what is included in Starter and Growth and find the right fit for your business.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {pageLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-5 h-11 w-11 rounded-2xl bg-neutral-950/95" />
            <h3 className="text-xl font-semibold tracking-tight">{item.label}</h3>
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
          Everything is designed to help beginners move forward with clarity, structure, and the right level of setup for their stage.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-5 h-11 w-11 rounded-2xl bg-neutral-950/95" />
            <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
            <p className="mt-3 leading-7 text-neutral-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Workflow</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">We make it simple — from start to execution</h2>
          <p className="mt-4 text-lg text-neutral-600">
            No guesswork, no overwhelm. Just a clear, guided path to move your business forward.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="rounded-[1.75rem] border border-neutral-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-sm font-medium tracking-[0.2em] text-neutral-500">{step.num}</div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-4 leading-7 text-neutral-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm leading-7 text-neutral-500">
          You focus on your business — we handle the structure, strategy, and direction.
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
          Start with a clean, beginner-friendly package designed to help you move from idea to launch with clarity.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl rounded-[2.25rem] border border-[#e7dfd1] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf6ec_100%)] p-5 shadow-[0_18px_60px_rgba(80,61,28,0.08)] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="flex h-full flex-col rounded-[2rem] border border-[#ddd5c8] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f6efe0] text-[#b89656]">
                <BriefcaseBusiness size={28} />
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950">$299</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">Starter</h3>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                For beginners who want clarity, structure, and a clean starting point.
              </p>
              <div className="mt-5 rounded-full bg-[#d8c48d] px-5 py-2 text-sm font-medium text-white shadow-sm">
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

          <div className="relative flex h-full flex-col rounded-[2rem] border border-[#d7cae6] bg-white p-7 shadow-[0_14px_34px_rgba(102,78,130,0.10)] ring-1 ring-[#e9e0f3] sm:p-8">
            <div className="absolute right-5 top-5 rounded-full bg-[#b7aadf] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white">
              Most Popular
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1edfb] text-[#8e79be]">
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
                  <span className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#8e79be]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/checkout/growth"
              className="group mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#b7aadf] bg-white px-5 py-3 text-center text-sm font-medium text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-[#8e79be] hover:shadow-md"
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
        <div className="rounded-[2rem] bg-neutral-950 px-8 py-14 text-white shadow-[0_25px_70px_rgba(0,0,0,0.18)] sm:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-400">Next Step</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to turn your idea into a real business?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-300">
            StartFlow helps you move from idea to setup and launch with clear guidance, brand direction, website support, and a practical plan for what comes next.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-medium text-neutral-950 transition hover:opacity-90"
            >
              Start My Business Setup
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
