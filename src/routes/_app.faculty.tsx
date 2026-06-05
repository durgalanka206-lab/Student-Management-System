import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import { faculty, type Faculty } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_app/faculty")({
  head: () => ({ meta: [{ title: "Faculty — CampusOS" }] }),
  component: FacultyPage,
});

const columns: Column<Faculty>[] = [
  {
    key: "name", header: "Faculty",
    render: (f) => (
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-full bg-info/15 text-[var(--info)] text-xs font-semibold">
          {f.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <div>
          <div className="font-medium">{f.name}</div>
          <div className="text-xs text-muted-foreground">{f.empId}</div>
        </div>
      </div>
    ),
  },
  { key: "email", header: "Email", render: (f) => <span className="text-xs">{f.email}</span> },
  { key: "department", header: "Dept", render: (f) => <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{f.department}</span> },
  { key: "designation", header: "Designation" },
  { key: "experience", header: "Exp", render: (f) => `${f.experience} yrs` },
  { key: "subjects", header: "Subjects" },
  { key: "phone", header: "Phone", render: (f) => <span className="text-xs">{f.phone}</span> },
  {
    key: "status", header: "Status",
    render: (f) => (
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
        f.status === "Active" ? "bg-success/15 text-[var(--success)]" : "bg-warning/15 text-[var(--warning)]"
      }`}>{f.status}</span>
    ),
  },
];

function FacultyPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Faculty Management"
        description={`${faculty.length} faculty members across the institute`}
        actions={<Button className="gap-2"><Plus className="size-4" /> Add Faculty</Button>}
      />
      <DataTable data={faculty} columns={columns} searchKeys={["name", "empId", "email", "department", "designation"]} filename="faculty" />
    </div>
  );
}
