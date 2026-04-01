import {
  ContactSection,
  FounderTestimonials,
  HomeHero,
  HomePageLinks,
  HomeVisualFeature,
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
      <HomeVisualFeature />
      <FounderTestimonials />
      <ContactSection />
      <AboutStartFlow />
    </main>
  );
}
