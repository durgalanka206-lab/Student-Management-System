import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { studentMarks } from "@/lib/mockData";
import { DataTable, type Column } from "@/components/DataTable";
import { Award, TrendingUp, BookOpen, Target } from "lucide-react";

export const Route = createFileRoute("/_app/my-results")({
  head: () => ({ meta: [{ title: "My Results — CampusOS" }] }),
  component: MyResults,
});

const cols: Column<typeof studentMarks[0]>[] = [
  { key: "code", header: "Code", render: (m) => <span className="font-mono text-xs">{m.code}</span> },
  { key: "subject", header: "Subject", render: (m) => <span className="font-medium">{m.subject}</span> },
  { key: "credits", header: "Credits" },
  { key: "internal", header: "Internal /30" },
  { key: "external", header: "External /70" },
  { key: "total", header: "Total /100", render: (m) => <span className="font-semibold">{m.total}</span> },
  {
    key: "grade", header: "Grade",
    render: (m) => (
      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
        m.grade.includes("+") ? "bg-success/15 text-[var(--success)]" :
        m.grade.startsWith("A") ? "bg-primary/15 text-primary" :
        "bg-warning/15 text-[var(--warning)]"
      }`}>{m.grade}</span>
    ),
  },
];

function MyResults() {
  const totalCredits = studentMarks.reduce((a, m) => a + m.credits, 0);
  const totalMarks = studentMarks.reduce((a, m) => a + m.total, 0);
  const avg = (totalMarks / studentMarks.length).toFixed(1);
  return (
    <div className="space-y-6">
      <PageHeader title="My Results" description="Semester 4 · End-Semester Examination 2026" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="SGPA" value="8.71" icon={Award} trend={2.4} tone="primary" />
        <StatCard label="CGPA" value="8.42" icon={TrendingUp} trend={0.8} tone="success" />
        <StatCard label="Credits Earned" value={totalCredits} icon={BookOpen} tone="info" />
        <StatCard label="Average Marks" value={avg} icon={Target} tone="warning" />
      </div>

      <DataTable data={studentMarks} columns={cols} searchKeys={["subject", "code"]} filename="my-results" />
    </div>
  );
}
