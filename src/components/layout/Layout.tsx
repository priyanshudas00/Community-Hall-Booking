import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { FloatingLogo } from "./FloatingLogo";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <FloatingLogo />
      <Header />
      <main className={isHomePage ? "flex-1" : "flex-1 pt-16 md:pt-20"}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
