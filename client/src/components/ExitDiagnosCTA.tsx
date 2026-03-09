import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, ArrowRight, Clock, Shield, BarChart3 } from "lucide-react";

export default function ExitDiagnosCTA() {
  return (
    <section id="exit-diagnos" className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <ClipboardCheck size={24} />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Exit-diagnos
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Hur säljklar är ditt bolag idag?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Få en kostnadsfri, AI-driven bedömning av ditt företags
            förutsättningar för försäljning. Tar 10–15 minuter.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-semibold text-foreground mb-2">
                AI-driven analys
              </h3>
              <p className="text-sm text-muted-foreground">
                50+ datapunkter analyseras för konkreta rekommendationer
              </p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-semibold text-foreground mb-2">
                10–15 minuter
              </h3>
              <p className="text-sm text-muted-foreground">
                Snabbt och enkelt — besvara frågor i din egen takt
              </p>
            </div>
            <div className="text-center">
              <Shield className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-semibold text-foreground mb-2">
                100% konfidentiellt
              </h3>
              <p className="text-sm text-muted-foreground">
                Dina uppgifter hanteras med full sekretess
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/exit-diagnos-info">
                Starta din Exit-Diagnos
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Kostnadsfritt — ingen förpliktelse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
