import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export default function WhoWeServe() {
  const rightFit = [
    "Du äger ett ägarlett företag med stabil verksamhet",
    "Du bryr dig om både pris och vad som händer med företaget efter försäljning",
    "Du är redo att lägga lite tid på förberedelser för att maximera värdet",
    "Du värderar professionell process och vill undvika misstag",
    "Du har en tidshorisont på 6–18 månader för försäljning",
  ];

  const notRightFit = [
    "Du vill ha snabbaste möjliga exit utan hänsyn till personal eller kunder",
    "Du förväntar dig att processen ska kosta mindre än vad professionell rådgivning är värd",
    "Du vill inte dela några siffror eller information om företaget",
    "Du har orealistiska förväntningar på värdering",
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Vem vi passar för
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-8">
            Vi tror på transparens. Här är vem vi kan hjälpa – och vem vi troligen inte är rätt för.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-green-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="text-primary" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Skarpa är rätt partner om...
              </h3>
            </div>
            <ul className="space-y-4">
              {rightFit.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                  data-testid={`right-fit-${index}`}
                >
                  <CheckCircle2
                    className="text-primary flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 bg-red-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <XCircle className="text-muted-foreground" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Vi är troligen inte rätt om...
              </h3>
            </div>
            <ul className="space-y-4">
              {notRightFit.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                  data-testid={`not-right-fit-${index}`}
                >
                  <XCircle
                    className="text-muted-foreground flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Osäker på om vi passar? Ta ett förutsättningslöst samtal så hjälper vi dig vidare – oavsett om det är med oss eller någon annan.
          </p>
        </div>
      </div>
    </section>
  );
}
