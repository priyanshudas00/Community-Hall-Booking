import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";

interface Facility {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

export default function FacilitiesManagement() {
  const { toast } = useToast();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    image_url: "",
    is_active: true,
  });

  useEffect(() => {
    fetchFacilities();
  }, []);

  async function fetchFacilities() {
    const { data } = await supabase
      .from("facilities")
      .select("*")
      .order("display_order");

    if (data) setFacilities(data);
    setLoading(false);
  }

  function openDialog(facility?: Facility) {
    if (facility) {
      setEditingFacility(facility);
      setFormData({
        name: facility.name,
        description: facility.description || "",
        icon: facility.icon || "",
        image_url: facility.image_url || "",
        is_active: facility.is_active ?? true,
      });
    } else {
      setEditingFacility(null);
      setFormData({
        name: "",
        description: "",
        icon: "",
        image_url: "",
        is_active: true,
      });
    }
    setShowDialog(true);
  }

  async function saveFacility() {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Facility name is required",
        variant: "destructive",
      });
      return;
    }

    if (editingFacility) {
      const { error } = await supabase
        .from("facilities")
        .update({
          name: formData.name,
          description: formData.description || null,
          icon: formData.icon || null,
          image_url: formData.image_url || null,
          is_active: formData.is_active,
        })
        .eq("id", editingFacility.id);

      if (!error) {
        setFacilities(
          facilities.map((f) =>
            f.id === editingFacility.id
              ? { ...f, ...formData, description: formData.description || null, icon: formData.icon || null, image_url: formData.image_url || null }
              : f
          )
        );
        toast({ title: "Facility Updated" });
      }
    } else {
      const { data, error } = await supabase
        .from("facilities")
        .insert({
          name: formData.name,
          description: formData.description || null,
          icon: formData.icon || null,
          image_url: formData.image_url || null,
          is_active: formData.is_active,
          display_order: facilities.length,
        })
        .select()
        .single();

      if (!error && data) {
        setFacilities([...facilities, data]);
        toast({ title: "Facility Added" });
      }
    }

    setShowDialog(false);
  }

  async function deleteFacility(id: string) {
    if (!confirm("Delete this facility?")) return;

    const { error } = await supabase.from("facilities").delete().eq("id", id);

    if (!error) {
      setFacilities(facilities.filter((f) => f.id !== id));
      toast({ title: "Facility Deleted" });
    }
  }

  async function toggleActive(id: string, isActive: boolean) {
    const { error } = await supabase
      .from("facilities")
      .update({ is_active: isActive })
      .eq("id", id);

    if (!error) {
      setFacilities(facilities.map((f) => (f.id === id ? { ...f, is_active: isActive } : f)));
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="font-heading text-2xl font-bold">Facilities</h2>
            <p className="text-muted-foreground">Manage venue facilities and amenities</p>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Facility
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingFacility ? "Edit Facility" : "Add Facility"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Facility Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., AC Banquet Hall"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe this facility..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon Name</Label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., building, car, utensils"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use Lucide icon names (lowercase)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Active</Label>
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </div>
                <Button onClick={saveFacility} className="w-full">
                  {editingFacility ? "Update Facility" : "Add Facility"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{facilities.length} Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : facilities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No facilities yet. Add your first facility.
              </div>
            ) : (
              <div className="space-y-3">
                {facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{facility.name}</p>
                        {facility.icon && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {facility.icon}
                          </span>
                        )}
                      </div>
                      {facility.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {facility.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={facility.is_active ?? true}
                        onCheckedChange={(checked) => toggleActive(facility.id, checked)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDialog(facility)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteFacility(facility.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}