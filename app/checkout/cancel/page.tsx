import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="bg-[radial-gradient(circle_at_top,rgba(184,150,86,0.08),transparent_28%),linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffefd_0%,#faf6ee_100%)] p-8 text-center shadow-[0_22px_65px_rgba(80,61,28,0.06)] sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
            Checkout Canceled
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            No worries.
          </h1>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Your checkout was canceled before payment was completed. You can return to pricing anytime and continue when you&apos;re ready.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9bd81] bg-[linear-gradient(180deg,#fff8ea_0%,#f1dfb8_100%)] px-6 py-3 text-sm font-semibold text-[#8f6a2f] shadow-[0_12px_26px_rgba(169,114,47,0.12)] transition hover:border-[#cf9b53] hover:bg-[linear-gradient(180deg,#fff4dc_0%,#ead3a3_100%)]"
          >
            Return to Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
