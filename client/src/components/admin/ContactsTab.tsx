import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, FileText, Calendar } from "lucide-react";

interface BuyerGuideReq {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface ContactMsg {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
}

interface ExitDiag {
  id: string;
  companyName: string;
  name: string;
  email: string;
  revenue: string;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ContactsTab() {
  const [guides, setGuides] = useState<BuyerGuideReq[]>([]);
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [diagnoses, setDiagnoses] = useState<ExitDiag[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [gRes, mRes, dRes] = await Promise.all([
          adminFetch("/api/admin/buyer-guide-requests"),
          adminFetch("/api/admin/contact-messages"),
          adminFetch("/api/admin/exit-diagnoses"),
        ]);
        if (gRes.ok) setGuides(await gRes.json());
        if (mRes.ok) setMessages(await mRes.json());
        if (dRes.ok) setDiagnoses(await dRes.json());
      } catch (err) {
        console.error("Failed to load contacts", err);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Säljarguiden downloads */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Säljarguiden — Nedladdningar ({guides.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {guides.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Namn</th>
                    <th className="pb-2 font-medium">Email</th>
                    <th className="pb-2 font-medium">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map((g) => (
                    <tr key={g.id} className="border-b last:border-0">
                      <td className="py-2">{g.name}</td>
                      <td className="py-2 text-muted-foreground">{g.email}</td>
                      <td className="py-2 text-muted-foreground">{formatDate(g.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Inga nedladdningar ännu
            </p>
          )}
        </CardContent>
      </Card>

      {/* Contact messages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Kontaktmeddelanden ({messages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Namn</th>
                    <th className="pb-2 font-medium">Email</th>
                    <th className="pb-2 font-medium">Meddelande</th>
                    <th className="pb-2 font-medium">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m.id} className="border-b last:border-0">
                      <td className="py-2">{m.name}</td>
                      <td className="py-2 text-muted-foreground">{m.email}</td>
                      <td className="py-2 max-w-xs truncate" title={m.message}>
                        {m.message}
                      </td>
                      <td className="py-2 text-muted-foreground">{formatDate(m.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Inga meddelanden ännu
            </p>
          )}
        </CardContent>
      </Card>

      {/* Exit diagnoses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Exit-diagnoser ({diagnoses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {diagnoses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Företag</th>
                    <th className="pb-2 font-medium">Namn</th>
                    <th className="pb-2 font-medium">Email</th>
                    <th className="pb-2 font-medium">Omsättning</th>
                    <th className="pb-2 font-medium">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnoses.map((d) => (
                    <tr key={d.id} className="border-b last:border-0">
                      <td className="py-2 font-medium">{d.companyName}</td>
                      <td className="py-2">{d.name}</td>
                      <td className="py-2 text-muted-foreground">{d.email}</td>
                      <td className="py-2 text-muted-foreground">{d.revenue}</td>
                      <td className="py-2 text-muted-foreground">{formatDate(d.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Inga diagnoser ännu
            </p>
          )}
        </CardContent>
      </Card>

      {/* Calendly placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Bokade möten
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Calendly-integration kommer snart
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
