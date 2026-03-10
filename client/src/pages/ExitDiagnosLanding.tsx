import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Navigation from "@/components/Navigation";

const QUIZ_URL = "https://www.exit-diagnos.se/";

export default function ExitDiagnosLanding() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Exit-diagnos
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Få en professionell bedömning av ditt företags försäljningsbarhet
            och upptäck förbättringsområden innan du går till marknaden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href={QUIZ_URL} target="_blank" rel="noopener noreferrer">
                Starta diagnosen <ArrowRight className="ml-2" size={20} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 md:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Vad får du ut av diagnosen?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-driven analys",
                description:
                  "Vår avancerade AI analyserar ditt företag utifrån 50+ datapunkter och ger dig konkreta rekommendationer.",
              },
              {
                title: "Konkreta förbättringsförslag",
                description:
                  "Få tydliga, prioriterade åtgärder som höjer ditt företags värde och attraktivitet för köpare.",
              },
              {
                title: "Professionell bedömning",
                description:
                  "Baserat på vår erfarenhet av 100+ lyckade företagsförsäljningar i Sverige.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-lg border shadow-sm"
              >
                <Check className="text-green-600 mb-4" size={24} />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Så fungerar det
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Besvara frågor om ditt företag",
                description:
                  "10-15 minuter med frågor om finansiell prestation, marknadsposition, team och tillväxtpotential.",
              },
              {
                step: "2",
                title: "AI analyserar dina svar",
                description:
                  "Vår avancerade AI jämför ditt företag med lyckade exitcase och identifierar styrkor och svagheter.",
              },
              {
                step: "3",
                title: "Få din personliga rapport",
                description:
                  "Inom 24 timmar får du en detaljerad rapport med betyg, förbättringsförslag och nästa steg.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Redo att börja?</h2>
          <p className="text-xl mb-8 opacity-90">
            Diagnosen är kostnadsfri och tar bara 10-15 minuter.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6"
            asChild
          >
            <a href={QUIZ_URL} target="_blank" rel="noopener noreferrer">
              Starta exit-diagnosen <ArrowRight className="ml-2" size={20} />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
