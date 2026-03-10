import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminAuth";
import StatsCard from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Linkedin, Zap, Plus, Trash2 } from "lucide-react";

interface OutreachMetric {
  id: string;
  date: string;
  category: string;
  metricName: string;
  metricValue: number;
  notes: string | null;
  createdAt: string;
}

const CATEGORIES = [
  { value: "email", label: "Email", icon: Mail },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "gohighlevel", label: "GoHighLevel", icon: Zap },
] as const;

export default function OutreachTab() {
  const [metrics, setMetrics] = useState<OutreachMetric[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<string>("email");
  const [metricName, setMetricName] = useState("");
  const [metricValue, setMetricValue] = useState("");
  const [notes, setNotes] = useState("");

  async function loadMetrics() {
    try {
      const res = await adminFetch("/api/admin/outreach-metrics");
      if (res.ok) setMetrics(await res.json());
    } catch (err) {
      console.error("Failed to load outreach metrics", err);
    }
  }

  useEffect(() => {
    loadMetrics();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/outreach-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          category,
          metricName,
          metricValue: Number(metricValue),
          notes: notes || undefined,
        }),
      });
      if (res.ok) {
        setMetricName("");
        setMetricValue("");
        setNotes("");
        loadMetrics();
      }
    } catch (err) {
      console.error("Failed to add metric", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await adminFetch(`/api/admin/outreach-metrics/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setMetrics((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete metric", err);
    }
  }

  // Summarise totals per category
  function categoryTotal(cat: string) {
    return metrics
      .filter((m) => m.category === cat)
      .reduce((sum, m) => sum + m.metricValue, 0);
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CATEGORIES.map((c) => (
          <StatsCard
            key={c.value}
            title={c.label}
            value={categoryTotal(c.value)}
            icon={c.icon}
            description="Totalt alla mätvärden"
          />
        ))}
      </div>

      {/* Add new metric */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ny mätning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Datum</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Metrik</label>
              <Input
                placeholder="t.ex. Skickade mail"
                value={metricName}
                onChange={(e) => setMetricName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Värde</label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading || !metricName || !metricValue}>
              {loading ? "Sparar…" : "Lägg till"}
            </Button>
          </form>
          <div className="mt-3">
            <label className="text-xs text-muted-foreground mb-1 block">Anteckning (valfritt)</label>
            <Input
              placeholder="Frivillig anteckning"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Metrics table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Senaste outreach-poster</CardTitle>
        </CardHeader>
        <CardContent>
          {metrics.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Datum</th>
                    <th className="pb-2 font-medium">Kategori</th>
                    <th className="pb-2 font-medium">Metrik</th>
                    <th className="pb-2 font-medium text-right">Värde</th>
                    <th className="pb-2 font-medium">Anteckning</th>
                    <th className="pb-2 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((m) => (
                    <tr key={m.id} className="border-b last:border-0">
                      <td className="py-2 text-muted-foreground">
                        {new Date(m.date).toLocaleDateString("sv-SE")}
                      </td>
                      <td className="py-2">
                        <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-0.5 rounded-full">
                          {m.category}
                        </span>
                      </td>
                      <td className="py-2">{m.metricName}</td>
                      <td className="py-2 text-right font-medium">{m.metricValue}</td>
                      <td className="py-2 text-muted-foreground max-w-xs truncate">
                        {m.notes || "–"}
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          title="Ta bort"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Inga outreach-poster ännu. Lägg till din första mätning ovan.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
