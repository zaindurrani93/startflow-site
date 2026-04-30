"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { StartFlowPackageKey } from "@/lib/startflow-packages";

export function CheckoutButton({ packageType }: { packageType: StartFlowPackageKey }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ packageType })
      });

      const data = (await response.json().catch(() => null)) as
        | { url?: string; error?: string }
        | null;

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "Unable to start secure checkout right now.");
      }

      window.location.assign(data.url);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to start secure checkout right now.";
      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(169,114,47,0.22)] transition hover:shadow-[0_16px_36px_rgba(169,114,47,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Redirecting..." : "Continue to Secure Checkout"}
        {!isLoading ? <ArrowRight size={16} /> : null}
      </button>
      {error ? (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
