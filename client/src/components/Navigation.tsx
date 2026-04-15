import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import SkarpaLogo from "./SkarpaLogo";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    } else {
      // On sub-routes, navigate to home page with hash
      window.location.href = `/#${id}`;
    }
  };

  const menuItems = [
    { label: "Sälja företag", id: "process", type: "scroll" },
    { label: "Redo att sälja?", id: "https://www.exit-diagnos.se/", type: "external" },
    { label: "Vad är det värt?", id: "market", type: "scroll" },
    { label: "Våra köpare", id: "cases", type: "scroll" },
    { label: "Lär dig mer", id: "koparguide", type: "scroll" },
    { label: "Om oss", id: "about", type: "scroll" },
  ];

  // Hero now has white overlay — use dark text at all times
  const linkClass = "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hover-elevate px-3 py-2 rounded-md";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent nav-hero"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection("hero")}
            className="hover-elevate px-2 py-1 rounded-md"
            data-testid="link-home"
          >
            <SkarpaLogo height={28} />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) =>
              item.type === "external" ? (
                <a
                  key={item.id}
                  href={item.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  data-testid="link-exit-diagnos"
                >
                  {item.label}
                </a>
              ) : item.type === "route" ? (
                <Link
                  key={item.id}
                  href={`/${item.id}`}
                  className={linkClass}
                  data-testid={`link-${item.id}`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={linkClass}
                  data-testid={`link-${item.id}`}
                >
                  {item.label}
                </button>
              )
            )}
            <Button asChild data-testid="button-contact-nav">
              <a
                href="https://calendly.com/johan-forsen-skarpa/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Boka möte
              </a>
            </Button>
          </div>

          <button
            className="lg:hidden transition-colors text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-menu-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-b">
          <div className="px-6 py-4 space-y-3">
            {menuItems.map((item) =>
              item.type === "external" ? (
                <a
                  key={item.id}
                  href={item.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left text-base font-medium text-foreground/80 hover:text-foreground hover-elevate px-3 py-2 rounded-md"
                  data-testid="link-mobile-exit-diagnos"
                >
                  {item.label}
                </a>
              ) : item.type === "route" ? (
                <Link
                  key={item.id}
                  href={`/${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left text-base font-medium text-foreground/80 hover:text-foreground hover-elevate px-3 py-2 rounded-md"
                  data-testid={`link-mobile-${item.id}`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-base font-medium text-foreground/80 hover:text-foreground hover-elevate px-3 py-2 rounded-md"
                  data-testid={`link-mobile-${item.id}`}
                >
                  {item.label}
                </button>
              )
            )}
            <Button className="w-full" asChild data-testid="button-contact-nav-mobile">
              <a
                href="https://calendly.com/johan-forsen-skarpa/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                Boka möte
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
