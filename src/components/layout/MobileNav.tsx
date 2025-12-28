import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, Image, Phone, BookOpen, MessageCircle, Menu, X } from "lucide-react";

export function MobileNav() {
  const location = useLocation();
  const current = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/919334825254?text=${encodeURIComponent("Hello! I'm interested in booking The Red Garden.")}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 lg:hidden">
      <ul className="flex items-center justify-around py-3 px-4">
        {/* WhatsApp - left */}
        <li>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-black text-green-400 ring-1 ring-white/5 shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        </li>

        {/* Events */}
        <li>
          <Link
            to="/events"
            aria-label="Events"
            className={`w-12 h-12 rounded-full flex items-center justify-center ${current === '/events' ? 'bg-red-600 text-white' : 'bg-black text-slate-100 ring-1 ring-white/5'} shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
          >
            <Calendar className="h-6 w-6" />
          </Link>
        </li>

        {/* Center Menu with drop-up */}
        <li className="relative">
          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            aria-expanded={isMenuOpen}
            aria-label="Open menu"
            className={`w-12 h-12 rounded-full flex items-center justify-center ${isMenuOpen ? 'bg-red-600 text-white' : 'bg-black text-slate-100 ring-1 ring-white/5'} shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {isMenuOpen && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
              <Link to="/about" aria-label="About" className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-slate-100 ring-1 ring-white/5 shadow-soft">
                <Image className="h-4 w-4" />
              </Link>
              <Link to="/venue" aria-label="Venue" className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-slate-100 ring-1 ring-white/5 shadow-soft">
                <Home className="h-4 w-4" />
              </Link>
              <Link to="/pricing" aria-label="Pricing" className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-slate-100 ring-1 ring-white/5 shadow-soft">
                <BookOpen className="h-4 w-4" />
              </Link>
            </div>
          )}
        </li>

        {/* Book */}
        <li>
          <Link
            to="/booking"
            aria-label="Book"
            className={`w-12 h-12 rounded-full flex items-center justify-center ${current === '/booking' ? 'bg-red-600 text-white' : 'bg-black text-slate-100 ring-1 ring-white/5'} shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
          >
            <BookOpen className="h-6 w-6" />
          </Link>
        </li>

        {/* Home */}
        <li>
          <Link
            to="/"
            aria-label="Home"
            className={`w-12 h-12 rounded-full flex items-center justify-center ${current === '/' ? 'bg-red-600 text-white' : 'bg-black text-slate-100 ring-1 ring-white/5'} shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
          >
            <Home className="h-6 w-6" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

