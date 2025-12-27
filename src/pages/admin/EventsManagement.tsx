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

interface Event {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

export default function EventsManagement() {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    is_active: true,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("display_order");

    if (data) setEvents(data);
    setLoading(false);
  }

  function openDialog(event?: Event) {
    if (event) {
      setEditingEvent(event);
      setFormData({
        name: event.name,
        description: event.description || "",
        image_url: event.image_url || "",
        is_active: event.is_active ?? true,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        name: "",
        description: "",
        image_url: "",
        is_active: true,
      });
    }
    setShowDialog(true);
  }

  async function saveEvent() {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Event name is required",
        variant: "destructive",
      });
      return;
    }

    if (editingEvent) {
      const { error } = await supabase
        .from("events")
        .update({
          name: formData.name,
          description: formData.description || null,
          image_url: formData.image_url || null,
          is_active: formData.is_active,
        })
        .eq("id", editingEvent.id);

      if (!error) {
        setEvents(
          events.map((e) =>
            e.id === editingEvent.id
              ? { ...e, ...formData, description: formData.description || null, image_url: formData.image_url || null }
              : e
          )
        );
        toast({ title: "Event Updated" });
      }
    } else {
      const { data, error } = await supabase
        .from("events")
        .insert({
          name: formData.name,
          description: formData.description || null,
          image_url: formData.image_url || null,
          is_active: formData.is_active,
          display_order: events.length,
        })
        .select()
        .single();

      if (!error && data) {
        setEvents([...events, data]);
        toast({ title: "Event Added" });
      }
    }

    setShowDialog(false);
  }

  async function deleteEvent(id: string) {
    if (!confirm("Delete this event?")) return;

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (!error) {
      setEvents(events.filter((e) => e.id !== id));
      toast({ title: "Event Deleted" });
    }
  }

  async function toggleActive(id: string, isActive: boolean) {
    const { error } = await supabase
      .from("events")
      .update({ is_active: isActive })
      .eq("id", id);

    if (!error) {
      setEvents(events.map((e) => (e.id === id ? { ...e, is_active: isActive } : e)));
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
            <h2 className="font-heading text-2xl font-bold">Events</h2>
            <p className="text-muted-foreground">Manage event types you offer</p>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Event Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Wedding Ceremony"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe this event type..."
                    rows={3}
                  />
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
                <Button onClick={saveEvent} className="w-full">
                  {editingEvent ? "Update Event" : "Add Event"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{events.length} Events</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : events.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No events yet. Add your first event.
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold">{event.name}</p>
                      {event.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={event.is_active ?? true}
                        onCheckedChange={(checked) => toggleActive(event.id, checked)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDialog(event)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEvent(event.id)}
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