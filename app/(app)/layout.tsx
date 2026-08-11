"use client";

import { ReactNode, useState } from "react";
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
  Bell,
  Search,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Feedback Inbox", href: "/inbox", icon: Inbox },
    { name: "Ask LOOP AI", href: "/ask", icon: Zap, badge: "AI" },
    { name: "Trend Analysis", href: "/trends", icon: TrendingUp },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleSignOut = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col md:flex-row relative">
      {/* Background Decorative Gradient */}
      <div className="pointer-events-none absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.02),transparent_40%)]" />

      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-zinc-50/80 border-b border-zinc-200 sticky top-0 z-50 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-xs">
            ◆
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-900">LOOP</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-zinc-500 hover:text-zinc-900 transition p-1"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500 text-white font-bold">
                ◆
              </div>
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
                    <Icon className={`h-4.5 w-4.5 transition-transform group-hover:scale-105 ${isActive ? "text-indigo-600" : "text-zinc-500 group-hover:text-zinc-700"}`} />
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-zinc-900 truncate">Lawrence Dike</p>
              <p className="text-[10px] text-zinc-500 truncate">Workspace Admin</p>
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
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 pl-9 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          </div>

          {/* Quick Actions (Notifications / Profile) */}
          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              className="relative p-2 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
            </button>

            {/* Notification Dropdown */}
            {notificationDropdownOpen && (
              <div className="absolute right-0 top-11 w-80 rounded-2xl glass border border-zinc-200 p-4 shadow-xl z-50 bg-white">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200 mb-3">
                  <span className="text-xs font-semibold text-zinc-900">Notifications</span>
                  <button 
                    onClick={() => setNotificationDropdownOpen(false)}
                    className="text-[10px] text-zinc-500 hover:text-zinc-700"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="text-xs border-b border-zinc-100 pb-2">
                    <p className="text-zinc-800 font-semibold">New negative feedback signal</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">3 minutes ago in Inbox</p>
                  </div>
                  <div className="text-xs">
                    <p className="text-zinc-800 font-semibold">AI Report generation completed</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">1 hour ago in Ask AI</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Workspace Switcher */}
            <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-medium cursor-pointer text-zinc-700 hover:text-zinc-900">
              <span>Personal Workspace</span>
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </div>
          </div>
        </header>

        {/* Page children contents */}
        <main className="flex-1 p-6 md:p-8 animate-fade-in relative">
          {children}
        </main>
      </div>
    </div>
  );
}
