export type StartFlowPackageKey = "starter" | "growth";

export type StartFlowPackage = {
  key: StartFlowPackageKey;
  name: string;
  priceCents: number;
  priceDisplay: string;
  summary: string;
  includes: string[];
};

export const startFlowPackages: Record<StartFlowPackageKey, StartFlowPackage> = {
  starter: {
    key: "starter",
    name: "Starter",
    priceCents: 29900,
    priceDisplay: "$299",
    summary:
      "A clear starting package for founders who want structure, positioning, and a clean online presence.",
    includes: [
      "Business idea clarity & positioning",
      "Target audience definition",
      "Brand direction",
      "Simple landing page",
      "Basic website structure",
      "Launch plan",
      "1:1 guidance"
    ]
  },
  growth: {
    key: "growth",
    name: "Growth",
    priceCents: 49900,
    priceDisplay: "$499",
    summary:
      "A full setup for businesses that want a stronger brand presence with additional launch support.",
    includes: [
      "Everything in Starter",
      "Multi-page website",
      "Social media setup",
      "Content direction",
      "Offer/pricing guidance",
      "Launch strategy",
      "Priority support"
    ]
  }
};
