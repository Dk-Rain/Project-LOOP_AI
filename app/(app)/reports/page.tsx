"use client";

import { useState } from "react";
import { 
  FileText, 
  Calendar, 
  Settings, 
  Download, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Clock,
  Printer,
  Share2
} from "lucide-react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("sentiment");
  const [dateRange, setDateRange] = useState("30d");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(true);

  const [includeQuotes, setIncludeQuotes] = useState(true);
  const [includeInsights, setIncludeInsights] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setReportReady(false);

    setTimeout(() => {
      setIsGenerating(false);
      setReportReady(true);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Reports Builder</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Create executive intelligence summaries, sentiment exports, and developer task outlines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
        {/* Left Side: Parameters panel */}
        <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col justify-between shadow-sm">
          <form onSubmit={handleGenerate} className="space-y-6">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <Settings className="h-4 w-4 text-zinc-400" />
              Configure Layout
            </h3>

            {/* Report Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-900 outline-none transition focus:border-indigo-500"
              >
                <option value="sentiment" className="bg-white text-zinc-900">Executive Sentiment Summary</option>
                <option value="bugs" className="bg-white text-zinc-900">High-Priority Bug Log</option>
                <option value="features" className="bg-white text-zinc-900">Requested Product Features</option>
                <option value="activity" className="bg-white text-zinc-900">Integrations Activity Report</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-900 outline-none transition focus:border-indigo-500"
              >
                <option value="7d" className="bg-white text-zinc-900">Last 7 days</option>
                <option value="30d" className="bg-white text-zinc-900">Last 30 days</option>
                <option value="90d" className="bg-white text-zinc-900">Last 90 days</option>
              </select>
            </div>

            {/* Configuration switches */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-zinc-550 block mb-1">Inclusions</label>
              
              <label className="flex items-center gap-3 text-xs text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeQuotes}
                  onChange={(e) => setIncludeQuotes(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-200 bg-white text-indigo-650 focus:ring-0 accent-indigo-600"
                />
                <span>Include critical customer quotes</span>
              </label>

              <label className="flex items-center gap-3 text-xs text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeInsights}
                  onChange={(e) => setIncludeInsights(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-200 bg-white text-indigo-650 focus:ring-0 accent-indigo-600"
                />
                <span>Include AI developer recommendations</span>
              </label>

              <label className="flex items-center gap-3 text-xs text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDetails}
                  onChange={(e) => setIncludeDetails(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-200 bg-white text-indigo-650 focus:ring-0 accent-indigo-600"
                />
                <span>Include raw customer email metadata</span>
              </label>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Compiling PDF..." : "Generate Analysis Report"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right Side: PDF Mockup Preview */}
        <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col min-h-[500px] shadow-sm">
          {isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Zap className="h-6 w-6 animate-spin" />
              </div>
              <p className="text-sm font-bold text-zinc-900">Assembling report layout...</p>
              <p className="text-xs mt-1">Grouping keyword blocks and analyzing sentiment index.</p>
            </div>
          )}

          {!isGenerating && !reportReady && (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
              <FileText className="h-8 w-8 mb-3 opacity-30" />
              <p className="text-xs">Configure parameters and click generate to load report preview.</p>
            </div>
          )}

          {!isGenerating && reportReady && (
            <div className="flex-1 flex flex-col justify-between">
              {/* PDF Preview container */}
              <div className="border border-zinc-150 bg-zinc-50/50 rounded-xl p-8 space-y-6 flex-1 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-zinc-400">
                  REF: LOOP-REPORT-2026-B
                </div>
                
                {/* Header */}
                <div className="border-b border-zinc-200 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-900">LOOP Customer Insights</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">PDF</span>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 mt-2">
                    {reportType === "sentiment" && "Executive Sentiment Pulse Analysis"}
                    {reportType === "bugs" && "High-Priority Bug Frequencies"}
                    {reportType === "features" && "Stakeholder Feature Requirements Summary"}
                    {reportType === "activity" && "Integration Activity Logs"}
                  </h2>
                  <p className="text-[10px] text-zinc-550 flex items-center gap-2 mt-1">
                    <Calendar className="h-3.5 w-3.5" /> Date Range: {dateRange === "7d" ? "July 21 - July 28" : "June 28 - July 28"} • Generated by Lawrence Dike
                  </p>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-3 gap-4 border-b border-zinc-200 pb-4">
                  <div>
                    <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider block">Customer CSAT</span>
                    <span className="text-sm font-extrabold text-green-600">88.4% Rating</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider block">Total records</span>
                    <span className="text-sm font-extrabold text-zinc-900">4,819 analyzed</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider block">Status</span>
                    <span className="text-sm font-extrabold text-indigo-650 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> Stable Signals
                    </span>
                  </div>
                </div>

                {/* PDF Content body */}
                <div className="space-y-4 text-xs text-zinc-650 leading-relaxed font-medium">
                  <div>
                    <p className="font-bold text-zinc-900 mb-1">Executive Summary</p>
                    <p>
                      Overall, customer workspace registers healthy engagement. High-priority items are localized to the checkout page Stripe payment failures.
                    </p>
                  </div>

                  {includeQuotes && (
                    <div className="bg-white p-3 rounded-lg border border-zinc-150 shadow-sm">
                      <p className="font-bold text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Critical Customer Signal</p>
                      <p className="italic">
                        "Checkout page keeps throwing 500 errors. Lost 3 customers today because of it." - Acme Corp
                      </p>
                    </div>
                  )}

                  {includeInsights && (
                    <div>
                      <p className="font-bold text-zinc-900 mb-1">AI Recommendation</p>
                      <p>
                        Stripe webhook logs must be validated immediately. Implement client-side error boundaries for purchase flow.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions below mockup */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-200">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <Printer className="h-4 w-4" />
                  <Share2 className="h-4 w-4" />
                </div>

                <button
                  onClick={() => alert("PDF report download triggered successfully.")}
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-700 px-4 py-2 border border-zinc-200 transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PDF Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
