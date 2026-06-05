import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { students, performanceByDept } from "@/lib/mockData";
import { Award, TrendingUp, GraduationCap, BookOpen } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataTable, type Column } from "@/components/DataTable";

export const Route = createFileRoute("/_app/results")({
  head: () => ({ meta: [{ title: "Results — CampusOS" }] }),
  component: ResultsPage,
});

const top = [...students].sort((a, b) => b.cgpa - a.cgpa).slice(0, 50);

const cols: Column<typeof top[0]>[] = [
  { key: "rollNo", header: "Roll No" },
  { key: "name", header: "Student" },
  { key: "department", header: "Dept" },
  { key: "course", header: "Course", render: (s) => <span className="text-xs">{s.course}</span> },
  { key: "semester", header: "Sem" },
  { key: "cgpa", header: "CGPA", render: (s) => <span className="font-semibold gradient-text">{s.cgpa}</span> },
];

function ResultsPage() {
  const avg = (students.reduce((a, s) => a + s.cgpa, 0) / students.length).toFixed(2);
  return (
    <div className="space-y-6">
      <PageHeader title="Results Management" description="Academic performance and grade analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Average CGPA" value={avg} icon={Award} trend={1.8} tone="primary" />
        <StatCard label="Above 9.0 CGPA" value={students.filter((s) => s.cgpa >= 9).length} icon={TrendingUp} tone="success" />
        <StatCard label="Pass Rate" value="96%" icon={GraduationCap} trend={0.8} tone="info" />
        <StatCard label="Subjects Evaluated" value="186" icon={BookOpen} tone="warning" />
      </div>

      <div className="surface-card p-5">
        <div className="mb-4 text-sm font-semibold">Department Performance</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={performanceByDept}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="dept" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis yAxisId="l" stroke="var(--muted-foreground)" fontSize={12} domain={[0, 10]} />
            <YAxis yAxisId="r" orientation="right" stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Bar yAxisId="l" dataKey="avgCGPA" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            <Bar yAxisId="r" dataKey="pass" fill="var(--info)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold">Top Performers</div>
        <DataTable data={top} columns={cols} searchKeys={["name", "rollNo", "department"]} filename="top-performers" />
      </div>
    </div>
  );
}
