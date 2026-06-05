import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Calendar } from "lucide-react";

export const Route = createFileRoute("/_app/leave-requests")({
  head: () => ({ meta: [{ title: "Leave Requests — CampusOS" }] }),
  component: LeavePage,
});

const seed = [
  { id: 1, type: "Medical", from: "2026-05-10", to: "2026-05-12", days: 3, reason: "Fever and viral infection", status: "Approved" },
  { id: 2, type: "Personal", from: "2026-04-22", to: "2026-04-22", days: 1, reason: "Family wedding", status: "Approved" },
  { id: 3, type: "Academic", from: "2026-03-15", to: "2026-03-17", days: 3, reason: "Inter-college competition at IIT Bombay", status: "Pending" },
];

function LeavePage() {
  const [items, setItems] = useState(seed);
  const [form, setForm] = useState({ type: "Medical", from: "", to: "", reason: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.reason) {
      toast.error("Please fill all fields");
      return;
    }
    const days = Math.max(1, Math.ceil((new Date(form.to).getTime() - new Date(form.from).getTime()) / 86400000) + 1);
    setItems([{ id: Date.now(), ...form, days, status: "Pending" }, ...items]);
    setForm({ type: "Medical", from: "", to: "", reason: "" });
    toast.success("Leave request submitted");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Leave Requests" description="Submit and track your leave applications" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <form onSubmit={submit} className="surface-card p-5 space-y-4">
          <div className="font-semibold">New Request</div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Medical">Medical</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label>From</Label>
              <Input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Input type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Reason</Label>
            <Textarea rows={4} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="Explain the reason for leave..." />
          </div>
          <Button type="submit" className="w-full gap-2"><Plus className="size-4" /> Submit Request</Button>
        </form>

        <div className="lg:col-span-2 space-y-3">
          <div className="text-sm font-semibold">Request History</div>
          {items.map((r) => (
            <div key={r.id} className="surface-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{r.type} Leave</span>
                      <span className="text-xs text-muted-foreground">· {r.days} day{r.days > 1 ? "s" : ""}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{r.from} → {r.to}</div>
                    <div className="mt-1 text-sm">{r.reason}</div>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                  r.status === "Approved" ? "bg-success/15 text-[var(--success)]" :
                  r.status === "Pending" ? "bg-warning/15 text-[var(--warning)]" :
                  "bg-destructive/15 text-destructive"
                }`}>{r.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
