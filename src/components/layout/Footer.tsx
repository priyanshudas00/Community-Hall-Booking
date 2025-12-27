import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-gold">
              The Red Garden
            </h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Patna's premier destination for weddings, receptions, and celebrations. 
              Creating memorable moments since years.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Our Venue", path: "/venue" },
                { name: "Events", path: "/events" },
                { name: "Gallery", path: "/gallery" },
                { name: "Pricing", path: "/pricing" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-gold">Our Events</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Wedding Ceremonies</li>
              <li>Reception Parties</li>
              <li>Birthday Celebrations</li>
              <li>Engagement Functions</li>
              <li>Corporate Events</li>
              <li>Anniversary Parties</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-gold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  Murlichack, Rukanpura<br />
                  Patna, Bihar 800031
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a href="tel:+919334825254" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  +91 93348 25254
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock className="h-5 w-5 text-gold shrink-0" />
                <span className="text-primary-foreground/80">
                  7:00 AM - 11:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} The Red Garden. All rights reserved.</p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>Designed and developed by Priyanshu Raj</p>
              <div className="flex gap-4">
                <a href="https://github.com/priyanshudas00" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/priyanshudas00" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  LinkedIn
                </a>
              </div>
              <Link to="/admin" className="hover:text-gold transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
