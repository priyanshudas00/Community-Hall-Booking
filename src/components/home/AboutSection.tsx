import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressiveImage } from "@/components/ui/progressive-image";

// Import venue images
import entrance from "@/assets/venue/entrance.webp";
import interior from "@/assets/venue/interior.webp";
import exterior from "@/assets/venue/exterior.webp";
import entranceOutside from "@/assets/venue/entrance-outside.webp";

export function AboutSection() {
  return (
    <section className="py-20 bg-background pattern-overlay">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="text-gold font-medium text-sm uppercase tracking-wider">
                Welcome to
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
                The Red Garden
              </h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to The Red Garden, Patna's premier destination for weddings, 
              receptions, and celebrations. Nestled in the heart of Rukanpura/Murlichack, 
              our venue combines elegance with convenience, offering spacious lawns, 
              modern amenities, and exceptional service to make your special day truly memorable.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              With years of experience in hosting grand celebrations, we understand the 
              importance of every detail. From intimate gatherings to lavish weddings, 
              The Red Garden provides the perfect backdrop for your most cherished moments.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="text-center">
                <span className="block font-heading text-3xl font-bold text-gold">500+</span>
                <span className="text-sm text-muted-foreground">Events Hosted</span>
              </div>
              <div className="text-center">
                <span className="block font-heading text-3xl font-bold text-gold">10+</span>
                <span className="text-sm text-muted-foreground">Years Experience</span>
              </div>
              <div className="text-center">
                <span className="block font-heading text-3xl font-bold text-gold">1000+</span>
                <span className="text-sm text-muted-foreground">Happy Families</span>
              </div>
            </div>

            <Button asChild className="gradient-primary gap-2">
              <Link to="/about">
                Learn More About Us
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden shadow-elegant">
                <ProgressiveImage
                  src={entrance}
                  alt="The Red Garden Entrance"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-elegant">
                <ProgressiveImage
                  src={interior}
                  alt="The Red Garden Interior"
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-lg overflow-hidden shadow-elegant">
                <ProgressiveImage
                  src={exterior}
                  alt="The Red Garden Exterior"
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-elegant border-4 border-gold/20">
                <ProgressiveImage
                  src={entranceOutside}
                  alt="The Red Garden Outside View"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
