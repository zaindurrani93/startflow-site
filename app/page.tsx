import {
  AboutStartFlow,
  ContactSection,
  FounderTestimonials,
  HomeHero,
  HomePageLinks,
  HomeVisualFeature,
  WhyStructureMattersSection,
  WhoThisIsForSection,
  WhyStartFlow
} from "@/components/startflow-sections";

export default function HomePage() {
  return (
    <main id="top">
      <HomeHero />
      <WhyStructureMattersSection />
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
