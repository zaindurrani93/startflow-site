import { HowItWorksSection, WorkflowStrip } from "@/components/startflow-sections";

export default function WorkflowPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)]">
      <WorkflowStrip isInteractive={false} />
      <HowItWorksSection />
    </main>
  );
}
