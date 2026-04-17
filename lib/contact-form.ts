export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  currentStage: string;
  goals: string;
  companyWebsite: string;
  formStartedAt: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export const initialContactFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  businessType: "",
  currentStage: "",
  goals: "",
  companyWebsite: "",
  formStartedAt: ""
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

export const contactFieldMaxLengths = {
  name: 100,
  email: 254,
  phone: 30,
  businessName: 120,
  goals: 1200
} as const;

export function normalizeContactFormData(data: Partial<ContactFormData>): ContactFormData {
  return {
    name: data.name?.trim() ?? "",
    email: data.email?.trim().toLowerCase() ?? "",
    phone: data.phone?.trim() ?? "",
    businessName: data.businessName?.trim() ?? "",
    businessType: data.businessType?.trim() ?? "",
    currentStage: data.currentStage?.trim() ?? "",
    goals: data.goals?.trim() ?? "",
    companyWebsite: data.companyWebsite?.trim() ?? "",
    formStartedAt: data.formStartedAt?.trim() ?? ""
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

  if (data.name.length > contactFieldMaxLengths.name) {
    errors.name = "Please keep your name under 100 characters.";
  }

  if (data.email.length > contactFieldMaxLengths.email) {
    errors.email = "Please enter a shorter email address.";
  }

  if (data.phone.length > contactFieldMaxLengths.phone) {
    errors.phone = "Please enter a shorter phone number.";
  }

  if (data.businessName.length > contactFieldMaxLengths.businessName) {
    errors.businessName = "Please keep the business name under 120 characters.";
  }

  if (data.goals.length > contactFieldMaxLengths.goals) {
    errors.goals = "Please keep this under 1200 characters.";
  }

  return errors;
}

export function validateContactFormSubmission(data: ContactFormData): ContactFormErrors {
  return {
    ...validateContactFormStep(data, 1),
    ...validateContactFormStep(data, 3)
  };
}
