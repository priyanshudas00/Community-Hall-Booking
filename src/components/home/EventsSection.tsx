import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const eventTypes = [
  {
    name: "Wedding",
    description: "Grand wedding ceremonies with all traditional arrangements",
    image: "/src/assets/venue/entrance.webp",
  },
  {
    name: "Reception",
    description: "Elegant reception parties for newlyweds",
    image: "/src/assets/venue/interior.webp",
  },
  {
    name: "Birthday Party",
    description: "Memorable birthday celebrations for all ages",
    image: "/src/assets/venue/exterior.webp",
  },
  {
    name: "Engagement",
    description: "Beautiful engagement ceremonies",
    image: "/src/assets/venue/entrance-outside.webp",
  },
  {
    name: "Anniversary",
    description: "Celebrate milestones with your loved ones",
    image: "/src/assets/venue/entrance.webp",
  },
  {
    name: "Corporate Events",
    description: "Professional corporate gatherings and conferences",
    image: "/src/assets/venue/interior.webp",
  },
];

export function EventsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Celebrations
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Events We Host
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we make every event special
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventTypes.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-lg overflow-hidden shadow-elegant hover-lift"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-xl font-semibold text-white mb-1">
                  {event.name}
                </h3>
                <p className="text-white/70 text-sm">
                  {event.description}
                </p>
              </div>
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
          <Button asChild size="lg" className="gradient-gold text-accent-foreground gap-2">
            <Link to="/events">
              View All Events
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
