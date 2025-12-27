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

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%_-_2rem)] max-w-md bg-card/80 backdrop-blur rounded-xl shadow-lg border border-border p-2 lg:hidden">
      <ul className="flex items-center justify-between">
        {items.map((it) => {
          const Icon = it.icon;
          const active = current === it.path;
          return (
            <li key={it.path} className="flex-1">
              <Link
                to={it.path}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-md text-sm ${active ? 'text-primary' : 'text-muted-foreground'}`}
                aria-current={active ? 'page' : undefined}
                aria-label={it.name}
              >
                <Icon className="h-6 w-6" />
                <span className="mt-1 text-xs">{it.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
