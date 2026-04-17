import { CheckoutPageShell } from "@/components/checkout-page-shell";
import { startFlowPackages } from "@/lib/startflow-packages";

export default function BuildCheckoutPage() {
  return <CheckoutPageShell pkg={startFlowPackages.growth} />;
}
