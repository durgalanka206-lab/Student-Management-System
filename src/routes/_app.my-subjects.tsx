import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { BookMarked, Users, Calendar } from "lucide-react";

export const Route = createFileRoute("/_app/my-subjects")({
  head: () => ({ meta: [{ title: "My Subjects — CampusOS" }] }),
  component: MySubjectsPage,
});

const mine = [
  { code: "CS301", name: "Data Structures", sem: 4, students: 60, sessions: 24, color: "primary" },
  { code: "CS302", name: "Algorithms", sem: 4, students: 58, sessions: 22, color: "info" },
  { code: "CS401", name: "Compiler Design", sem: 6, students: 42, sessions: 18, color: "success" },
  { code: "CS501", name: "Distributed Systems", sem: 8, students: 26, sessions: 14, color: "warning" },
];

const toneMap: Record<string, string> = {
  primary: "from-primary/15 to-primary/5 text-primary",
  success: "from-[oklch(0.62_0.16_155)]/15 to-transparent text-[var(--success)]",
  warning: "from-[oklch(0.78_0.16_75)]/15 to-transparent text-[var(--warning)]",
  info: "from-[oklch(0.65_0.15_230)]/15 to-transparent text-[var(--info)]",
};

function MySubjectsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Subjects" description="Subjects you are teaching this semester" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mine.map((m) => (
          <div key={m.code} className="surface-card relative overflow-hidden p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className={`pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br ${toneMap[m.color]} blur-2xl opacity-60`} />
            <div className="relative">
              <div className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ${toneMap[m.color]}`}>
                <BookMarked className="size-5" />
              </div>
              <div className="mt-4">
                <div className="font-mono text-xs text-muted-foreground">{m.code}</div>
                <div className="mt-1 font-semibold leading-snug">{m.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">Semester {m.sem}</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="size-3" /> Students</div>
                  <div className="mt-0.5 font-semibold">{m.students}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="size-3" /> Sessions</div>
                  <div className="mt-0.5 font-semibold">{m.sessions}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
