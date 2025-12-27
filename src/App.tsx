import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Venue from "./pages/Venue";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Pricing from "./pages/Pricing";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Enquiries from "./pages/admin/Enquiries";
import GalleryManagement from "./pages/admin/GalleryManagement";
import EventsManagement from "./pages/admin/EventsManagement";
import FacilitiesManagement from "./pages/admin/FacilitiesManagement";
import SiteSettings from "./pages/admin/SiteSettings";
import BookingsManagement from "./pages/admin/BookingsManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/enquiries" element={<Enquiries />} />
            <Route path="/admin/gallery" element={<GalleryManagement />} />
            <Route path="/admin/events" element={<EventsManagement />} />
            <Route path="/admin/facilities" element={<FacilitiesManagement />} />
            <Route path="/admin/bookings" element={<BookingsManagement />} />
            <Route path="/admin/settings" element={<SiteSettings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;