import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle } from "lucide-react";

export default function MarketTiming() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="market" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <TrendingUp size={24} />
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Är det rätt läge att sälja nu?
            </h2>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <p className="text-lg text-foreground/80 leading-relaxed">
            Marknaden för företagsförsäljningar i Sverige är fortsatt stark. Ränteläget har stabiliserats och köparintresset från både strategiska och finansiella köpare är högt.
          </p>

          <p className="text-lg text-foreground/80 leading-relaxed">
            Multiplarna för välskötta företag med stabil lönsamhet ligger kvar på goda nivåer, särskilt i sektorer med återkommande intäkter och digitaliserad affärsmodell.
          </p>

          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-primary mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Varför timing spelar roll
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  En företagsförsäljning tar 6–12 månader att genomföra. Förberedelser inför försäljning kan ta ytterligare 6–12 månader. Att komma igång tidigt ger dig flexibilitet att välja rätt tidpunkt.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">
              Just nu gynnas företag med:
            </h3>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">✓</div>
                <span>Stabil eller växande lönsamhet de senaste 2–3 åren</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">✓</div>
                <span>Tydlig marknadsposition och differentiering</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">✓</div>
                <span>Återkommande intäkter eller långa kundkontrakt</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">✓</div>
                <span>Organiserad verksamhet som inte är helt ägarberoende</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("exit-diagnos")}
            data-testid="button-market-assessment"
          >
            Få en bedömning av läget för ditt bolag
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Gratis, förutsättningslöst och konfidentiellt
          </p>
        </div>
      </div>
    </section>
  );
}
