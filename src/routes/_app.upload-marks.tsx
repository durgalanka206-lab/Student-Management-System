import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { students } from "@/lib/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_app/upload-marks")({
  head: () => ({ meta: [{ title: "Upload Marks — CampusOS" }] }),
  component: UploadMarksPage,
});

function UploadMarksPage() {
  const classList = students.filter((s) => s.department === "CSE" && s.semester === 4).slice(0, 25);
  const [marks, setMarks] = useState<Record<string, { internal: string; external: string }>>({});

  const update = (id: string, k: "internal" | "external", v: string) => {
    setMarks({ ...marks, [id]: { ...marks[id], [k]: v } });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Upload Marks"
        description="Enter internal and external marks per student"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Upload className="size-4" /> Bulk Upload</Button>
            <Button className="gap-2" onClick={() => toast.success("Marks submitted for review")}>
              <Save className="size-4" /> Submit
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">Subject</div>
          <Select defaultValue="ds">
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ds">CS301 · Data Structures</SelectItem>
              <SelectItem value="algo">CS302 · Algorithms</SelectItem>
              <SelectItem value="dbms">CS303 · DBMS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">Exam Type</div>
          <Select defaultValue="mid">
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="mid">Mid-Semester</SelectItem>
              <SelectItem value="end">End-Semester</SelectItem>
              <SelectItem value="assign">Assignment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">Max Marks</div>
          <div className="mt-1 text-sm font-medium">30 internal / 70 external</div>
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="grid grid-cols-12 gap-4 border-b border-border bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-6">Student</div>
          <div className="col-span-3">Internal /30</div>
          <div className="col-span-3">External /70</div>
        </div>
        <ul className="divide-y divide-border">
          {classList.map((s) => (
            <li key={s.id} className="grid grid-cols-12 items-center gap-4 px-4 py-2.5">
              <div className="col-span-6 flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary text-xs font-semibold">
                  {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.rollNo}</div>
                </div>
              </div>
              <div className="col-span-3">
                <Input type="number" max={30} min={0} placeholder="—" value={marks[s.id]?.internal || ""} onChange={(e) => update(s.id, "internal", e.target.value)} />
              </div>
              <div className="col-span-3">
                <Input type="number" max={70} min={0} placeholder="—" value={marks[s.id]?.external || ""} onChange={(e) => update(s.id, "external", e.target.value)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
