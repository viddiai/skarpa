import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Download } from "lucide-react";
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

export default function BuyerGuide() {
  const { toast } = useToast();

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
    onSuccess: (data: any) => {
      toast({
        title: "Köparguiden är på väg!",
        description: data.message || "Vi skickar PDF:en till din e-post inom några minuter.",
      });
      form.reset();
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Namn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Anna Andersson"
                          data-testid="input-guide-name"
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
                          data-testid="input-guide-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={submitMutation.isPending || !form.formState.isValid}
                  data-testid="button-download-guide"
                >
                  <Download className="mr-2" size={18} />
                  {submitMutation.isPending ? "Skickar..." : "Skicka guiden till min e-post"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Vi skickar inte massutskick – bara relevant information kopplad till din företagsförsäljning.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
