export default function ProcessTimeline() {
  const steps = [
    {
      number: 1,
      title: "Konfidentiellt möte",
      description: "Vi lär känna dig och ditt företag. Du får en första bedömning av förutsättningarna och möjlig värdering.",
    },
    {
      number: 2,
      title: "Förbereda företaget",
      description: "Vi gör en grundlig analys och identifierar de åtgärder som maximerar värdet. Du får en tydlig plan.",
    },
    {
      number: 3,
      title: "Hitta rätt köpare",
      description: "Vi kontaktar verifierade köpare i vårt nätverk och genomför strukturerad säljprocess med konkurrens.",
    },
    {
      number: 4,
      title: "Förhandling",
      description: "Vi säkerställer att du får bästa möjliga villkor genom professionell förhandling och juridisk genomgång.",
    },
    {
      number: 5,
      title: "Due diligence",
      description: "Vi hanterar köparens granskning och säkerställer att processen löper smidigt utan överraskningar.",
    },
    {
      number: 6,
      title: "Avtal & tillträde",
      description: "Vi säkrar en trygg övergång där både du och köparen känner er nöjda med affären.",
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
            Hela processen tar normalt 6–12 månader från första möte till tillträde. Vi guidar dig genom varje steg.
          </p>
        </div>

        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
              data-testid={`process-step-${index}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-6 w-full h-0.5 bg-border -z-10" 
                     style={{ width: 'calc(100% + 2rem)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
