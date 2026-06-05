import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { students, attendanceTrend, departments } from "@/lib/mockData";
import { ClipboardList, TrendingUp, AlertTriangle, Users } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataTable, type Column } from "@/components/DataTable";

export const Route = createFileRoute("/_app/attendance")({
  head: () => ({ meta: [{ title: "Attendance — CampusOS" }] }),
  component: AttendancePage,
});

const lowAttendance = students.filter((s) => s.attendance < 75).slice(0, 25);

const cols: Column<typeof lowAttendance[0]>[] = [
  { key: "rollNo", header: "Roll No" },
  { key: "name", header: "Student" },
  { key: "department", header: "Dept" },
  { key: "semester", header: "Sem" },
  {
    key: "attendance", header: "Attendance",
    render: (s) => <span className="font-semibold text-destructive">{s.attendance}%</span>,
  },
];

function AttendancePage() {
  const avg = Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length);
  return (
    <div className="space-y-6">
      <PageHeader title="Attendance Management" description="Institute-wide attendance insights and at-risk students" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Average Attendance" value={`${avg}%`} icon={ClipboardList} trend={2.4} tone="primary" />
        <StatCard label="Above 85%" value={students.filter((s) => s.attendance >= 85).length} icon={TrendingUp} tone="success" />
        <StatCard label="Below 75%" value={students.filter((s) => s.attendance < 75).length} icon={AlertTriangle} tone="warning" />
        <StatCard label="Total Students" value={students.length} icon={Users} tone="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="surface-card p-5">
          <div className="mb-4 text-sm font-semibold">Weekly Attendance Trend</div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={attendanceTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ga2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="attendance" stroke="var(--primary)" strokeWidth={2.5} fill="url(#ga2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="surface-card p-5">
          <div className="mb-4 text-sm font-semibold">Department-wise Attendance</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departments.map((d) => ({ dept: d.code, avg: 78 + (d.students % 18) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="dept" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="avg" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold">Students Below Threshold (75%)</div>
        <DataTable data={lowAttendance} columns={cols} searchKeys={["name", "rollNo", "department"]} filename="low-attendance" />
      </div>
    </div>
  );
}
