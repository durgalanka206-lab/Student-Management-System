import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ClipboardList, BarChart3, Users, Building2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports — CampusOS" }] }),
  component: ReportsPage,
});

const reports = [
  { icon: ClipboardList, title: "Attendance Report", desc: "Comprehensive attendance breakdown across departments, courses and semesters", tone: "primary" },
  { icon: BarChart3, title: "Result Report", desc: "Examination results with grade distribution, pass percentage, and rankings", tone: "info" },
  { icon: Users, title: "Student Report", desc: "Complete student roster with demographics, performance and status", tone: "success" },
  { icon: Building2, title: "Department Report", desc: "Department-wise summary covering students, faculty, courses and outcomes", tone: "warning" },
];

const toneMap: Record<string, string> = {
  primary: "from-primary/15 to-primary/5 text-primary",
  success: "from-[oklch(0.62_0.16_155)]/15 to-transparent text-[var(--success)]",
  warning: "from-[oklch(0.78_0.16_75)]/15 to-transparent text-[var(--warning)]",
  info: "from-[oklch(0.65_0.15_230)]/15 to-transparent text-[var(--info)]",
};

function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Generate and export institutional reports" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="surface-card relative overflow-hidden p-6 transition-all hover:shadow-md">
              <div className={`pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gradient-to-br ${toneMap[r.tone]} blur-2xl opacity-60`} />
              <div className="relative">
                <div className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${toneMap[r.tone]}`}>
                  <Icon className="size-6" />
                </div>
                <div className="mt-4 font-semibold">{r.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{r.desc}</div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => toast.success(`${r.title} exported as PDF`)}>
                    <Download className="size-4" /> PDF
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => toast.success(`${r.title} exported as Excel`)}>
                    <Download className="size-4" /> Excel
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => toast.success(`${r.title} exported as CSV`)}>
                    <Download className="size-4" /> CSV
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
