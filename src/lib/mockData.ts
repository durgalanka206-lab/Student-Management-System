// Deterministic mock data generator for Ideal College CampusOS demo
export type Role = "super_admin" | "principal" | "hod" | "faculty" | "student" | "accounts_staff" | "library_staff";

export interface Department {
  id: string;
  code: string;
  name: string;
  hod: string;
  faculty: number;
  students: number;
  passPercentage: number;
  placementPercentage: number;
  attendancePercentage: number;
  feeCollectionPercentage: number;
}

export interface Program {
  id: string;
  code: string;
  name: string;
  department: string;
  duration: string;
  seats: number;
  enrolled: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  program: string;
  semester: number;
  credits: number;
  faculty: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  department: string;
  program: string;
  semester: number;
  cgpa: number;
  attendance: number;
  feeStatus: "Paid" | "Pending" | "Overdue";
  status: "Active" | "Inactive";
  phone: string;
  joined: string;
}

export interface Faculty {
  id: string;
  empId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  experience: number;
  subjects: number;
  status: "Active" | "On Leave";
  phone: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: "All" | "Students" | "Faculty";
  date: string;
  author: string;
  priority: "High" | "Medium" | "Low";
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

// Seeded RNG for deterministic data
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
const pick = <T>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
const num = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Reyansh", "Ayaan", "Krishna",
  "Ishaan", "Shaurya", "Atharv", "Advik", "Pranav", "Dhruv", "Kabir", "Rudra",
  "Ananya", "Diya", "Aadhya", "Saanvi", "Aanya", "Pari", "Myra", "Sara",
  "Iraa", "Kiara", "Anika", "Navya", "Riya", "Tara", "Aarohi", "Anvi",
];
const lastNames = [
  "Sharma", "Verma", "Patel", "Reddy", "Iyer", "Nair", "Khan", "Gupta",
  "Singh", "Kumar", "Joshi", "Rao", "Menon", "Desai", "Kapoor", "Mehta",
  "Chopra", "Bose", "Ghosh", "Das", "Mishra", "Bhat", "Pillai", "Shetty",
];

const name = () => `${pick(firstNames)} ${pick(lastNames)}`;
const date = (daysAgo: number) =>
  new Date(Date.now() - num(0, daysAgo) * 86400000).toISOString().slice(0, 10);

const departmentsList = [
  { code: "CS", name: "Computer Science Department" },
  { code: "MGMT", name: "Management Department" },
  { code: "AGRI", name: "Agriculture & Allied Sciences Department" },
];

const programsList = [
  { code: "BCA", name: "BCA", dept: "CS", duration: "3 Years" },
  { code: "BSC-CS", name: "B.Sc Computer Science", dept: "CS", duration: "3 Years" },
  { code: "BSC-AI", name: "B.Sc Artificial Intelligence", dept: "CS", duration: "3 Years" },
  { code: "BBA", name: "BBA", dept: "MGMT", duration: "3 Years" },
  { code: "FT", name: "Food Technology", dept: "AGRI", duration: "4 Years" },
  { code: "FS", name: "Food Science", dept: "AGRI", duration: "3 Years" },
  { code: "FISH", name: "Fisheries Science", dept: "AGRI", duration: "4 Years" },
];

export const departments: Department[] = departmentsList.map((d, i) => ({
  id: `dept-${i + 1}`,
  code: d.code,
  name: d.name,
  hod: name(),
  faculty: d.code === "CS" ? 45 : d.code === "MGMT" ? 25 : 30, // total 100
  students: d.code === "CS" ? 500 : d.code === "MGMT" ? 250 : 250, // total 1000
  passPercentage: num(85, 98),
  placementPercentage: num(75, 95),
  attendancePercentage: num(80, 95),
  feeCollectionPercentage: num(88, 99),
}));

export const programs: Program[] = programsList.map((p, i) => {
  const seats = num(60, 120);
  return {
    id: `prog-${i + 1}`,
    code: p.code,
    name: p.name,
    department: p.dept,
    duration: p.duration,
    seats,
    enrolled: num(Math.floor(seats * 0.8), seats),
  };
});

export const faculty: Faculty[] = Array.from({ length: 100 }, (_, i) => {
  const dept = i < 45 ? departments[0] : i < 70 ? departments[1] : departments[2];
  return {
    id: `fac-${i + 1}`,
    empId: `FAC${2000 + i}`,
    name: name(),
    email: `${pick(firstNames).toLowerCase()}.${pick(lastNames).toLowerCase()}@idealcollege.edu.in`,
    department: dept.code,
    designation: pick(["Professor", "Associate Professor", "Assistant Professor"]),
    experience: num(1, 25),
    subjects: num(1, 4),
    status: rand() > 0.05 ? "Active" : "On Leave",
    phone: `+91 9${num(100000000, 999999999)}`,
  };
});

export const students: Student[] = Array.from({ length: 1000 }, (_, i) => {
  const dept = i < 500 ? departments[0] : i < 750 ? departments[1] : departments[2];
  const progs = programs.filter((c) => c.department === dept.code);
  const prog = pick(progs);
  
  // Base year 2023, so students can be in sem 1-6/8
  const baseYear = 23; 
  const rollBase = `${baseYear}3040161${1000 + i}`;
  
  return {
    id: `stu-${i + 1}`,
    rollNo: rollBase,
    name: name(),
    email: `${rollBase}@idealcollege.edu.in`,
    department: dept.code,
    program: prog.name,
    semester: num(1, prog.duration === "4 Years" ? 8 : 6),
    cgpa: +(rand() * 4 + 6).toFixed(2),
    attendance: num(60, 99),
    feeStatus: pick(["Paid", "Paid", "Paid", "Pending", "Overdue"] as const),
    status: rand() > 0.02 ? "Active" : "Inactive",
    phone: `+91 9${num(100000000, 999999999)}`,
    joined: date(1000),
  };
});

export const subjects: Subject[] = (() => {
  const specificSubjects: Record<string, string[]> = {
    "BCA": ["Programming in C", "Data Structures", "Database Management Systems", "Operating Systems", "Computer Networks", "Web Technologies", "Software Engineering"],
    "BSC-CS": ["Data Structures", "DBMS", "Operating Systems", "Computer Networks", "Python Programming", "Java Programming", "Software Engineering"],
    "BSC-AI": ["Python", "Machine Learning", "Deep Learning", "Data Science", "Statistics", "AI Fundamentals", "Neural Networks"],
    "BBA": ["Marketing", "Finance", "Human Resource Management", "Business Communication", "Accounting", "Entrepreneurship"],
    "FT": ["Food Microbiology", "Food Chemistry", "Food Processing", "Quality Control"],
    "FS": ["Food Biochemistry", "Nutrition", "Food Safety", "Dietetics"],
    "FISH": ["Aquaculture", "Marine Biology", "Fisheries Management", "Post Harvest Technology"],
  };
  
  const allSubs: Subject[] = [];
  let subId = 1;
  for (const prog of programsList) {
    const subs = specificSubjects[prog.code] || ["Core Subject 1", "Core Subject 2", "Lab 1"];
    subs.forEach((s) => {
      allSubs.push({
        id: `sub-${subId}`,
        code: `${prog.code.substring(0, 3).toUpperCase()}${100 + subId}`,
        name: s,
        program: prog.code,
        semester: num(1, 6),
        credits: num(3, 4),
        faculty: pick(faculty).name,
      });
      subId++;
    });
  }
  return allSubs;
})();

export const announcements: Announcement[] = [
  { id: "a1", title: "Mid-Semester Exam Schedule Released", body: "The mid-semester examination schedule has been published.", audience: "Students", date: date(2), author: "Examination Cell", priority: "High" },
  { id: "a2", title: "Guest Lecture on AI", body: "Guest lecture on AI advancements tomorrow at Seminar Hall.", audience: "All", date: date(5), author: "HOD CS", priority: "Medium" },
  { id: "a3", title: "Fee Payment Reminder", body: "Last date for semester fee payment is approaching.", audience: "Students", date: date(12), author: "Accounts Staff", priority: "High" },
];

export const activities: Activity[] = [
  { id: "act1", user: "Faculty", action: "marked attendance for", target: "Data Structures", time: "5 min ago" },
  { id: "act2", user: "Admin", action: "added new student", target: "2330401611501", time: "12 min ago" },
  { id: "act3", user: "Accounts Staff", action: "received fee payment from", target: "2330401611025", time: "1 hr ago" },
];

export const attendanceTrend = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  attendance: num(80, 95),
  target: 85,
}));

export const performanceByDept = departments.map((d) => ({
  dept: d.code,
  avgCGPA: +(rand() * 2 + 7).toFixed(2),
  pass: d.passPercentage,
}));

export const enrollmentTrend = Array.from({ length: 6 }, (_, i) => ({
  year: `${2021 + i}`,
  students: num(800, 1000),
  faculty: num(80, 100),
}));

export const timetable = (() => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    { time: "09:00 - 09:55", type: "theory" },
    { time: "10:00 - 10:55", type: "theory" },
    { time: "11:00 - 11:55", type: "theory" },
    { time: "12:00 - 12:55", type: "theory" },
    { time: "13:00 - 14:00", type: "lunch" },
    { time: "14:00 - 14:55", type: "lab" },
    { time: "15:00 - 15:55", type: "lab" },
  ];
  
  const bcaSubs = subjects.filter(s => s.program === "BCA");
  
  return days.map(day => {
    return {
      day,
      slots: timeSlots.map(slot => {
        if (slot.type === "lunch") {
          return { time: slot.time, subject: "Lunch Break", isBreak: true };
        }
        const isLab = slot.type === "lab" && rand() > 0.5;
        const sub = pick(bcaSubs);
        return {
          time: slot.time,
          subject: isLab ? `${sub.name} Lab` : sub.name,
          faculty: sub.faculty,
          room: isLab ? `Lab-${num(1, 10)}` : `Room-${num(101, 305)}`,
          isLab,
          code: sub.code
        };
      })
    };
  });
})();

export const studentMarks = [
  { subject: "Data Structures", code: "CS301", credits: 4, internal: 28, external: 62, total: 90, grade: "A+" },
];
