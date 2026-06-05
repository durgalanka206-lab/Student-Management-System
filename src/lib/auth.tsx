import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "./mockData";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department?: string;
  rollNo?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Demo accounts. Password = "demo1234" for all.
const DEMO_USERS: AuthUser[] = [
  { id: "u-super", name: "System Admin", email: "super@idealcollege.edu.in", role: "super_admin", department: "Administration" },
  { id: "u-principal", name: "Dr. Principal", email: "principal@idealcollege.edu.in", role: "principal", department: "Administration" },
  { id: "u-hod", name: "Prof. HOD", email: "hod.cs@idealcollege.edu.in", role: "hod", department: "Computer Science Department" },
  { id: "u-faculty", name: "Dr. Anita Sharma", email: "anita.sharma@idealcollege.edu.in", role: "faculty", department: "Computer Science Department" },
  { id: "u-accounts", name: "Accounts Manager", email: "accounts@idealcollege.edu.in", role: "accounts_staff", department: "Accounts" },
  { id: "u-library", name: "Librarian", email: "library@idealcollege.edu.in", role: "library_staff", department: "Library" },
  { id: "u-student", name: "Aarav Patel", email: "2330401611025@idealcollege.edu.in", role: "student", department: "Computer Science Department", rollNo: "2330401611025" },
];

const STORAGE_KEY = "campusos.session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const normalized = email.trim().toLowerCase();
    if (!normalized.endsWith("@idealcollege.edu.in")) {
      throw new Error("Only @idealcollege.edu.in emails are allowed.");
    }
    if (password !== "demo1234") {
      throw new Error("Invalid credentials. Use demo password: demo1234");
    }
    let found = DEMO_USERS.find((u) => u.email.toLowerCase() === normalized);
    if (!found) {
      // Auto-create student account if matches numeric roll pattern
      const local = normalized.split("@")[0];
      if (/^\d{10,15}$/.test(local)) {
        found = {
          id: `u-${local}`,
          name: "Student User",
          email: normalized,
          role: "student",
          rollNo: local,
          department: "CSE",
        };
      } else {
        throw new Error("Account not found. Try a demo account.");
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    setUser(found);
    return found;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const DEMO_ACCOUNTS = DEMO_USERS.map((u) => ({
  email: u.email,
  role: u.role,
  name: u.name,
}));
