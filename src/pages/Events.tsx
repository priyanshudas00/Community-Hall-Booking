import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressiveImage } from "@/components/ui/progressive-image";

const entranceOutside = "/images/enterance from outside.jpg";
const entrance = "/images/enterance.jpg";
const exterior = "/images/exterior look.jpg";
const interior = "/images/interior look.jpg";

interface Event {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

// Fallback images for different event types
const eventImages = {
  'Wedding': entrance,
  'Reception': exterior,
  'Birthday Party': interior,
  'Engagement': entranceOutside,
  'Anniversary': entrance,
  'Corporate Events': exterior,
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      
      if (data) setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-0 pb-0 min-h-[35vh] md:min-h-[45vh] lg:min-h-[60vh] xl:min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/interior look.jpg" alt="Event hall" className="w-full h-full object-cover object-top md:scale-105 lg:scale-110 xl:scale-125" />
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
              Events We Host
            </span>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold hero-text-shadow text-white mb-4">
              Celebrate Every <span className="text-[#F5D28A]">Occasion</span>
            </h1>
            <p className="text-lg text-[#F2F2F2] leading-[1.6] hero-text-shadow">
              From intimate gatherings to grand celebrations, we host events of all types and sizes
            </p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button asChild size="lg" className="gradient-gold text-[#3a0d0d] hero-cta-shadow font-futuristic uppercase tracking-wider">
                  <a href="tel:+919334825254">Call Now</a>
                </Button>
                <Button asChild size="lg" className="bg-red-600 text-white hero-cta-shadow font-futuristic uppercase tracking-wider">
                  <a href="/booking">Book Now</a>
                </Button>
              </div>          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 md:py-20 bg-festive-warm">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-elegant transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ProgressiveImage
                      src={event.image_url || eventImages[event.name as keyof typeof eventImages] || entrance}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-heading text-xl font-bold text-white">
                      {event.name}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {event.description || "Create unforgettable memories with our premium venue and services."}
                    </p>
                    <Button variant="outline" size="sm" className="w-full group" asChild>
                      <Link to={`/booking?event=${encodeURIComponent(event.name)}`}>
                        Enquire Now
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gold mb-4">
              Planning a Special Event?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let us help you create memories that last a lifetime. Contact us today for a personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gradient-gold text-accent-foreground font-futuristic uppercase tracking-wider" asChild>
                <Link to="/booking">Book Your Event</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}