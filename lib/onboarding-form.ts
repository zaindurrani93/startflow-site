import type { StartFlowPackageKey } from "@/lib/startflow-packages";

export type OnboardingFormData = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  websiteOrSocial: string;
  whatBuilding: string;
  currentStage: string;
  helpNeeded: string;
  mainGoal: string;
  preferredCommunication: string;
  anythingElse: string;
  packageType: StartFlowPackageKey | "";
  sessionId: string;
};

export type OnboardingFormErrors = Partial<Record<keyof OnboardingFormData, string>>;

export const initialOnboardingFormData: OnboardingFormData = {
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  businessType: "",
  websiteOrSocial: "",
  whatBuilding: "",
  currentStage: "",
  helpNeeded: "",
  mainGoal: "",
  preferredCommunication: "",
  anythingElse: "",
  packageType: "",
  sessionId: ""
};

export function normalizeOnboardingFormData(
  data: Partial<OnboardingFormData>
): OnboardingFormData {
  return {
    fullName: data.fullName?.trim() ?? "",
    email: data.email?.trim().toLowerCase() ?? "",
    phone: data.phone?.trim() ?? "",
    businessName: data.businessName?.trim() ?? "",
    businessType: data.businessType?.trim() ?? "",
    websiteOrSocial: data.websiteOrSocial?.trim() ?? "",
    whatBuilding: data.whatBuilding?.trim() ?? "",
    currentStage: data.currentStage?.trim() ?? "",
    helpNeeded: data.helpNeeded?.trim() ?? "",
    mainGoal: data.mainGoal?.trim() ?? "",
    preferredCommunication: data.preferredCommunication?.trim() ?? "",
    anythingElse: data.anythingElse?.trim() ?? "",
    packageType: data.packageType ?? "",
    sessionId: data.sessionId?.trim() ?? ""
  };
}

export function validateOnboardingFormSubmission(
  data: OnboardingFormData
): OnboardingFormErrors {
  const errors: OnboardingFormErrors = {};

  if (!data.fullName) {
    errors.fullName = "Please enter your full name.";
  }

  if (!data.email) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.businessName) {
    errors.businessName = "Please enter your business name.";
  }

  if (!data.businessType) {
    errors.businessType = "Please tell us your business type.";
  }

  if (!data.whatBuilding) {
    errors.whatBuilding = "Please tell us what you are building.";
  }

  if (!data.currentStage) {
    errors.currentStage = "Please tell us what stage you are in.";
  }

  if (!data.helpNeeded) {
    errors.helpNeeded = "Please tell us what you need the most help with right now.";
  }

  if (!data.mainGoal) {
    errors.mainGoal = "Please share your main goal for the next 30-60 days.";
  }

  if (!data.preferredCommunication) {
    errors.preferredCommunication = "Please choose a preferred communication method.";
  }

  return errors;
}
