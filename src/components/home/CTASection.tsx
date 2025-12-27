import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-12 md:py-20 gradient-primary relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="pattern-overlay absolute inset-0 opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Create Unforgettable Memories?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let us help you plan your perfect celebration. Contact us today for a free consultation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gradient-gold text-accent-foreground font-semibold gap-2 min-w-[180px] font-futuristic uppercase tracking-wider"
              asChild
            >
              <a href="tel:+919334825254">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2 min-w-[180px]"
              asChild
            >
              <a
                href={`https://wa.me/919334825254?text=${encodeURIComponent("Hello! I want to book The Red Garden.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2 min-w-[180px]"
              asChild
            >
              <Link to="/booking">
                <Calendar className="h-5 w-5" />
                Book Now
              </Link>
            </Button>
          </div>

          {/* Location hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex items-center justify-center gap-2 text-white/70"
          >
            <MapPin className="h-5 w-5" />
            <span>Murlichack, Rukanpura, Patna, Bihar 800031</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
