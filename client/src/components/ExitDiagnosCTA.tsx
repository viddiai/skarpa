import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const QUIZ_URL = "https://www.exit-diagnos.se/";

export default function ExitDiagnosCTA() {
  return (
    <section id="exit-diagnos" className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Exit-diagnos
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Få en professionell bedömning av ditt företags försäljningsbarhet
          och upptäck förbättringsområden innan du går till marknaden.
        </p>
        <Button size="lg" className="text-lg px-8 py-6" asChild>
          <a href={QUIZ_URL} target="_blank" rel="noopener noreferrer">
            Starta diagnosen <ArrowRight className="ml-2" size={20} />
          </a>
        </Button>
      </div>
    </section>
  );
}
