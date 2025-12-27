import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";
import { PushNotifications } from '@/components/admin/PushNotifications';

interface SiteSettings {
  id: string;
  hero_title: string | null;
  hero_subtitle: string | null;
  about_text: string | null;
  phone_number: string | null;
  whatsapp_number: string | null;
  address: string | null;
  business_hours: string | null;
  google_maps_embed: string | null;
}

export default function SiteSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    hero_title: "",
    hero_subtitle: "",
    about_text: "",
    phone_number: "",
    whatsapp_number: "",
    address: "",
    business_hours: "",
    google_maps_embed: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (data) {
      setSettings(data);
      setFormData({
        hero_title: data.hero_title || "",
        hero_subtitle: data.hero_subtitle || "",
        about_text: data.about_text || "",
        phone_number: data.phone_number || "",
        whatsapp_number: data.whatsapp_number || "",
        address: data.address || "",
        business_hours: data.business_hours || "",
        google_maps_embed: data.google_maps_embed || "",
      });
    }
    setLoading(false);
  }

  async function saveSettings() {
    if (!settings) return;

    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({
        hero_title: formData.hero_title || null,
        hero_subtitle: formData.hero_subtitle || null,
        about_text: formData.about_text || null,
        phone_number: formData.phone_number || null,
        whatsapp_number: formData.whatsapp_number || null,
        address: formData.address || null,
        business_hours: formData.business_hours || null,
        google_maps_embed: formData.google_maps_embed || null,
      })
      .eq("id", settings.id);

    setSaving(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Settings Saved",
        description: "Your changes have been saved successfully",
      });
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="font-heading text-2xl font-bold">Site Settings</h2>
            <p className="text-muted-foreground">Manage website content and contact info</p>
          </div>
          <Button onClick={saveSettings} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </motion.div>

        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>Homepage hero content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Hero Title</Label>
              <Input
                value={formData.hero_title}
                onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                placeholder="The Red Garden"
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Subtitle</Label>
              <Input
                value={formData.hero_subtitle}
                onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                placeholder="Perfect Venue for Weddings & Celebrations"
              />
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About Section</CardTitle>
            <CardDescription>About us content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>About Text</Label>
              <Textarea
                value={formData.about_text}
                onChange={(e) => setFormData({ ...formData, about_text: e.target.value })}
                placeholder="Tell visitors about your venue..."
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Business contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  placeholder="+91 93348 25254"
                />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <Input
                  value={formData.whatsapp_number}
                  onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                  placeholder="+91 93348 25254"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Murlichack, Rukanpura, Patna, Bihar 800031"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Business Hours</Label>
              <Input
                value={formData.business_hours}
                onChange={(e) => setFormData({ ...formData, business_hours: e.target.value })}
                placeholder="7:00 AM - 11:00 PM, Open all days"
              />
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card>
          <CardHeader>
            <CardTitle>Google Maps</CardTitle>
            <CardDescription>Embed your location map</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Google Maps Embed URL</Label>
              <Textarea
                value={formData.google_maps_embed}
                onChange={(e) => setFormData({ ...formData, google_maps_embed: e.target.value })}
                placeholder="https://www.google.com/maps/embed?..."
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Go to Google Maps → Share → Embed a map → Copy the src URL
              </p>
            </div>
          </CardContent>

          {/* Browser Notifications */}
          <div className="mt-6">
            <CardHeader>
              <CardTitle>Browser Notifications</CardTitle>
              <CardDescription>Enable admin browser push notifications (Chrome, Firefox)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Click to register this browser for admin notifications (must be signed in as admin).</p>
                <PushNotifications />
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={saveSettings} disabled={saving} size="lg">
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save All Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}