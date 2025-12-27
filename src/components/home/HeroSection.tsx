import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import venue images
import entranceOutside from "@/assets/venue/entrance-outside.webp";
import entrance from "@/assets/venue/entrance.webp";
import exterior from "@/assets/venue/exterior.webp";
import interior from "@/assets/venue/interior.webp";

const images = [entranceOutside, entrance, exterior, interior];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel - Using first image */}
      <div className="absolute inset-0">
        <img
          src={entrance}
          alt="The Red Garden Venue"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="pattern-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-sm font-medium">
              Premier Wedding Venue in Patna
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            The{" "}
            <span className="text-gradient-gold">Red Garden</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Perfect Venue for Weddings & Celebrations in Patna
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="gradient-gold text-accent-foreground font-semibold gap-2 min-w-[180px]"
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
                href={`https://wa.me/919334825254?text=${encodeURIComponent("Hello! I'm interested in booking The Red Garden.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Enquiry
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
                Book a Visit
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gold"
            >
              <ChevronRight className="h-6 w-6 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
