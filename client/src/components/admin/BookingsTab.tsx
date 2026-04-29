import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Mail, User, ExternalLink } from "lucide-react";

interface Invitee {
  name: string;
  email: string;
  status: string;
  questions_and_answers?: { question: string; answer: string }[];
}

interface CalendlyEvent {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  location?: { type: string; join_url?: string };
  invitees: Invitee[];
}

export default function BookingsTab() {
  const [events, setEvents] = useState<CalendlyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"active" | "canceled">("active");

  const load = (s: "active" | "canceled") => {
    setLoading(true);
    setError(null);
    adminFetch(`/api/admin/calendly/events?status=${s}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Kunde inte hämta bokningar");
        setEvents(data.events ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(status);
  }, [status]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString("sv-SE", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={status === "active" ? "default" : "outline"}
            onClick={() => setStatus("active")}
          >
            Kommande
          </Button>
          <Button
            size="sm"
            variant={status === "canceled" ? "default" : "outline"}
            onClick={() => setStatus("canceled")}
          >
            Avbokade
          </Button>
        </div>
        <Button size="sm" variant="ghost" onClick={() => load(status)}>
          Uppdatera
        </Button>
      </div>

      {error && (
        <Card>
          <CardContent className="pt-6 text-destructive text-sm">
            {error}
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-muted-foreground text-sm">Hämtar bokningar…</p>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-muted-foreground text-sm">
            Inga {status === "active" ? "kommande" : "avbokade"} bokningar.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {events.map((event) => {
            const invitee = event.invitees[0];
            return (
              <Card key={event.uri} data-testid={`booking-${event.uri}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        {event.name}
                      </CardTitle>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                        <Clock size={14} />
                        {fmt(event.start_time)}
                      </div>
                    </div>
                    {event.location?.join_url && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={event.location.join_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Öppna möte
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                {invitee && (
                  <CardContent className="pt-0 text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-muted-foreground" />
                      <span className="font-medium">{invitee.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-muted-foreground" />
                      <a
                        href={`mailto:${invitee.email}`}
                        className="text-primary hover:underline"
                      >
                        {invitee.email}
                      </a>
                    </div>
                    {invitee.questions_and_answers?.length ? (
                      <div className="mt-3 pt-3 border-t space-y-2">
                        {invitee.questions_and_answers.map((qa, i) => (
                          <div key={i}>
                            <div className="text-xs font-semibold text-muted-foreground">
                              {qa.question}
                            </div>
                            <div className="text-sm">{qa.answer}</div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
