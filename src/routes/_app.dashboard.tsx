import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import {
  Users, GraduationCap, Building2, BookOpen, TrendingUp, Award, ClipboardList, Wallet,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  students, faculty, departments, programs, attendanceTrend,
  performanceByDept, enrollmentTrend, activities, announcements,
} from "@/lib/mockData";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CampusOS" }] }),
  component: Dashboard,
});

const COLORS = ["oklch(0.55 0.21 264)", "oklch(0.7 0.19 290)", "oklch(0.65 0.15 230)", "oklch(0.62 0.16 155)", "oklch(0.78 0.16 75)", "oklch(0.6 0.22 27)", "oklch(0.5 0.2 320)", "oklch(0.7 0.15 200)"];

function Dashboard() {
  const { user } = useAuth();
  const role = user!.role;

  if (role === "student") return <StudentDashboard />;
  if (role === "faculty") return <FacultyDashboard />;
  if (role === "hod") return <HodDashboard />;
  return <AdminDashboard />;
}

function AdminDashboard() {
  const deptDist = departments.map((d) => ({ name: d.code, value: d.students }));
  const feePaid = students.filter((s) => s.feeStatus === "Paid").length;
  const feePending = students.filter((s) => s.feeStatus === "Pending").length;
  const feeOverdue = students.filter((s) => s.feeStatus === "Overdue").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institute Overview"
        description="Real-time insights across academics, operations and finance."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value={students.length.toLocaleString()} icon={Users} trend={4.2} tone="primary" />
        <StatCard label="Total Faculty" value={faculty.length} icon={GraduationCap} trend={2.1} tone="info" />
        <StatCard label="Departments" value={departments.length} icon={Building2} trend={0} hint="active" tone="success" />
        <StatCard label="Active Programs" value={programs.length} icon={BookOpen} trend={8.5} tone="warning" />
        <StatCard label="Placement Stat" value="85%" icon={Award} trend={5.2} tone="success" />
        <StatCard label="Pass Percentage" value="92%" icon={TrendingUp} trend={1.1} tone="primary" />
        <StatCard label="Pending Fees" value={feePending.toLocaleString()} icon={Wallet} trend={-2} tone="warning" />
        <StatCard label="Total Attendance" value="88%" icon={ClipboardList} trend={3} tone="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Attendance Trend</div>
              <div className="text-xs text-muted-foreground">Average weekly attendance %</div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-[var(--success)]">
              <TrendingUp className="size-3" /> +3.2% MoM
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={attendanceTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.21 264)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.55 0.21 264)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="attendance" stroke="var(--primary)" strokeWidth={2.5} fill="url(#ga)" />
              <Line type="monotone" dataKey="target" stroke="var(--muted-foreground)" strokeDasharray="4 4" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-card p-5">
          <div className="mb-4">
            <div className="text-sm font-semibold">Students by Department</div>
            <div className="text-xs text-muted-foreground">Distribution across {departments.length} departments</div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={deptDist} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {deptDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface-card p-5 lg:col-span-2">
          <div className="mb-4">
            <div className="text-sm font-semibold">Performance by Department</div>
            <div className="text-xs text-muted-foreground">Average CGPA across departments</div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={performanceByDept} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="dept" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 10]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="avgCGPA" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-card p-5">
          <div className="mb-4">
            <div className="text-sm font-semibold">Fee Collection</div>
            <div className="text-xs text-muted-foreground">Current semester</div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Paid", value: feePaid, color: "var(--success)" },
              { label: "Pending", value: feePending, color: "var(--warning)" },
              { label: "Overdue", value: feeOverdue, color: "var(--destructive)" },
            ].map((s) => {
              const pct = Math.round((s.value / students.length) * 100);
              return (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{s.label}</span>
                    <span className="text-muted-foreground">{s.value} students · {pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: s.color }} />
                  </div>
                </div>
              );
            })}
            <div className="rounded-lg bg-muted/40 p-3 text-xs">
              <div className="text-muted-foreground">Total collected</div>
              <div className="mt-1 text-2xl font-semibold gradient-text">₹{(feePaid * 85000 / 100000).toFixed(1)}L</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface-card p-5 lg:col-span-2">
          <div className="mb-4">
            <div className="text-sm font-semibold">Enrollment Trend</div>
            <div className="text-xs text-muted-foreground">Year-over-year student and faculty growth</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={enrollmentTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="students" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="faculty" stroke="var(--info)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Recent Activity</div>
              <div className="text-xs text-muted-foreground">Latest system events</div>
            </div>
          </div>
          <ul className="space-y-3">
            {activities.slice(0, 6).map((a) => (
              <li key={a.id} className="flex items-start gap-3 text-sm">
                <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <div className="leading-snug">
                    <span className="font-medium">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.target}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="surface-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Latest Announcements</div>
            <div className="text-xs text-muted-foreground">Across the institute</div>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {announcements.slice(0, 3).map((a) => (
            <div key={a.id} className="rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
              <div className="mb-2 flex items-center justify-between">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  a.priority === "High" ? "bg-destructive/15 text-destructive" :
                  a.priority === "Medium" ? "bg-warning/15 text-[var(--warning)]" :
                  "bg-muted text-muted-foreground"
                }`}>{a.priority}</span>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
              <div className="font-medium text-sm">{a.title}</div>
              <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{a.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FacultyDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Faculty Dashboard" description="Your teaching activity and student insights" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="My Subjects" value={4} icon={BookOpen} trend={0} tone="primary" />
        <StatCard label="Total Students" value={186} icon={Users} trend={2.5} tone="info" />
        <StatCard label="Avg Class Attendance" value="92%" icon={ClipboardList} trend={1.8} tone="success" />
        <StatCard label="Pending Tasks" value={7} icon={Award} trend={-12} tone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface-card p-5 lg:col-span-2">
          <div className="mb-4">
            <div className="text-sm font-semibold">Class Performance Trend</div>
            <div className="text-xs text-muted-foreground">Last 12 weeks</div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={attendanceTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.15 230)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.65 0.15 230)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="attendance" stroke="var(--info)" strokeWidth={2.5} fill="url(#gf)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-card p-5">
          <div className="mb-4 text-sm font-semibold">Today's Schedule</div>
          <ul className="space-y-3">
            {[
              { t: "09:00 - 10:00", s: "Data Structures", r: "CS-101" },
              { t: "11:15 - 12:15", s: "Algorithms", r: "CS-102" },
              { t: "14:00 - 15:00", s: "Lab - DS", r: "Lab-1" },
            ].map((c) => (
              <li key={c.t} className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent transition-colors">
                <div className="flex flex-col items-center justify-center rounded bg-primary/10 px-2 py-1 text-primary">
                  <div className="text-[10px] font-medium">{c.t.split(" - ")[0]}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{c.s}</div>
                  <div className="text-xs text-muted-foreground">{c.r}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StudentDashboard() {
  const { user } = useAuth();
  const me = students.find((s) => s.email === user!.email) || students[24];
  return (
    <div className="space-y-6">
      <PageHeader title={`Hi, ${user!.name.split(" ")[0]}!`} description="Your academic snapshot" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current CGPA" value={me.cgpa.toFixed(2)} icon={Award} trend={2.1} tone="primary" />
        <StatCard label="Attendance" value={`${me.attendance}%`} icon={ClipboardList} trend={1.2} tone="success" />
        <StatCard label="Semester" value={me.semester} icon={BookOpen} hint="Spring 2026" tone="info" />
        <StatCard label="Fee Status" value={me.feeStatus} icon={Wallet} tone={me.feeStatus === "Paid" ? "success" : "warning"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface-card p-5 lg:col-span-2">
          <div className="mb-4 text-sm font-semibold">Subject-wise Attendance</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[
              { sub: "DS", a: 94 }, { sub: "Algo", a: 88 }, { sub: "DBMS", a: 91 },
              { sub: "OS", a: 79 }, { sub: "CN", a: 86 }, { sub: "SE", a: 92 }, { sub: "Math", a: 95 },
            ]} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="sub" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="a" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-card p-5">
          <div className="mb-4 text-sm font-semibold">Upcoming</div>
          <ul className="space-y-3">
            {[
              { t: "Mid-Sem Exam", d: "Jun 14, 2026" },
              { t: "Project Submission", d: "Jun 20, 2026" },
              { t: "Fee Last Date", d: "Jun 20, 2026" },
              { t: "Industrial Visit", d: "Jul 2, 2026" },
            ].map((u) => (
              <li key={u.t} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className="grid size-8 place-items-center rounded-md bg-primary/10 text-primary">
                  <ClipboardList className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{u.t}</div>
                  <div className="text-xs text-muted-foreground">{u.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function HodDashboard() {
  const { user } = useAuth();
  const dept = departments.find(d => d.name === user?.department) || departments[0];
  const deptStudents = students.filter(s => s.department === dept.code);
  const deptFaculty = faculty.filter(f => f.department === dept.code);
  
  return (
    <div className="space-y-6">
      <PageHeader title={`${dept.code} Department Dashboard`} description="Department-level analytics and insights" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Student Count" value={deptStudents.length} icon={Users} trend={0} tone="primary" />
        <StatCard label="Faculty Count" value={deptFaculty.length} icon={GraduationCap} trend={0} tone="info" />
        <StatCard label="Attendance Analytics" value={`${dept.attendancePercentage}%`} icon={ClipboardList} trend={2.1} tone="success" />
        <StatCard label="Results Analytics" value={`${dept.passPercentage}% Pass`} icon={Award} trend={1.5} tone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="surface-card p-5">
          <div className="mb-4">
            <div className="text-sm font-semibold">Fee Analytics</div>
            <div className="text-xs text-muted-foreground">Current semester collection</div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="font-medium">Collection Progress</span>
            <span className="text-muted-foreground">{dept.feeCollectionPercentage}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-success" style={{ width: `${dept.feeCollectionPercentage}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
