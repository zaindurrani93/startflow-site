import Link from "next/link";
import { Lightbulb, Palette, Rocket, Settings } from "lucide-react";

const services = [
  {
    title: "Idea Clarity",
    desc: "Get clear on what business to start, who it serves, and how to position it simply."
  },
  {
    title: "Brand Setup",
    desc: "We shape your name, brand direction, and overall look so your business feels legit from day one."
  },
  {
    title: "Website Setup",
    desc: "Launch with a clean landing page or starter website you can actually send to people."
  },
  {
    title: "Launch Plan",
    desc: "Walk away with simple next steps so you know exactly what to do after setup."
  },
  {
    title: "Social Setup",
    desc: "Set up your core pages and content direction when you're ready to start posting."
  },
  {
    title: "1:1 Support",
    desc: "Get guided help so you are not trying to piece everything together alone."
  }
];

const steps = [
  {
    num: "01",
    title: "Tell us your idea",
    desc: "Share what you want to build, where you're stuck, and what kind of business you want to start."
  },
  {
    num: "02",
    title: "We build the setup",
    desc: "We help shape your brand, online presence, and business foundation step by step."
  },
  {
    num: "03",
    title: "Launch with clarity",
    desc: "You leave with a real setup, a plan, and a clear path to start getting moving."
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
    href: "/how-it-works",
    label: "How It Works",
    desc: "A simple 3-step process with no confusion, no fluff, and no trying to figure it all out alone."
  },
  {
    href: "/pricing",
    label: "Pricing",
    desc: "Simple pricing for getting started with a clean, beginner-friendly package."
  },
  {
    href: "/contact",
    label: "Contact",
    desc: "Reach out when you are ready to build it the right way with a clear setup and strong foundation."
  }
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_35%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm text-neutral-700">
            Beginner-friendly business setup service
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
            Start your business the right way.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            We help beginners go from idea to a fully set-up business with branding, website setup, and a simple launch plan.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="pointer-events-auto rounded-full bg-neutral-950 px-7 py-3.5 text-center text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              Start Now
            </Link>
            <Link
              href="/services"
              className="pointer-events-auto rounded-full border border-neutral-300 px-7 py-3.5 text-center text-sm font-medium text-neutral-800 transition hover:border-neutral-950 hover:text-neutral-950"
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
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
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
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Explore</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Everything has its own page now.</h2>
        <p className="mt-4 text-lg text-neutral-600">
          Browse services, workflow, how it works, pricing, and contact details in dedicated pages with the same clear StartFlow style.
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
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Services</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">What StartFlow helps you with.</h2>
        <p className="mt-4 text-lg text-neutral-600">
          Everything is designed to help beginners get moving with clarity, structure, and a clean setup.
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

export function WorkflowSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Workflow</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">From idea to launch, step-by-step.</h2>
        <p className="mt-4 text-lg text-neutral-600">
          StartFlow is designed to simplify the entire process of starting a business. Instead of guessing what to do next, you follow a clear progression that takes you from an idea to something real.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {workflowItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-4 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-md">
                <Icon size={18} />
                {item.label}
              </div>
              {index < 3 && <div className="hidden text-xl text-neutral-300 sm:block">-&gt;</div>}
            </div>
          );
        })}
      </div>

      <div className="mt-12 max-w-3xl text-neutral-600 leading-7">
        <p>
          Everything starts with clarity. Once your idea is defined, we build your brand and structure so you have something real to work with. From there, we set up your online presence and give you a clear plan so you can move forward without second guessing yourself.
        </p>
        <p className="mt-4">
          The goal is not just to start a business, but to start it the right way, with a foundation that actually makes sense and is easy to build on.
        </p>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50/70">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">How It Works</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A simple 3-step process.</h2>
          <p className="mt-4 text-lg text-neutral-600">
            No confusion, no fluff, and no trying to figure it all out on your own.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="rounded-[1.75rem] border border-neutral-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-sm font-medium tracking-[0.2em] text-neutral-500">{step.num}</div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-4 leading-7 text-neutral-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Pricing</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Simple pricing for getting started.</h2>
        <p className="mt-4 text-lg text-neutral-600">
          Start with a clean, beginner-friendly package designed to help you move from idea to launch with clarity.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">Business Starter Package</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-tight">$300-$500</span>
            </div>
            <p className="mt-4 max-w-lg text-neutral-600">
              Best for beginners who want a clear setup, real structure, and guidance through the launch process.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-neutral-950 px-6 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Business idea clarity",
            "Brand name + direction",
            "Landing page or simple website",
            "Social media setup",
            "Launch plan",
            "1:1 support"
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-neutral-50 px-4 py-4 text-sm text-neutral-700 ring-1 ring-neutral-100">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-5xl px-6 pt-20 lg:px-8">
        <div className="rounded-[2rem] bg-neutral-950 px-8 py-14 text-white shadow-[0_25px_70px_rgba(0,0,0,0.18)] sm:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-400">Contact</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to start your business?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-300">
            Let&apos;s build it the right way with a clear setup, strong foundation, and simple next steps.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:hello@startflow.co"
              className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-medium text-neutral-950 transition hover:opacity-90"
            >
              Email StartFlow
            </a>
            <a
              href="https://instagram.com/startflow.co"
              className="rounded-full border border-white/25 px-7 py-3.5 text-center text-sm font-medium text-white transition hover:border-white/60"
            >
              DM on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
