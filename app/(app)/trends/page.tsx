"use client";

import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  ArrowUpRight, 
  Tag, 
  MessageSquare,
  Sparkles,
  Inbox,
  AlertCircle
} from "lucide-react";

interface SpikingTheme {
  id: string;
  name: string;
  recentCount: number;
  previousCount: number;
  growthPercent: number;
  isSpiking: boolean;
}

interface ThemeSummary {
  id: string;
  name: string;
  count: number;
  avgSentimentScore: number;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

interface Feedback {
  id: string;
  content: string;
  channel: string;
  sentiment: string;
  customerName: string | null;
  customerEmail: string | null;
  createdAt: string;
}

export default function TrendsPage() {
  const [themes, setThemes] = useState<ThemeSummary[]>([]);
  const [spikingThemes, setSpikingThemes] = useState<SpikingTheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [themeFeedbacks, setThemeFeedbacks] = useState<Feedback[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFeedbacksLoading, setIsFeedbacksLoading] = useState(false);

  // Fetch themes and spikes
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch("/api/themes").then(res => res.json()),
      fetch("/api/themes/spiking").then(res => res.json())
    ])
      .then(([themesData, spikingData]) => {
        if (themesData.themes) {
          setThemes(themesData.themes);
          if (themesData.themes.length > 0) {
            setSelectedTheme(themesData.themes[0].name);
          }
        }
        if (spikingData && spikingData.themes) {
          setSpikingThemes(spikingData.themes);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // Fetch feedbacks for selected theme
  useEffect(() => {
    if (!selectedTheme) return;
    setIsFeedbacksLoading(true);
    fetch(`/api/feedback?theme=${encodeURIComponent(selectedTheme)}&limit=100`)
      .then(res => res.json())
      .then(data => {
        if (data.feedbacks) {
          setThemeFeedbacks(data.feedbacks);
        }
        setIsFeedbacksLoading(false);
      })
      .catch(() => {
        setIsFeedbacksLoading(false);
      });
  }, [selectedTheme]);

  const activeThemeStats = themes.find(t => t.name === selectedTheme);
  const totalFeedbackCount = themes.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Trend Analysis</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Monitor theme frequencies, growth spikes, and dive into matching client comments.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-96 gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-zinc-500 text-sm font-semibold">Running theme trend analysis...</p>
        </div>
      ) : (
        <>
          {/* Spiking & Growth Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Spiking Themes List */}
            <div className="glass p-4 sm:p-6 rounded-2xl border border-zinc-200 bg-white lg:col-span-2 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-zinc-900">Spiking Themes & surge rates</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] text-red-650 bg-red-50 border border-red-100 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <TrendingUp className="h-3 w-3" />
                    Live alerts
                  </span>
                </div>
                <p className="text-zinc-500 text-xs mb-6">Themes experiencing a surge in volume (last 7 days vs previous 7 days).</p>
              </div>

              {spikingThemes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {spikingThemes.map((theme) => (
                    <div
                      key={theme.name}
                      onClick={() => setSelectedTheme(theme.name)}
                      className={`p-4 rounded-xl border transition cursor-pointer flex flex-col gap-3 relative ${
                        selectedTheme === theme.name 
                          ? "bg-indigo-50 border-indigo-200" 
                          : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <Tag className={`h-4 w-4 ${selectedTheme === theme.name ? "text-indigo-600" : "text-zinc-400"}`} />
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                          theme.growthPercent > 0 
                            ? "bg-red-50 text-red-600 border border-red-100" 
                            : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                        }`}>
                          {theme.growthPercent > 0 ? `+${theme.growthPercent}%` : `0%`}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-zinc-900 truncate">{theme.name}</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{theme.recentCount} tickets recently</p>
                      </div>

                      {theme.isSpiking && (
                        <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-zinc-400 border border-dashed border-zinc-200 rounded-2xl">
                  Not enough historical volume to compare spiking ratios.
                </div>
              )}
            </div>

            {/* Channels & theme splits */}
            <div className="glass p-4 sm:p-6 rounded-2xl border border-zinc-200 bg-white flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1">Theme Allocations</h3>
                <p className="text-zinc-500 text-xs mb-6">Percentage share of total feedback in database.</p>
              </div>

              <div className="space-y-4">
                {themes.length > 0 ? (
                  themes.slice(0, 4).map((theme, idx) => {
                    const percentage = totalFeedbackCount > 0 ? Math.round((theme.count / totalFeedbackCount) * 100) : 0;
                    const colors = ["bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-sky-500"];
                    return (
                      <div key={theme.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-zinc-505 text-zinc-500">
                          <span className="truncate">{theme.name}</span>
                          <span>{percentage}% ({theme.count})</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                          <div className={`h-full ${colors[idx % colors.length]} rounded-full`} style={{ inlineSize: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-xs text-zinc-400">
                    No theme records discovered.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Theme feed Explorer */}
          <div className="glass rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-150 pb-5 mb-5 flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">
                  Theme Explorer: <span className="text-indigo-650 text-indigo-600">"{selectedTheme}"</span>
                </h3>
                <p className="text-zinc-500 text-xs mt-0.5">Explore the customer quotes, feedback channels, and timestamps behind this theme cluster.</p>
              </div>

              {activeThemeStats && (
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="text-xs bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-1.5 font-bold text-zinc-650">
                    Sentiment Split: 
                    <span className="text-green-600 ml-1.5">😊 {activeThemeStats.sentimentDistribution.positive}</span>
                    <span className="text-zinc-400 ml-2">😐 {activeThemeStats.sentimentDistribution.neutral}</span>
                    <span className="text-red-600 ml-2">😡 {activeThemeStats.sentimentDistribution.negative}</span>
                  </div>
                </div>
              )}
            </div>

            {isFeedbacksLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                <p className="text-zinc-500 text-xs font-semibold">Retrieving tickets...</p>
              </div>
            ) : themeFeedbacks.length > 0 ? (
              <div className="divide-y divide-zinc-100 max-h-96 overflow-y-auto pr-2">
                {themeFeedbacks.map((fb) => {
                  const dateLabel = new Date(fb.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  });

                  return (
                    <div key={fb.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-xs font-bold text-zinc-900">
                          {fb.customerName || "Anonymous Customer"}
                        </span>
                        {fb.customerEmail && (
                          <span className="text-[10px] text-zinc-400 font-mono">({fb.customerEmail})</span>
                        )}
                        <span className="text-[10px] text-zinc-300">•</span>
                        <span className="text-[10px] text-zinc-500">{dateLabel}</span>
                        <span className="text-[10px] text-zinc-300">•</span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider bg-zinc-100 border border-zinc-200 text-zinc-500 font-mono">
                          {fb.channel}
                        </span>
                        <span className="text-[10px] text-zinc-300">•</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          fb.sentiment === "Positive" 
                            ? "bg-green-50 text-green-600 border border-green-100" 
                            : fb.sentiment === "Negative"
                              ? "bg-red-50 text-red-600 border border-red-100"
                              : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                        }`}>
                          {fb.sentiment}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-700 leading-relaxed font-semibold break-words">
                        {fb.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-zinc-250 border-zinc-200 rounded-2xl flex flex-col items-center justify-center gap-2">
                <Inbox className="h-8 w-8 text-zinc-400 opacity-40" />
                <p className="text-zinc-500 text-xs font-semibold">No feedback entries linked to this theme.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
