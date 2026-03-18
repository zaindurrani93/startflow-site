export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  currentStage: string;
  goals: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export const initialContactFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  businessType: "",
  currentStage: "",
  goals: ""
};

export const contactFormSteps = [
  { id: 1, label: "About You", title: "Let’s start with the basics." },
  { id: 2, label: "Business Info", title: "Tell us a little about the business." },
  { id: 3, label: "Goals", title: "What do you want help with right now?" }
] as const;

export const businessTypes = [
  "Service business",
  "Ecommerce brand",
  "Local business",
  "Personal brand",
  "Agency or studio",
  "Coaching or consulting",
  "Other"
] as const;

export const currentStages = [
  "Just getting started",
  "Idea stage",
  "Planning my offer",
  "Need a website and brand setup",
  "Already launched but need structure",
  "Ready to grow"
] as const;

export function normalizeContactFormData(data: Partial<ContactFormData>): ContactFormData {
  return {
    name: data.name?.trim() ?? "",
    email: data.email?.trim().toLowerCase() ?? "",
    phone: data.phone?.trim() ?? "",
    businessName: data.businessName?.trim() ?? "",
    businessType: data.businessType?.trim() ?? "",
    currentStage: data.currentStage?.trim() ?? "",
    goals: data.goals?.trim() ?? ""
  };
}

export function validateContactFormStep(
  data: ContactFormData,
  step: number
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (step === 1 || step === 3) {
    if (!data.name) {
      errors.name = "Please enter your name.";
    }

    if (!data.email) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (step === 3 && !data.goals) {
    errors.goals = "Please tell us what you need help with.";
  }

  return errors;
}

export function validateContactFormSubmission(data: ContactFormData): ContactFormErrors {
  return {
    ...validateContactFormStep(data, 1),
    ...validateContactFormStep(data, 3)
  };
}
