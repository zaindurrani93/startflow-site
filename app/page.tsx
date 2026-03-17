import { ContactSection, HomeHero, HomePageLinks, WorkflowStrip } from "@/components/startflow-sections";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <WorkflowStrip />
      <HomePageLinks />
      <ContactSection />
    </main>
  );
}
