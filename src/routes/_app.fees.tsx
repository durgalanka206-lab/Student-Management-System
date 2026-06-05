import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { DataTable, type Column } from "@/components/DataTable";
import { students, type Student } from "@/lib/mockData";
import { Wallet, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/fees")({
  head: () => ({ meta: [{ title: "Fee Management — CampusOS" }] }),
  component: FeesPage,
});

const cols: Column<Student>[] = [
  { key: "rollNo", header: "Roll No" },
  { key: "name", header: "Student", render: (s) => <span className="font-medium">{s.name}</span> },
  { key: "department", header: "Dept" },
  { key: "course", header: "Course", render: (s) => <span className="text-xs">{s.course}</span> },
  { key: "semester", header: "Sem" },
  {
    key: "feeStatus", header: "Status",
    render: (s) => (
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
        s.feeStatus === "Paid" ? "bg-success/15 text-[var(--success)]" :
        s.feeStatus === "Pending" ? "bg-warning/15 text-[var(--warning)]" :
        "bg-destructive/15 text-destructive"
      }`}>{s.feeStatus}</span>
    ),
  },
  {
    key: "id", header: "Amount", sortable: false,
    render: () => <span className="font-mono">₹ 85,000</span>,
  },
  {
    key: "name", header: "Action", sortable: false,
    render: (s) => s.feeStatus !== "Paid" ? <Button size="sm" variant="outline">Send Reminder</Button> : <span className="text-xs text-muted-foreground">—</span>,
  },
];

function FeesPage() {
  const paid = students.filter((s) => s.feeStatus === "Paid").length;
  const pending = students.filter((s) => s.feeStatus === "Pending").length;
  const overdue = students.filter((s) => s.feeStatus === "Overdue").length;
  const total = students.length;
  return (
    <div className="space-y-6">
      <PageHeader title="Fee Management" description="Track payments, pending dues and reminders" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Collected" value={`₹${((paid * 85000) / 10000000).toFixed(2)}Cr`} icon={Wallet} trend={6.5} tone="primary" />
        <StatCard label="Paid" value={`${paid} / ${total}`} icon={CheckCircle2} tone="success" />
        <StatCard label="Pending" value={pending} icon={AlertCircle} tone="warning" />
        <StatCard label="Overdue" value={overdue} icon={XCircle} tone="info" />
      </div>

      <DataTable data={students} columns={cols} searchKeys={["name", "rollNo", "department", "feeStatus"]} filename="fees" />
    </div>
  );
}
