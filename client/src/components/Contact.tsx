import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "Meddelande skickat!",
        description: data.message || "Vi hör av oss inom fyra timmar på vardagar.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Ett fel uppstod",
        description: error.message || "Kunde inte skicka meddelande. Försök igen senare.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    submitMutation.mutate(data);
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
                          data-testid="input-contact-name"
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
                          data-testid="input-contact-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="070-123 45 67"
                          data-testid="input-contact-phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meddelande</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Berätta kort om ditt företag och vad du funderar på..."
                          rows={4}
                          data-testid="textarea-message"
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
                  data-testid="button-submit-contact"
                >
                  {submitMutation.isPending ? "Skickar..." : "Skicka meddelande"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
