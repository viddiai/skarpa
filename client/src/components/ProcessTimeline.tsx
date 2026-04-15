import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

export default function ProcessTimeline() {
  const steps = [
    {
      title: "Konfidentiellt möte",
      description:
        "Vi lär känna dig och ditt företag. Du får en första bedömning av förutsättningarna och möjlig värdering.",
    },
    {
      title: "Förbereda företaget",
      description:
        "Vi gör en grundlig analys och identifierar de åtgärder som maximerar värdet. Du får en tydlig plan.",
    },
    {
      title: "Hitta rätt köpare",
      description:
        "Vi kontaktar verifierade köpare i vårt nätverk och genomför strukturerad säljprocess med konkurrens.",
    },
    {
      title: "Förhandling",
      description:
        "Vi säkerställer att du får bästa möjliga villkor genom professionell förhandling och juridisk genomgång.",
    },
    {
      title: "Due diligence",
      description:
        "Vi hanterar köparens granskning och säkerställer att processen löper smidigt utan överraskningar.",
    },
    {
      title: "Avtal & tillträde",
      description:
        "Vi säkrar en trygg övergång där både du och köparen känner er nöjda med affären.",
    },
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            En trygg process från start till mål
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hela processen tar normalt 6–12 månader från första möte till tillträde.
            <br />
            <br />
            Vi guidar dig genom varje steg.
          </p>
        </div>

        <Stepper defaultValue={1} className="space-y-10">
          <StepperNav className="gap-3 md:gap-4">
            {steps.map((step, index) => (
              <StepperItem
                key={index}
                step={index + 1}
                className="relative flex-1 items-start"
              >
                <StepperTrigger
                  className="flex flex-col items-start justify-center gap-3 grow"
                  data-testid={`process-step-${index}`}
                >
                  <StepperIndicator className="bg-border rounded-full h-1 w-full data-[state=active]:bg-primary data-[state=completed]:bg-primary">
                    <span className="sr-only">Steg {index + 1}</span>
                  </StepperIndicator>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground group-data-[state=active]/step:text-primary group-data-[state=completed]/step:text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <StepperTitle className="text-start font-semibold text-foreground group-data-[state=inactive]/step:text-muted-foreground">
                      {step.title}
                    </StepperTitle>
                  </div>
                </StepperTrigger>
                {index < steps.length - 1 && <StepperSeparator className="hidden" />}
              </StepperItem>
            ))}
          </StepperNav>

          <StepperPanel>
            {steps.map((step, index) => (
              <StepperContent
                key={index}
                value={index + 1}
                className="max-w-2xl mx-auto text-center"
              >
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </StepperContent>
            ))}
          </StepperPanel>
        </Stepper>
      </div>
    </section>
  );
}
