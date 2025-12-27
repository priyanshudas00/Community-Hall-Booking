import { motion } from "framer-motion";
import { 
  Trees, 
  Snowflake, 
  Utensils, 
  Car, 
  Zap, 
  Sparkles,
  LucideIcon 
} from "lucide-react";

interface Facility {
  icon: LucideIcon;
  name: string;
  description: string;
}

const facilities: Facility[] = [
  {
    icon: Trees,
    name: "Spacious Lawn",
    description: "Large, beautifully maintained lawn perfect for grand celebrations",
  },
  {
    icon: Snowflake,
    name: "AC Rooms",
    description: "Climate-controlled rooms for comfort in any weather",
  },
  {
    icon: Utensils,
    name: "Catering Services",
    description: "In-house catering with diverse menu options",
  },
  {
    icon: Car,
    name: "Parking Facility",
    description: "Ample parking space for all your guests",
  },
  {
    icon: Zap,
    name: "Power Backup",
    description: "24/7 power backup ensures uninterrupted celebrations",
  },
  {
    icon: Sparkles,
    name: "Decoration Support",
    description: "Professional decoration services available",
  },
];

export function FacilitiesSection() {
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
            What We Offer
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Our Facilities
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Everything you need for a perfect celebration under one roof
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-elegant hover-lift border border-border/50"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <facility.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {facility.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
