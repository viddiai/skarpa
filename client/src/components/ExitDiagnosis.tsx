import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ExitDiagnosis() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    revenue: "",
    profitMargin: "",
    yearsInBusiness: "",
    email: "",
    name: "",
    phone: "",
  });
  const { toast } = useToast();

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log("Exit diagnosis submitted:", formData);
      toast({
        title: "Tack för din Exit-Diagnos!",
        description: "Vi skickar en sammanfattning till din e-post inom 24 timmar.",
      });
      // Reset form
      setFormData({
        companyName: "",
        industry: "",
        revenue: "",
        profitMargin: "",
        yearsInBusiness: "",
        email: "",
        name: "",
        phone: "",
      });
      setStep(0);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <section id="exit-diagnos" className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <ClipboardCheck size={24} />
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Hur säljklar är ditt bolag idag?
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Få en kostnadsfri bedömning av ditt företags förutsättningar för försäljning. Tar 10–15 minuter.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-8 md:p-12">
          <Progress value={progress} className="mb-8" />
          
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-6">
              Steg {step + 1} av {totalSteps}
            </p>

            {step === 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Om ditt företag
                </h3>
                <div>
                  <Label htmlFor="companyName">Företagsnamn</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="AB Svenska Företag"
                    data-testid="input-company-name"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Bransch</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    placeholder="T.ex. IT-konsult, tillverkning, handel"
                    data-testid="input-industry"
                  />
                </div>
                <div>
                  <Label htmlFor="revenue">Omsättning senaste året (MSEK)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={formData.revenue}
                    onChange={(e) =>
                      setFormData({ ...formData, revenue: e.target.value })
                    }
                    placeholder="50"
                    data-testid="input-revenue"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Du behöver inte ha exakta siffror – din bästa uppskattning räcker
                  </p>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Ekonomi & verksamhet
                </h3>
                <div>
                  <Label htmlFor="profitMargin">Rörelsemarginal (%)</Label>
                  <Input
                    id="profitMargin"
                    type="number"
                    value={formData.profitMargin}
                    onChange={(e) =>
                      setFormData({ ...formData, profitMargin: e.target.value })
                    }
                    placeholder="10"
                    data-testid="input-profit-margin"
                  />
                </div>
                <div>
                  <Label htmlFor="yearsInBusiness">Antal år i drift</Label>
                  <Input
                    id="yearsInBusiness"
                    type="number"
                    value={formData.yearsInBusiness}
                    onChange={(e) =>
                      setFormData({ ...formData, yearsInBusiness: e.target.value })
                    }
                    placeholder="15"
                    data-testid="input-years"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Dina kontaktuppgifter
                </h3>
                <div>
                  <Label htmlFor="name">Namn</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Anna Andersson"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-post</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="anna@mittforetag.se"
                    data-testid="input-email"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Vi skickar din sammanfattning hit inom 24 timmar
                  </p>
                </div>
                <div>
                  <Label htmlFor="phone">Telefon (frivilligt)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="070-123 45 67"
                    data-testid="input-phone"
                  />
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Vi skickar inte massutskick – bara relevant information kopplad till din företagsförsäljning.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={handleBack}
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2" size={16} />
                Tillbaka
              </Button>
            )}
            <Button
              className="flex-1"
              onClick={handleNext}
              data-testid={step === totalSteps - 1 ? "button-submit-diagnosis" : "button-next"}
            >
              {step === totalSteps - 1 ? "Skicka diagnos" : "Nästa"}
              {step < totalSteps - 1 && <ArrowRight className="ml-2" size={16} />}
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
            Exit-diagnosen hjälper dig att besvara:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Vilket värde kan jag förvänta mig för mitt företag?",
              "Vilka förbättringar bör jag göra innan försäljning?",
              "Hur säljklar är min organisation?",
              "Vilken typ av köpare passar mitt företag bäst?",
              "Hur lång tid tar en försäljningsprocess?",
              "Vad kan jag göra för att maximera försäljningspriset?",
            ].map((question, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-sm"
                data-testid={`question-${index}`}
              >
                <div className="text-primary mt-0.5">✓</div>
                <span className="text-muted-foreground">{question}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
