import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import johanImage from "@assets/johan_forsen.jpeg";

export default function AboutTeam() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Om Skarpa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vi är erfarna M&A-rådgivare som hjälper svenska företagsägare att genomföra företagsöverlåtelser.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p>
              Skarpa grundades för att ge mindre och medelstora företag tillgång till samma professionella M&A-rådgivning som stora bolag får.
            </p>
            <p>
              Vi tror att en företagsförsäljning ska genomföras med omsorg om både ekonomiskt resultat och vad som händer med företaget efteråt. Därför tar vi oss tid att förstå din verksamhet och hitta köpare som passar.
            </p>
            <p>
              Vårt fokus är svenska bolag med omsättning 40–450 MSEK inom IT, tillverkning, handel och tjänsteföretag.
            </p>
          </div>
        </div>

        {/* Johan Forsén — single founder profile */}
        <div className="max-w-2xl mx-auto text-center">
          <Avatar className="w-48 h-48 mx-auto mb-6 border-4 border-card shadow-lg">
            <AvatarImage src={johanImage} alt="Johan Forsén" />
            <AvatarFallback>JF</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            Johan Forsén
          </h3>
          <p className="text-primary font-medium mb-4">
            Partner at Skarpa AB | CDI Global
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Erfaren M&A-rådgivare med gedigen bakgrund inom företagsöverlåtelser
            och strategisk rådgivning för medelstora svenska bolag. Medlem i CDI
            Global, ett internationellt nätverk av oberoende M&A-rådgivare.
          </p>
        </div>
      </div>
    </section>
  );
}
