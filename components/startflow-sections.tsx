import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import startflowProcessGraph from "@/app/process-graph.png";
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
    desc: "Select the plan that fits your current stage. We'll handle the rest."
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
    desc: "Choose between Launch and Build based on the level of setup, support, and momentum you need."
  }
];

const whyStartFlowItems = [
  {
    title: "Clarity First",
    desc: "We turn confusion into a clear, structured plan."
  },
  {
    title: "Guided Support",
    desc: "We walk you through every step - no guessing."
  },
  {
    title: "Built For Real People",
    desc: "Simple, thoughtful support for people who need a clearer place to start."
  },
  {
    title: "Launch-Ready",
    desc: "Everything is designed to help you move forward with confidence."
  }
];

const whoThisIsForItems = [
  "First-time founders",
  "People with ideas but no structure",
  "Anyone stuck on \"where do I start\""
];

const founderTestimonials = [
  {
    name: "Sarah K.",
    role: "First-time founder",
    quote:
      "Before i found StartFlow, I had no idea where to start. After onboarding, The team worked extensively to provide me with a clear structure that made everything feel manageable."
  },
  {
    name: "Javier S.",
    role: "Small business owner",
    quote:
      "Everything finally made sense. I wasn't overwhelmed anymore - I actually had a plan."
  },
  {
    name: "Aisha M.",
    role: "Startup beginner",
    quote:
      "I just needed direction. After working with the team at StartFlow, They simplified everything down for me and helped me move forward confidently."
  }
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,150,86,0.12),transparent_38%),linear-gradient(180deg,rgba(17,24,39,0.02)_0%,rgba(17,24,39,0)_100%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="interactive cta-surface mx-auto flex max-w-4xl flex-col items-center rounded-[2.25rem] border border-[#e7d8b8] bg-[linear-gradient(180deg,#f7f1e6_0%,#f6efe0_100%)] px-6 py-10 text-center shadow-[0_24px_70px_rgba(80,61,28,0.08)] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
            Beginner-friendly business setup
          </p>
          <ScrollReveal>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[#3f2d14] sm:text-5xl lg:text-6xl">
              Build your business with clarity - not confusion.
            </h1>
          </ScrollReveal>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#6b5a45] sm:text-lg">
            StartFlow helps you turn your idea into a structured, launch-ready business with clear direction, professional setup, and guided support.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/inquiry"
              className="button-primary interactive pointer-events-auto inline-flex min-h-12 items-center justify-center rounded-full bg-[#8f6a2f] px-7 py-3.5 text-sm font-medium text-white hover:bg-[#7a5b28]"
            >
              Start Now
            </Link>

            <Link
              href="/services"
              className="button-secondary interactive pointer-events-auto inline-flex min-h-12 items-center justify-center rounded-full border border-[#e7d8b8] bg-[#fbf6eb] px-7 py-3.5 text-sm font-medium text-[#8f6a2f] hover:bg-[#f3ead7]"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeVisualFeature() {
  return (
    <section className="border-b border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-8">
        <div className="mx-auto w-full max-w-[42rem]">
          <div className="rounded-[2rem] border border-[#eee3cf] bg-white p-3 shadow-[0_24px_60px_rgba(80,61,28,0.06)] sm:p-4">
            <div className="overflow-hidden rounded-[1.65rem] bg-[linear-gradient(180deg,#fdfaf4_0%,#f7efe0_100%)] p-4 sm:p-5">
              <Image
                src={startflowProcessGraph}
                alt="StartFlow business launch process visual"
                className="h-auto w-full object-contain"
                sizes="(min-width: 1024px) 42rem, (min-width: 640px) 80vw, 92vw"
                quality={100}
              />
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Real work, real momentum
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            A clear path for the stage where most people feel stuck.
          </h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            StartFlow supports people who are ready to move forward, but need the structure, setup, and direction to do it with confidence.
          </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] px-5 py-4 shadow-[0_14px_30px_rgba(17,24,39,0.04)]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                Designed for
              </p>
              <p className="mt-2 text-base font-semibold tracking-tight text-neutral-950">
                Real early-stage business needs
              </p>
            </div>

            <div className="rounded-[1.4rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] px-5 py-4 shadow-[0_14px_30px_rgba(17,24,39,0.04)]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                Focused on
              </p>
              <p className="mt-2 text-base font-semibold tracking-tight text-neutral-950">
                Action, not overwhelm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkflowStrip({ isInteractive = true }: { isInteractive?: boolean }) {
  return (
    <section className="border-b border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="rounded-[2rem] border border-[#eee3cf] bg-white px-5 py-7 shadow-[0_18px_50px_rgba(80,61,28,0.04)] sm:px-8">
          <div className="flex flex-col items-center text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">How It Works</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
            {workflowItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4">
                  {isInteractive ? (
                    <Link
                      href="/workflow"
                      className={`workflow-pill interactive flex min-w-[9.5rem] items-center justify-center gap-2 rounded-full border bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] px-5 py-3 text-sm font-medium text-neutral-800 shadow-[0_14px_30px_rgba(17,24,39,0.06)] ${accent.border}`}
                    >
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
                        <Icon size={15} />
                      </span>
                      {item.label}
                    </Link>
                  ) : (
                    <div
                      className={`flex min-w-[9.5rem] items-center justify-center gap-2 rounded-full border bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] px-5 py-3 text-sm font-medium text-neutral-800 shadow-[0_14px_30px_rgba(17,24,39,0.06)] ${accent.border}`}
                    >
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
                        <Icon size={15} />
                      </span>
                      {item.label}
                    </div>
                  )}
                  {index < 3 ? <div className="hidden h-[1px] w-10 bg-[#dcc9a1] sm:block" /> : null}
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhoThisIsForSection() {
  return (
    <section className="border-b border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Who This Is For</p>
          <ScrollReveal>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Built for people who need a clear path to get their business off the ground.
            </h2>
          </ScrollReveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {whoThisIsForItems.map((item) => (
            <div
              key={item}
              className="interactive card-hover flex items-center justify-center rounded-[1.5rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] px-5 py-5 text-center"
            >
              <p className="text-base font-semibold tracking-tight text-neutral-950">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePageLinks() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fdfbf7_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Explore</p>
          <ScrollReveal>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Everything you need, organized clearly.
            </h2>
          </ScrollReveal>
          <p className="mt-4 text-lg text-neutral-600">
            Browse the core parts of StartFlow to understand the service, the process, and the support behind each package.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {pageLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="interactive card-hover group rounded-[1.85rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] p-6"
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
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
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
            className="interactive card-hover group rounded-[1.85rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] p-6"
          >
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${accent.border} ${accent.soft} ${accent.text}`}>
              <service.icon size={20} />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-950">{service.title}</h3>
            <p className="mt-3 leading-7 text-neutral-600">{service.desc}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="border-y border-neutral-200 bg-[radial-gradient(circle_at_top,rgba(184,150,86,0.08),transparent_30%),linear-gradient(180deg,#fcfbf8_0%,#f6f2ea_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">How It Works</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">We make it simple - from start to execution</h2>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-[#dcc9a1] xl:block" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={step.num}
                  className="interactive card-hover relative flex h-full flex-col rounded-[1.9rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] p-7"
                >
                  <div className="relative z-10 flex items-center">
                    <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 min-h-[3.75rem] text-2xl font-semibold leading-[1.15] tracking-tight text-neutral-950">
                    {step.title}
                  </h3>
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
    <section className="bg-[radial-gradient(circle_at_top,rgba(184,150,86,0.08),transparent_28%),linear-gradient(180deg,#fffefe_0%,#f8f4ec_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-neutral-500">Package</p>
        <p className="mt-4 text-lg leading-8 text-neutral-600">
          Choose the level of support that fits your stage
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl rounded-[2.6rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffdf9_0%,#faf7f1_100%)] p-4 shadow-[0_28px_90px_rgba(80,61,28,0.08)] sm:p-6 lg:p-7">
        <div className="grid items-stretch gap-4 lg:grid-cols-2">
          <div className="interactive pricing-card flex h-full flex-col rounded-[2.2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffefd_0%,#faf5ea_100%)] p-7 shadow-[0_18px_44px_rgba(80,61,28,0.05)] sm:p-8">
            <div className="flex min-h-[17.5rem] flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#eadfcb] bg-[linear-gradient(180deg,#fbf5e8_0%,#f2e6cf_100%)] text-[#8f6a2f]">
                <BriefcaseBusiness size={28} />
              </div>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">Launch</p>
              <p className="pricing-amount mt-3 flex items-start gap-0.5 text-[2.35rem] text-neutral-950">
                <span className="pricing-currency mt-1 text-[1.35rem] text-neutral-500">$</span>
                <span>299</span>
              </p>
              <p className="mt-1 text-sm text-neutral-500">one-time</p>
              <p className="mt-3 min-h-5 text-sm font-medium text-transparent">
                For a stronger launch presence and support
              </p>
              <p className="mt-2 min-h-[4.5rem] max-w-xs text-base font-semibold leading-6 text-neutral-500">
                A definitive roadmap for executing your vision.
              </p>
              <div className="mt-5 rounded-full border border-[#eadfcb] bg-[linear-gradient(180deg,#fcf6ea_0%,#f4e8cf_100%)] px-5 py-2 text-sm font-medium text-[#8f6a2f] shadow-[0_8px_20px_rgba(80,61,28,0.04)]">
                Essential setup
              </div>
            </div>

            <div className="mt-8 flex min-h-[18.25rem] flex-col rounded-[1.6rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">What&apos;s included</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700">
                {[ 
                  "Business idea clarity & positioning",
                  "Target audience",
                  "Brand direction",
                  "Simple landing page",
                  "Basic website structure",
                  "Launch plan",
                  "1:1 guidance"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="inline-block h-[1.5px] w-2 shrink-0 rounded-full bg-[#b89656]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-col rounded-[1.6rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfa_0%,#f9f3e8_100%)] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">Best for</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-6 text-neutral-500">
                {[
                  "Clear business direction from the start",
                  "A simple professional setup you can build on",
                  "Guided next steps without the overwhelm"
                ].map((item) => (
                  <li key={item} className="leading-6">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/checkout/launch"
              className="pricing-button button-secondary interactive group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#eadfcb] bg-[#f9f3e7] px-5 py-3 text-center text-sm font-medium text-[#8f6a2f]"
            >
              Choose Launch
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className={`interactive pricing-card pricing-featured relative flex h-full flex-col rounded-[2.2rem] border bg-[linear-gradient(180deg,#fffefd_0%,#f7f1ff_100%)] p-7 shadow-[0_18px_44px_rgba(95,74,140,0.07)] sm:p-8 ${accent.ring}`}>
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,rgba(142,121,190,0)_0%,rgba(142,121,190,0.5)_50%,rgba(142,121,190,0)_100%)]" />
            <div className="absolute right-5 top-5 rounded-full border border-[#ddd4f3] bg-[#f1edfb] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#8e79be]">
              Most Popular
            </div>

            <div className="flex min-h-[17.5rem] flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1edfb] text-[#8e79be]">
                <Sparkles size={28} />
              </div>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">Build</p>
              <p className="pricing-amount mt-3 flex items-start gap-0.5 text-[2.35rem] text-neutral-950">
                <span className="pricing-currency mt-1 text-[1.35rem] text-neutral-500">$</span>
                <span>499</span>
              </p>
              <p className="mt-1 text-sm text-neutral-500">one-time</p>
              <p className="mt-3 min-h-5 text-sm font-medium text-transparent">
                For a stronger launch presence and support
              </p>
              <p className="mt-2 min-h-[4.5rem] max-w-xs text-base font-semibold leading-6 text-neutral-500">
                An enhanced, comprehensive setup for a higher-impact launch.
              </p>
              <div className="mt-5 rounded-full border border-[#7844c6]/10 bg-[linear-gradient(180deg,#8e79be_0%,#7f68b4_100%)] px-5 py-2 text-sm font-medium text-white shadow-[0_10px_24px_rgba(142,121,190,0.18)]">
                Premium package
              </div>
            </div>

            <div className="mt-8 flex min-h-[18.25rem] flex-col rounded-[1.6rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfb_0%,#f8f2ff_100%)] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">What&apos;s included</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700">
                {[ 
                  "Everything included in Launch",
                  "Premium Multi-page website",
                  "Social media setup",
                  "Content direction",
                  "Offer/pricing guidance",
                  "Launch strategy",
                  "Priority support"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="inline-block h-[1.5px] w-2 shrink-0 rounded-full bg-[#8e79be]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-col rounded-[1.6rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfb_0%,#f6f0ff_100%)] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">Best for</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-6 text-neutral-500">
                {[
                  "A stronger online presence from day one",
                  "Complete support for launch and growth",
                  "Built for clients ready to move faster"
                ].map((item) => (
                  <li key={item} className="leading-6">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/checkout/build"
              className="pricing-button interactive group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#ddd4f3] bg-[#8e79be] px-5 py-3 text-center text-sm font-medium text-white hover:bg-[#7f68b4]"
            >
              Choose Build
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#eadfcb] bg-white/85 p-5 shadow-[0_18px_44px_rgba(80,61,28,0.04)] sm:p-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              What to Expect
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] px-5 py-4.5">
              <p className="text-base font-semibold tracking-tight text-neutral-950">
                Delivery Timeline
              </p>
              <p className="mt-2.5 text-sm leading-6 text-neutral-500">
                Launch: 3–5 business days
              </p>
              <p className="mt-1.5 text-sm leading-6 text-neutral-500">
                Build: 5–10 business days
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] px-5 py-4.5">
              <p className="text-base font-semibold tracking-tight text-neutral-950">
                What&apos;s Included
              </p>
              <p className="mt-2.5 text-sm leading-6 text-neutral-500">
                A structured setup process designed to give you clarity, direction,
                and a strong starting point.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] px-5 py-4.5">
              <p className="text-base font-semibold tracking-tight text-neutral-950">
                Ongoing Support
              </p>
              <p className="mt-2.5 text-sm leading-6 text-neutral-500">
                Optional monthly support or one-time updates are available after
                completion.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[1.95rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfa_0%,#faf6ee_100%)] px-6 py-8 text-center shadow-[0_18px_44px_rgba(80,61,28,0.04)] sm:px-8">
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Need something more tailored?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            If you&apos;re looking for a more customized setup or have specific
            requirements, we offer tailored solutions designed around your needs.
          </p>
          <div className="mt-6">
            <Link
              href="/inquiry"
              className="button-primary interactive inline-flex min-h-12 items-center justify-center rounded-full bg-[#8f6a2f] px-7 py-3.5 text-center text-sm font-medium text-white hover:bg-[#7a5b28]"
            >
              Request a Custom Setup
            </Link>
          </div>
          <p className="mt-5 text-sm font-medium text-neutral-500">
            No hidden fees. No subscriptions.
          </p>
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
        <div className="interactive cta-surface rounded-[2rem] border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f1_100%)] px-8 py-14 shadow-[0_24px_60px_rgba(17,24,39,0.08)] sm:px-12">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${accent.border} ${accent.soft} ${accent.text}`}>
            <Mail size={20} />
          </div>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Next Step</p>
          <ScrollReveal>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to turn your idea into a real business?
            </h2>
          </ScrollReveal>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
            StartFlow gives you a guided setup with strategy, structure, and hands-on support so your next steps feel clear from day one.
          </p>
          <p className="mt-4 text-sm font-medium text-neutral-500">
            Start today - most setups are completed within days.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/inquiry"
              className="button-primary interactive inline-flex min-h-12 items-center justify-center rounded-full bg-[#8f6a2f] px-7 py-3.5 text-center text-sm font-medium text-white hover:bg-[#7a5b28]"
            >
              Start My Business Setup
            </Link>
            <Link
              href="/workflow"
              className="button-secondary interactive inline-flex min-h-12 items-center justify-center rounded-full border border-[#e7d8b8] bg-[#f6efe0] px-7 py-3.5 text-center text-sm font-medium text-[#8f6a2f] hover:bg-[#f2e8d5]"
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
        <div className="interactive cta-surface flex flex-col items-start justify-between gap-5 rounded-[1.75rem] border border-neutral-200 bg-white px-6 py-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Ready to get started?
            </h2>
          </div>
          <Link
            href="/inquiry"
            className="button-primary interactive inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white hover:opacity-95"
          >
            Start My Business Setup
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WhyStartFlow() {
  return (
    <section className="border-b border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-6 sm:py-22 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Why StartFlow</p>
          <ScrollReveal>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Built to simplify your journey
            </h2>
          </ScrollReveal>
          <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
            Clear support, thoughtful structure, and a simpler way to move from idea to action.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {whyStartFlowItems.map((item) => (
              <div
                key={item.title}
                className="interactive card-hover rounded-[1.85rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] p-7 shadow-[0_14px_36px_rgba(17,24,39,0.03)]"
              >
              <h3 className="text-xl font-semibold tracking-tight text-neutral-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FounderTestimonials() {
  return (
    <section className="border-b border-neutral-200 bg-[radial-gradient(circle_at_top_left,rgba(184,150,86,0.08),transparent_26%),linear-gradient(180deg,#fcfbf8_0%,#f5efe3_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Built for people like you
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {founderTestimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="interactive card-hover rounded-[1.85rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfa_0%,#f8f1e3_100%)] p-7 shadow-[0_18px_42px_rgba(80,61,28,0.05)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e2cfaa] bg-[linear-gradient(180deg,#fcf6ea_0%,#f1e3c7_100%)] text-sm font-semibold text-[#8f6a2f] shadow-[0_10px_20px_rgba(80,61,28,0.05)]">
                  {testimonial.name.slice(0, 1)}
                </div>
                <div>
                  <p className="text-base font-semibold tracking-tight text-neutral-950">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-6 text-lg leading-8 text-neutral-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutStartFlow() {
  return (
    <section id="about-startflow" className="border-b border-neutral-200 bg-[radial-gradient(circle_at_top,rgba(184,150,86,0.07),transparent_30%),linear-gradient(180deg,#fcfbf8_0%,#f3ede1_100%)]">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.15rem] border border-[#e8dcc4] bg-[linear-gradient(180deg,#fffdfa_0%,#f7f0e2_100%)] px-6 py-10 shadow-[0_22px_60px_rgba(80,61,28,0.06)] sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_70%)]" />
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">About StartFlow</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#d9c291]" />
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-neutral-600">
            StartFlow was built for individuals and small businesses that need clarity,
            structure, and a clear path forward. We turn early-stage uncertainty into a
            focused plan with a professional setup and practical next steps.
          </p>
        </div>
      </div>
    </section>
  );
}
