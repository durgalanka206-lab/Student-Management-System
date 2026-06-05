import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { timetable } from "@/lib/mockData";
import { Clock, MapPin, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/timetable")({
  head: () => ({ meta: [{ title: "Timetable — CampusOS" }] }),
  component: TimetablePage,
});

function TimetablePage() {
  const timeSlots = timetable[0]?.slots.map(s => s.time) || [];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Weekly Timetable" 
        description="Spring Semester 2026 — BCA Sem 4" 
        actions={<Button variant="outline" className="gap-2"><CheckCircle className="size-4" /> Mark Today's Attendance</Button>}
      />

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[800px]">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold text-muted-foreground w-28 border-r border-border">Day / Time</th>
                {timeSlots.map((time) => (
                  <th key={time} className="p-4 font-semibold text-center border-r border-border whitespace-nowrap min-w-[160px]">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3" /> {time}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {timetable.map((day) => (
                <tr key={day.day} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-semibold border-r border-border bg-muted/20">
                    {day.day}
                  </td>
                  {day.slots.map((s, i) => (
                    <td key={i} className={`p-3 border-r border-border align-top ${s.isBreak ? 'bg-muted/30 text-center align-middle' : ''}`}>
                      {s.isBreak ? (
                        <div className="font-medium text-muted-foreground uppercase tracking-widest text-xs py-4">
                          {s.subject}
                        </div>
                      ) : (
                        <div className={`rounded-md p-3 h-full flex flex-col gap-2 ${s.isLab ? 'bg-info/10 border border-info/20' : 'bg-background border border-border hover:border-primary/30'} transition-colors`}>
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold leading-snug line-clamp-2">{s.subject}</span>
                            {s.code && (
                              <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                                {s.code}
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-auto space-y-1.5 pt-2 border-t border-border/50">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <User className="size-3 text-primary/70 shrink-0" />
                              <span className="truncate">{s.faculty}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <MapPin className="size-3 text-info/70 shrink-0" />
                                <span>{s.room}</span>
                              </div>
                              <button className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                Attend
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
