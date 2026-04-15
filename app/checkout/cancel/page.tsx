import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
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
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-neutral-950"
          >
            Return to Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
