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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading text-lg md:text-xl font-bold text-white">
            The Red Garden
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive(link.path)
                  ? "text-gold bg-gold/20"
                  : "text-white/80 hover:text-gold hover:bg-white/10"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <a href="tel:+919334825254" className="gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">Call Now</span>
              </a>
            </Button>
            <Button size="sm" className="bg-gold text-white hover:bg-gold/80 gap-2" asChild>
              <Link to="/booking">
                Book Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg animate-fade-in min-w-[200px]">
          <nav className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  isActive(link.path)
                    ? "text-gold bg-gold/20"
                    : "text-white/80 hover:text-gold hover:bg-white/10"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-2 pt-4 border-t border-white/20 mt-2">
              <Button variant="outline" size="sm" className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <a href="tel:+919334825254" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button size="sm" className="flex-1 bg-gold text-white hover:bg-gold/80" asChild>
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
