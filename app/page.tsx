import {
  AboutStartFlow,
  ContactSection,
  FounderTestimonials,
  HomeHero,
  HomePageLinks,
  HomeVisualFeature,
  WhoThisIsForSection,
  WorkflowStrip,
  WhyStartFlow
} from "@/components/startflow-sections";

export default function HomePage() {
  return (
    <main id="top">
      <HomeHero />
      <WorkflowStrip />
      <WhoThisIsForSection />
      <HomePageLinks />
      <WhyStartFlow />
      <HomeVisualFeature />
      <FounderTestimonials />
      <ContactSection />
      <AboutStartFlow />
    </main>
  );
}
