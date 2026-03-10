import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBuyerGuideRequestSchema, type InsertBuyerGuideRequest } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import BookCover from "./BookCover";
import { useLocation } from "wouter";

export default function BuyerGuide() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const form = useForm<InsertBuyerGuideRequest>({
    resolver: zodResolver(insertBuyerGuideRequestSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertBuyerGuideRequest) => {
      const res = await apiRequest("POST", "/api/buyer-guide", data);
      return await res.json();
    },
    onSuccess: () => {
      navigate("/saljarguiden/tack");
    },
    onError: (error: any) => {
      toast({
        title: "Ett fel uppstod",
        description: error.message || "Kunde inte skicka förfrågan. Försök igen senare.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBuyerGuideRequest) => {
    submitMutation.mutate(data);
  };

  return (
    <section id="koparguide" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Outer card wrapper — like the Portalfabriken reference */}
        <div className="bg-card border border-card-border rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-center">
            {/* Left column — Book cover */}
            <div className="flex justify-center">
              <BookCover className="w-56 md:w-64 lg:w-72" />
            </div>

            {/* Right column — Content + form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Säljarguiden
              </h2>

              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Få insyn i hur köpare tänker och vad de letar efter. En 18-sidig
                guide baserad på hundratals genomförda transaktioner.
              </p>

              <h3 className="font-semibold text-foreground mb-4">
                Du lär dig bland annat:
              </h3>
              <ul className="space-y-2.5 text-foreground/80 mb-8">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary font-bold">•</span>
                  <span>Vilka risker köpare identifierar först</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary font-bold">•</span>
                  <span>Vanligaste "deal-breakers" i due diligence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary font-bold">•</span>
                  <span>Hur du ökar företagets attraktivitet</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary font-bold">•</span>
                  <span>Vad som påverkar värderingen mest</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary font-bold">•</span>
                  <span>Skillnaden mellan strategiska och finansiella köpare</span>
                </li>
              </ul>

              {/* Inline form — flowing naturally below content */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Namn</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ditt namn"
                              data-testid="input-guide-name"
                              className="bg-background"
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
                          <FormLabel className="sr-only">E-post</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Din e-postadress"
                              data-testid="input-guide-email"
                              className="bg-background"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto px-8"
                    disabled={submitMutation.isPending || !form.formState.isValid}
                    data-testid="button-download-guide"
                  >
                    <Download className="mr-2" size={18} />
                    {submitMutation.isPending ? "Skickar..." : "Hämta guiden"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Vi behandlar dina uppgifter enligt vår integritetspolicy.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
