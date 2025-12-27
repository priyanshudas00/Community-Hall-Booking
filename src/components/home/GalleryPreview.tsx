import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  { src: "/src/assets/venue/entrance.webp", alt: "Venue Entrance" },
  { src: "/src/assets/venue/interior.webp", alt: "Interior View" },
  { src: "/src/assets/venue/exterior.webp", alt: "Exterior View" },
  { src: "/src/assets/venue/entrance-outside.webp", alt: "Outside View" },
  { src: "/src/assets/venue/entrance.webp", alt: "Venue Entrance 2" },
  { src: "/src/assets/venue/interior.webp", alt: "Interior View 2" },
];

export function GalleryPreview() {
  return (
    <section className="py-20 bg-secondary/30">
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-lg overflow-hidden shadow-elegant ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${
                  index === 0 ? "h-full min-h-[300px]" : "h-48"
                }`}
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
