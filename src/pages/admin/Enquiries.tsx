import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Phone, Mail, Calendar, Users, MessageSquare, Eye, Check, Trash2 } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  event_type: string;
  event_date: string | null;
  guest_count: number | null;
  message: string | null;
  status: string | null;
  is_read: boolean | null;
  created_at: string | null;
}

export default function Enquiries() {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setEnquiries(data);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch enquiries",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  async function markAsRead(id: string) {
    const { error } = await supabase
      .from("enquiries")
      .update({ is_read: true })
      .eq("id", id);

    if (!error) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, is_read: true } : e))
      );
    }
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
      toast({
        title: "Status Updated",
        description: `Enquiry marked as ${status}`,
      });
    }
  }

  async function deleteEnquiry(id: string) {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    const { error } = await supabase.from("enquiries").delete().eq("id", id);

    if (!error) {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      setSelectedEnquiry(null);
      toast({
        title: "Deleted",
        description: "Enquiry has been deleted",
      });
    }
  }

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.mobile.includes(searchQuery) ||
      enquiry.event_type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "new" && !enquiry.is_read) ||
      enquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    if (!enquiry.is_read) {
      markAsRead(enquiry.id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-heading text-2xl font-bold">Enquiries</h2>
          <p className="text-muted-foreground">Manage customer enquiries and bookings</p>
        </motion.div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or event type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">Unread</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enquiries List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {filteredEnquiries.length} Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No enquiries found
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    onClick={() => openEnquiry(enquiry)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      !enquiry.is_read
                        ? "bg-gold/5 border-gold/30"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {!enquiry.is_read && (
                          <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold">{enquiry.name}</p>
                            <Badge variant="outline">{enquiry.event_type}</Badge>
                            {enquiry.status && enquiry.status !== "new" && (
                              <Badge
                                variant={
                                  enquiry.status === "confirmed"
                                    ? "default"
                                    : enquiry.status === "cancelled"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {enquiry.status}
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {enquiry.mobile}
                            </span>
                            {enquiry.event_date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(enquiry.event_date).toLocaleDateString()}
                              </span>
                            )}
                            {enquiry.guest_count && (
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {enquiry.guest_count} guests
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground text-right">
                        {enquiry.created_at &&
                          new Date(enquiry.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={!!selectedEnquiry} onOpenChange={() => setSelectedEnquiry(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Enquiry Details</DialogTitle>
            </DialogHeader>
            {selectedEnquiry && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedEnquiry.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Event Type</p>
                    <p className="font-medium">{selectedEnquiry.event_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile</p>
                    <a
                      href={`tel:${selectedEnquiry.mobile}`}
                      className="font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      <Phone className="h-4 w-4" />
                      {selectedEnquiry.mobile}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedEnquiry.email || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Event Date</p>
                    <p className="font-medium">
                      {selectedEnquiry.event_date
                        ? new Date(selectedEnquiry.event_date).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Guests</p>
                    <p className="font-medium">{selectedEnquiry.guest_count || "-"}</p>
                  </div>
                </div>

                {selectedEnquiry.message && (
                  <div>
                    <p className="text-sm text-muted-foreground">Message</p>
                    <p className="font-medium bg-muted p-3 rounded-lg mt-1">
                      {selectedEnquiry.message}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {["pending", "contacted", "confirmed", "cancelled"].map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={selectedEnquiry.status === status ? "default" : "outline"}
                        onClick={() => {
                          updateStatus(selectedEnquiry.id, status);
                          setSelectedEnquiry({ ...selectedEnquiry, status });
                        }}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1" asChild>
                    <a href={`tel:${selectedEnquiry.mobile}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a
                      href={`https://wa.me/91${selectedEnquiry.mobile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteEnquiry(selectedEnquiry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}