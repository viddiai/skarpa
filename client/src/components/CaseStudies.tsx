import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import itConsultingImage from "@assets/Bild1_Grossistverksamhet inom elmaterial.png";
import manufacturingImage from "@assets/Bild2_Tillverkande industri.png";
import retailImage from "@assets/Bild3_Teknisk fastighetsservice.webp";

export default function CaseStudies() {
  const cases = [
    {
      image: itConsultingImage,
      industry: "Grossistverksamhet inom elmaterial",
      size: "200 MSEK i omsättning",
      challenge:
        "Ägarna upplevde att bolaget hade mer potential att växa, men behövde extern hjälp för att ta nästa steg. Samtidigt var det viktigt att hitta en köpare som passade in i företagets kultur och värderingar.",
      solution:
        "Vi genomförde en strukturerad förberedelsefas och identifierade tio strategiska köpare. Efter dialog och utvärdering valde vi att gå vidare med en av dessa köpare.",
      result:
        "Försäljningspriset blev 20 % högre än den första indikationen. Under det första hela verksamhetsåret efter försäljningen ökade intäkterna med 25 %. Säljarna återinvesterade dessutom 20 % av köpeskillingen i köparen, som var ett börsnoterat bolag.",
      quote:
        "Skarpa gav oss trygghet genom hela processen. De förstod både siffrorna och det mjuka värdet i vår verksamhet.",
      author: "Nils B, VD & grundare",
    },
    {
      image: manufacturingImage,
      industry: "Tillverkande industri",
      size: "40 MSEK i omsättning",
      challenge:
        "Ägaren ville säkerställa att både personal och kunder skulle tas om hand på ett långsiktigt och ansvarsfullt sätt efter försäljningen. Bolaget hade funnits i familjens ägo i över 80 år, vilket gjorde valet av köpare särskilt viktigt.",
      solution:
        "Vi förankrade ägarens önskemål tidigt i processen och fokuserade på att identifiera köpare med samma långsiktiga syn på verksamheten. Kontakt togs även med internationella aktörer som kunde erbjuda goda expansionsmöjligheter för bolaget och dess medarbetare.",
      result:
        "Samtliga 20 anställda behöll sina anställningar och affären genomfördes till ett pris som var 50 % högre än säljarens ursprungliga förväntningar.",
      quote:
        "Det var viktigt för oss att hitta rätt köpare, inte bara högsta budet. Skarpa förstod det.",
      author: "Hans W, ägare och VD",
    },
    {
      image: retailImage,
      industry: "Teknisk fastighetsservice",
      size: "240 MSEK i omsättning",
      challenge:
        "Företaget hade en stark marknadsposition men var starkt ägarberoende, vilket riskerade att pressa värderingen. Dessutom fanns fem delägare med olika mål och behov, vilket gjorde det nödvändigt att enas om en gemensam plan inför framtiden.",
      solution:
        "Vi hjälpte bolaget att under sex månader förbereda organisationen inför en försäljning, med fokus på att minska ägarberoendet och skapa en mer självständig verksamhet.",
      result:
        "Värderingen ökade med 15 % jämfört med den initiala bedömningen.",
      quote:
        "Förberedelsefasen var avgörande. Vi fick betydligt bättre betalt tack vare Skarpas strukturerade metod.",
      author: "Håkan P, delägare och VD",
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
