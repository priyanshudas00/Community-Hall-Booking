import { Link } from "react-router-dom";

export function FloatingLogo() {
  return (
    <div className="fixed top-3 left-4 z-50">
      <Link to="/" className="block group">
        <div className="transition-all duration-300 group-hover:scale-105">
          <img
            src="/logo.png"
            alt="The Red Garden"
            className="h-16 md:h-20 lg:h-24 w-auto drop-shadow-lg"
          />
          <div className="text-xs text-orange-100/90 mt-2 font-light tracking-widest uppercase text-center">
            Premier Wedding Venue
          </div>
        </div>
      </Link>
    </div>
  );
}