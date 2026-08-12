"use client";

import { useEffect, useState } from "react";
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Smile, 
  Frown, 
  Meh, 
  Check, 
  CornerDownRight, 
  Plus,
  Upload,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  User,
  ShieldAlert
} from "lucide-react";

interface ThemeItem {
  id: string;
  name: string;
}

interface Feedback {
  id: string;
  content: string;
  channel: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  sentimentScore: number;
  featureArea: string | null;
  status: "NEW" | "REVIEWED" | "ACTIONED";
  rationale: string | null;
  customerName: string | null;
  customerEmail: string | null;
  createdAt: string;
  themes: ThemeItem[];
}

export default function InboxPage() {
  const [currentUser, setCurrentUser] = useState<{ role: string } | null>(null);
  
  // Data lists
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [themeOptions, setThemeOptions] = useState<string[]>([]);
  const [activeFeedback, setActiveFeedback] = useState<Feedback | null>(null);

  // Loading States
  const [isLoading, setIsLoading] = useState(true);
  const [isClassifying, setIsClassifying] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Filters state
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [status, setStatus] = useState("");
  const [themeFilter, setThemeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modal open states
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);

  // Ingestion inputs
  const [newContent, setNewContent] = useState("");
  const [newChannel, setNewChannel] = useState("MANUAL");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [csvText, setCsvText] = useState("");
  const [csvStatusMsg, setCsvStatusMsg] = useState("");

  // Fetch current user role
  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data.user) setCurrentUser(data.user);
      })
      .catch(() => {});
  }, []);

  // Fetch theme options to fill dropdown
  useEffect(() => {
    fetch("/api/themes")
      .then(res => res.json())
      .then(data => {
        if (data.themes) {
          setThemeOptions(data.themes.map((t: any) => t.name));
        }
      })
      .catch(() => {});
  }, [feedbacks]);

  // Fetch feedbacks on filter/page change
  const fetchFeedbacks = () => {
    setIsLoading(true);
    const query = new URLSearchParams({
      search,
      channel,
      sentiment,
      status,
      theme: themeFilter,
      startDate,
      endDate,
      page: page.toString(),
      limit: "10"
    });

    fetch(`/api/feedback?${query.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.feedbacks) {
          setFeedbacks(data.feedbacks);
          setTotalCount(data.pagination.totalCount);
          setTotalPages(data.pagination.totalPages);
          // Auto-select first feedback if none is active or active is missing
          if (data.feedbacks.length > 0) {
            const stillExists = data.feedbacks.find((f: Feedback) => f.id === activeFeedback?.id);
            if (!stillExists) {
              setActiveFeedback(data.feedbacks[0]);
            } else {
              setActiveFeedback(stillExists);
            }
          } else {
            setActiveFeedback(null);
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [search, channel, sentiment, status, themeFilter, startDate, endDate, page]);

  const isReadOnly = currentUser?.role === "VIEWER";

  // Simulate ingestion
  const handleSimulateSeed = async () => {
    if (isReadOnly) return;
    setIsSimulating(true);
    try {
      const res = await fetch("/api/feedback/simulate", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchFeedbacks();
      } else {
        alert(data.error || "Simulation failed");
      }
    } catch (e) {
      alert("Failed to run seed simulation");
    } finally {
      setIsSimulating(false);
    }
  };

  // Manual submit
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly || !newContent.trim()) return;

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newContent,
          channel: newChannel,
          customerName: newName || null,
          customerEmail: newEmail || null
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setManualModalOpen(false);
        setNewContent("");
        setNewName("");
        setNewEmail("");
        fetchFeedbacks();
      } else {
        alert(data.error || "Failed to ingest feedback");
      }
    } catch (e) {
      alert("Failed to submit feedback");
    }
  };

  // CSV Submit (Pasted values format: Name,Email,Channel,Feedback_Text)
  const handleCsvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly || !csvText.trim()) return;
    setCsvStatusMsg("Parsing and classifying batch entries...");

    try {
      // Basic CSV parsing
      const lines = csvText.split("\n");
      const rows = [];

      for (const line of lines) {
        if (!line.trim()) continue;
        const [customerName, customerEmail, channelCode, ...contentParts] = line.split(",");
        const content = contentParts.join(","); // Rejoin text if it contains commas
        if (content && content.trim()) {
          rows.push({
            customerName: customerName?.trim() || null,
            customerEmail: customerEmail?.trim() || null,
            channel: channelCode?.trim().toUpperCase() || "CSV_IMPORT",
            content: content.trim()
          });
        }
      }

      if (rows.length === 0) {
        setCsvStatusMsg("Could not find valid rows. Format: Name,Email,Channel,FeedbackText");
        return;
      }

      const res = await fetch("/api/feedback/csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCsvModalOpen(false);
        setCsvText("");
        setCsvStatusMsg("");
        fetchFeedbacks();
      } else {
        setCsvStatusMsg(data.error || "Batch import failed");
      }
    } catch (e) {
      setCsvStatusMsg("Connection error processing CSV file.");
    }
  };

  // Change Status
  const handleStatusChange = async (feedbackId: string, newStatus: string) => {
    if (isReadOnly) return;
    try {
      const res = await fetch("/api/feedback/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId, status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Update local items
        setFeedbacks(prev => prev.map(f => f.id === feedbackId ? { ...f, status: newStatus as any } : f));
        if (activeFeedback?.id === feedbackId) {
          setActiveFeedback(prev => prev ? { ...prev, status: newStatus as any } : null);
        }
      }
    } catch (e) {
      alert("Failed to update status");
    }
  };

  // Re-classify
  const handleReclassify = async (feedbackId: string) => {
    if (isReadOnly) return;
    setIsClassifying(true);
    try {
      const res = await fetch("/api/feedback/reclassify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Update local items
        setFeedbacks(prev => prev.map(f => f.id === feedbackId ? data.feedback : f));
        setActiveFeedback(data.feedback);
      }
    } catch (e) {
      alert("Failed to reclassify feedback");
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col relative">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Feedback Inbox</h1>
          <p className="text-zinc-500 text-sm mt-1">Ingest, search, filter, and transition customer feedback items.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isReadOnly ? (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-500 text-xs font-bold">
              <ShieldAlert className="h-4 w-4 text-zinc-400" />
              <span>Viewer (Read-Only)</span>
            </div>
          ) : (
            <>
              <button
                onClick={() => setManualModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-650 bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-sm transition active:scale-98"
              >
                <Plus className="h-3.5 w-3.5" />
                Add feedback
              </button>

              <button
                onClick={() => setCsvModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition active:scale-98"
              >
                <Upload className="h-3.5 w-3.5" />
                CSV Import
              </button>

              <button
                onClick={handleSimulateSeed}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 px-3.5 py-2 text-xs font-bold hover:bg-indigo-100 transition disabled:opacity-50 active:scale-98"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {isSimulating ? "Seeding..." : "Simulate Channel"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Control panel (Filters) */}
      <div className="bg-zinc-50/50 border border-zinc-200 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 shadow-sm">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search feedback content..."
            className="w-full rounded-xl border border-zinc-250 border-zinc-200 bg-white px-3.5 py-2 pl-9 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
        </div>

        {/* Channel Filter */}
        <select 
          value={channel} 
          onChange={(e) => { setChannel(e.target.value); setPage(1); }}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-800 outline-none focus:border-indigo-500 font-medium cursor-pointer"
        >
          <option value="">All Channels</option>
          <option value="MANUAL">Manual</option>
          <option value="CSV_IMPORT">CSV Import</option>
          <option value="ZENDESK">Zendesk</option>
          <option value="APP_STORE">App Store</option>
          <option value="DISCORD">Discord</option>
          <option value="INTERCOM">Intercom</option>
        </select>

        {/* Sentiment Filter */}
        <select 
          value={sentiment} 
          onChange={(e) => { setSentiment(e.target.value); setPage(1); }}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-800 outline-none focus:border-indigo-500 font-medium cursor-pointer"
        >
          <option value="">All Sentiments</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>

        {/* Theme Filter */}
        <select 
          value={themeFilter} 
          onChange={(e) => { setThemeFilter(e.target.value); setPage(1); }}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-800 outline-none focus:border-indigo-500 font-medium cursor-pointer"
        >
          <option value="">All Themes</option>
          {themeOptions.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select 
          value={status} 
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-800 outline-none focus:border-indigo-500 font-medium cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="NEW">New</option>
          <option value="REVIEWED">Reviewed</option>
          <option value="ACTIONED">Actioned</option>
        </select>

        {/* Date Filter */}
        <div className="flex items-center gap-1.5 lg:col-span-1">
          <input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-zinc-200 bg-white px-2 py-2 text-[10px] text-zinc-800 outline-none focus:border-indigo-500 cursor-pointer"
            title="Start date"
          />
        </div>
      </div>

      {/* Main Workspace (Dual Pane Layout) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.1fr_1.25fr] gap-6">
        {/* Left Side: Ticket list */}
        <div className="glass rounded-2xl border border-zinc-200 bg-white overflow-y-auto flex flex-col min-h-0 shadow-sm">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-650 border-indigo-650 border-indigo-600 border-t-transparent" />
              <p className="text-zinc-500 text-xs font-semibold">Updating customer logs...</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
              <MessageSquare className="h-8 w-8 mb-3 opacity-30 text-zinc-400" />
              <p className="text-sm font-semibold">No feedback records found</p>
              <p className="text-xs mt-1 text-zinc-400">Add feedback or adjust active query filters.</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-zinc-100 flex-1 overflow-y-auto">
                {feedbacks.map((fb) => {
                  const isActive = fb.id === activeFeedback?.id;
                  const dateLabel = new Date(fb.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric"
                  });

                  return (
                    <div
                      key={fb.id}
                      onClick={() => setActiveFeedback(fb)}
                      className={`p-4 transition duration-150 cursor-pointer flex flex-col gap-2 relative ${
                        isActive ? "bg-zinc-50" : "hover:bg-zinc-50/50"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-600" />
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-900">
                            {fb.customerName || "Anonymous Customer"}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider bg-zinc-100 border border-zinc-150 px-1 py-0.2 rounded">
                            {fb.channel}
                          </span>
                        </div>
                        <span className="text-[9px] text-zinc-400 font-semibold font-mono">{dateLabel}</span>
                      </div>

                      <p className="text-xs text-zinc-650 line-clamp-2 leading-relaxed">
                        {fb.content}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex gap-1.5 flex-wrap">
                          {fb.themes.map(t => (
                            <span key={t.id} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-50 text-zinc-600 border border-zinc-150">
                              {t.name}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2.5">
                          {fb.status === "NEW" && (
                            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                              NEW
                            </span>
                          )}
                          {fb.status === "REVIEWED" && (
                            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                              REVIEWED
                            </span>
                          )}
                          {fb.status === "ACTIONED" && (
                            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100">
                              ACTIONED
                            </span>
                          )}

                          {fb.sentiment === "Positive" && <Smile className="h-4 w-4 text-green-500" />}
                          {fb.sentiment === "Neutral" && <Meh className="h-4 w-4 text-zinc-400" />}
                          {fb.sentiment === "Negative" && <Frown className="h-4 w-4 text-red-500" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Server-side Pagination buttons */}
              <div className="border-t border-zinc-150 p-4 flex items-center justify-between bg-zinc-50/50 text-xs font-semibold text-zinc-500">
                <span>Total count: {totalCount}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1 rounded border border-zinc-200 bg-white text-zinc-600 disabled:opacity-50 hover:bg-zinc-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span>Page {page} of {totalPages || 1}</span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || totalPages === 0}
                    className="p-1 rounded border border-zinc-200 bg-white text-zinc-600 disabled:opacity-50 hover:bg-zinc-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Active details & Actions panel */}
        {activeFeedback ? (
          <div className="glass rounded-2xl border border-zinc-200 bg-white overflow-y-auto flex flex-col min-h-0 shadow-sm relative">
            {/* Header info */}
            <div className="p-6 border-b border-zinc-150 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">
                    {activeFeedback.customerName || "Anonymous Customer"}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-medium">
                    {activeFeedback.customerEmail || "No Email Provided"} • Channel: <span className="font-bold">{activeFeedback.channel}</span>
                  </p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-2">
                <select
                  value={activeFeedback.status}
                  disabled={isReadOnly}
                  onChange={(e) => handleStatusChange(activeFeedback.id, e.target.value)}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-bold text-zinc-700 outline-none hover:bg-zinc-100 disabled:opacity-60 cursor-pointer"
                >
                  <option value="NEW">New</option>
                  <option value="REVIEWED">Reviewed</option>
                  <option value="ACTIONED">Actioned</option>
                </select>

                <button
                  onClick={() => handleReclassify(activeFeedback.id)}
                  disabled={isClassifying || isReadOnly}
                  title="Re-run AI classification"
                  className="inline-flex items-center gap-1.5 p-2 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 disabled:opacity-60 transition active:scale-98"
                >
                  <RefreshCw className={`h-4 w-4 ${isClassifying ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* AI Tags display */}
            <div className="px-6 py-4 bg-zinc-50/50 border-b border-zinc-150 flex flex-wrap gap-3">
              <div className="text-xs bg-white rounded-xl border border-zinc-200 px-3 py-1.5 flex items-center gap-2 shadow-sm">
                <span className="text-zinc-500">Sentiment Score:</span>
                <span className={`font-bold ${
                  activeFeedback.sentimentScore > 0 
                    ? "text-green-600" 
                    : activeFeedback.sentimentScore < 0 
                      ? "text-red-600" 
                      : "text-zinc-500"
                }`}>
                  {activeFeedback.sentimentScore.toFixed(2)}
                </span>
                {/* Horizontal scale */}
                <div className="w-12 h-1.5 bg-zinc-100 rounded-full overflow-hidden relative border border-zinc-150">
                  <div 
                    className={`h-full absolute top-0 rounded-full ${
                      activeFeedback.sentimentScore > 0 ? "bg-green-500 left-1/2" : "bg-red-500 right-1/2"
                    }`}
                    style={{ width: `${Math.abs(activeFeedback.sentimentScore) * 50}%` }}
                  />
                </div>
              </div>

              <div className="text-xs bg-white rounded-xl border border-zinc-200 px-3 py-1.5 flex items-center gap-2 shadow-sm">
                <span className="text-zinc-500">Sentiment:</span>
                <span className={`font-extrabold flex items-center gap-1 ${
                  activeFeedback.sentiment === "Positive" 
                    ? "text-green-600" 
                    : activeFeedback.sentiment === "Negative" 
                      ? "text-red-600" 
                      : "text-zinc-500"
                }`}>
                  {activeFeedback.sentiment.toUpperCase()}
                </span>
              </div>

              {activeFeedback.featureArea && (
                <div className="text-xs bg-white rounded-xl border border-zinc-200 px-3 py-1.5 flex items-center gap-2 shadow-sm">
                  <span className="text-zinc-500">Feature Area:</span>
                  <span className="font-semibold text-zinc-800">{activeFeedback.featureArea}</span>
                </div>
              )}
            </div>

            {/* Ingestion Rationale */}
            {activeFeedback.rationale && (
              <div className="mx-6 mt-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-850 flex gap-2">
                <div className="text-indigo-600 font-bold text-sm">💡</div>
                <div className="space-y-1">
                  <p className="font-bold text-indigo-900">AI Classification Rationale</p>
                  <p className="text-zinc-700 leading-relaxed font-medium">{activeFeedback.rationale}</p>
                </div>
              </div>
            )}

            {/* Full text transcript */}
            <div className="flex-1 p-6 text-zinc-850 leading-relaxed text-sm font-semibold whitespace-pre-line bg-white">
              {activeFeedback.content}
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 shadow-sm">
            <p className="text-xs">Select a feedback log to view detailed records.</p>
          </div>
        )}
      </div>

      {/* MODAL 1: Manual Ingestion */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-lg shadow-xl relative overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-150 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Add Customer Feedback</h3>
              <button 
                onClick={() => setManualModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 text-sm font-semibold"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleManualSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">Customer Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Sarah Connor"
                    className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">Customer Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="sarah@skynet.com"
                    className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase">Ingestion Channel</label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value)}
                  className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="MANUAL">Manual Entry</option>
                  <option value="SLACK">Slack Connect</option>
                  <option value="INTERCOM">Intercom Chat</option>
                  <option value="EMAIL">Customer Email</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase">Feedback Content</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Paste or write the customer feedback here..."
                  className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 outline-none focus:border-indigo-500 resize-none font-semibold"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setManualModalOpen(false)}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                >
                  Analyze & Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CSV Import */}
      {csvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-lg shadow-xl relative overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-150 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Bulk Import Feedback (CSV Format)</h3>
              <button 
                onClick={() => setCsvModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 text-sm font-semibold"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCsvSubmit} className="p-6 space-y-4">
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Paste comma-separated rows. The system will parse each row, run sentiment and theme classification, and save them.
                <br />
                <strong>Expected headers/format:</strong> <span className="font-mono bg-zinc-50 p-1 rounded font-bold text-[10px]">Name,Email,Channel,FeedbackText</span>
              </p>

              <div className="space-y-1">
                <textarea
                  rows={6}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder={`John Stark,john@winterfell.io,EMAIL,Slow checkout on payment gateway\nArya Sand,arya@braavos.org,DISCORD,Dark mode request for dashboard`}
                  className="w-full text-xs font-mono rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 outline-none focus:border-indigo-500 resize-none font-bold"
                  required
                />
              </div>

              {csvStatusMsg && (
                <p className="text-[10px] text-indigo-700 font-semibold animate-pulse">{csvStatusMsg}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCsvModalOpen(false)}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                >
                  Process Import
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
