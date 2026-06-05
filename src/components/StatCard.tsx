import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  hint?: string;
  tone?: "primary" | "success" | "warning" | "info";
}

const toneMap = {
  primary: "from-primary/15 to-primary/5 text-primary",
  success: "from-[oklch(0.62_0.16_155)]/15 to-transparent text-[var(--success)]",
  warning: "from-[oklch(0.78_0.16_75)]/15 to-transparent text-[var(--warning)]",
  info: "from-[oklch(0.65_0.15_230)]/15 to-transparent text-[var(--info)]",
};

export function StatCard({ label, value, icon: Icon, trend, hint, tone = "primary" }: Props) {
  const up = (trend ?? 0) >= 0;
  return (
    <div className="surface-card relative overflow-hidden p-5 transition-all hover:shadow-md">
      <div className={`pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br ${toneMap[tone]} blur-2xl opacity-60`} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
          {trend !== undefined && (
            <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${up ? "text-[var(--success)]" : "text-destructive"}`}>
              {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
              {Math.abs(trend)}%
              <span className="text-muted-foreground font-normal">{hint || "vs last month"}</span>
            </div>
          )}
        </div>
        <div className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ${toneMap[tone]}`}>
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}
