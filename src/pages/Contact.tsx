import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-festive-cream">
        <div className="absolute inset-0 -z-10">
          <img src="https://source.unsplash.com/1600x900/?venue-exterior" alt="Venue exterior" className="w-full h-full object-cover opacity-80" />
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
              Contact Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you. Reach out to us for bookings, enquiries, or just to say hello!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-festive-warm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 shadow-sm border border-border text-center hover:shadow-elegant transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Talk to us directly for immediate assistance
              </p>
              <Button className="gradient-gold text-accent-foreground w-full" asChild>
                <a href="tel:+919334825254">
                  Call Now
                </a>
              </Button>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl p-8 shadow-sm border border-border text-center hover:shadow-elegant transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Chat with us on WhatsApp for quick responses
              </p>
              <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50" asChild>
                <a
                  href="https://wa.me/919334825254?text=Hi! I'd like to know more about The Red Garden."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send Message
                </a>
              </Button>
            </motion.div>

            {/* Book Online */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-8 shadow-sm border border-border text-center hover:shadow-elegant transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 text-gold mb-6">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Book Online</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Submit an enquiry and we'll get back to you
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/booking">
                  Submit Enquiry
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
                Visit <span className="text-primary">Our Venue</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-muted-foreground">
                      The Red Garden<br />
                      Murlichack, Rukanpura<br />
                      Patna, Bihar 800031
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Business Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Sunday<br />
                      7:00 AM - 11:00 PM<br />
                      <span className="text-sm">(Available for site visits)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a href="tel:+919334825254" className="text-primary hover:underline">
                      +91 93348 25254
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg" className="gradient-gold text-accent-foreground gap-2" asChild>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Murlichack+Rukanpura+Patna+Bihar+800031"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-5 w-5" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden shadow-elegant h-[400px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14391.227461853247!2d85.09!3d25.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzM2LjAiTiA4NcKwMDUnMjQuMCJF!5e0!3m2!1sen!2sin!4v1640000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Red Garden Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-festive-cream">
        <div className="pattern-overlay absolute inset-0 opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gold mb-4">
              Ready to Book Your Event?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact us today to schedule a venue visit or discuss your celebration requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gradient-gold text-accent-foreground gap-2" asChild>
                <a href="tel:+919334825254">
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <Link to="/booking">Submit Enquiry</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}