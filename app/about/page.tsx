import Link from "next/link";

function BrandName() {
  return (
    <span className="whitespace-nowrap">
      <span className="text-[#171717]">Start</span>
      <span className="bg-[linear-gradient(180deg,#cf9b53_0%,#a9722f_100%)] bg-clip-text text-transparent">
        Flow
      </span>
    </span>
  );
}

const accentHeadline = "bg-[linear-gradient(180deg,#cf9b53_0%,#a9722f_100%)] bg-clip-text text-transparent";

const differentiators = [
  {
    title: "Clarity over complexity",
    description: "No unnecessary steps or confusing processes"
  },
  {
    title: "Beginner friendly",
    description: "Designed for people starting from zero"
  },
  {
    title: "Structured, step-by-step approach",
    description: "You always know what comes next"
  },
  {
    title: "Focused on execution",
    description: "We help you move forward, not just plan"
  }
];

export default function AboutPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)]">
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fbf5e8_100%)] px-6 py-8 shadow-[0_16px_36px_rgba(80,61,28,0.05)] sm:px-8 sm:py-10">
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              About <BrandName />
            </h1>
            <div className="mt-6 space-y-5 text-lg leading-8 text-neutral-600">
              <p>
                StartFlow is a US based company that was built to support individuals and small businesses who need
                clarity, structure, and a clear path forward.
              </p>
              <p>
                We turn early-stage uncertainty into a focused plan - with a
                professional setup and a simpler way to move forward with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-18 lg:px-8">
        <div className="grid gap-6 lg:gap-8">
          <div className="rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fbf5e8_100%)] px-6 py-7 shadow-[0_16px_36px_rgba(80,61,28,0.05)] sm:px-8 sm:py-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
              Who We Help
            </p>
            <div className="mt-5 max-w-3xl space-y-5 text-lg leading-8 text-neutral-600">
              <p>
                We work with individuals and small businesses who are ready to take
                their ideas seriously - but don&apos;t know exactly where to start.
              </p>
              <p>
                Whether you&apos;re launching your first business or trying to bring
                structure to something you&apos;ve already started, StartFlow is designed
                to guide you through the process without confusion or overwhelm.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fbf5e8_100%)] px-6 py-7 shadow-[0_16px_36px_rgba(80,61,28,0.05)] sm:px-8 sm:py-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
                What We Believe
              </p>
              <div className="mt-5 max-w-3xl space-y-5 text-lg leading-8 text-neutral-600">
                <p>
                  Starting a business shouldn&apos;t feel complicated.
                </p>
                <p>
                  Too many people get stuck researching, second-guessing, and trying to
                  figure everything out on their own. We believe there should be a clearer,
                  more structured way to move from idea to execution.
                </p>
                <p>
                  StartFlow exists to simplify that process - giving you direction,
                  structure, and the confidence to move forward.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fbf5e8_100%)] px-6 py-7 shadow-[0_16px_36px_rgba(80,61,28,0.05)] sm:px-8 sm:py-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
                Our Approach
              </p>
              <div className="mt-5 space-y-5 text-lg leading-8 text-neutral-600">
                <p>
                  We focus on making things clear and actionable.
                </p>
                <p>
                  Instead of overwhelming you with options, we break things down into a
                  process that makes sense - so you can spend less time figuring out the business semantics and more time actually building your business.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fbf5e8_100%)] px-6 py-7 shadow-[0_16px_36px_rgba(80,61,28,0.05)] sm:px-8 sm:py-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
              What Makes <BrandName /> Different
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {differentiators.map((item) => (
                <div
                  key={item.title}
                  className="interactive card-hover rounded-[1.85rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fbf5e8_100%)] p-6 shadow-[0_16px_36px_rgba(80,61,28,0.05)]"
                >
                  <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                    {item.title}
                  </h2>
                  <p className="mt-3 leading-7 text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="interactive cta-surface rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fbf5e8_100%)] px-8 py-14 shadow-[0_18px_44px_rgba(80,61,28,0.06)] sm:px-12">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
              Next Step
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Ready to take your <span className={accentHeadline}>idea</span> seriously?
            </h2>
            <div className="mt-8">
              <Link
                href="/inquiry"
                className="button-primary interactive inline-flex min-h-12 items-center justify-center rounded-full bg-[#8f6a2f] px-7 py-3.5 text-center text-sm font-medium text-white hover:bg-[#7a5b28]"
              >
                Start My Business Setup
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
