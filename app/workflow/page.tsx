import { HowItWorksSection, WorkflowStrip } from "@/components/startflow-sections";

export default function WorkflowPage() {
  return (
    <main>
      <WorkflowStrip isInteractive={false} />
      <HowItWorksSection />
    </main>
  );
}
