import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { FloatingLogo } from "./FloatingLogo";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Ensure route changes scroll to the top so navbar navigation opens at the page top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <FloatingLogo />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      {/* Mobile bottom navigation (visible only on small screens) */}
      <MobileNav />
    </div>
  );
}
