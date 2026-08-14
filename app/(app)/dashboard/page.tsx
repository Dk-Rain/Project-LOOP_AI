"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { 
  MessageSquare, 
  Smile, 
  AlertTriangle, 
  ArrowUpRight, 
  TrendingUp, 
  Calendar,
  Zap,
  ArrowRight
} from "lucide-react";

interface FeedbackItem {
  id: string;
  customerName: string | null;
  customerEmail: string | null;
  content: string;
  sentiment: string;
  channel: string;
  createdAt: string;
  themes: Array<{ id: string; name: string }>;
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    metrics: {
      totalCount: number;
      positiveCount: number;
      neutralCount: number;
      negativeCount: number;
      percentNegative: number;
      newThisWeekCount: number;
      csatPercent: number;
      avgScore: number;
    };
    themeCounts: Array<{ name: string; count: number }>;
    recentFeedbacks: FeedbackItem[];
    volumePoints: Array<{ label: string; count: number }>;
  } | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/analytics?timeRange=${timeRange}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((payload) => {
        if (payload.success) {
          setData(payload);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [timeRange]);

  const metrics = data?.metrics || {
    totalCount: 0,
    positiveCount: 0,
    neutralCount: 0,
    negativeCount: 0,
    percentNegative: 0,
    newThisWeekCount: 0,
    csatPercent: 0,
    avgScore: 0,
  };

  const recentFeedback = data?.recentFeedbacks || [];
  const themeCounts = data?.themeCounts || [];
  const volumePoints = data?.volumePoints || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Real-time summaries of customer feedback insights and metrics.</p>
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
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-96 gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-650 border-indigo-600 border-t-transparent" />
          <p className="text-zinc-500 text-sm font-medium">Aggregating workspace intelligence signals...</p>
        </div>
      ) : (
        <>
          {/* Grid Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1: Total Feedback */}
            <div className="glass p-6 rounded-2xl border border-zinc-200 relative overflow-hidden bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-500">Total Feedbacks</span>
                <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-zinc-900 tracking-tight">{metrics.totalCount}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-indigo-600 text-xs font-semibold flex items-center">
                  Active Period
                </span>
              </div>
            </div>

            {/* Metric 2: CSAT Percentage */}
            <div className="glass p-6 rounded-2xl border border-zinc-200 relative overflow-hidden bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-500">Customer CSAT</span>
                <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <Smile className="h-4.5 w-4.5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-zinc-900 tracking-tight">{metrics.csatPercent}%</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-zinc-500 text-xs font-semibold">Mapped from sentiment scores</span>
              </div>
            </div>

            {/* Metric 3: % Negative Feedback */}
            <div className="glass p-6 rounded-2xl border border-zinc-200 relative overflow-hidden bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-500">Negative Ratios</span>
                <div className="h-9 w-9 rounded-xl bg-red-50 flex items-center justify-center text-red-650">
                  <AlertTriangle className="h-4.5 w-4.5 text-red-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-zinc-900 tracking-tight">{metrics.percentNegative}%</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-red-600 text-xs font-semibold">
                  {metrics.negativeCount} tickets need review
                </span>
              </div>
            </div>

            {/* Metric 4: New This Week */}
            <div className="glass p-6 rounded-2xl border border-zinc-200 relative overflow-hidden bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-500">New This Week</span>
                <div className="h-9 w-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Zap className="h-4.5 w-4.5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-zinc-900 tracking-tight">{metrics.newThisWeekCount}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-purple-600 text-xs font-semibold">Fresh customer feeds</span>
              </div>
            </div>
          </div>

          {/* Graphs & Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Sentiment Trend */}
            <div className="glass p-6 rounded-2xl border border-zinc-200 bg-white lg:col-span-2 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Feedback Volume Trend</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">Tracking ingestion volume spikes over the selected period.</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Live database charts
                </span>
              </div>

              <div className="h-64 w-full">
                {volumePoints.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={volumePoints} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="feedbackVolumeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="#e4e4e7" strokeDasharray="3 3" />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 11 }} dy={8} />
                      <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 11 }} />
                      <Tooltip
                        cursor={{ stroke: "#a5b4fc", strokeWidth: 1 }}
                        contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", fontSize: 12 }}
                        formatter={(value) => [Number(value ?? 0), "Feedback"]}
                      />
                      <Area type="monotone" dataKey="count" name="Feedback" stroke="#6366f1" strokeWidth={3} fill="url(#feedbackVolumeGradient)" activeDot={{ r: 5, fill: "#4f46e5", stroke: "#fff", strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full text-center py-12 text-xs text-zinc-400">
                    Not enough volume data in range.
                  </div>
                )}
              </div>
            </div>

            {/* Issue distribution categories */}
            <div className="glass p-6 rounded-2xl border border-zinc-200 bg-white flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1">Top Workspace Themes</h3>
                <p className="text-zinc-500 text-xs mb-6">Customer feedback volumes categorized by themes.</p>
              </div>

              <div className="space-y-4">
                {themeCounts.length > 0 ? (
                  themeCounts.map((theme, idx) => {
                    const pct = metrics.totalCount > 0 ? Math.round((theme.count / metrics.totalCount) * 100) : 0;
                    const colors = ["bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-sky-500"];
                    return (
                      <div key={theme.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
                          <span className="truncate">{theme.name}</span>
                          <span>{pct}% ({theme.count})</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                          <div className={`h-full ${colors[idx % colors.length]} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-xs text-zinc-400">
                    No themes categorized yet. Seed some feedback!
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-150 mt-4 text-center">
                <Link 
                  href="/trends" 
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1"
                >
                  Analyze trend clusters
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
                <p className="text-zinc-500 text-xs mt-0.5">Real-time incoming customer logs from all channels.</p>
              </div>
              <Link 
                href="/inbox" 
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1"
              >
                Open inbox manager
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {recentFeedback.length > 0 ? (
              <div className="divide-y divide-zinc-100">
                {recentFeedback.map((fb) => {
                  const dateLabel = new Date(fb.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  });

                  return (
                    <div key={fb.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5 max-w-3xl">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-zinc-900">
                            {fb.customerName || "Anonymous Customer"}
                          </span>
                          {fb.customerEmail && (
                            <span className="text-[10px] text-zinc-500 font-mono">({fb.customerEmail})</span>
                          )}
                          <span className="text-[10px] text-zinc-300">•</span>
                          <span className="text-[10px] text-zinc-500">{dateLabel}</span>
                          <span className="text-[10px] text-zinc-300">•</span>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase font-mono">{fb.channel}</span>
                        </div>
                        <p className="text-sm text-zinc-700 leading-relaxed font-medium">{fb.content}</p>
                      </div>

                      {/* Status and sentiment tags */}
                      <div className="flex items-center gap-2.5 self-start md:self-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-650">
                          {fb.themes.map(t => t.name).slice(0, 1).join("") || "General"}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          fb.sentiment === "Positive" 
                            ? "bg-green-50 text-green-600 border border-green-100" 
                            : fb.sentiment === "Negative"
                              ? "bg-red-50 text-red-655 bg-red-50 text-red-700 border border-red-100"
                              : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                        }`}>
                          {fb.sentiment}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-zinc-200 rounded-2xl">
                <p className="text-zinc-500 text-sm font-medium">No feedback logs found in your workspace.</p>
                <Link
                  href="/inbox"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
                >
                  Ingest customer feedback
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
