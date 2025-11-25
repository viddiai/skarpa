import { Building2, TrendingUp, Users, Award } from "lucide-react";

export default function TrustSignals() {
  const stats = [
    { icon: Building2, value: "100+", label: "Genomförda transaktioner" },
    { icon: TrendingUp, value: "3 mdr SEK", label: "Totalt transaktionsvärde" },
    { icon: Users, value: "200+", label: "Aktiva köpare i nätverket" },
    { icon: Award, value: "25 år", label: "Kombinerad erfarenhet" },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary mb-2 tracking-wide uppercase">
            Beprövad erfarenhet
          </h2>
          <p className="text-lg text-muted-foreground">
            Över 100 svenska företagsägare har litat på oss
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center"
                data-testid={`stat-${index}`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon size={24} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-[DM_Sans] text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
