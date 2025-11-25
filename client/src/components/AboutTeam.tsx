import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import maleConsultantImage from "@assets/generated_images/male_consultant_headshot.png";
import femaleConsultantImage from "@assets/generated_images/female_consultant_headshot.png";

export default function AboutTeam() {
  const team = [
    {
      name: "Erik Bergström",
      role: "Grundare & Senior Rådgivare",
      image: maleConsultantImage,
      bio: "15+ år av M&A-rådgivning, tidigare corporate finance i storbank. Har genomfört över 60 transaktioner inom IT, industri och handel.",
    },
    {
      name: "Sara Lindqvist",
      role: "Partner & Senior Rådgivare",
      image: femaleConsultantImage,
      bio: "10+ år av företagsvärderingar och företagsförsäljningar. Specialist på familjebolag och ägarskiften mellan generationer.",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Om Skarpa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vi är erfarna M&A-rådgivare som hjälper svenska företagsägare att genomföra företagsöverlåtelser.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p>
              Skarpa grundades för att ge mindre och medelstora företag tillgång till samma professionella M&A-rådgivning som stora bolag får.
            </p>
            <p>
              Vi tror att en företagsförsäljning ska genomföras med omsorg om både ekonomiskt resultat och vad som händer med företaget efteråt. Därför tar vi oss tid att förstå din verksamhet och hitta köpare som passar.
            </p>
            <p>
              Vårt fokus är svenska bolag med omsättning 25–300 MSEK inom IT, tillverkning, handel och tjänsteföretag.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Vårt team
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={index}
                className="p-8 text-center hover-elevate transition-all duration-300"
                data-testid={`team-member-${index}`}
              >
                <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-card">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h4>
                <p className="text-sm text-primary mb-4">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
