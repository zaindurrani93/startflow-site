"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  businessTypes,
  contactFieldMaxLengths,
  contactFormSteps,
  currentStages,
  initialContactFormData,
  normalizeContactFormData,
  type ContactFormData,
  type ContactFormErrors,
  validateContactFormStep
} from "@/lib/contact-form";

type ContactPageContentProps = {
  isQuestionIntent?: boolean;
};

const accentHeadline = "bg-[linear-gradient(180deg,#cf9b53_0%,#a9722f_100%)] bg-clip-text text-transparent";
const primaryGoldButton =
  "button-primary interactive inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] px-6 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(169,114,47,0.22)] hover:shadow-[0_16px_36px_rgba(169,114,47,0.28)]";

function renderInquiryStepTitle(step: number) {
  if (step === 1) {
    return <>Let&apos;s start with the <span className={accentHeadline}>basics</span>.</>;
  }

  if (step === 2) {
    return <>Tell us a little about the <span className={accentHeadline}>business</span>.</>;
  }

  return <>What do you want <span className={accentHeadline}>help</span> with right now?</>;
}

export function ContactPageContent({
  isQuestionIntent = false
}: ContactPageContentProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>(initialContactFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStartedAt] = useState(() => Date.now().toString());

  const questionFlowItems = [
    { id: 1, label: "About You", title: "Tell us who you are." },
    { id: 2, label: "Question", title: "Share what you need help with." },
    { id: 3, label: "Follow-Up", title: "We will respond directly." }
  ] as const;

  const sidebarItems = isQuestionIntent ? questionFlowItems : contactFormSteps;

  const progress = useMemo(
    () => Math.round((step / contactFormSteps.length) * 100),
    [step]
  );

  function updateField<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function validateStep(currentStep: number) {
    const nextErrors = validateContactFormStep(
      normalizeContactFormData(formData),
      currentStep
    );

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goToNextStep() {
    if (!validateStep(step)) {
      return;
    }

    setStep((current) => Math.min(current + 1, contactFormSteps.length));
  }

  function goToPreviousStep() {
    setStep((current) => Math.max(current - 1, 1));
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isQuestionIntent) {
      const normalized = normalizeContactFormData(formData);
      const nextErrors = {
        ...validateContactFormStep(normalized, 1),
        ...validateContactFormStep(normalized, 3)
      };

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
    } else if (!validateStep(3)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = normalizeContactFormData(formData);
      const honeypotField = event.currentTarget.elements.namedItem("companyWebsite");
      const honeypotValue =
        honeypotField instanceof HTMLInputElement ? honeypotField.value : "";

      const response = await fetch("/api/contact", {
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

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string; fieldErrors?: ContactFormErrors }
          | null;

        if (data?.fieldErrors) {
          setErrors(data.fieldErrors);
        }

        throw new Error(data?.error || "Something went wrong while sending your details.");
      }

      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your details.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
              {isQuestionIntent ? "CONTACT" : "INQUIRY"}
            </p>
            {isQuestionIntent ? null : (
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                Start your <span className={accentHeadline}>setup</span> with a simple guided form.
              </h1>
            )}
            {isQuestionIntent ? null : (
                <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
                Share a few details and we&apos;ll follow up with the right next steps for your business.
              </p>
            )}
          </div>

          <div
            className={`mt-12 grid gap-8 lg:items-start ${
              isQuestionIntent ? "mx-auto max-w-3xl" : "lg:grid-cols-[0.9fr_1.1fr]"
            }`}
          >
            {isQuestionIntent ? null : (
              <div className="interactive card-hover rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f1_100%)] p-6 shadow-[0_18px_44px_rgba(80,61,28,0.05)] sm:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
                  What to expect
                </p>
                <div className="mt-6 space-y-6">
                  {sidebarItems.map((item, index) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          isQuestionIntent
                            ? index === 0
                              ? "bg-[#8f6a2f] text-white shadow-[0_10px_24px_rgba(143,106,47,0.22)]"
                              : "bg-[#f6efe0] text-[#b89656]"
                            : step === item.id
                            ? "bg-[#8f6a2f] text-white shadow-[0_10px_24px_rgba(143,106,47,0.22)]"
                            : "bg-[#f6efe0] text-[#b89656]"
                        }`}
                      >
                        {item.id}
                      </div>
                      <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              id="contact-form"
              className={`interactive cta-surface rounded-[2rem] border border-[#eadfcb] bg-[linear-gradient(180deg,#fffefd_0%,#faf6ee_100%)] shadow-[0_22px_65px_rgba(80,61,28,0.06)] ${
                isQuestionIntent ? "p-6 sm:p-8" : "p-8 sm:p-10"
              }`}
            >
              {isSubmitted ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#a9722f]/15 bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] text-white shadow-[0_14px_30px_rgba(169,114,47,0.22)]">
                    <CheckCircle2 size={28} />
                  </div>
                  <h2 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950">
                    You&apos;re all <span className={accentHeadline}>set</span>.
                  </h2>
                  <p className="mt-4 max-w-md text-lg leading-8 text-neutral-600">
                    Thanks - your details were sent. We&apos;ll follow up with next steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
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
                  {isQuestionIntent ? (
                    <div>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                        Send a <span className={accentHeadline}>message</span>
                      </h2>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
                            Step {step} of {contactFormSteps.length}
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                            {renderInquiryStepTitle(step)}
                          </h2>
                        </div>
                        <p className="text-sm font-medium text-neutral-500">{progress}%</p>
                      </div>

                      <div className="mt-6 h-2 w-full rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#cf9b53_0%,#a9722f_100%)] transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </>
                  )}

                  <div className="relative mt-8 overflow-hidden">
                    <div key={step} className="space-y-5 transition-opacity duration-300">
                      {isQuestionIntent ? (
                        <>
                          <Field
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={(value) => updateField("name", value)}
                            placeholder="Your name"
                            maxLength={contactFieldMaxLengths.name}
                            error={errors.name}
                            required
                          />
                          <Field
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(value) => updateField("email", value)}
                            placeholder="you@example.com"
                            maxLength={contactFieldMaxLengths.email}
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
                            maxLength={contactFieldMaxLengths.phone}
                            error={errors.phone}
                          />
                          <TextAreaField
                            label="Message"
                            name="goals"
                            value={formData.goals}
                            onChange={(value) => updateField("goals", value)}
                            placeholder="Tell us what you need help with and we&apos;ll get back to you directly."
                            maxLength={contactFieldMaxLengths.goals}
                            error={errors.goals}
                            required
                          />
                        </>
                      ) : step === 1 ? (
                        <>
                          <Field
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={(value) => updateField("name", value)}
                            placeholder="Your name"
                            maxLength={contactFieldMaxLengths.name}
                            error={errors.name}
                            required
                          />
                          <Field
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(value) => updateField("email", value)}
                            placeholder="you@example.com"
                            maxLength={contactFieldMaxLengths.email}
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
                            maxLength={contactFieldMaxLengths.phone}
                            error={errors.phone}
                          />
                        </>
                      ) : null}

                      {step === 2 ? (
                        <>
                          <Field
                            label="Business Name"
                            name="businessName"
                            value={formData.businessName}
                            onChange={(value) => updateField("businessName", value)}
                            placeholder="Optional"
                            maxLength={contactFieldMaxLengths.businessName}
                            error={errors.businessName}
                          />
                          <SelectField
                            label="Business Type"
                            name="businessType"
                            value={formData.businessType}
                            onChange={(value) => updateField("businessType", value)}
                            options={[...businessTypes]}
                            placeholder="Select a business type"
                            error={errors.businessType}
                          />
                          <SelectField
                            label="Current Stage"
                            name="currentStage"
                            value={formData.currentStage}
                            onChange={(value) => updateField("currentStage", value)}
                            options={[...currentStages]}
                            placeholder="Select your current stage"
                            error={errors.currentStage}
                          />
                        </>
                      ) : null}

                      {step === 3 ? (
                        <TextAreaField
                          label={
                            isQuestionIntent
                              ? "Question / Concern"
                              : "Goals / What You Need Help With"
                          }
                          name="goals"
                          value={formData.goals}
                          onChange={(value) => updateField("goals", value)}
                          placeholder={
                            isQuestionIntent
                              ? "Tell us what you need help with, what question you have, or what concern you want us to review."
                              : "Tell us what you're building, where you're stuck, and what kind of support would help most."
                          }
                          maxLength={contactFieldMaxLengths.goals}
                          error={errors.goals}
                          required
                        />
                      ) : null}
                    </div>
                  </div>

                  {submitError ? (
                    <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </p>
                  ) : null}

                  {isQuestionIntent ? (
                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${primaryGoldButton} disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  ) : (
                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className={`button-secondary interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium ${
                          step === 1
                            ? "pointer-events-none opacity-0"
                            : "border border-neutral-300 text-neutral-800 hover:border-neutral-950 hover:text-neutral-950"
                        }`}
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>

                      {step < contactFormSteps.length ? (
                        <button
                          type="button"
                          onClick={goToNextStep}
                          className={`${primaryGoldButton} gap-2`}
                        >
                          Next
                          <ArrowRight size={16} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`${primaryGoldButton} disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {isSubmitting ? "Sending..." : "Send Details"}
                        </button>
                      )}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContactPage() {
  return <ContactPageContent isQuestionIntent />;
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
        autoComplete={name}
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

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
};

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  error
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-800">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`min-h-12 w-full rounded-2xl border bg-white px-4 text-base text-neutral-950 outline-none transition focus:border-neutral-950 ${
          error ? "border-red-300" : "border-neutral-200"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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
        rows={7}
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
