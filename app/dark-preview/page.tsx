import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Sparkles,
  Target
} from "lucide-react";

const darkPreviewCards = [
  {
    title: "Clear Direction",
    description: "A warmer dark theme can still feel focused, calm, and beginner-friendly."
  },
  {
    title: "Premium Contrast",
    description: "Soft ivory text, muted taupe body copy, and caramel accents keep it elevated."
  },
  {
    title: "Brand Flexibility",
    description: "The Build package purple can still work, but it needs to stay softened and restrained."
  }
];

const launchFeatures = [
  "Clear business direction",
  "Starter online presence",
  "Launch roadmap"
];

const buildFeatures = [
  "Everything in Launch",
  "Multi-page website",
  "Priority support"
];

export default function DarkPreviewPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f6f1e8_100%)]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              Dark Mode Preview
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              A safe mock to see how StartFlow could feel in dark mode.
            </h1>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              This is only a preview page so we can judge the palette, contrast, and overall mood before changing the main site.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2.4rem] border border-[#3a3025] bg-[radial-gradient(circle_at_top,rgba(201,167,101,0.16),transparent_26%),linear-gradient(180deg,#18130f_0%,#1f1812_100%)] shadow-[0_30px_90px_rgba(20,14,10,0.22)]">
            <div className="border-b border-[#33291f] px-6 py-5 sm:px-8">
              <div className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#4a3a28] bg-[linear-gradient(180deg,#2a2119_0%,#231c16_100%)] text-[#c9a765]">
                  <Target size={20} />
                </span>
                <span className="inline-flex items-baseline gap-0">
                  <span className="text-[#f6f0e7]">Start</span>
                  <span className="bg-[linear-gradient(135deg,#ead9b7_0%,#c9a765_100%)] bg-clip-text text-transparent">
                    Flow
                  </span>
                </span>
              </div>
            </div>

            <div className="px-6 py-10 sm:px-8 sm:py-12">
              <section className="rounded-[2rem] border border-[#3a3025] bg-[linear-gradient(180deg,rgba(37,29,22,0.82)_0%,rgba(28,23,18,0.92)_100%)] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-8 sm:py-10">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#c9a765]">
                  Dark Hero Mock
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[#f6f0e7] sm:text-5xl">
                  Build your business with clarity, even in a darker look.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#c7b9a6]">
                  This version keeps StartFlow warm and premium instead of cold or overly corporate. The goal would be espresso backgrounds, soft ivory type, caramel accents, and a restrained purple for Build.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <span className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c9a765] px-7 py-3.5 text-sm font-medium text-[#1d1813]">
                    Start Now
                  </span>
                  <span className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#4a3a28] bg-[#241d17] px-7 py-3.5 text-sm font-medium text-[#f6f0e7]">
                    View Services
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Idea", "Brand", "Setup", "Launch"].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-[#4a3a28] bg-[linear-gradient(180deg,#251e17_0%,#1f1813_100%)] px-4 py-2 text-sm font-medium text-[#f6f0e7]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-8 grid gap-5 lg:grid-cols-3">
                {darkPreviewCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[1.8rem] border border-[#33291f] bg-[linear-gradient(180deg,#231c16_0%,#1d1712_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    <p className="text-lg font-semibold tracking-tight text-[#f6f0e7]">
                      {card.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#c7b9a6]">
                      {card.description}
                    </p>
                  </div>
                ))}
              </section>

              <section className="mt-8 rounded-[2rem] border border-[#33291f] bg-[linear-gradient(180deg,rgba(35,28,22,0.9)_0%,rgba(27,22,17,0.94)_100%)] p-6 sm:p-8">
                <div className="max-w-2xl">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#c9a765]">
                    Pricing In Dark Mode
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#f6f0e7] sm:text-4xl">
                    The pricing could still work, but it needs very careful contrast.
                  </h2>
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                  <div className="flex h-full flex-col rounded-[1.9rem] border border-[#4a3a28] bg-[linear-gradient(180deg,#211a14_0%,#1b1611_100%)] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#5a4830] bg-[#2a2118] text-[#c9a765]">
                      <BriefcaseBusiness size={22} />
                    </div>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-[#bca98e]">
                      Launch
                    </p>
                    <p className="mt-3 text-[2.2rem] font-semibold tracking-tight text-[#f6f0e7]">
                      $299
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#c7b9a6]">
                      A warm dark surface can still feel premium for the starter package if the gold stays restrained.
                    </p>

                    <div className="mt-6 rounded-[1.4rem] border border-[#3a3025] bg-[#201913] px-5 py-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#bca98e]">
                        What&apos;s included
                      </p>
                      <ul className="mt-3 space-y-2.5 text-sm text-[#ddd1c2]">
                        {launchFeatures.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <span className="inline-block h-[1.5px] w-2 rounded-full bg-[#c9a765]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <span className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#c9a765] px-6 text-sm font-medium text-[#1d1813]">
                      Choose Launch
                    </span>
                  </div>

                  <div className="relative flex h-full flex-col rounded-[1.9rem] border border-[#4f4465] bg-[linear-gradient(180deg,#221b25_0%,#1b161d_100%)] p-6">
                    <div className="absolute right-6 top-6 rounded-full border border-[#54476f] bg-[#2b2433] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#b6a6d8]">
                      Most Popular
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#54476f] bg-[#2b2433] text-[#b6a6d8]">
                      <Sparkles size={22} />
                    </div>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-[#bca98e]">
                      Build
                    </p>
                    <p className="mt-3 text-[2.2rem] font-semibold tracking-tight text-[#f6f0e7]">
                      $499
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#c7b9a6]">
                      The Build card can still stand out with softened plum tones, but it should stay subtle.
                    </p>

                    <div className="mt-6 rounded-[1.4rem] border border-[#3c324a] bg-[#201a24] px-5 py-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#bca98e]">
                        What&apos;s included
                      </p>
                      <ul className="mt-3 space-y-2.5 text-sm text-[#ddd1c2]">
                        {buildFeatures.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <span className="inline-block h-[1.5px] w-2 rounded-full bg-[#9a86c8]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <span className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#8e79be] px-6 text-sm font-medium text-white">
                      Choose Build
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-neutral-600">
              My honest take: this can work, but only if we style every section intentionally. Otherwise the site will probably feel less distinctive than the current light version.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#8f6a2f] transition hover:text-[#7a5b28]"
            >
              Back to site
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
