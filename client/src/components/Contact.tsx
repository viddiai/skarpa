import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast({
      title: "Meddelande skickat!",
      description: "Vi hör av oss inom fyra timmar på vardagar.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Boka ett konfidentiellt möte
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vi börjar alltid med ett förutsättningslöst samtal för att förstå din situation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Hur första samtalet går till
            </h3>
            <div className="space-y-6 mb-8">
              <p className="text-foreground/80 leading-relaxed">
                I första samtalet (30–45 minuter) pratar vi om din verksamhet, dina mål och tidshorisont. Du får en första bedömning av förutsättningarna.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Samtalet är helt konfidentiellt och utan kostnad eller förpliktelse. Vi hjälper dig vidare oavsett om vi är rätt partner eller inte.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <div className="font-medium text-foreground">E-post</div>
                  <a
                    href="mailto:kontakt@skarpa.se"
                    className="text-primary hover:underline"
                    data-testid="link-email"
                  >
                    kontakt@skarpa.se
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <div className="font-medium text-foreground">Telefon</div>
                  <a
                    href="tel:+46812345678"
                    className="text-primary hover:underline"
                    data-testid="link-phone"
                  >
                    08-123 456 78
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <div className="font-medium text-foreground">Svarstid</div>
                  <div className="text-muted-foreground">
                    Vi svarar normalt inom fyra timmar på vardagar
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <div className="font-medium text-foreground">Sekretess</div>
                  <div className="text-muted-foreground">
                    100% konfidentiellt – vi tecknar NDA innan vi diskuterar detaljer
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Skicka ett meddelande
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="contact-name">Namn</Label>
                <Input
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Anna Andersson"
                  required
                  data-testid="input-contact-name"
                />
              </div>
              <div>
                <Label htmlFor="contact-email">E-post</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="anna@mittforetag.se"
                  required
                  data-testid="input-contact-email"
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">Telefon</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="070-123 45 67"
                  data-testid="input-contact-phone"
                />
              </div>
              <div>
                <Label htmlFor="contact-message">Meddelande</Label>
                <Textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Berätta kort om ditt företag och vad du funderar på..."
                  rows={4}
                  data-testid="textarea-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                data-testid="button-submit-contact"
              >
                Skicka meddelande
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
