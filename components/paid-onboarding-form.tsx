"use client";

import { FormEvent, useState } from "react";
import { Rocket, Sparkles } from "lucide-react";
import {
  initialOnboardingFormData,
  normalizeOnboardingFormData,
  onboardingFieldMaxLengths,
  type OnboardingFormData,
  type OnboardingFormErrors,
  validateOnboardingFormSubmission
} from "@/lib/onboarding-form";
import type { StartFlowPackageKey } from "@/lib/startflow-packages";

type PaidOnboardingFormProps = {
  packageType: StartFlowPackageKey | "";
  packageName: string;
  sessionId: string;
  customerEmail: string;
};

export function PaidOnboardingForm({
  packageType,
  packageName,
  sessionId,
  customerEmail
}: PaidOnboardingFormProps) {
  const isBuild = packageType === "growth";
  const packageIconBubbleClass = isBuild
    ? "border border-[#a9722f]/15 bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] text-white shadow-[0_8px_16px_rgba(169,114,47,0.18)]"
    : "border border-[#d9bd81] bg-[linear-gradient(180deg,#fff3d3_0%,#e7c17a_52%,#b98743_100%)] text-white shadow-[0_8px_16px_rgba(185,135,67,0.16)]";
  const packageBadgeClass = isBuild
    ? "border-[#d9bd81] bg-white/80"
    : "border-[#eadfcb] bg-white/80";
  const packageTextClass = isBuild
    ? "bg-[linear-gradient(180deg,#cf9b53_0%,#8f5f24_100%)] bg-clip-text text-transparent"
    : "text-[#8f6a2f]";
  const packageTextStyle = isBuild ? undefined : { color: "#8f6a2f" };
  const [formData, setFormData] = useState<OnboardingFormData>({
    ...initialOnboardingFormData,
    packageType,
    sessionId,
    email: customerEmail
  });
  const [errors, setErrors] = useState<OnboardingFormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStartedAt] = useState(() => Date.now().toString());

  function updateField<K extends keyof OnboardingFormData>(
    field: K,
    value: OnboardingFormData[K]
  ) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = normalizeOnboardingFormData(formData);
    const nextErrors = validateOnboardingFormSubmission(payload);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const honeypotField = event.currentTarget.elements.namedItem("companyWebsite");
      const honeypotValue =
        honeypotField instanceof HTMLInputElement ? honeypotField.value : "";

      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...payload,
          companyWebsite: honeypotValue,
          formStartedAt
        })
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string; fieldErrors?: OnboardingFormErrors }
        | null;

      if (!response.ok) {
        if (data?.fieldErrors) {
          setErrors(data.fieldErrors);
        }

        throw new Error(data?.error || "Unable to send your onboarding details right now.");
      }

      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to send your onboarding details right now.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="mt-10 rounded-[1.85rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfa_0%,#f9f3e8_100%)] px-6 py-8 shadow-[0_20px_60px_rgba(80,61,28,0.05)] sm:px-8">
        <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Intake submitted.
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
          Thanks - your onboarding details were received. We&apos;ll review everything and follow up soon with your next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffefd_0%,#faf6ee_100%)] p-6 shadow-[0_22px_65px_rgba(80,61,28,0.06)] sm:p-10">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
          Business Intake
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Tell us about your <span className="bg-[linear-gradient(180deg,#cf9b53_0%,#a9722f_100%)] bg-clip-text text-transparent">business</span>
        </h2>
        <p className="mt-4 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
          This short form gives us the context we need to prepare your {packageName || "setup"}{" "}
          and follow up with a clear plan.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div
          className={`rounded-[1.5rem] border px-5 py-4 ${
            isBuild
              ? "border-[#d9bd81] bg-[linear-gradient(180deg,#fffdfb_0%,#f8edd6_100%)]"
              : "border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfa_0%,#f9f3e8_100%)]"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f6a2f]">
            Selected Package
          </p>
          <div
            className={`mt-3 inline-flex items-center gap-3 rounded-full border px-3 py-2 shadow-[0_10px_24px_rgba(80,61,28,0.04)] ${packageBadgeClass}`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ${packageIconBubbleClass}`}
            >
              {isBuild ? <Sparkles size={16} /> : <Rocket size={16} />}
            </span>
            <span className={`text-sm font-semibold ${packageTextClass}`} style={packageTextStyle}>
              {packageName || "Confirmed"}
            </span>
          </div>
        </div>
        <div
          className={`rounded-[1.5rem] border px-5 py-4 ${
            isBuild
              ? "border-[#d9bd81] bg-[linear-gradient(180deg,#fffdfb_0%,#f6e7ca_100%)]"
              : "border-[#eadfcb] bg-[linear-gradient(180deg,#fffdfa_0%,#f9f3e8_100%)]"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f6a2f]">
            Next Step
          </p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#8f6a2f]">
            Submit intake
          </p>
          <p className="mt-2 text-sm leading-6 text-neutral-500">
            We&apos;ll review your responses and follow up with your setup path.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8" noValidate>
        <input
          type="text"
          name="companyWebsite"
          value=""
          onChange={() => undefined}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={(value) => updateField("fullName", value)}
            placeholder="Your full name"
            maxLength={onboardingFieldMaxLengths.fullName}
            error={errors.fullName}
            required
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(value) => updateField("email", value)}
            placeholder="you@example.com"
            maxLength={onboardingFieldMaxLengths.email}
            error={errors.email}
            required
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(value) => updateField("phone", value)}
            placeholder="Optional"
            maxLength={onboardingFieldMaxLengths.phone}
            error={errors.phone}
          />
          <Field
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={(value) => updateField("businessName", value)}
            placeholder="Your business name"
            maxLength={onboardingFieldMaxLengths.businessName}
            error={errors.businessName}
            required
          />
          <Field
            label="Business Type"
            name="businessType"
            value={formData.businessType}
            onChange={(value) => updateField("businessType", value)}
            placeholder="Service business, ecommerce, local business, etc."
            maxLength={onboardingFieldMaxLengths.businessType}
            error={errors.businessType}
            required
          />
          <Field
            label="Website or Social Link"
            name="websiteOrSocial"
            value={formData.websiteOrSocial}
            onChange={(value) => updateField("websiteOrSocial", value)}
            placeholder="Optional"
            maxLength={onboardingFieldMaxLengths.websiteOrSocial}
            error={errors.websiteOrSocial}
          />
        </div>

        <div className="grid gap-5">
          <TextAreaField
            label="What are you building?"
            name="whatBuilding"
            value={formData.whatBuilding}
            onChange={(value) => updateField("whatBuilding", value)}
            placeholder="Tell us what business or offer you are building."
            maxLength={onboardingFieldMaxLengths.whatBuilding}
            error={errors.whatBuilding}
            required
          />
          <TextAreaField
            label="What stage are you in?"
            name="currentStage"
            value={formData.currentStage}
            onChange={(value) => updateField("currentStage", value)}
            placeholder="Idea stage, early setup, relaunching, already live, etc."
            maxLength={onboardingFieldMaxLengths.currentStage}
            error={errors.currentStage}
            required
          />
          <TextAreaField
            label="What do you need most help with right now?"
            name="helpNeeded"
            value={formData.helpNeeded}
            onChange={(value) => updateField("helpNeeded", value)}
            placeholder="Brand direction, website setup, offer clarity, launch planning, or something else."
            maxLength={onboardingFieldMaxLengths.helpNeeded}
            error={errors.helpNeeded}
            required
          />
          <TextAreaField
            label="What is your main goal for the next 30-60 days?"
            name="mainGoal"
            value={formData.mainGoal}
            onChange={(value) => updateField("mainGoal", value)}
            placeholder="Tell us the result you want to be working toward next."
            maxLength={onboardingFieldMaxLengths.mainGoal}
            error={errors.mainGoal}
            required
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Preferred communication method"
            name="preferredCommunication"
            value={formData.preferredCommunication}
            onChange={(value) => updateField("preferredCommunication", value)}
            placeholder="Email, phone, text, etc."
            maxLength={onboardingFieldMaxLengths.preferredCommunication}
            error={errors.preferredCommunication}
            required
          />
          <Field
            label="Anything else we should know?"
            name="anythingElse"
            value={formData.anythingElse}
            onChange={(value) => updateField("anythingElse", value)}
            placeholder="Optional"
            maxLength={onboardingFieldMaxLengths.anythingElse}
            error={errors.anythingElse}
          />
        </div>

        {submitError ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        ) : null}

        <p className="text-sm leading-7 text-neutral-500">
          Once submitted, we&apos;ll review your responses and follow up with your next-step guidance.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(169,114,47,0.22)] transition hover:shadow-[0_16px_36px_rgba(169,114,47,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Intake"}
        </button>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  required = false,
  maxLength
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-800">
        {label}
        {required ? <span className="text-neutral-500"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`min-h-12 w-full rounded-2xl border bg-white px-4 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 ${
          error ? "border-red-300" : "border-neutral-200"
        }`}
      />
      {error ? (
        <span id={`${name}-error`} className="mt-2 block text-sm text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
};

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  maxLength
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-800">
        {label}
        {required ? <span className="text-neutral-500"> *</span> : null}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={5}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-[1.5rem] border bg-white px-4 py-3 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 ${
          error ? "border-red-300" : "border-neutral-200"
        }`}
      />
      {maxLength ? (
        <span className="mt-2 block text-right text-xs text-neutral-400">
          {value.length} / {maxLength}
        </span>
      ) : null}
      {error ? (
        <span id={`${name}-error`} className="mt-2 block text-sm text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}
