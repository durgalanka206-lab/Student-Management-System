import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import { students, type Student } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/_app/students")({
  head: () => ({ meta: [{ title: "Students — CampusOS" }] }),
  component: StudentsPage,
});

const columns: Column<Student>[] = [
  {
    key: "name", header: "Student",
    render: (s) => (
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary text-xs font-semibold">
          {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <div>
          <div className="font-medium">{s.name}</div>
          <div className="text-xs text-muted-foreground">{s.rollNo}</div>
        </div>
      </div>
    ),
  },
  { key: "email", header: "Email", render: (s) => <span className="text-xs">{s.email}</span> },
  { key: "department", header: "Dept", render: (s) => <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{s.department}</span> },
  { key: "program", header: "Program", render: (s) => <span className="text-xs">{s.program}</span> },
  { key: "semester", header: "Sem" },
  { key: "cgpa", header: "CGPA", render: (s) => <span className="font-semibold">{s.cgpa}</span> },
  {
    key: "attendance", header: "Attendance",
    render: (s) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full" style={{
            width: `${s.attendance}%`,
            background: s.attendance >= 85 ? "var(--success)" : s.attendance >= 75 ? "var(--warning)" : "var(--destructive)"
          }} />
        </div>
        <span className="text-xs font-medium">{s.attendance}%</span>
      </div>
    ),
  },
  {
    key: "feeStatus", header: "Fee",
    render: (s) => (
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
        s.feeStatus === "Paid" ? "bg-success/15 text-[var(--success)]" :
        s.feeStatus === "Pending" ? "bg-warning/15 text-[var(--warning)]" :
        "bg-destructive/15 text-destructive"
      }`}>{s.feeStatus}</span>
    ),
  },
  {
    key: "status", header: "Status",
    render: (s) => (
      <span className={`inline-flex items-center gap-1 text-xs ${s.status === "Active" ? "text-[var(--success)]" : "text-muted-foreground"}`}>
        <span className={`size-1.5 rounded-full ${s.status === "Active" ? "bg-[var(--success)]" : "bg-muted-foreground"}`} />
        {s.status}
      </span>
    ),
  },
];

function StudentsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Student Management"
        description={`Manage and monitor all ${students.length} students across departments`}
        actions={<Button className="gap-2"><Plus className="size-4" /> Add Student</Button>}
      />
      <DataTable
        data={students}
        columns={columns}
        searchKeys={["name", "rollNo", "email", "department", "program"]}
        filename="students"
      />
    </div>
  );
}
