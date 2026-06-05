import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { students } from "@/lib/mockData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend } from "recharts";
import { DataTable, type Column } from "@/components/DataTable";

export const Route = createFileRoute("/_app/student-performance")({
  head: () => ({ meta: [{ title: "Student Performance — CampusOS" }] }),
  component: PerformancePage,
});

const myClass = students.filter((s) => s.department === "CSE" && s.semester === 4).slice(0, 40);

const gradeDist = [
  { grade: "A+", count: myClass.filter((s) => s.cgpa >= 9).length },
  { grade: "A", count: myClass.filter((s) => s.cgpa >= 8 && s.cgpa < 9).length },
  { grade: "B", count: myClass.filter((s) => s.cgpa >= 7 && s.cgpa < 8).length },
  { grade: "C", count: myClass.filter((s) => s.cgpa < 7).length },
];

const COLORS = ["oklch(0.62 0.16 155)", "oklch(0.55 0.21 264)", "oklch(0.78 0.16 75)", "oklch(0.6 0.22 27)"];

const cols: Column<typeof myClass[0]>[] = [
  { key: "rollNo", header: "Roll No" },
  { key: "name", header: "Student", render: (s) => <span className="font-medium">{s.name}</span> },
  { key: "cgpa", header: "CGPA", render: (s) => <span className="font-semibold">{s.cgpa}</span> },
  { key: "attendance", header: "Attendance", render: (s) => `${s.attendance}%` },
];

function PerformancePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Student Performance" description="Analytics for your classes" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface-card p-5 lg:col-span-2">
          <div className="mb-4 text-sm font-semibold">CGPA Distribution</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={myClass.map((s, i) => ({ x: s.rollNo.slice(-3), cgpa: s.cgpa }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="x" stroke="var(--muted-foreground)" fontSize={10} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[5, 10]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="cgpa" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="surface-card p-5">
          <div className="mb-4 text-sm font-semibold">Grade Distribution</div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={gradeDist} dataKey="count" nameKey="grade" innerRadius={50} outerRadius={90} paddingAngle={3}>
                {gradeDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable data={myClass} columns={cols} searchKeys={["name", "rollNo"]} filename="class-performance" />
    </div>
  );
}
