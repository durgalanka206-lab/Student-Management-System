import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { useAuth } from "@/lib/auth";
import { students } from "@/lib/mockData";
import { ClipboardList, TrendingUp, AlertTriangle, Calendar } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";

export const Route = createFileRoute("/_app/my-attendance")({
  head: () => ({ meta: [{ title: "My Attendance — CampusOS" }] }),
  component: MyAttendance,
});

const weekly = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  attendance: 70 + Math.round(Math.sin(i) * 12 + 18),
}));

const subjectWise = [
  { sub: "Data Structures", present: 22, total: 24 },
  { sub: "Algorithms", present: 19, total: 22 },
  { sub: "DBMS", present: 18, total: 20 },
  { sub: "Operating Systems", present: 14, total: 18 },
  { sub: "Computer Networks", present: 17, total: 20 },
  { sub: "Software Engineering", present: 16, total: 18 },
  { sub: "Mathematics IV", present: 21, total: 22 },
];

function MyAttendance() {
  const { user } = useAuth();
  const me = students.find((s) => s.email === user!.email) || students[24];
  return (
    <div className="space-y-6">
      <PageHeader title="My Attendance" description="Track your subject-wise and weekly attendance" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Overall" value={`${me.attendance}%`} icon={ClipboardList} trend={1.2} tone="primary" />
        <StatCard label="Best Subject" value="95%" icon={TrendingUp} hint="Mathematics IV" tone="success" />
        <StatCard label="Needs Attention" value="79%" icon={AlertTriangle} hint="Operating Systems" tone="warning" />
        <StatCard label="Classes Attended" value={127} icon={Calendar} hint="of 144" tone="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="surface-card p-5">
          <div className="mb-4 text-sm font-semibold">Weekly Attendance</div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={weekly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ms" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="attendance" stroke="var(--primary)" strokeWidth={2.5} fill="url(#ms)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-card p-5">
          <div className="mb-4 text-sm font-semibold">Subject-wise Breakdown</div>
          <ul className="space-y-3">
            {subjectWise.map((s) => {
              const pct = Math.round((s.present / s.total) * 100);
              const color = pct >= 85 ? "var(--success)" : pct >= 75 ? "var(--warning)" : "var(--destructive)";
              return (
                <li key={s.sub}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{s.sub}</span>
                    <span className="text-muted-foreground">{s.present}/{s.total} · {pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
