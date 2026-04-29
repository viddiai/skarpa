import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

const STATUSES = [
  { value: "new", label: "Ny" },
  { value: "contacted", label: "Kontaktad" },
  { value: "replied", label: "Svarat" },
  { value: "qualified", label: "Kvalificerad" },
  { value: "meeting_booked", label: "Möte bokat" },
  { value: "not_interested", label: "Ej intresserad" },
  { value: "closed_won", label: "Stängd – vunnen" },
  { value: "closed_lost", label: "Stängd – förlorad" },
] as const;

const PERSONAS = [
  { value: "family_owned", label: "Familjeägt" },
  { value: "founder_led", label: "Grundarlett" },
  { value: "financial_buyer", label: "Finansiell köpare" },
  { value: "strategic_buyer", label: "Strategisk köpare" },
  { value: "industry_player", label: "Branschaktör" },
  { value: "other", label: "Övrigt" },
] as const;

const SOURCES = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "website_form", label: "Webbformulär" },
  { value: "referral", label: "Rekommendation" },
  { value: "cold_email", label: "Kallt mail" },
  { value: "apollo_list", label: "Apollo-lista" },
  { value: "manual", label: "Manuell" },
  { value: "other", label: "Övrigt" },
] as const;

interface Contact {
  id: string;
  email: string;
  companyName: string | null;
  website: string | null;
  industry: string | null;
  revenueRange: string | null;
  employeeCount: number | null;
  ownerCeoPartnerName: string | null;
  linkedinUrl: string | null;
  persona: string | null;
  icpScore: number | null;
  source: string | null;
  outreachStatus: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FormState {
  email: string;
  companyName: string;
  website: string;
  industry: string;
  revenueRange: string;
  employeeCount: string;
  ownerCeoPartnerName: string;
  linkedinUrl: string;
  persona: string;
  icpScore: string;
  source: string;
  outreachStatus: string;
  notes: string;
}

const blankForm = (): FormState => ({
  email: "",
  companyName: "",
  website: "",
  industry: "",
  revenueRange: "",
  employeeCount: "",
  ownerCeoPartnerName: "",
  linkedinUrl: "",
  persona: "",
  icpScore: "",
  source: "",
  outreachStatus: "new",
  notes: "",
});

const statusBadgeColor = (status: string): string => {
  switch (status) {
    case "meeting_booked":
    case "closed_won":
      return "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30";
    case "qualified":
    case "replied":
      return "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30";
    case "contacted":
      return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30";
    case "not_interested":
    case "closed_lost":
      return "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function ContactsCRM() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(blankForm());
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const url =
        statusFilter === "all"
          ? "/api/admin/contacts"
          : `/api/admin/contacts?status=${statusFilter}`;
      const res = await adminFetch(url);
      if (res.ok) setContacts(await res.json());
    } catch (err) {
      console.error("Failed to load contacts", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [statusFilter]);

  function openCreate() {
    setEditingId(null);
    setForm(blankForm());
    setError(null);
    setDialogOpen(true);
  }

  function openEdit(c: Contact) {
    setEditingId(c.id);
    setForm({
      email: c.email,
      companyName: c.companyName ?? "",
      website: c.website ?? "",
      industry: c.industry ?? "",
      revenueRange: c.revenueRange ?? "",
      employeeCount: c.employeeCount?.toString() ?? "",
      ownerCeoPartnerName: c.ownerCeoPartnerName ?? "",
      linkedinUrl: c.linkedinUrl ?? "",
      persona: c.persona ?? "",
      icpScore: c.icpScore?.toString() ?? "",
      source: c.source ?? "",
      outreachStatus: c.outreachStatus,
      notes: c.notes ?? "",
    });
    setError(null);
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      email: form.email.trim(),
      companyName: form.companyName.trim() || null,
      website: form.website.trim() || null,
      industry: form.industry.trim() || null,
      revenueRange: form.revenueRange.trim() || null,
      employeeCount: form.employeeCount ? Number(form.employeeCount) : null,
      ownerCeoPartnerName: form.ownerCeoPartnerName.trim() || null,
      linkedinUrl: form.linkedinUrl.trim() || null,
      persona: form.persona || null,
      icpScore: form.icpScore ? Number(form.icpScore) : null,
      source: form.source || null,
      outreachStatus: form.outreachStatus,
      notes: form.notes?.trim() || null,
    };

    try {
      const res = editingId
        ? await adminFetch(`/api/admin/contacts/${editingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await adminFetch("/api/admin/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Kunde inte spara");
      setDialogOpen(false);
      load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string, email: string) {
    if (!confirm(`Ta bort kontakten ${email}?`)) return;
    try {
      const res = await adminFetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="w-4 h-4" />
          Kontakter ({contacts.length})
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla statusar</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={openCreate}>
            <Plus className="w-4 h-4 mr-1" />
            Lägg till
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-6">Laddar…</p>
        ) : contacts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Inga kontakter {statusFilter !== "all" ? "med denna status" : "ännu"}.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Företag</th>
                  <th className="pb-2 font-medium">Kontaktperson</th>
                  <th className="pb-2 font-medium">Email</th>
                  <th className="pb-2 font-medium">Bransch</th>
                  <th className="pb-2 font-medium text-right">ICP</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-2">
                      <div className="font-medium">{c.companyName || "—"}</div>
                      {c.website && (
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                        >
                          {c.website.replace(/^https?:\/\//, "")}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>
                    <td className="py-2">
                      <div>{c.ownerCeoPartnerName || "—"}</div>
                      {c.linkedinUrl && (
                        <a
                          href={c.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          LinkedIn ↗
                        </a>
                      )}
                    </td>
                    <td className="py-2 text-muted-foreground">
                      <a
                        href={`mailto:${c.email}`}
                        className="hover:text-foreground"
                      >
                        {c.email}
                      </a>
                    </td>
                    <td className="py-2 text-muted-foreground">{c.industry || "—"}</td>
                    <td className="py-2 text-right">
                      {c.icpScore != null ? (
                        <span className="font-medium">{c.icpScore}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-2">
                      <Badge variant="outline" className={statusBadgeColor(c.outreachStatus)}>
                        {STATUSES.find((s) => s.value === c.outreachStatus)?.label ??
                          c.outreachStatus}
                      </Badge>
                    </td>
                    <td className="py-2">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(c)}
                          className="text-muted-foreground hover:text-foreground p-1"
                          title="Redigera"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id, c.email)}
                          className="text-muted-foreground hover:text-destructive p-1"
                          title="Ta bort"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Redigera kontakt" : "Ny kontakt"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Email *">
                <Input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
              <Field label="Företagsnamn">
                <Input
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                />
              </Field>
              <Field label="Webbsajt">
                <Input
                  type="url"
                  placeholder="https://"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </Field>
              <Field label="Bransch">
                <Input
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                />
              </Field>
              <Field label="Omsättning (intervall)">
                <Input
                  placeholder="t.ex. 50–100 MSEK"
                  value={form.revenueRange}
                  onChange={(e) => setForm({ ...form, revenueRange: e.target.value })}
                />
              </Field>
              <Field label="Antal anställda">
                <Input
                  type="number"
                  min="0"
                  value={form.employeeCount}
                  onChange={(e) => setForm({ ...form, employeeCount: e.target.value })}
                />
              </Field>
              <Field label="Ägare/VD/Partner">
                <Input
                  value={form.ownerCeoPartnerName}
                  onChange={(e) =>
                    setForm({ ...form, ownerCeoPartnerName: e.target.value })
                  }
                />
              </Field>
              <Field label="LinkedIn-URL">
                <Input
                  type="url"
                  placeholder="https://linkedin.com/in/…"
                  value={form.linkedinUrl}
                  onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                />
              </Field>
              <Field label="Persona">
                <Select
                  value={form.persona || "none"}
                  onValueChange={(v) => setForm({ ...form, persona: v === "none" ? "" : v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj persona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— Ingen —</SelectItem>
                    {PERSONAS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="ICP-score (0–100)">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={form.icpScore}
                  onChange={(e) => setForm({ ...form, icpScore: e.target.value })}
                />
              </Field>
              <Field label="Källa">
                <Select
                  value={form.source || "none"}
                  onValueChange={(v) => setForm({ ...form, source: v === "none" ? "" : v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj källa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— Ingen —</SelectItem>
                    {SOURCES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Status *">
                <Select
                  value={form.outreachStatus}
                  onValueChange={(v) => setForm({ ...form, outreachStatus: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Anteckningar">
              <Textarea
                rows={3}
                value={form.notes ?? ""}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </Field>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Avbryt
              </Button>
              <Button type="submit">{editingId ? "Spara" : "Lägg till"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground mb-1 block">{label}</span>
      {children}
    </label>
  );
}
