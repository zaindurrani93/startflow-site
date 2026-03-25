import {
  ContactSection,
  HomeHero,
  HomePageLinks,
  WorkflowStrip,
  WhyStartFlow,
  AboutStartFlow,
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
