import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FacilitiesSection } from "@/components/home/FacilitiesSection";
import { EventsSection } from "@/components/home/EventsSection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { CTASection } from "@/components/home/CTASection";
import { MapSection } from "@/components/home/MapSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <FacilitiesSection />
      <EventsSection />
      <GalleryPreview />
      <CTASection />
      <MapSection />
    </Layout>
  );
};

export default Index;
