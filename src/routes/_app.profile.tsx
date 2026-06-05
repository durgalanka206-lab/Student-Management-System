import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth";
import { students } from "@/lib/mockData";
import { Mail, Phone, GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — CampusOS" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const me = students.find((s) => s.email === user!.email) || students[24];
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your personal and academic information" />

      <div className="surface-card relative overflow-hidden p-6">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "var(--gradient-primary)", mixBlendMode: "soft-light" }} />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="grid size-24 place-items-center rounded-2xl bg-primary text-3xl font-semibold text-primary-foreground" style={{ boxShadow: "var(--shadow-glow)" }}>
            {me.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1">
            <div className="text-2xl font-semibold tracking-tight">{me.name}</div>
            <div className="text-sm text-muted-foreground">{me.rollNo} · {me.course}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">{me.department}</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">Semester {me.semester}</span>
              <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-[var(--success)]">{me.status}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center sm:text-right">
            <div>
              <div className="text-xs text-muted-foreground">CGPA</div>
              <div className="text-2xl font-semibold gradient-text">{me.cgpa}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Attendance</div>
              <div className="text-2xl font-semibold">{me.attendance}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card p-5">
          <div className="mb-4 text-sm font-semibold">Contact Information</div>
          <ul className="space-y-3">
            {[
              { icon: Mail, label: "Email", value: me.email },
              { icon: Phone, label: "Phone", value: me.phone },
              { icon: MapPin, label: "Address", value: "Sector 18, Greater Noida, UP - 201310" },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <li key={r.label} className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{r.label}</div>
                    <div className="text-sm font-medium">{r.value}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="surface-card p-5">
          <div className="mb-4 text-sm font-semibold">Academic Information</div>
          <ul className="space-y-3">
            {[
              { icon: GraduationCap, label: "Department", value: me.department },
              { icon: BookOpen, label: "Course", value: me.course },
              { icon: Calendar, label: "Joined", value: me.joined },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <li key={r.label} className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{r.label}</div>
                    <div className="text-sm font-medium">{r.value}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
