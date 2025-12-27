import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, Image, Phone, BookOpen } from "lucide-react";

export function MobileNav() {
  const location = useLocation();
  const current = location.pathname;

  const items = [
    { name: "Home", path: "/", icon: Home },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Gallery", path: "/gallery", icon: Image },
    { name: "Book", path: "/booking", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  // fixed positions (percent-based) so each button floats independently
  const positions = [
    "left-[12%] bottom-6",
    "left-[32%] bottom-6",
    "left-[50%] bottom-6 -translate-x-1/2",
    "left-[68%] bottom-6",
    "left-[88%] bottom-6",
  ];

  return (
    <>
      {items.map((it, idx) => {
        const Icon = it.icon;
        const active = current === it.path;
        const pos = positions[idx] ?? "left-[50%] bottom-6";

        return (
          <Link
            key={it.path}
            to={it.path}
            aria-label={it.name}
            className={`fixed ${pos} z-50 w-14 h-14 rounded-full flex items-center justify-center ${active ? "bg-red-600 text-white scale-95" : "bg-transparent text-muted-foreground"} shadow-soft lg:hidden transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500`}
          >
            <Icon className="h-6 w-6" />
          </Link>
        );
      })}
    </>
  );
}

