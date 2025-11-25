import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import itConsultingImage from "@assets/generated_images/it_consulting_office_workspace.png";
import manufacturingImage from "@assets/generated_images/manufacturing_facility_interior.png";
import retailImage from "@assets/generated_images/retail_store_interior.png";

export default function CaseStudies() {
  const cases = [
    {
      image: itConsultingImage,
      industry: "IT-konsult",
      size: "60 MSEK omsättning",
      challenge: "Ägaren ville sälja men var osäker på rätt värdering och vilka köpare som skulle passa företagets kultur.",
      solution: "Vi genomförde grundlig värderingsanalys och identifierade fem strategiska köpare som matchade företagskulturen.",
      result: "Försäljningspris ~40% över första indikationen",
      quote: "Skarpa gav oss trygghet genom hela processen. De förstod både siffrorna och det mjuka värdet i vår verksamhet.",
      author: "Anders Lindström, VD & Grundare",
    },
    {
      image: manufacturingImage,
      industry: "Tillverkande industri",
      size: "120 MSEK omsättning",
      challenge: "Ägarna ville säkerställa att personalen och kunderna skulle tas om hand efter försäljningen.",
      solution: "Vi förankrade ägarnas önskemål tidigt och valde köpare som delade samma långsiktiga vision.",
      result: "Alla 45 anställda behöll sina jobb, affären blev av till önskat pris",
      quote: "Det var viktigt för oss att hitta rätt köpare, inte bara högsta budet. Skarpa förstod det.",
      author: "Maria Bergqvist, Majoritetsägare",
    },
    {
      image: retailImage,
      industry: "Specialisthandel",
      size: "35 MSEK omsättning",
      challenge: "Företaget hade stark position men var tungt ägarberoende, vilket kunde påverka värderingen negativt.",
      solution: "Vi hjälpte till att förbereda organisationen i 6 månader innan försäljning för att minska ägarberoendet.",
      result: "Värderingen ökade med 25% jämfört med ursprunglig bedömning",
      quote: "Förberedelsefasen var avgörande. Vi fick betydligt bättre betalt tack vare Skarpas strukturerade metod.",
      author: "Johan Svensson, Ägare",
    },
  ];

  return (
    <section id="cases" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Hur vi har hjälpt företagsägare
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verkliga exempel från genomförda transaktioner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseStudy, index) => (
            <Card
              key={index}
              className="overflow-hidden hover-elevate transition-all duration-300 p-0"
              data-testid={`case-${index}`}
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${caseStudy.image})` }}
              />
              <div className="p-8">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-primary mb-1">
                    {caseStudy.industry}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {caseStudy.size}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      Utgångsläge
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      Vad vi gjorde
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-primary mb-1">
                      Resultat
                    </h4>
                    <p className="text-sm text-foreground font-medium">
                      {caseStudy.result}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Quote className="text-primary mb-3" size={20} />
                  <p className="text-sm italic text-foreground/80 mb-3 leading-relaxed">
                    "{caseStudy.quote}"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    — {caseStudy.author}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
