import {
  ContactSection,
  FounderTestimonials,
  HomeHero,
  HomePageLinks,
  WhoThisIsForSection,
  WorkflowStrip,
  WhyStartFlow,
  AboutStartFlow,
} from "@/components/startflow-sections";

export default function HomePage() {
  return (
    <main id="top">
      <HomeHero />
      <WorkflowStrip />
      <WhoThisIsForSection />
      <HomePageLinks />
      <WhyStartFlow />
      <FounderTestimonials />
      <ContactSection />
      <AboutStartFlow />
    </main>
  );
}
