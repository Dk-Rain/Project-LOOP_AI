"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Calendar, 
  Settings, 
  Download, 
  Zap, 
  ArrowRight,
  Printer,
  ShieldAlert,
  Inbox
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  content: string;
  createdAt: string;
}

export default function ReportsPage() {
  const [currentUser, setCurrentUser] = useState<{ role: string } | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Form parameters
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user and historical reports
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch("/api/auth/me").then(res => res.json()),
      fetch("/api/reports").then(res => res.json())
    ])
      .then(([userData, reportsData]) => {
        if (userData.user) setCurrentUser(userData.user);
        if (reportsData.reports) {
          setReports(reportsData.reports);
          if (reportsData.reports.length > 0) {
            setSelectedReport(reportsData.reports[0]);
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const isReadOnly = currentUser?.role === "VIEWER";

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly || !title || !startDate || !endDate) return;
    setIsGenerating(true);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, startDate, endDate })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReports(prev => [data.report, ...prev]);
        setSelectedReport(data.report);
        setTitle("");
        setStartDate("");
        setEndDate("");
      } else {
        alert(data.error || "Failed to compile Voice-of-Customer report.");
      }
    } catch (e) {
      alert("Error compiling report.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Basic custom markdown renderer to format report content nicely
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("# ")) {
        return <h1 key={idx} className="text-2xl font-bold text-zinc-900 mt-4 mb-2">{line.replace("# ", "")}</h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={idx} className="text-lg font-bold text-zinc-800 mt-5 mb-2.5 border-b border-zinc-200 pb-1">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={idx} className="text-sm font-bold text-zinc-700 mt-4 mb-1.5">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("> ")) {
        return (
          <blockquote key={idx} className="border-l-4 border-indigo-500 bg-zinc-50 pl-4 py-2 my-3 italic text-zinc-600 rounded-r-xl">
            {line.replace("> ", "")}
          </blockquote>
        );
      }
      if (line.startsWith("* ") || line.startsWith("- ")) {
        return <li key={idx} className="ml-4 list-disc text-xs text-zinc-650 leading-relaxed font-semibold my-1">{line.substring(2)}</li>;
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-xs text-zinc-650 leading-relaxed font-semibold my-1.5">{line}</p>;
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto print:p-0 print:m-0">
      {/* Header */}
      <div className="print:hidden">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Reports Builder</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Compile Voice of Customer reports for any period and share or download them as PDF.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-96 gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-zinc-500 text-sm font-semibold">Retrieving workspace reports...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
          {/* Left Side: Parameters panel */}
          <div className="space-y-6 print:hidden">
            {/* Create Report */}
            <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2 mb-4">
                <Settings className="h-4 w-4 text-zinc-405" />
                Configure VoC Period
              </h3>

              {isReadOnly ? (
                <div className="mb-4 p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center gap-2 text-xs text-zinc-500 font-bold">
                  <ShieldAlert className="h-4 w-4 text-zinc-400" />
                  <span>Viewer Mode: Read-Only Access</span>
                </div>
              ) : (
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase">Report Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Q3 Customer Sentiment Pulse"
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-800 outline-none focus:border-indigo-500 cursor-pointer"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-800 outline-none focus:border-indigo-500 cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-650 bg-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? "Compiling VoC Details..." : "Generate VoC Report"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Historical Reports List */}
            <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Historical Reports</h3>
              
              {reports.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {reports.map((rep) => (
                    <div
                      key={rep.id}
                      onClick={() => setSelectedReport(rep)}
                      className={`p-3 rounded-xl border transition cursor-pointer text-left ${
                        selectedReport?.id === rep.id
                          ? "bg-indigo-50 border-indigo-200"
                          : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <p className="text-xs font-bold text-zinc-900 truncate">{rep.title}</p>
                      <p className="text-[9px] text-zinc-400 font-mono mt-0.5">
                        Period: {new Date(rep.periodStart).toLocaleDateString()} - {new Date(rep.periodEnd).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-zinc-400 border border-dashed border-zinc-200 rounded-2xl">
                  No historical reports found.
                </div>
              )}
            </div>
          </div>

          {/* Right Side: PDF Preview */}
          <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col min-h-[500px] shadow-sm print:border-none print:shadow-none print:p-0">
            {isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Zap className="h-6 w-6 animate-spin" />
                </div>
                <p className="text-sm font-bold text-zinc-900">Synthesizing customer metrics...</p>
                <p className="text-xs mt-1">Analyzing sentiments and compile recommendations.</p>
              </div>
            ) : selectedReport ? (
              <div className="flex-1 flex flex-col justify-between">
                {/* PDF Container */}
                <div className="border border-zinc-200 bg-zinc-50/30 rounded-xl p-8 space-y-6 flex-1 shadow-inner relative overflow-hidden print:border-none print:bg-white print:p-0 print:shadow-none">
                  <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-zinc-400 print:hidden">
                    ID: {selectedReport.id}
                  </div>
                  
                  {/* Header */}
                  <div className="border-b border-zinc-200 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-900">LOOP Intelligence Workspace</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-650 border border-indigo-100 print:hidden">VoC REPORT</span>
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 mt-2">
                      {selectedReport.title}
                    </h2>
                    <p className="text-[10px] text-zinc-500 flex items-center gap-2 mt-1">
                      <Calendar className="h-3.5 w-3.5" /> 
                      Period: {new Date(selectedReport.periodStart).toLocaleDateString()} to {new Date(selectedReport.periodEnd).toLocaleDateString()}
                      • Compiled on {new Date(selectedReport.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Render Custom styled Markdown body */}
                  <div className="prose max-w-none text-zinc-850">
                    {renderMarkdown(selectedReport.content)}
                  </div>
                </div>

                {/* Print/Download actions */}
                <div className="flex items-center justify-end mt-6 pt-4 border-t border-zinc-200 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white px-4 py-2 border border-zinc-200 shadow-sm transition active:scale-98"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print / Save to PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
                <Inbox className="h-8 w-8 mb-3 opacity-30 text-zinc-400" />
                <p className="text-xs font-semibold">Select or generate a Voice-of-Customer report to preview.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
