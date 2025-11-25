import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "Behåller jag kontrollen över företaget under processen?",
      answer: "Ja, du behåller full kontroll. Vi är dina rådgivare och fattar inga beslut åt dig. Du bestämmer vilka köpare vi kontaktar, när vi går vidare i processen och vilken affär du slutligen accepterar.",
    },
    {
      question: "Hur säkerställer ni sekretess?",
      answer: "Vi arbetar med strikta sekretessavtal genom hela processen. Köpare får aldrig veta vilket företag det handlar om förrän du godkänt att de ska få ta del av information. All kommunikation sker genom anonymiserade beskrivningar initialt.",
    },
    {
      question: "Vad händer med mina anställda?",
      answer: "Det beror på vilken typ av köpare du väljer. I de flesta fall vi hanterar behåller personalen sina jobb – ofta är det till och med en förutsättning från din sida. Vi hjälper dig att hitta köpare som delar din syn på verksamheten.",
    },
    {
      question: "Hur stor är sannolikheten att affären blir av?",
      answer: "Cirka 75% av de företag vi tar oss an blir sålda. Resterande 25% väljer ofta att inte gå vidare av andra skäl – inte för att köpare saknas. Vi gör en noggrann bedömning innan vi tar oss an ett uppdrag.",
    },
    {
      question: "Vad kostar det?",
      answer: "Vi arbetar på uppdragsbasis med en framgångsbaserad modell. Det innebär att vårt arvode betalas när affären är genomförd. Kontakta oss för att diskutera ditt specifika fall.",
    },
    {
      question: "Hur lång tid tar en försäljning?",
      answer: "En typisk process tar 6–12 månader från det att vi startar till tillträde. Förberedelsefasen kan ta ytterligare 3–6 månader om företaget behöver förbättras innan försäljning.",
    },
    {
      question: "Kan jag fortsätta arbeta i företaget efter försäljning?",
      answer: "Ja, det är mycket vanligt. Många köpare föredrar att ursprungliga ägaren stannar kvar i en övergångsperiod, ibland flera år. Det är helt upp till dig och köparen att komma överens.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Vanliga frågor
          </h2>
          <p className="text-lg text-muted-foreground">
            Svar på det ni brukar undra över
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-card-border rounded-lg px-6"
              data-testid={`faq-${index}`}
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
