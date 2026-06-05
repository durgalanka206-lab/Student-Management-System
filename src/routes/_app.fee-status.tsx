import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Wallet, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { students } from "@/lib/mockData";

export const Route = createFileRoute("/_app/fee-status")({
  head: () => ({ meta: [{ title: "Fee Status — CampusOS" }] }),
  component: FeeStatusPage,
});

const transactions = [
  { id: "TXN78321", date: "2026-01-15", desc: "Semester 4 Tuition Fee", amount: 75000, status: "Paid" },
  { id: "TXN78322", date: "2026-01-15", desc: "Library & Lab Fee", amount: 8000, status: "Paid" },
  { id: "TXN78323", date: "2026-01-15", desc: "Examination Fee", amount: 2000, status: "Paid" },
  { id: "TXN65441", date: "2025-08-10", desc: "Semester 3 Tuition Fee", amount: 75000, status: "Paid" },
  { id: "TXN65442", date: "2025-08-10", desc: "Hostel Fee", amount: 45000, status: "Paid" },
];

function FeeStatusPage() {
  const { user } = useAuth();
  const me = students.find((s) => s.email === user!.email) || students[24];
  const total = transactions.reduce((a, t) => a + t.amount, 0);
  return (
    <div className="space-y-6">
      <PageHeader title="Fee Status" description="Payment history and outstanding dues" />

      <div className="surface-card relative overflow-hidden p-6">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "var(--gradient-primary)" }} />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Current Semester · Status</div>
            <div className="mt-2 flex items-center gap-3">
              <CheckCircle2 className="size-7 text-[var(--success)]" />
              <span className="text-3xl font-semibold">{me.feeStatus === "Paid" ? "All Clear" : me.feeStatus}</span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">No outstanding dues for Semester {me.semester}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Total paid</div>
            <div className="mt-1 text-3xl font-semibold gradient-text">₹{total.toLocaleString("en-IN")}</div>
            <Button variant="outline" size="sm" className="mt-3 gap-2"><Download className="size-4" /> Download Receipt</Button>
          </div>
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="border-b border-border bg-muted/40 px-5 py-3 text-sm font-semibold">Payment History</div>
        <ul className="divide-y divide-border">
          {transactions.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-success/10 text-[var(--success)]">
                  <Wallet className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">{t.desc}</div>
                  <div className="text-xs text-muted-foreground">{t.id} · {t.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{t.amount.toLocaleString("en-IN")}</div>
                <div className="text-[10px] uppercase font-semibold tracking-wider text-[var(--success)]">{t.status}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
