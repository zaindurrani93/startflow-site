"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Lightbulb, Palette, Rocket, Settings } from "lucide-react";

const workflowSteps = [
  {
    id: "idea",
    label: "Idea",
    icon: Lightbulb,
    description: "Clarify your business idea, audience, and direction."
  },
  {
    id: "brand",
    label: "Brand",
    icon: Palette,
    description: "Shape a professional identity and positioning for your business."
  },
  {
    id: "website",
    label: "Website",
    icon: Settings,
    description: "Build a clean online presence that gives your business credibility."
  },
  {
    id: "launch",
    label: "Launch",
    icon: Rocket,
    description: "Move forward with a clear plan for setup, launch, and next steps."
  }
] as const;

export function WorkflowFlow() {
  const [activeStep, setActiveStep] = useState<(typeof workflowSteps)[number]["id"]>("idea");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const id = visibleEntry.target.getAttribute("data-step-id");
          if (id && workflowSteps.some((step) => step.id === id)) {
            setActiveStep(id as (typeof workflowSteps)[number]["id"]);
          }
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7]
      }
    );

    const elements = workflowSteps
      .map((step) => document.getElementById(`workflow-step-${step.id}`))
      .filter((element): element is HTMLElement => Boolean(element));

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);

  function handleStepClick(stepId: (typeof workflowSteps)[number]["id"]) {
    setActiveStep(stepId);
    document.getElementById(`workflow-step-${stepId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  return (
    <>
      <div className="mt-12 rounded-[2rem] border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.03)] sm:p-7">
        <div className="relative flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="pointer-events-none absolute left-10 right-10 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-neutral-200 to-transparent sm:block" />
          {workflowSteps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepClick(step.id)}
                className={`relative z-10 flex w-full items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm font-medium shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:w-auto sm:min-w-[9rem] ${
                  isActive
                    ? "border-[#a9722f]/15 bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] text-white shadow-[0_12px_30px_rgba(169,114,47,0.18)]"
                    : "border-neutral-200 bg-white text-neutral-900"
                }`}
                aria-pressed={isActive}
              >
                <Icon size={18} />
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-14 space-y-5">
        {workflowSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;

          return (
            <div key={step.id}>
              <section
                id={`workflow-step-${step.id}`}
                data-step-id={step.id}
                className={`scroll-mt-28 rounded-[1.75rem] border bg-white p-7 shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 sm:p-8 ${
                  isActive
                    ? "border-[#d9bd81] shadow-[0_18px_45px_rgba(169,114,47,0.08)]"
                    : "border-neutral-200"
                }`}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f6a2f]">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
                      {step.label}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
                      isActive
                        ? "border border-[#a9722f]/15 bg-[linear-gradient(180deg,#e1b96f_0%,#cf9b53_48%,#a9722f_100%)] text-white shadow-[0_10px_24px_rgba(169,114,47,0.16)]"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                </div>
              </section>

              {index < workflowSteps.length - 1 ? (
                <div className="flex flex-col items-center py-1.5">
                  <div className="h-7 w-px bg-gradient-to-b from-neutral-200 to-neutral-300" />
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-300 shadow-sm">
                    <ArrowDown size={15} />
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
