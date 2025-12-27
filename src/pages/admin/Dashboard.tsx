import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Image, Calendar, Building, ArrowRight, Clock } from "lucide-react";

interface Stats {
  totalEnquiries: number;
  newEnquiries: number;
  totalEvents: number;
  totalFacilities: number;
  totalImages: number;
}

interface RecentEnquiry {
  id: string;
  name: string;
  event_type: string;
  mobile: string;
  created_at: string;
  is_read: boolean;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalEvents: 0,
    totalFacilities: 0,
    totalImages: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<RecentEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [enquiriesRes, newEnquiriesRes, eventsRes, facilitiesRes, imagesRes, recentRes] = await Promise.all([
        supabase.from("enquiries").select("id", { count: "exact", head: true }),
        supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("events").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("facilities").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("gallery_images").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("enquiries").select("id, name, event_type, mobile, created_at, is_read").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        totalEnquiries: enquiriesRes.count || 0,
        newEnquiries: newEnquiriesRes.count || 0,
        totalEvents: eventsRes.count || 0,
        totalFacilities: facilitiesRes.count || 0,
        totalImages: imagesRes.count || 0,
      });

      if (recentRes.data) {
        setRecentEnquiries(recentRes.data);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  const statCards = [
    {
      title: "Total Enquiries",
      value: stats.totalEnquiries,
      icon: MessageSquare,
      color: "text-primary",
      bgColor: "bg-primary/10",
      link: "/admin/enquiries",
    },
    {
      title: "New Enquiries",
      value: stats.newEnquiries,
      icon: Clock,
      color: "text-gold",
      bgColor: "bg-gold/10",
      link: "/admin/enquiries",
    },
    {
      title: "Active Events",
      value: stats.totalEvents,
      icon: Calendar,
      color: "text-saffron",
      bgColor: "bg-saffron/10",
      link: "/admin/events",
    },
    {
      title: "Gallery Images",
      value: stats.totalImages,
      icon: Image,
      color: "text-peacock",
      bgColor: "bg-peacock/10",
      link: "/admin/gallery",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-heading text-2xl font-bold">Welcome back!</h2>
          <p className="text-muted-foreground">Here's an overview of The Red Garden</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={stat.link}>
                <Card className="hover:shadow-elegant transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">
                          {loading ? "-" : stat.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Enquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Enquiries</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/enquiries">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : recentEnquiries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No enquiries yet
                </div>
              ) : (
                <div className="space-y-3">
                  {recentEnquiries.map((enquiry) => (
                    <Link
                      key={enquiry.id}
                      to="/admin/enquiries"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {!enquiry.is_read && (
                          <span className="w-2 h-2 rounded-full bg-gold" />
                        )}
                        <div>
                          <p className="font-medium">{enquiry.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {enquiry.event_type} • {enquiry.mobile}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={enquiry.is_read ? "secondary" : "default"}>
                          {enquiry.is_read ? "Read" : "New"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(enquiry.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/admin/gallery">
                    <Image className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/admin/events">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Events
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/admin/settings">
                    <Building className="h-4 w-4 mr-2" />
                    Site Settings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}