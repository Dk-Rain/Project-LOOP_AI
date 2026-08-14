"use client";

import { ReactNode, useState, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Zap,
  TrendingUp,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [user, setUser] = useState<{ name: string; role: string; workspaceName?: string; workspaceId?: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Feedback Inbox", href: "/inbox", icon: Inbox },
    { name: "Ask LOOP AI", href: "/ask", icon: Zap, badge: "AI" },
    { name: "Trend Analysis", href: "/trends", icon: TrendingUp },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const initials = (name?: string) => {
    const parts = name?.trim().split(/\s+/).filter(Boolean) || [];
    if (!parts.length) return "?";
    return `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ""}`.toUpperCase();
  };

  const handleGlobalSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && globalSearch.trim()) {
      router.push(`/inbox?search=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col md:flex-row relative">
      {/* Background Decorative Gradient */}
      <div className="pointer-events-none absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.02),transparent_40%)]" />

      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center gap-3 px-6 py-4 bg-zinc-50/80 border-b border-zinc-200 sticky top-0 z-50 backdrop-blur-md">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="text-zinc-500 hover:text-zinc-900 transition p-1"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/loop icon.png"
            alt="LOOP Logo"
            className="h-7 w-7 object-contain rounded-lg"
          />
          <span className="text-sm font-bold tracking-tight text-zinc-900">LOOP</span>
        </Link>
      </header>

      {/* Sidebar Navigation - Desktop */}
      <aside className={`
        fixed inset-0 z-40 bg-zinc-50 md:sticky md:block md:w-64 md:border-r border-zinc-200 px-4 py-6 flex flex-col justify-between
        transition-transform duration-300 md:translate-x-0
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="space-y-6">
          {/* Logo & Mobile close button */}
          <div className="flex items-center justify-between px-2">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/loop icon.png"
                alt="LOOP Logo"
                className="h-8 w-8 object-contain rounded-lg"
              />
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-650 bg-clip-text text-transparent font-extrabold">
                LOOP
              </span>
            </Link>
            <button 
              className="md:hidden text-zinc-500 hover:text-zinc-900 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition duration-200 group
                    ${isActive 
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-100" 
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 border border-transparent"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {item.href === "/ask" ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-indigo-200 bg-white shadow-[0_3px_0_#c7d2fe,0_6px_10px_rgba(79,70,229,0.16)] transition-transform group-hover:-translate-y-0.5">
                        <img src="/loop icon.png" alt="" className="h-4.5 w-4.5 rounded object-contain" />
                      </span>
                    ) : (
                      <span className={`flex h-6 w-6 items-center justify-center rounded-lg border text-white shadow-[0_3px_0_rgba(49,46,129,0.75),0_6px_10px_rgba(79,70,229,0.24)] transition-transform group-hover:-translate-y-0.5 ${
                        isActive ? "border-indigo-300 bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-700" : "border-violet-300/70 bg-gradient-to-br from-violet-400 via-indigo-500 to-indigo-700"
                      }`}>
                        <Icon className="h-3.5 w-3.5 drop-shadow-sm" strokeWidth={2.5} />
                      </span>
                    )}
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile block & Signout */}
        <div className="border-t border-zinc-200 pt-4 space-y-2">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-600" aria-label={`${user?.name || "User"} avatar`}>
              {initials(user?.name)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-zinc-900 truncate">{user?.name || "Loading..."}</p>
              <p className="text-[10px] text-zinc-500 truncate">
                {user?.role === "ADMIN" ? "Admin" : user?.role === "ANALYST" ? "Analyst" : "Viewer"}
                {user?.workspaceName && ` (${user.workspaceName})`}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen">
        {/* Top Header - Search & Profile Actions */}
        <header className="hidden md:flex h-16 items-center justify-between border-b border-zinc-200 px-8 bg-white/80 backdrop-blur-sm z-35">
          {/* Global Search Bar */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search feedback logs, insights..."
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
              onKeyDown={handleGlobalSearch}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 pl-9 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-700">
              <span>{user?.workspaceName || user?.workspaceId || "Workspace"}</span>
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </div>
          </div>
        </header>

        {/* Page children contents */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 animate-fade-in relative">
          {children}
        </main>
      </div>
    </div>
  );
}
