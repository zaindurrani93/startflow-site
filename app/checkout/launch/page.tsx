import { CheckoutPageShell } from "@/components/checkout-page-shell";
import { startFlowPackages } from "@/lib/startflow-packages";

export default function LaunchCheckoutPage() {
  return <CheckoutPageShell pkg={startFlowPackages.starter} />;
}
