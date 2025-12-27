import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Venue", path: "/venue" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-red-700/85 via-yellow-400/28 to-white/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center gap-4">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                isActive(link.path)
                  ? "text-yellow-300 bg-red-500/30 shadow-lg"
                  : "text-orange-100 hover:text-yellow-300 hover:bg-red-500/20"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-yellow-400 text-[#3a0d0d] hover:bg-yellow-300/95 border border-yellow-300/30 shadow-sm font-futuristic uppercase tracking-wider" asChild>
              <a href="tel:+919334825254" className="gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">Call Now</span>
              </a>
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-lg font-futuristic uppercase tracking-wider" asChild>
              <Link to="/booking">
                Book Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-orange-100 hover:text-yellow-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gradient-to-b from-red-700/85 via-yellow-400/28 to-white/12 backdrop-blur-md border border-white/10 rounded-lg shadow-lg animate-fade-in min-w-[200px]">
          <nav className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-all duration-300",
                  isActive(link.path)
                    ? "text-yellow-300 bg-red-500/30 shadow-lg"
                    : "text-orange-100 hover:text-yellow-300 hover:bg-red-500/20"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-2 pt-4 border-t border-red-500/30 mt-2">
              <Button variant="outline" size="sm" className="flex-1 bg-yellow-500/20 border-yellow-400/50 text-yellow-100 hover:bg-yellow-500/30 font-futuristic uppercase tracking-wider" asChild>
                <a href="tel:+919334825254" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-lg font-futuristic uppercase tracking-wider" asChild>
                <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
