import SkarpaLogo from "./SkarpaLogo";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = {
    tjänster: [
      { label: "Sälj mitt företag", id: "process", type: "scroll" },
      { label: "Exit-diagnos", id: "https://www.exit-diagnos.se/", type: "external" },
      { label: "Företagsvärdering", id: "market", type: "scroll" },
      { label: "Köparnätverk", id: "cases", type: "scroll" },
    ],
    resurser: [
      { label: "Säljarguiden", id: "koparguide" },
      { label: "Vanliga frågor", id: "faq" },
    ],
    företag: [
      { label: "Om Skarpa", id: "about" },
      { label: "Kontakt", id: "contact" },
    ],
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <SkarpaLogo height={30} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professionell rådgivning vid företagsöverlåtelser för svenska bolag (40–450 MSEK).
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Tjänster</h4>
            <ul className="space-y-2">
              {links.tjänster.map((link, index) => (
                <li key={index}>
                  {link.type === "external" ? (
                    <a
                      href={link.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md -ml-2"
                      data-testid="footer-link-exit-diagnos"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md -ml-2"
                      data-testid={`footer-link-${link.id}`}
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resurser</h4>
            <ul className="space-y-2">
              {links.resurser.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md -ml-2"
                    data-testid={`footer-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Företag</h4>
            <ul className="space-y-2">
              {links.företag.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md -ml-2"
                    data-testid={`footer-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Skarpa AB. Alla rättigheter förbehållna.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-privacy"
              >
                Integritetspolicy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-terms"
              >
                Villkor
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
