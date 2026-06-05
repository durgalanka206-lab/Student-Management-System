import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import { programs as courses, type Program as Course } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_app/courses")({
  head: () => ({ meta: [{ title: "Courses — CampusOS" }] }),
  component: CoursesPage,
});

const columns: Column<Course>[] = [
  { key: "code", header: "Code", render: (c) => <span className="font-mono text-xs">{c.code}</span> },
  { key: "name", header: "Course", render: (c) => <span className="font-medium">{c.name}</span> },
  { key: "department", header: "Dept", render: (c) => <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{c.department}</span> },
  { key: "duration", header: "Duration" },
  { key: "seats", header: "Seats" },
  {
    key: "enrolled", header: "Enrolled",
    render: (c) => {
      const pct = Math.round((c.enrolled / c.seats) * 100);
      return (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs font-medium">{c.enrolled}/{c.seats}</span>
        </div>
      );
    },
  },
];

function CoursesPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Course Management"
        description={`${courses.length} courses across all departments`}
        actions={<Button className="gap-2"><Plus className="size-4" /> Add Course</Button>}
      />
      <DataTable data={courses} columns={columns} searchKeys={["code", "name", "department"]} filename="courses" />
    </div>
  );
}
