import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressiveImage } from "@/components/ui/progressive-image";

// Import venue images
const entrance = "/images/enterance.jpg";
const interior = "/images/interior look.jpg";
const exterior = "/images/exterior look.jpg";
const entranceOutside = "/images/enterance from outside.jpg";

const galleryImages = [
  { src: entrance, alt: "Venue Entrance" },
  { src: interior, alt: "Interior View" },
  { src: exterior, alt: "Exterior View" },
  { src: entranceOutside, alt: "Outside View" },
  { src: entrance, alt: "Venue Entrance 2" },
  { src: interior, alt: "Interior View 2" },
];

export function GalleryPreview() {
  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Our Gallery
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Glimpse of Our Venue
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Take a visual tour of The Red Garden
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-lg overflow-hidden shadow-elegant ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <ProgressiveImage
                src={image.src}
                alt={image.alt}
                className={`hover:scale-105 transition-transform duration-500 ${
                  index === 0 ? "h-full min-h-[220px] md:min-h-[300px]" : "h-40 md:h-48"
                }`}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link to="/gallery">
              View Full Gallery
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
