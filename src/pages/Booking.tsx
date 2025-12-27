import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, MessageCircle, Send, CheckCircle, MapPin, Clock } from "lucide-react";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Please enter a valid email").optional().or(z.literal("")),
  event_type: z.string().min(1, "Please select an event type"),
  event_date: z.string().optional(),
  guest_count: z.number().min(10, "Minimum 10 guests").max(2000, "Maximum 2000 guests").optional(),
  message: z.string().max(1000, "Message is too long").optional(),
});

const eventTypes = [
  "Wedding",
  "Reception",
  "Engagement",
  "Birthday Party",
  "Anniversary",
  "Corporate Event",
  "Other",
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    event_type: searchParams.get("event") || "",
    event_date: "",
    guest_count: "",
    message: "",
  });

  useEffect(() => {
    const eventParam = searchParams.get("event");
    if (eventParam) {
      setFormData((prev) => ({ ...prev, event_type: eventParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = enquirySchema.parse({
        ...formData,
        guest_count: formData.guest_count ? parseInt(formData.guest_count) : undefined,
        email: formData.email || undefined,
      });

      const { error } = await supabase.from("enquiries").insert({
        name: validatedData.name,
        mobile: validatedData.mobile,
        email: validatedData.email || null,
        event_type: validatedData.event_type,
        event_date: validatedData.event_date || null,
        guest_count: validatedData.guest_count || null,
        message: validatedData.message || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Enquiry Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-[60vh] md:min-h-[80vh] flex items-center justify-center py-12 md:py-20 bg-festive-cream">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h1 className="font-heading text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-8">
              Your enquiry has been submitted successfully. Our team will contact you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="gradient-gold text-accent-foreground gap-2" asChild>
                <a href="tel:+919334825254">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a
                  href="https://wa.me/919334825254"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 bg-festive-cream">
        <div className="absolute inset-0 -z-10">
          <img src="/images/enterance.jpg" alt="Wedding background" className="w-full h-full object-cover opacity-80" />
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
              Book Now
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Book Your <span className="text-gradient-gold">Event</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our team will get back to you within 24 hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-20 bg-festive-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl shadow-sm border border-border">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={errors.mobile ? "border-destructive" : ""}
                    />
                    {errors.mobile && <p className="text-sm text-destructive">{errors.mobile}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event_type">Event Type *</Label>
                    <Select
                      value={formData.event_type}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, event_type: value }))}
                    >
                      <SelectTrigger className={errors.event_type ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.event_type && <p className="text-sm text-destructive">{errors.event_type}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="event_date">Preferred Date</Label>
                    <Input
                      id="event_date"
                      name="event_date"
                      type="date"
                      value={formData.event_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guest_count">Expected Guests</Label>
                    <Input
                      id="guest_count"
                      name="guest_count"
                      type="number"
                      value={formData.guest_count}
                      onChange={handleChange}
                      placeholder="Number of guests"
                      min="10"
                      max="2000"
                      className={errors.guest_count ? "border-destructive" : ""}
                    />
                    {errors.guest_count && <p className="text-sm text-destructive">{errors.guest_count}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your event requirements..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-gold text-accent-foreground gap-2"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                <h3 className="font-heading text-xl font-bold text-gold mb-4">
                  Prefer to Talk?
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-6">
                  Call us directly or send a WhatsApp message for immediate assistance.
                </p>
                <div className="space-y-4">
                  <Button className="w-full gradient-gold text-accent-foreground gap-2" asChild>
                    <a href="tel:+919334825254">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2"
                    asChild
                  >
                    <a
                      href="https://wa.me/919334825254"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-heading text-lg font-semibold mb-4">Visit Us</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">
                        Murlichack, Rukanpura<br />
                        Patna, Bihar 800031
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">
                        7:00 AM - 11:00 PM<br />
                        Open all days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}