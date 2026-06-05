import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { announcements } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Plus, Megaphone, Calendar } from "lucide-react";

export const Route = createFileRoute("/_app/announcements")({
  head: () => ({ meta: [{ title: "Announcements — CampusOS" }] }),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        description="Recent communications to students and faculty"
        actions={<Button className="gap-2"><Plus className="size-4" /> New Announcement</Button>}
      />

      <div className="space-y-3">
        {announcements.map((a) => (
          <div key={a.id} className="surface-card p-5 transition-all hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Megaphone className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    a.priority === "High" ? "bg-destructive/15 text-destructive" :
                    a.priority === "Medium" ? "bg-warning/15 text-[var(--warning)]" :
                    "bg-muted text-muted-foreground"
                  }`}>{a.priority}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase">{a.audience}</span>
                </div>
                <div className="mt-2 font-semibold">{a.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{a.body}</div>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {a.date}</span>
                  <span>by {a.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
