import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import { subjects, type Subject } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_app/subjects")({
  head: () => ({ meta: [{ title: "Subjects — CampusOS" }] }),
  component: SubjectsPage,
});

const columns: Column<Subject>[] = [
  { key: "code", header: "Code", render: (s) => <span className="font-mono text-xs">{s.code}</span> },
  { key: "name", header: "Subject", render: (s) => <span className="font-medium">{s.name}</span> },
  { key: "course", header: "Course", render: (s) => <span className="text-xs">{s.course}</span> },
  { key: "semester", header: "Sem" },
  { key: "credits", header: "Credits" },
  { key: "faculty", header: "Faculty" },
];

function SubjectsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Subject Management"
        description={`${subjects.length} subjects offered this semester`}
        actions={<Button className="gap-2"><Plus className="size-4" /> Add Subject</Button>}
      />
      <DataTable data={subjects} columns={columns} searchKeys={["code", "name", "course", "faculty"]} filename="subjects" />
    </div>
  );
}
