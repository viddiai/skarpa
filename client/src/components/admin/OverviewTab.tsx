import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminAuth";
import StatsCard from "./StatsCard";
import { Eye, Users, BookOpen, FileText, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Analytics {
  totalViews: number;
  uniqueVisitors: number;
  guideDownloads: number;
  exitDiagnoses: number;
}

interface TimeseriesPoint {
  date: string;
  views: number;
  unique: number;
}

interface TopPage {
  path: string;
  count: number;
}

export default function OverviewTab() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [timeseries, setTimeseries] = useState<TimeseriesPoint[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [days] = useState(30);

  useEffect(() => {
    async function load() {
      try {
        const [aRes, tRes, pRes] = await Promise.all([
          adminFetch(`/api/admin/analytics?days=${days}`),
          adminFetch(`/api/admin/analytics/timeseries?days=${days}`),
          adminFetch(`/api/admin/analytics/top-pages?days=${days}`),
        ]);
        if (aRes.ok) setAnalytics(await aRes.json());
        if (tRes.ok) setTimeseries(await tRes.json());
        if (pRes.ok) setTopPages(await pRes.json());
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    }
    load();
  }, [days]);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Sidvisningar"
          value={analytics?.totalViews ?? "–"}
          icon={Eye}
          description={`Senaste ${days} dagarna`}
        />
        <StatsCard
          title="Unika besökare"
          value={analytics?.uniqueVisitors ?? "–"}
          icon={Users}
          description={`Senaste ${days} dagarna`}
        />
        <StatsCard
          title="Säljarguiden"
          value={analytics?.guideDownloads ?? "–"}
          icon={BookOpen}
          description="Totalt nedladdningar"
        />
        <StatsCard
          title="Exit-diagnoser"
          value={analytics?.exitDiagnoses ?? "–"}
          icon={FileText}
          description="Totalt inskickade"
        />
      </div>

      {/* Traffic chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Dagliga sidvisningar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {timeseries.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={timeseries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(d: string) => d.slice(5)} // MM-DD
                />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  labelFormatter={(d: string) => `Datum: ${d}`}
                  formatter={(value: number, name: string) => [
                    value,
                    name === "views" ? "Visningar" : "Unika",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#1B5091"
                  fill="#1B5091"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="unique"
                  stroke="#93AECB"
                  fill="#93AECB"
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground py-12 text-center">
              Ingen besöksdata ännu. Data visas när besökare börjar använda sajten.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Top pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mest besökta sidor</CardTitle>
        </CardHeader>
        <CardContent>
          {topPages.length > 0 ? (
            <div className="space-y-2">
              {topPages.map((p) => (
                <div key={p.path} className="flex justify-between text-sm">
                  <span className="font-mono text-muted-foreground">{p.path}</span>
                  <span className="font-medium">{p.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Ingen data ännu
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
