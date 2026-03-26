import {
  ContactSection,
  HomeHero,
  HomePageLinks,
  WhoThisIsForSection,
  WorkflowStrip,
  WhyStartFlow,
  AboutStartFlow,
} from "@/components/startflow-sections";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <WorkflowStrip />
      <WhoThisIsForSection />
      <HomePageLinks />
      <WhyStartFlow />
      <ContactSection />
      <AboutStartFlow />
    </main>
  );
}
