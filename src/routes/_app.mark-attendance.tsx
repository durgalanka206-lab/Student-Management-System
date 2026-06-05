import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { students } from "@/lib/mockData";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Save } from "lucide-react";
import { toast } from "sonner";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_app/mark-attendance")({
  head: () => ({ meta: [{ title: "Mark Attendance — CampusOS" }] }),
  component: MarkAttendancePage,
});

function MarkAttendancePage() {
  const classList = students.filter((s) => s.department === "CSE" && s.semester === 4).slice(0, 30);
  const [present, setPresent] = useState<Record<string, boolean>>(
    Object.fromEntries(classList.map((s) => [s.id, true]))
  );

  const presentCount = Object.values(present).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mark Attendance"
        description="Record attendance for today's class"
        actions={
          <Button className="gap-2" onClick={() => toast.success(`Attendance saved · ${presentCount}/${classList.length} present`)}>
            <Save className="size-4" /> Save Attendance
          </Button>
        }
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">Class</div>
          <Select defaultValue="cse4-ds">
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="cse4-ds">CSE Sem 4 · Data Structures</SelectItem>
              <SelectItem value="cse4-algo">CSE Sem 4 · Algorithms</SelectItem>
              <SelectItem value="cse4-dbms">CSE Sem 4 · DBMS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">Date</div>
          <div className="mt-1 text-sm font-medium">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
        </div>
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">Attendance</div>
          <div className="mt-1 text-2xl font-semibold gradient-text">{presentCount} / {classList.length}</div>
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Class Roster
        </div>
        <ul className="divide-y divide-border">
          {classList.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary text-xs font-semibold">
                  {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.rollNo}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPresent({ ...present, [s.id]: true })}
                  className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    present[s.id]
                      ? "border-[var(--success)] bg-success/15 text-[var(--success)]"
                      : "border-border text-muted-foreground hover:border-[var(--success)]"
                  }`}
                >
                  <Check className="size-3.5" /> Present
                </button>
                <button
                  onClick={() => setPresent({ ...present, [s.id]: false })}
                  className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    !present[s.id]
                      ? "border-destructive bg-destructive/15 text-destructive"
                      : "border-border text-muted-foreground hover:border-destructive"
                  }`}
                >
                  <X className="size-3.5" /> Absent
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
