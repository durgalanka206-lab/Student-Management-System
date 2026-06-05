import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, Loader2, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_ACCOUNTS, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — CampusOS" }] }),
  component: LoginPage,
});

const EMAIL_DOMAIN = "@idealcollege.edu.in";

function validateEmail(email: string): string | null {
  const v = email.trim().toLowerCase();
  if (!v) return "Email is required.";
  if (!/^\S+@\S+\.\S+$/.test(v)) return "Enter a valid email address.";
  if (!v.endsWith(EMAIL_DOMAIN))
    return `Only ${EMAIL_DOMAIN} email addresses are allowed. Gmail, Yahoo, Outlook and external providers are blocked.`;
  
  // Student emails must be exactly 13 digits roll number. Staff/admin use named emails or specific demo rules.
  // Wait, if staff and admin emails are allowed, they don't match the 13 digit regex. 
  // The requirement says: "Student email format must be XXXXXXXXXXXXX@idealcollege.edu.in. Validation Regex: ^\\d{13}@idealcollege\\.edu\\.in$"
  const local = v.split("@")[0];
  if (/^\d/.test(local)) {
    if (!/^\d{13}$/.test(local)) {
      return "Student emails must use a valid 13-digit numeric roll number (e.g. 2230401611025).";
    }
  }
  return null;
}

function LoginPage() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard", replace: true });
  }, [user, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const emailErr = validateEmail(email);
    if (emailErr) { setErr(emailErr); return; }
    if (!password) { setErr("Password is required."); return; }
    setSubmitting(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name.split(" ")[0]}`);
      navigate({ to: "/dashboard", replace: true });
    } catch (e: any) {
      setErr(e.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const useDemo = (em: string) => {
    setEmail(em);
    setPassword("demo1234");
    setErr(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 size-[480px] rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
        <div className="absolute -bottom-40 -right-32 size-[520px] rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Marketing panel */}
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-border">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
              <GraduationCap className="size-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold tracking-tight">CampusOS</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Enterprise ERP</div>
            </div>
          </div>

          <div className="max-w-md space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="size-3 text-primary" /> Trusted by 200+ institutions
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight">
              The complete <span className="gradient-text">College ERP</span> for the modern campus.
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Manage students, faculty, attendance, results, fees and timetables from a single, beautifully designed enterprise platform.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "500+", v: "Students" },
                { k: "50+", v: "Faculty" },
                { k: "8", v: "Departments" },
                { k: "40", v: "Courses" },
              ].map((s) => (
                <div key={s.v} className="surface-card p-4">
                  <div className="text-2xl font-semibold gradient-text">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" />
            SOC 2 compliant · End-to-end encrypted · Role-based access control
          </div>
        </div>

        {/* Form panel */}
        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8 animate-fade-in">
            <div className="lg:hidden flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
                <GraduationCap className="size-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold tracking-tight">CampusOS</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Enterprise ERP</div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Sign in to your account</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Access is restricted to verified <span className="font-medium text-foreground">{EMAIL_DOMAIN}</span> accounts.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">College Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={`yourname${EMAIL_DOMAIN}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs text-primary hover:underline" onClick={() => toast.info("Contact your administrator to reset your password.")}>
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 h-11"
                  />
                </div>
              </div>

              {err && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive animate-slide-in">
                  {err}
                </div>
              )}

              <Button type="submit" className="w-full h-11 font-medium" disabled={submitting}>
                {submitting ? <><Loader2 className="mr-2 size-4 animate-spin" /> Signing in...</> : "Sign in"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Self-registration is disabled. Contact your administrator for an account.
              </p>
            </form>

            <div className="surface-card p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Sparkles className="size-3 text-primary" /> Demo accounts
              </div>
              <div className="grid gap-2">
                {DEMO_ACCOUNTS.map((a) => (
                  <button
                    key={a.email}
                    type="button"
                    onClick={() => useDemo(a.email)}
                    className="flex items-center justify-between rounded-md border border-border bg-background/60 px-3 py-2 text-left text-xs hover:border-primary/50 hover:bg-accent transition-all"
                  >
                    <div>
                      <div className="font-medium text-foreground">{a.name}</div>
                      <div className="text-muted-foreground">{a.email}</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-primary">{a.role.replace("_", " ")}</span>
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-muted-foreground">Password for all demo accounts: <span className="font-mono text-foreground">demo1234</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
