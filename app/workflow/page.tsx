import { ContactSection, WorkflowSection, WorkflowStrip } from "@/components/startflow-sections";

export default function WorkflowPage() {
  return (
    <main>
      <WorkflowStrip />
      <WorkflowSection />
      <ContactSection />
    </main>
  );
}
