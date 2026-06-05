import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import { activities } from "@/lib/mockData";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/_app/audit")({
  head: () => ({ meta: [{ title: "Audit Logs — CampusOS" }] }),
  component: AuditPage,
});

const logs = Array.from({ length: 40 }, (_, i) => {
  const a = activities[i % activities.length];
  return {
    id: `log-${i + 1}`,
    timestamp: new Date(Date.now() - i * 60000 * 17).toISOString().replace("T", " ").slice(0, 19),
    user: a.user,
    action: a.action.toUpperCase(),
    target: a.target,
    ip: `192.168.1.${(i * 7) % 250 + 1}`,
    status: i % 9 === 0 ? "WARN" : "OK",
  };
});

const cols: Column<typeof logs[0]>[] = [
  { key: "timestamp", header: "Timestamp", render: (l) => <span className="font-mono text-xs">{l.timestamp}</span> },
  { key: "user", header: "User" },
  { key: "action", header: "Action", render: (l) => <span className="font-mono text-[11px] rounded bg-muted px-1.5 py-0.5">{l.action}</span> },
  { key: "target", header: "Target" },
  { key: "ip", header: "IP", render: (l) => <span className="font-mono text-xs">{l.ip}</span> },
  {
    key: "status", header: "Status",
    render: (l) => (
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
        l.status === "OK" ? "bg-success/15 text-[var(--success)]" : "bg-warning/15 text-[var(--warning)]"
      }`}>{l.status}</span>
    ),
  },
];

function AuditPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Audit Logs"
        description="Immutable log of every privileged action across the platform"
      />
      <div className="surface-card flex items-center gap-3 p-4">
        <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
          <Shield className="size-5" />
        </div>
        <div className="text-sm">
          <div className="font-medium">All system activity is logged</div>
          <div className="text-xs text-muted-foreground">Logs are retained for 7 years and tamper-evident.</div>
        </div>
      </div>
      <DataTable data={logs} columns={cols} searchKeys={["user", "action", "target", "ip"]} filename="audit-logs" />
    </div>
  );
}
