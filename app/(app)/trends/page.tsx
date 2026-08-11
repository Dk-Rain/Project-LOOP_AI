"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  Tag, 
  MessageSquare,
  Globe,
  Mail,
  Smartphone
} from "lucide-react";

export default function TrendsPage() {
  const [activeKeyword, setActiveKeyword] = useState("Stripe integration");

  const keywords = [
    { name: "Stripe integration", volume: 42, sentiment: "negative", trend: "up" },
    { name: "Offline Sync", volume: 27, sentiment: "neutral", trend: "up" },
    { name: "Safari Session ITP", volume: 18, sentiment: "negative", trend: "stable" },
    { name: "API Docs v2", volume: 15, sentiment: "negative", trend: "down" },
    { name: "Speeds / Latency", volume: 12, sentiment: "positive", trend: "up" },
    { name: "React dashboard", volume: 38, sentiment: "positive", trend: "up" }
  ];

  const sourceData = [
    { name: "Slack App integration", count: 2168, percentage: 45, icon: MessageSquare, color: "bg-purple-500" },
    { name: "Support Inboxes", count: 1445, percentage: 30, icon: Mail, color: "bg-blue-500" },
    { name: "App Store Reviews", count: 722, percentage: 15, icon: Smartphone, color: "bg-indigo-500" },
    { name: "Web Feedback Form", count: 484, percentage: 10, icon: Globe, color: "bg-emerald-500" }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Trend Analysis</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Monitor feedback volume surges, source splits, and trending keywords.
        </p>
      </div>

      {/* Grid overview */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Main trend chart */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 bg-white flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Weekly Feedback Volume</h3>
              <p className="text-zinc-500 text-xs mt-0.5">Tracking message totals across support integrations.</p>
            </div>
            <div className="text-right">
              <span className="text-green-600 text-xs font-bold flex items-center justify-end gap-1">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +18.4% volume spike
              </span>
              <span className="text-[10px] text-zinc-400 block">Compared to average</span>
            </div>
          </div>

          {/* SVG volume chart */}
          <div className="h-60 w-full relative flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-trends" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="10" x2="100" y2="10" stroke="#e4e4e7" strokeWidth="0.1" strokeDasharray="1,1" />
              <line x1="0" y1="20" x2="100" y2="20" stroke="#e4e4e7" strokeWidth="0.1" strokeDasharray="1,1" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="#e4e4e7" strokeWidth="0.1" strokeDasharray="1,1" />
              
              {/* Bars chart */}
              <rect x="5" y="15" width="6" height="25" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="0.5" rx="1.5" />
              <rect x="20" y="22" width="6" height="18" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="0.5" rx="1.5" />
              <rect x="35" y="10" width="6" height="30" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="0.5" rx="1.5" />
              <rect x="50" y="18" width="6" height="22" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="0.5" rx="1.5" />
              <rect x="65" y="8" width="6" height="32" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="0.5" rx="1.5" />
              <rect x="80" y="12" width="6" height="28" fill="#c7d2fe" stroke="#6366f1" strokeWidth="0.5" rx="1.5" />
              <rect x="91" y="5" width="6" height="35" fill="url(#gradient-trends)" stroke="#818cf8" strokeWidth="0.5" rx="1.5" />
            </svg>
            <div className="absolute bottom-0 inset-x-0 flex justify-between text-[9px] text-zinc-400 font-semibold font-mono pt-2 border-t border-zinc-200">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>
        </div>

        {/* Source Channels splitting */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 bg-white flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 mb-1">Feedback Channels</h3>
            <p className="text-zinc-500 text-xs mb-6">Percentage allocation of inbound transcripts.</p>
          </div>

          <div className="space-y-4">
            {sourceData.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-505 text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-zinc-400" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span>{item.percentage}% ({item.count})</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Keywords analysis cloud card */}
      <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-zinc-900 mb-2">Trending Keywords</h3>
        <p className="text-zinc-500 text-xs mb-6">Keywords flagged by AI with volume increases this week.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {keywords.map((kw) => {
            const isActive = kw.name === activeKeyword;
            return (
              <div
                key={kw.name}
                onClick={() => setActiveKeyword(kw.name)}
                className={`p-4 rounded-xl border transition duration-150 cursor-pointer flex flex-col gap-3 relative ${
                  isActive 
                    ? "bg-indigo-50 border-indigo-200 shadow-md shadow-indigo-650/5" 
                    : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <Tag className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-zinc-400"}`} />
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                    kw.trend === "up" 
                      ? "bg-green-50 text-green-600 border border-green-100" 
                      : kw.trend === "down"
                        ? "bg-zinc-100 text-zinc-550 border border-zinc-200"
                        : "bg-amber-50 text-amber-600 border border-amber-100"
                  }`}>
                    {kw.trend === "up" ? "▲ UP" : kw.trend === "down" ? "▼ DOWN" : "■ STABLE"}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-zinc-900 truncate">{kw.name}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{kw.volume} tickets flagged</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Keyword details mockup */}
        <div className="mt-6 bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-3 shadow-inner">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Analysis Details: <span className="text-indigo-700 text-sm lowercase tracking-normal font-bold font-sans">"{activeKeyword}"</span>
          </h4>
          <p className="text-xs text-zinc-700 leading-relaxed max-w-4xl">
            This issue represents {keywords.find(k => k.name === activeKeyword)?.volume || 10} customer reports this week. Our AI classified it as a primary priority item due to multiple user workspace complaints in Safari client settings.
          </p>
        </div>
      </div>
    </div>
  );
}
