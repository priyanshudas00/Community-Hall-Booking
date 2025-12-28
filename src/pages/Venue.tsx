import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import * as LucideIcons from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressiveImage } from "@/components/ui/progressive-image";
import { Button } from "@/components/ui/button"; 

import { entrance, entranceOutside, exterior, interior } from "@/lib/images";

interface Facility {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
}

const venueImages = [
  { src: entranceOutside, alt: "Venue Entrance Outside View" },
  { src: entrance, alt: "Venue Main Entrance" },
  { src: exterior, alt: "Venue Exterior" },
  { src: interior, alt: "Venue Interior" },
];

export default function Venue() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFacilities() {
      const { data } = await supabase
        .from("facilities")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      
      if (data) setFacilities(data);
      setLoading(false);
    }
    fetchFacilities();
  }, []);

  const getIcon = (iconName: string | null) => {
    if (!iconName) return LucideIcons.Building;
    const pascalName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[pascalName];
    return Icon || LucideIcons.Building;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-0 pb-0 min-h-[35vh] md:min-h-[45vh] lg:min-h-[60vh] xl:min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/enterance from outside.jpg" alt="Venue exterior" className="w-full h-full object-cover object-top md:scale-105 lg:scale-110 xl:scale-125" />
        </div>
        <div className="absolute inset-0 z-10 hero-overlay-banner pointer-events-none" />
        <div className="absolute inset-0 z-15 hero-blue-overlay pointer-events-none" />
        <div className="container mx-auto px-4 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-6"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-[#F5D28A] border border-gold/30 text-sm font-medium mb-4">
              Our Venue
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold hero-text-shadow text-white mb-4">
              Venue & <span className="text-[#F5D28A]">Facilities</span>
            </h1>
            <p className="text-lg text-[#F2F2F2] leading-[1.6] hero-text-shadow">
              Discover our world-class amenities designed to make your celebration perfect
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Button asChild size="lg" className="gradient-gold text-[#3a0d0d] hero-cta-shadow font-futuristic uppercase tracking-wider">
                <a href="tel:+919334825254">Call Now</a>
              </Button>
              <Button asChild size="lg" className="bg-red-600 text-white hero-cta-shadow font-futuristic uppercase tracking-wider">
                <a href="/booking">Book Now</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Venue Gallery */}
      <section className="py-12 md:py-20 bg-festive-warm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Venue</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the beauty of The Red Garden
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {venueImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl shadow-elegant group"
              >
                <ProgressiveImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Facilities</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a perfect celebration, all under one roof
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => {
                const Icon = getIcon(facility.icon);
                return (
                  <motion.div
                    key={facility.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-elegant transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold mb-2">
                          {facility.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {facility.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Capacity Info */}
      <section className="py-12 md:py-20 bg-festive-cream">
        <div className="pattern-overlay absolute inset-0 opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-primary-foreground text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gold">
              Venue Capacity
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our venue can comfortably accommodate various event sizes
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-2">500+</div>
                <div className="text-primary-foreground/80">Lawn Capacity</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-2">200+</div>
                <div className="text-primary-foreground/80">Hall Seating</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-2">100+</div>
                <div className="text-primary-foreground/80">Parking Spots</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}