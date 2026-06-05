import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { departments } from "@/lib/mockData";
import { Building2, Users, GraduationCap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/departments")({
  head: () => ({ meta: [{ title: "Departments — CampusOS" }] }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Department Management"
        description={`${departments.length} active departments`}
        actions={<Button className="gap-2"><Plus className="size-4" /> Add Department</Button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map((d) => (
          <div key={d.id} className="surface-card group p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
              <div className="grid size-11 place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <Building2 className="size-5" />
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold">{d.code}</span>
            </div>
            <div className="mt-4">
              <div className="font-semibold leading-snug">{d.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">Head: {d.hod}</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="size-3" /> Students</div>
                <div className="mt-1 text-lg font-semibold">{d.students}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><GraduationCap className="size-3" /> Faculty</div>
                <div className="mt-1 text-lg font-semibold">{d.faculty}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
