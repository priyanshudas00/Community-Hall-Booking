import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Import venue images
const entranceOutside = "/images/enterance from outside.jpg";
const entrance = "/images/enterance.jpg";
const exterior = "/images/exterior look.jpg";
const interior = "/images/interior look.jpg";

const images = [entranceOutside, entrance, exterior, interior];

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload other images after hero image loads
    if (imageLoaded) {
      images.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
      });
    }
  }, [imageLoaded]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel - Using first image */}
      <div className="absolute inset-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-yellow-900 to-red-800 animate-pulse" />
        )}
        <img
          src={entrance}
          alt="The Red Garden Venue"
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
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
      </div>
    </section>
  );
}
