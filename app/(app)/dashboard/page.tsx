"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MessageSquare, 
  Smile, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Filter,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  Zap
} from "lucide-react";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock feedback data for the feed
  const recentFeedback = [
    {
      id: "fb-1",
      customer: "Sarah Jenkins",
      company: "Acme Corp",
      text: "The checkout page keeps throwing 500 errors when using Stripe billing. Lost 3 customers today because of it.",
      sentiment: "negative",
      category: "Billing / Checkout",
      priority: "high",
      time: "24m ago"
    },
    {
      id: "fb-2",
      customer: "Alex Rivera",
      company: "Stark Labs",
      text: "Is there any plan to support an offline mode? Our field workers frequently lose internet access while recording logs.",
      sentiment: "neutral",
      category: "Feature Request",
      priority: "medium",
      time: "2h ago"
    },
    {
      id: "fb-3",
      customer: "Elena Rostova",
      company: "Fintech Go",
      text: "Loving the new dashboard interface! The reports generation is 10x faster now. Incredible updates this week.",
      sentiment: "positive",
      category: "UX / Performance",
      priority: "low",
      time: "5h ago"
    },
    {
      id: "fb-4",
      customer: "David Kim",
      company: "DesignCo",
      text: "The documentation link on the API endpoints references an old v2 schema that returns errors. Please update.",
      sentiment: "negative",
      category: "Documentation",
      priority: "medium",
      time: "1d ago"
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Here is a summary of your workspace customer intelligence signals.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-zinc-50 px-3 py-2 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600">
            <Calendar className="h-3.5 w-3.5 text-zinc-400" />
            <span>Time Range:</span>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer text-zinc-900 font-bold"
            >
              <option value="7d" className="bg-white text-zinc-900">Last 7 days</option>
              <option value="30d" className="bg-white text-zinc-900">Last 30 days</option>
              <option value="90d" className="bg-white text-zinc-900">Last 90 days</option>
            </select>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl glass px-3.5 py-2 text-xs font-semibold text-zinc-650 hover:text-zinc-900 border border-zinc-200 transition">
            <Download className="h-3.5 w-3.5" />
            Export data
          </button>
        </div>
      </div>

      {/* Grid Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 relative overflow-hidden bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-zinc-500">Total Feedback Logs</span>
            <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-650">
              <MessageSquare className="h-4.5 w-4.5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 tracking-tight">4,819</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-green-600 text-xs font-semibold flex items-center">
              <ArrowUpRight className="h-3.5 w-3.5" />
              14.2%
            </span>
            <span className="text-[10px] text-zinc-400">vs last month</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 relative overflow-hidden bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-zinc-500">Customer CSAT</span>
            <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <Smile className="h-4.5 w-4.5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 tracking-tight">88%</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-green-600 text-xs font-semibold flex items-center">
              <ArrowUpRight className="h-3.5 w-3.5" />
              3.1%
            </span>
            <span className="text-[10px] text-zinc-400">vs last month</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 relative overflow-hidden bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-zinc-500">Critical Issues</span>
            <div className="h-9 w-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <AlertTriangle className="h-4.5 w-4.5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 tracking-tight">5</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-red-650 text-xs font-semibold flex items-center">
              <ArrowDownRight className="h-3.5 w-3.5" />
              -25%
            </span>
            <span className="text-[10px] text-zinc-400">resolved index</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 relative overflow-hidden bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-zinc-500">AI Accuracy Rating</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-650">
              <Zap className="h-4.5 w-4.5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 tracking-tight">99.4%</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-zinc-500 text-xs font-semibold">Self-improving</span>
          </div>
        </div>
      </div>

      {/* Graphs & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Sentiment Trend */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 bg-white lg:col-span-2 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Feedback Sentiment Index</h3>
              <p className="text-zinc-500 text-xs mt-0.5">Tracking sentiment spikes across release cycles.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
              <TrendingUp className="h-3.5 w-3.5" />
              +8.3% Positive shift
            </span>
          </div>

          {/* SVG Line Graph Mockup */}
          <div className="h-56 w-full relative flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Background grid lines */}
              <line x1="0" y1="10" x2="100" y2="10" stroke="#e4e4e7" strokeWidth="0.1" strokeDasharray="1,1" />
              <line x1="0" y1="20" x2="100" y2="20" stroke="#e4e4e7" strokeWidth="0.1" strokeDasharray="1,1" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="#e4e4e7" strokeWidth="0.1" strokeDasharray="1,1" />
              
              {/* Chart Line Path */}
              <path d="M0,32 Q10,25 20,29 T40,15 T60,22 T80,10 T100,5 L100,40 L0,40 Z" fill="url(#gradient-chart)" />
              <path d="M0,32 Q10,25 20,29 T40,15 T60,22 T80,10 T100,5" fill="none" stroke="#6366f1" strokeWidth="1.5" />

              {/* Dots on peak */}
              <circle cx="80" cy="10" r="1.5" fill="#818cf8" />
              <circle cx="100" cy="5" r="1.5" fill="#0ea5e9" />
            </svg>
            <div className="absolute bottom-0 inset-x-0 flex justify-between text-[9px] text-zinc-400 font-semibold font-mono pt-2 border-t border-zinc-150">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>

        {/* Issue distribution categories */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 bg-white flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 mb-1">Issue Distribution</h3>
            <p className="text-zinc-500 text-xs mb-6">Feedback breakdown by main keywords.</p>
          </div>

          <div className="space-y-4">
            <ProgressRow label="Billing & Checkout" percentage={35} color="bg-red-500" count={42} />
            <ProgressRow label="UX & Interface Design" percentage={28} color="bg-indigo-500" count={34} />
            <ProgressRow label="Offline Sync Feature" percentage={22} color="bg-amber-500" count={27} />
            <ProgressRow label="Documentation Errors" percentage={15} color="bg-zinc-400" count={18} />
          </div>

          <div className="pt-4 border-t border-zinc-150 mt-4 text-center">
            <Link 
              href="/trends" 
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1"
            >
              Analyze topic clusters
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Feedbacks Lists */}
      <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">Recent Feedback Feed</h3>
            <p className="text-zinc-500 text-xs mt-0.5">Real-time incoming customer logs from Slack, Intercom, and email.</p>
          </div>
          <Link 
            href="/inbox" 
            className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1"
          >
            Open inbox manager
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-zinc-100">
          {recentFeedback.map((fb) => (
            <div key={fb.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-900">{fb.customer}</span>
                  <span className="text-[10px] text-zinc-500">{fb.company}</span>
                  <span className="text-[10px] text-zinc-300">•</span>
                  <span className="text-[10px] text-zinc-500">{fb.time}</span>
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed font-medium">{fb.text}</p>
              </div>

              {/* Status and category tags */}
              <div className="flex items-center gap-2.5 self-start md:self-center">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-500">
                  {fb.category}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  fb.sentiment === "positive" 
                    ? "bg-green-50 text-green-600 border border-green-100" 
                    : fb.sentiment === "negative"
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                }`}>
                  {fb.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressRow({ label, percentage, color, count }: { label: string, percentage: number, color: string, count: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
        <span className="truncate">{label}</span>
        <span>{percentage}% ({count})</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
