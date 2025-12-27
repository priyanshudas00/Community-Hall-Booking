import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CheckCircle, Heart, Star, Users } from "lucide-react";
import { ProgressiveImage } from "@/components/ui/progressive-image";

import exterior from "@/assets/venue/exterior.webp";
import interior from "@/assets/venue/interior.webp";

const values = [
  {
    icon: Heart,
    title: "Passion for Excellence",
    description: "We pour our heart into every event, ensuring perfection in every detail.",
  },
  {
    icon: Users,
    title: "Family-First Approach",
    description: "We treat every client like family, understanding your unique needs and dreams.",
  },
  {
    icon: Star,
    title: "Quality Service",
    description: "Premium facilities and dedicated staff to make your celebration unforgettable.",
  },
];

const highlights = [
  "Spacious lawn accommodating 500+ guests",
  "Air-conditioned banquet halls",
  "Modern kitchen & in-house catering",
  "Ample parking space for 100+ vehicles",
  "24/7 power backup",
  "Professional event coordination",
  "Customizable decoration options",
  "Prime location in Patna",
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-festive-cream">
        <div className="pattern-lotus absolute inset-0 opacity-50" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Welcome to <span className="text-gradient-gold">The Red Garden</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Patna's premier destination for weddings, receptions, and all your special celebrations. 
              We bring your dreams to life with our world-class facilities and dedicated service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-festive-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Red Garden was born from a simple vision — to create a venue where families 
                  can celebrate their most precious moments in an environment that combines elegance, 
                  comfort, and Bihari hospitality.
                </p>
                <p>
                  Located in the heart of Patna, our venue has become a trusted name for weddings, 
                  receptions, and celebrations of all kinds. We understand that every event is unique, 
                  and we take pride in offering personalized services that make your special day truly memorable.
                </p>
                <p>
                  Our spacious lawns, modern amenities, and dedicated team work together to ensure 
                  that every celebration at The Red Garden is nothing short of perfect.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <ProgressiveImage
                src={exterior}
                alt="The Red Garden Venue"
                className="rounded-2xl shadow-elegant w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-heading font-bold text-gold">10+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What sets us apart and makes every celebration at The Red Garden special
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-sm border border-border text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-festive-cream">
        <div className="pattern-overlay absolute inset-0 opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
                Why Choose <span className="text-primary">Us?</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-gold shrink-0" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <ProgressiveImage
                src={interior}
                alt="The Red Garden Interior"
                className="rounded-2xl shadow-elegant w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}