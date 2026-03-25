import {
  AboutStartFlow,
  ContactSection,
  HomeHero,
  HomePageLinks,
  WhyStartFlow,
  WorkflowStrip
} from "@/components/startflow-sections";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <WorkflowStrip />
      <HomePageLinks />
      <WhyStartFlow />
      <ContactSection />
      <AboutStartFlow />
    </main>
  );
}
