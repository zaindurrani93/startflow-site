import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950 text-white">
            <CheckCircle2 size={28} />
          </div>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Payment Received
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            You're officially in.
          </h1>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Your payment was received successfully. We'll review your package details and follow up with the next steps to get your StartFlow setup moving.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Go to Contact
          </Link>
        </div>
      </section>
    </main>
  );
}
