"use client";

import { FormEvent, useState } from "react";
import {
  initialOnboardingFormData,
  normalizeOnboardingFormData,
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

  return (
    <div className="mt-10 rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-10">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Next Step
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Complete your onboarding
        </h2>
        <p className="mt-4 text-lg leading-8 text-neutral-600">
          Share a few details about your business, goals, and current stage so we can prepare your {packageName || "setup"} and guide you through the next steps clearly.
        </p>
      </div>

      {isSubmitted ? (
        <div className="mt-10 rounded-[1.75rem] border border-neutral-200 bg-neutral-50 px-6 py-8">
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Intake submitted.
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
            Thanks — your onboarding details were received. We’ll review everything and follow up soon with your next steps.
          </p>
        </div>
      ) : (
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
              error={errors.phone}
            />
            <Field
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={(value) => updateField("businessName", value)}
              placeholder="Your business name"
              error={errors.businessName}
              required
            />
            <Field
              label="Business Type"
              name="businessType"
              value={formData.businessType}
              onChange={(value) => updateField("businessType", value)}
              placeholder="Service business, ecommerce, local business, etc."
              error={errors.businessType}
              required
            />
            <Field
              label="Website or Social Link"
              name="websiteOrSocial"
              value={formData.websiteOrSocial}
              onChange={(value) => updateField("websiteOrSocial", value)}
              placeholder="Optional"
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
              error={errors.whatBuilding}
              required
            />
            <TextAreaField
              label="What stage are you in?"
              name="currentStage"
              value={formData.currentStage}
              onChange={(value) => updateField("currentStage", value)}
              placeholder="Idea stage, early setup, relaunching, already live, etc."
              error={errors.currentStage}
              required
            />
            <TextAreaField
              label="What do you need most help with right now?"
              name="helpNeeded"
              value={formData.helpNeeded}
              onChange={(value) => updateField("helpNeeded", value)}
              placeholder="Brand direction, website setup, offer clarity, launch planning, or something else."
              error={errors.helpNeeded}
              required
            />
            <TextAreaField
              label="What is your main goal for the next 30-60 days?"
              name="mainGoal"
              value={formData.mainGoal}
              onChange={(value) => updateField("mainGoal", value)}
              placeholder="Tell us the result you want to be working toward next."
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
              error={errors.preferredCommunication}
              required
            />
            <Field
              label="Anything else we should know?"
              name="anythingElse"
              value={formData.anythingElse}
              onChange={(value) => updateField("anythingElse", value)}
              placeholder="Optional"
              error={errors.anythingElse}
            />
          </div>

          {submitError ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          ) : null}

          <p className="text-sm leading-7 text-neutral-500">
            Once submitted, we&apos;ll review your details and follow up with your next-step guidance.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Onboarding Details"}
          </button>
        </form>
      )}
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
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  required = false
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
};

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false
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
        rows={5}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-[1.5rem] border bg-white px-4 py-3 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 ${
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
