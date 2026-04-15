import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users } from "lucide-react";
import heroImage from "@assets/hero_image.jpg";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      {/* Image starts below the fixed nav (h-20 = 80px) */}
      <div
        className="absolute top-20 inset-x-0 bottom-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute top-20 inset-x-0 bottom-0 bg-white/75" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Sälj ditt företag till rätt köpare och rätt pris
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Vi hjälper ägare av svenska bolag (40–450 MSEK) att genomföra företagsöverlåtelser med högre pris, fler rätt köpare och en trygg process.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            <div>
              <div className="text-4xl md:text-5xl font-bold font-[DM_Sans] text-foreground mb-1">
                200+
              </div>
              <div className="text-sm text-muted-foreground">
                Genomförda transaktioner
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold font-[DM_Sans] text-foreground mb-1">
                8 mdr
              </div>
              <div className="text-sm text-muted-foreground">
                SEK i transaktionsvärde
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-4xl md:text-5xl font-bold font-[DM_Sans] text-foreground mb-1">
                +95%
              </div>
              <div className="text-sm text-muted-foreground">
                Nöjda företagsägare
              </div>
            </div>
          </div>

          <ul className="space-y-3 mb-10 text-foreground/85">
            <li className="flex items-start gap-3">
              <div className="mt-1 text-primary">✓</div>
              <span>Strukturerad process som maximerar försäljningspris</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-primary">✓</div>
              <span>Tillgång till vårt nätverk av verifierade köpare i Norden</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-primary">✓</div>
              <span>Erfarna rådgivare som säkerställer trygg övergång</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-primary">✓</div>
              <span>Fullständig sekretess genom hela processen</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              asChild
              data-testid="button-exit-diagnos-hero"
            >
              <a href="https://www.exit-diagnos.se/" target="_blank" rel="noopener noreferrer">
                Gör en gratis Exit-Diagnos
                <ArrowRight className="ml-2" size={20} />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              asChild
              data-testid="button-book-meeting-hero"
            >
              <a
                href="https://calendly.com/johan-forsen-skarpa/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Boka ett konfidentiellt möte
              </a>
            </Button>
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Du lämnar mötet med svar – inte med ett avtal att skriva på.</li>
            <li>På 45 minuter får du en klar bild av vad ditt bolag är värt och vad en försäljning faktiskt skulle innebära för dig.</li>
            <li>Ingen utanför rummet får veta att vi pratats vid.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
