import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function Integritetspolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-3xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Tillbaka till skarpa.se
        </a>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
          Integritetspolicy
        </h1>
        <p className="text-muted-foreground mb-12">
          Senast uppdaterad: mars 2026
        </p>

        {/* 1. Personuppgiftsansvarig */}
        <Section title="1. Personuppgiftsansvarig och kontakt">
          <p>
            Personuppgiftsansvarig för behandlingen av dina personuppgifter är:
          </p>
          <ul className="list-none space-y-1 mt-3">
            <li><strong>Peak Automation AB</strong></li>
            <li>E-post: <a href="mailto:policy@peakautomation.se" className="text-primary hover:underline">policy@peakautomation.se</a></li>
          </ul>
          <p className="mt-3">
            Om du har frågor om hur vi behandlar dina personuppgifter eller vill utöva dina rättigheter, kontakta oss via e-post ovan.
          </p>
        </Section>

        {/* 2. Vilka personuppgifter vi behandlar */}
        <Section title="2. Vilka personuppgifter vi behandlar">
          <p>Vi kan komma att behandla följande kategorier av personuppgifter:</p>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><strong>Kontaktuppgifter</strong> — namn, e-postadress, telefonnummer</li>
            <li><strong>Kommunikation</strong> — meddelanden du skickar via kontaktformulär eller e-post</li>
            <li><strong>Teknisk data</strong> — IP-adress, webbläsartyp, enhetsinformation, sidvisningar</li>
            <li><strong>Formulärdata</strong> — uppgifter du lämnar via formulär på webbplatsen, t.ex. vid nedladdning av Säljarguiden eller genomförande av exit-diagnos</li>
            <li><strong>Affärsrelaterad data</strong> — företagsnamn, omsättning och övrig information som är relevant för vår rådgivning</li>
          </ul>
        </Section>

        {/* 3. Varför vi behandlar personuppgifter */}
        <Section title="3. Varför vi behandlar personuppgifter">
          <p>Vi behandlar personuppgifter för följande ändamål:</p>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><strong>Hantera kontaktförfrågningar</strong> — för att besvara dina frågor, boka möten och följa upp intresseanmälningar</li>
            <li><strong>Tillhandahålla tjänster</strong> — för att leverera våra rådgivningstjänster och material, t.ex. Säljarguiden</li>
            <li><strong>Marknadsföring</strong> — för att skicka relevant information om våra tjänster till yrkesverksamma inom B2B-segmentet (med stöd av berättigat intresse)</li>
            <li><strong>Analys och förbättring</strong> — för att förstå hur webbplatsen används och förbättra användarupplevelsen</li>
          </ul>
        </Section>

        {/* 4. Varifrån uppgifterna kommer */}
        <Section title="4. Varifrån uppgifterna kommer">
          <p>Vi samlar in personuppgifter från följande källor:</p>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><strong>Direkt från dig</strong> — när du fyller i formulär, laddar ner material eller kontaktar oss</li>
            <li><strong>Automatiskt</strong> — teknisk data som samlas in via cookies och liknande teknik vid besök på webbplatsen</li>
            <li><strong>Offentliga källor</strong> — vid B2B-prospektering kan vi hämta affärsinformation från publika register</li>
          </ul>
        </Section>

        {/* 5. Mottagare */}
        <Section title="5. Mottagare av personuppgifter">
          <p>Vi kan dela dina personuppgifter med:</p>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><strong>Personuppgiftsbiträden</strong> — tjänsteleverantörer som CRM-plattformar, e-posttjänster, analysverktyg och hostingtjänster som behandlar data på vårt uppdrag</li>
            <li><strong>Myndigheter</strong> — om vi är skyldiga att lämna ut uppgifter enligt lag</li>
          </ul>
          <p className="mt-3">
            Vi säljer aldrig dina personuppgifter till tredje part.
          </p>
        </Section>

        {/* 6. Cookies */}
        <Section title="6. Cookies och liknande tekniker">
          <p>
            Webbplatsen använder cookies och liknande tekniker för att fungera korrekt och för att samla in besöksstatistik.
          </p>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><strong>Nödvändiga cookies</strong> — krävs för grundläggande webbplatsfunktioner och kräver inget samtycke</li>
            <li><strong>Analytiska cookies</strong> — hjälper oss förstå hur besökare använder webbplatsen och kräver ditt samtycke</li>
          </ul>
        </Section>

        {/* 7. Lagringstider */}
        <Section title="7. Lagringstider">
          <p>Vi lagrar personuppgifter så länge det är nödvändigt för ändamålet:</p>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><strong>Kontaktförfrågningar</strong> — upp till 12 månader efter att ärendet avslutats</li>
            <li><strong>Marknadsföring (B2B-prospektering)</strong> — till dess du avregistrerar dig eller som längst 24 månader</li>
            <li><strong>Kunddata</strong> — under avtalstiden plus 36 månader därefter</li>
            <li><strong>Teknisk data</strong> — anonymiseras eller raderas löpande, normalt inom 12 månader</li>
          </ul>
        </Section>

        {/* 8. Överföringar utanför EU/EES */}
        <Section title="8. Överföringar utanför EU/EES">
          <p>
            Vissa av våra tjänsteleverantörer kan vara baserade utanför EU/EES. Vid sådana överföringar
            säkerställer vi en adekvat skyddsnivå genom EU-kommissionens standardavtalsklausuler (SCC)
            och kompletterande skyddsåtgärder.
          </p>
        </Section>

        {/* 9. Säkerhet */}
        <Section title="9. Säkerhet">
          <p>
            Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter,
            inklusive åtkomstkontroll, kryptering och regelbunden utvärdering av våra säkerhetsrutiner.
          </p>
        </Section>

        {/* 10. Dina rättigheter */}
        <Section title="10. Dina rättigheter">
          <p>Enligt GDPR har du rätt att:</p>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><strong>Begära tillgång</strong> — få veta vilka personuppgifter vi behandlar om dig</li>
            <li><strong>Begära rättelse</strong> — korrigera felaktiga eller ofullständiga uppgifter</li>
            <li><strong>Begära radering</strong> — få dina uppgifter raderade under vissa förutsättningar</li>
            <li><strong>Begära begränsning</strong> — begränsa behandlingen av dina uppgifter</li>
            <li><strong>Dataportabilitet</strong> — få ut dina uppgifter i ett maskinläsbart format</li>
            <li><strong>Invända</strong> — invända mot behandling baserad på berättigat intresse, inklusive direktmarknadsföring</li>
            <li><strong>Återkalla samtycke</strong> — om behandlingen baseras på samtycke kan du när som helst återkalla det</li>
          </ul>
          <p className="mt-4">
            Kontakta oss på{" "}
            <a href="mailto:policy@peakautomation.se" className="text-primary hover:underline">
              policy@peakautomation.se
            </a>{" "}
            för att utöva dina rättigheter.
          </p>
          <p className="mt-3">
            Du har även rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY) om du anser
            att vi behandlar dina personuppgifter i strid med dataskyddslagstiftningen.
            Besök{" "}
            <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              www.imy.se
            </a>{" "}
            för mer information.
          </p>
        </Section>

        {/* 11. Ändringar */}
        <Section title="11. Ändringar i denna policy">
          <p>
            Vi kan komma att uppdatera denna integritetspolicy. Den senaste versionen publiceras alltid
            på denna sida med angivet datum för senaste uppdatering.
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-foreground/80 leading-relaxed space-y-2">{children}</div>
    </section>
  );
}
