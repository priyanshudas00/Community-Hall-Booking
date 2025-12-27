import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, MessageCircle, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Basic Package",
    description: "Perfect for intimate gatherings",
    features: [
      "Lawn/Hall booking (8 hours)",
      "Basic decoration",
      "Seating for guests",
      "Power backup",
      "Parking space",
      "Basic sound system",
    ],
    highlight: false,
  },
  {
    name: "Premium Package",
    description: "Our most popular choice for weddings",
    features: [
      "Full-day venue access",
      "Premium decoration",
      "AC Hall + Lawn access",
      "In-house catering options",
      "DJ & Sound system",
      "Stage setup",
      "Guest rooms",
      "Valet parking",
    ],
    highlight: true,
  },
  {
    name: "Royal Package",
    description: "The ultimate celebration experience",
    features: [
      "Multi-day venue booking",
      "Luxury decoration themes",
      "Complete venue access",
      "Premium catering with menu customization",
      "Professional DJ & lighting",
      "Grand stage & mandap",
      "VIP guest rooms",
      "Photography area setup",
      "Event coordinator",
    ],
    highlight: false,
  },
];

const addOns = [
  "Fireworks display",
  "Celebrity performers",
  "Drone photography",
  "LED screens",
  "Flower decoration upgrade",
  "Varmala stage",
  "Entry gate decoration",
  "Photo booth",
];

export default function Pricing() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-festive-cream">
        <div className="absolute inset-0 -z-10">
          <img src="https://source.unsplash.com/1600x900/?banquet-hall" alt="Banquet hall" className="w-full h-full object-cover opacity-80" />
        </div>
        <div className="pattern-lotus absolute inset-0 opacity-50" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-sm font-medium mb-4">
              Pricing
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Packages & <span className="text-gradient-gold">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Flexible packages tailored to your celebration needs. Contact us for custom quotes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-festive-warm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  pkg.highlight
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "bg-card border border-border shadow-sm"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block px-4 py-1 rounded-full bg-gold text-accent-foreground text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className={`font-heading text-2xl font-bold mb-2 ${pkg.highlight ? "text-gold" : ""}`}>
                    {pkg.name}
                  </h3>
                  <p className={pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {pkg.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className={`h-5 w-5 shrink-0 mt-0.5 ${pkg.highlight ? "text-gold" : "text-gold"}`} />
                      <span className={`text-sm ${pkg.highlight ? "text-primary-foreground/90" : ""}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${pkg.highlight ? "gradient-gold text-accent-foreground" : ""}`}
                  variant={pkg.highlight ? "default" : "outline"}
                  asChild
                >
                  <Link to="/booking">
                    Get Quote
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Need a <span className="text-primary">Custom Package?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Every celebration is unique. Contact us to discuss your specific requirements 
              and we'll create a personalized package just for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gradient-gold text-accent-foreground gap-2" asChild>
                <a href="tel:+919334825254">
                  <Phone className="h-5 w-5" />
                  Call for Quote
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a
                  href="https://wa.me/919334825254?text=Hi! I'd like to get a custom quote for my event."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-festive-cream">
        <div className="pattern-overlay absolute inset-0 opacity-30" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Available <span className="text-primary">Add-ons</span>
            </h2>
            <p className="text-muted-foreground">
              Enhance your package with these additional services
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium shadow-sm"
              >
                {addon}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}