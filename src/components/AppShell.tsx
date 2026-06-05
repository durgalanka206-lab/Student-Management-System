import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  LayoutDashboard, Users, GraduationCap, Building2, BookOpen, FileText,
  CalendarClock, Wallet, Megaphone, BarChart3, ClipboardList, UserCircle,
  Bell, LogOut, Moon, Sun, Menu, X, Shield, FileBarChart, BookMarked,
  PenSquare, Award, NotebookPen, MailQuestion, ChevronDown,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import type { Role } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

const NAV: Record<Role, { section: string; items: NavItem[] }[]> = {
  super_admin: [
    {
      section: "Overview",
      items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
    },
    {
      section: "Academics",
      items: [
        { to: "/students", label: "Students", icon: Users },
        { to: "/faculty", label: "Faculty", icon: GraduationCap },
        { to: "/departments", label: "Departments", icon: Building2 },
        { to: "/courses", label: "Courses", icon: BookOpen },
        { to: "/subjects", label: "Subjects", icon: BookMarked },
      ],
    },
    {
      section: "Operations",
      items: [
        { to: "/attendance", label: "Attendance", icon: ClipboardList },
        { to: "/results", label: "Results", icon: Award },
        { to: "/timetable", label: "Timetable", icon: CalendarClock },
        { to: "/fees", label: "Fee Management", icon: Wallet },
      ],
    },
    {
      section: "Insights",
      items: [
        { to: "/announcements", label: "Announcements", icon: Megaphone },
        { to: "/reports", label: "Reports", icon: BarChart3 },
        { to: "/audit", label: "Audit Logs", icon: Shield },
      ],
    },
  ],
  admin: [
    { section: "Overview", items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] },
    {
      section: "Academics",
      items: [
        { to: "/students", label: "Students", icon: Users },
        { to: "/faculty", label: "Faculty", icon: GraduationCap },
        { to: "/departments", label: "Departments", icon: Building2 },
        { to: "/courses", label: "Courses", icon: BookOpen },
        { to: "/subjects", label: "Subjects", icon: BookMarked },
      ],
    },
    {
      section: "Operations",
      items: [
        { to: "/attendance", label: "Attendance", icon: ClipboardList },
        { to: "/results", label: "Results", icon: Award },
        { to: "/timetable", label: "Timetable", icon: CalendarClock },
        { to: "/fees", label: "Fee Management", icon: Wallet },
      ],
    },
    {
      section: "Communication",
      items: [
        { to: "/announcements", label: "Announcements", icon: Megaphone },
        { to: "/reports", label: "Reports", icon: BarChart3 },
      ],
    },
  ],
  faculty: [
    { section: "Overview", items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] },
    {
      section: "Teaching",
      items: [
        { to: "/mark-attendance", label: "Mark Attendance", icon: PenSquare },
        { to: "/upload-marks", label: "Upload Marks", icon: NotebookPen },
        { to: "/my-subjects", label: "My Subjects", icon: BookMarked },
        { to: "/student-performance", label: "Student Performance", icon: BarChart3 },
      ],
    },
    {
      section: "Schedule",
      items: [
        { to: "/timetable", label: "Timetable", icon: CalendarClock },
        { to: "/announcements", label: "Notifications", icon: Bell },
      ],
    },
  ],
  student: [
    { section: "Overview", items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] },
    {
      section: "Academics",
      items: [
        { to: "/profile", label: "Profile", icon: UserCircle },
        { to: "/my-attendance", label: "Attendance", icon: ClipboardList },
        { to: "/my-results", label: "Results", icon: Award },
        { to: "/timetable", label: "Timetable", icon: CalendarClock },
      ],
    },
    {
      section: "Services",
      items: [
        { to: "/fee-status", label: "Fee Status", icon: Wallet },
        { to: "/announcements", label: "Announcements", icon: Megaphone },
        { to: "/leave-requests", label: "Leave Requests", icon: MailQuestion },
      ],
    },
  ],
};

const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Administrator",
  faculty: "Faculty",
  student: "Student",
};

export function AppShell() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const sections = useMemo(() => (user ? NAV[user.role] : []), [user]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="grid size-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            <GraduationCap className="size-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-base font-semibold tracking-tight text-sidebar-foreground">CampusOS</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Enterprise ERP</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {sections.map((sec) => (
            <div key={sec.section}>
              <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {sec.section}
              </div>
              <ul className="space-y-0.5">
                {sec.items.map((item) => {
                  const active = path === item.to;
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        <Icon className={`size-4 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                        <span>{item.label}</span>
                        {active && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="rounded-lg bg-sidebar-accent/50 p-3">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary text-sm font-semibold">
                {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-sidebar-foreground">{user.name}</div>
                <div className="truncate text-xs text-muted-foreground">{ROLE_LABEL[user.role]}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/70 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
                <Menu className="size-5" />
              </Button>
              <div>
                <div className="text-xs text-muted-foreground">{ROLE_LABEL[user.role]} Portal</div>
                <div className="text-sm font-semibold tracking-tight">Welcome back, {user.name.split(" ")[0]}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="size-4" />
                <span className="absolute top-2 right-2 size-2 rounded-full bg-destructive" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2 pr-3">
                    <div className="grid size-7 place-items-center rounded-full bg-primary/15 text-primary text-xs font-semibold">
                      {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
                    <UserCircle className="mr-2 size-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 size-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
