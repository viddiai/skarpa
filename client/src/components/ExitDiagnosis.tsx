import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertExitDiagnosisSchema, type InsertExitDiagnosis } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ExitDiagnosis() {
  const [step, setStep] = useState(0);
  const { toast } = useToast();

  const form = useForm<InsertExitDiagnosis>({
    resolver: zodResolver(insertExitDiagnosisSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      revenue: "",
      profitMargin: "",
      yearsInBusiness: "",
      email: "",
      name: "",
      phone: "",
    },
  });

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const submitMutation = useMutation({
    mutationFn: async (data: InsertExitDiagnosis) => {
      const res = await apiRequest("POST", "/api/exit-diagnosis", data);
      return await res.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "Tack för din Exit-Diagnos!",
        description: data.message || "Vi skickar en sammanfattning till din e-post inom 24 timmar.",
      });
      form.reset();
      setStep(0);
    },
    onError: (error: any) => {
      toast({
        title: "Ett fel uppstod",
        description: error.message || "Kunde inte skicka diagnos. Försök igen senare.",
        variant: "destructive",
      });
    },
  });

  // Get fields for current step
  const getStepFields = (stepIndex: number): (keyof InsertExitDiagnosis)[] => {
    switch (stepIndex) {
      case 0:
        return ["companyName", "industry", "revenue"];
      case 1:
        return ["profitMargin", "yearsInBusiness"];
      case 2:
        return ["name", "email", "phone"];
      default:
        return [];
    }
  };

  // Check if current step has errors
  const isStepValid = async (stepIndex: number): Promise<boolean> => {
    const fields = getStepFields(stepIndex);
    const result = await form.trigger(fields);
    return result;
  };

  const handleNext = async () => {
    if (step < totalSteps - 1) {
      const isValid = await isStepValid(step);
      if (isValid) {
        setStep(step + 1);
      }
    } else {
      // Validate final step before submission
      const isValid = await isStepValid(step);
      if (isValid) {
        form.handleSubmit((data) => {
          submitMutation.mutate(data);
        })();
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Check if current step has any errors
  const currentStepHasErrors = () => {
    const fields = getStepFields(step);
    return fields.some(field => form.formState.errors[field]);
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

            <Form {...form}>
              <form className="space-y-6">
                {step === 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      Om ditt företag
                    </h3>
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Företagsnamn</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="AB Svenska Företag"
                              data-testid="input-company-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bransch</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="T.ex. IT-konsult, tillverkning, handel"
                              data-testid="input-industry"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="revenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Omsättning senaste året (MSEK)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="50"
                              data-testid="input-revenue"
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground mt-2">
                            Du behöver inte ha exakta siffror – din bästa uppskattning räcker
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      Ekonomi & verksamhet
                    </h3>
                    <FormField
                      control={form.control}
                      name="profitMargin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rörelsemarginal (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="10"
                              data-testid="input-profit-margin"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="yearsInBusiness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Antal år i drift</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="15"
                              data-testid="input-years"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      Dina kontaktuppgifter
                    </h3>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Namn</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Anna Andersson"
                              data-testid="input-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-post</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="anna@mittforetag.se"
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground mt-2">
                            Vi skickar din sammanfattning hit inom 24 timmar
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon (frivilligt)</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="070-123 45 67"
                              data-testid="input-phone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Vi skickar inte massutskick – bara relevant information kopplad till din företagsförsäljning.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>

          <div className="flex gap-4">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={submitMutation.isPending}
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2" size={16} />
                Tillbaka
              </Button>
            )}
            <Button
              className="flex-1"
              onClick={handleNext}
              disabled={submitMutation.isPending}
              data-testid={step === totalSteps - 1 ? "button-submit-diagnosis" : "button-next"}
            >
              {submitMutation.isPending ? "Skickar..." : (step === totalSteps - 1 ? "Skicka diagnos" : "Nästa")}
              {step < totalSteps - 1 && !submitMutation.isPending && <ArrowRight className="ml-2" size={16} />}
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
