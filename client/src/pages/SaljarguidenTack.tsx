import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, CalendarCheck, ArrowLeft } from "lucide-react";
import BookCover from "@/components/BookCover";

export default function SaljarguidenTack() {
  // Auto-trigger download on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const a = document.createElement("a");
      a.href = "/saljarguiden.pdf";
      a.download = "Saljarguiden-Skarpa.pdf";
      a.click();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Book cover — smaller on thank you page */}
        <div className="flex justify-center">
          <BookCover className="w-40 md:w-48" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Tack! Säljarguiden är din.
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-lg mx-auto">
            Nedladdningen startar automatiskt. Om den inte börjar,
            klicka på knappen nedan.
          </p>
        </div>

        {/* Primary: Download */}
        <div>
          <a href="/saljarguiden.pdf" download="Saljarguiden-Skarpa.pdf">
            <Button size="lg" className="px-8 text-base">
              <Download className="mr-2" size={18} />
              Ladda ner Säljarguiden (PDF)
            </Button>
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 max-w-sm mx-auto">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">Nästa steg?</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* CTA: Book meeting */}
        <div className="bg-card border border-card-border rounded-2xl p-8 space-y-4 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-foreground">
            Boka ett konfidentiellt möte
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            Vill du diskutera din situation med en M&A-rådgivare? Vi erbjuder
            ett kostnadsfritt och helt konfidentiellt inledande samtal.
          </p>
          <a href="/#kontakt">
            <Button
              variant="outline"
              size="lg"
              className="px-8 text-base mt-2"
            >
              <CalendarCheck className="mr-2" size={18} />
              Boka ett samtal
            </Button>
          </a>
        </div>

        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Tillbaka till skarpa.se
        </a>
      </div>
    </div>
  );
}
