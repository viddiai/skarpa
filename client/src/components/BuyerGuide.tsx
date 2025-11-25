import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BuyerGuide() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buyer guide download requested for:", { name, email });
    toast({
      title: "Köparguiden är på väg!",
      description: "Vi skickar PDF:en till din e-post inom några minuter.",
    });
    setEmail("");
    setName("");
  };

  return (
    <section id="koparguide" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <BookOpen size={24} />
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Köparguiden
              </h2>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Få insyn i hur köpare tänker och vad de letar efter. En 18-sidig guide baserad på hundratals genomförda transaktioner.
            </p>

            <h3 className="font-semibold text-foreground mb-4">
              Du lär dig bland annat:
            </h3>
            <ul className="space-y-3 text-foreground/80 mb-8">
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">✓</div>
                <span>Vilka risker köpare identifierar först</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">✓</div>
                <span>Vanligaste "deal-breakers" i due diligence</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">✓</div>
                <span>Hur du ökar företagets attraktivitet</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">✓</div>
                <span>Vad som påverkar värderingen mest</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">✓</div>
                <span>Skillnaden mellan strategiska och finansiella köpare</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-card-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Ladda ner Köparguiden (PDF)
            </h3>
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <Label htmlFor="guide-name">Namn</Label>
                <Input
                  id="guide-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anna Andersson"
                  required
                  data-testid="input-guide-name"
                />
              </div>
              <div>
                <Label htmlFor="guide-email">E-post</Label>
                <Input
                  id="guide-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anna@mittforetag.se"
                  required
                  data-testid="input-guide-email"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                data-testid="button-download-guide"
              >
                <Download className="mr-2" size={18} />
                Skicka guiden till min e-post
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Vi skickar inte massutskick – bara relevant information kopplad till din företagsförsäljning.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
