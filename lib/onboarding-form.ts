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
  companyWebsite: string;
  formStartedAt: string;
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
  sessionId: "",
  companyWebsite: "",
  formStartedAt: ""
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
    sessionId: data.sessionId?.trim() ?? "",
    companyWebsite: data.companyWebsite?.trim() ?? "",
    formStartedAt: data.formStartedAt?.trim() ?? ""
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

  if (data.fullName.length > 100) {
    errors.fullName = "Please keep your name under 100 characters.";
  }

  if (data.email.length > 254) {
    errors.email = "Please enter a shorter email address.";
  }

  if (data.phone.length > 30) {
    errors.phone = "Please enter a shorter phone number.";
  }

  if (data.businessName.length > 120) {
    errors.businessName = "Please keep the business name under 120 characters.";
  }

  if (data.websiteOrSocial.length > 300) {
    errors.websiteOrSocial = "Please keep this under 300 characters.";
  }

  if (data.whatBuilding.length > 1200) {
    errors.whatBuilding = "Please keep this under 1200 characters.";
  }

  if (data.currentStage.length > 600) {
    errors.currentStage = "Please keep this under 600 characters.";
  }

  if (data.helpNeeded.length > 1200) {
    errors.helpNeeded = "Please keep this under 1200 characters.";
  }

  if (data.mainGoal.length > 1200) {
    errors.mainGoal = "Please keep this under 1200 characters.";
  }

  if (data.preferredCommunication.length > 80) {
    errors.preferredCommunication = "Please keep this under 80 characters.";
  }

  if (data.anythingElse.length > 1200) {
    errors.anythingElse = "Please keep this under 1200 characters.";
  }

  if (data.sessionId.length > 255) {
    errors.sessionId = "Invalid session reference.";
  }

  return errors;
}
