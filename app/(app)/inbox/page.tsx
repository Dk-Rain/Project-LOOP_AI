"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Smile, 
  Frown, 
  Meh, 
  Check, 
  CornerDownRight, 
  Flag,
  Trash2,
  CheckCircle2
} from "lucide-react";

export default function InboxPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const [feedbacks, setFeedbacks] = useState([
    {
      id: "fb-1",
      customer: "Sarah Jenkins",
      email: "sarah.j@acme.com",
      company: "Acme Corp",
      text: "The checkout page keeps throwing 500 errors when using Stripe billing. Lost 3 customers today because of it. We need this fixed immediately or we will migrate to another provider.",
      sentiment: "negative",
      priority: "high",
      category: "Billing / Checkout",
      date: "Jul 28, 2026",
      resolved: false
    },
    {
      id: "fb-2",
      customer: "Alex Rivera",
      email: "alex@starklabs.io",
      company: "Stark Labs",
      text: "Is there any plan to support an offline mode? Our field workers frequently lose internet access while recording logs. When the connection drops, they lose all input data because the app tries to sync continuously without saving a local cache copy.",
      sentiment: "neutral",
      priority: "medium",
      category: "Feature Request",
      date: "Jul 27, 2026",
      resolved: false
    },
    {
      id: "fb-3",
      customer: "Elena Rostova",
      email: "elena.r@fintechgo.com",
      company: "Fintech Go",
      text: "Loving the new dashboard interface! The reports generation is 10x faster now. Incredible updates this week. The animations are clean, the layout makes sense, and the loading times have plummeted.",
      sentiment: "positive",
      priority: "low",
      category: "UX / Performance",
      date: "Jul 26, 2026",
      resolved: false
    },
    {
      id: "fb-4",
      customer: "David Kim",
      email: "david.kim@designco.net",
      company: "DesignCo",
      text: "The documentation link on the API endpoints references an old v2 schema that returns errors. Please update the OpenAPI spec files so that our integration scripts can map request parameters accurately.",
      sentiment: "negative",
      priority: "medium",
      category: "Documentation",
      date: "Jul 25, 2026",
      resolved: true
    },
    {
      id: "fb-5",
      customer: "Michael Scott",
      email: "m.scott@dundermifflin.com",
      company: "Dunder Mifflin",
      text: "The mobile app keeps logging me out every time I close the tab on Safari. Can you check if the refresh tokens expire too quickly? It's really annoying to authenticate every single time.",
      sentiment: "negative",
      priority: "high",
      category: "Authentication",
      date: "Jul 24, 2026",
      resolved: false
    }
  ]);

  const [activeId, setActiveId] = useState("fb-1");
  const [replyText, setReplyText] = useState("");

  const activeFeedback = feedbacks.find((fb) => fb.id === activeId) || feedbacks[0];

  const handleResolve = (id: string) => {
    setFeedbacks(prev => 
      prev.map(item => item.id === id ? { ...item, resolved: !item.resolved } : item)
    );
  };

  const handleDelete = (id: string) => {
    const updated = feedbacks.filter((fb) => fb.id !== id);
    setFeedbacks(updated);
    if (activeId === id && updated.length > 0) {
      setActiveId(updated[0].id);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    alert(`Reply sent to ${activeFeedback.email}: \n"${replyText}"`);
    setReplyText("");
  };

  // Filter Logic
  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesSearch = 
      fb.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      fb.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
      fb.text.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSentiment = selectedSentiment === "all" || fb.sentiment === selectedSentiment;
    const matchesPriority = selectedPriority === "all" || fb.priority === selectedPriority;

    return matchesSearch && matchesSentiment && matchesPriority;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Feedback Inbox</h1>
          <p className="text-zinc-500 text-sm mt-1">Review, prioritize, and respond to incoming customer suggestions.</p>
        </div>
      </div>

      {/* Control panel (Search & Filters) */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets, companies, descriptions..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 pl-9 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-405 text-zinc-400" />
        </div>

        {/* Sentiment Filter */}
        <div className="flex items-center gap-2 bg-zinc-50 px-3 py-2 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-650">
          <Filter className="h-3.5 w-3.5 text-zinc-400" />
          <span>Sentiment:</span>
          <select 
            value={selectedSentiment} 
            onChange={(e) => setSelectedSentiment(e.target.value)}
            className="bg-transparent border-none outline-none cursor-pointer text-zinc-900 font-bold flex-1"
          >
            <option value="all" className="bg-white text-zinc-900">All Sentiments</option>
            <option value="positive" className="bg-white text-zinc-900">Positive</option>
            <option value="neutral" className="bg-white text-zinc-900">Neutral</option>
            <option value="negative" className="bg-white text-zinc-900">Negative</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2 bg-zinc-50 px-3 py-2 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-650">
          <Flag className="h-3.5 w-3.5 text-zinc-400" />
          <span>Priority:</span>
          <select 
            value={selectedPriority} 
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-transparent border-none outline-none cursor-pointer text-zinc-900 font-bold flex-1"
          >
            <option value="all" className="bg-white text-zinc-900">All Priorities</option>
            <option value="high" className="bg-white text-zinc-900">High</option>
            <option value="medium" className="bg-white text-zinc-900">Medium</option>
            <option value="low" className="bg-white text-zinc-900">Low</option>
          </select>
        </div>
      </div>

      {/* Main Workspace (Dual Pane Layout) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-6">
        {/* Left Side: Ticket list */}
        <div className="glass rounded-2xl border border-zinc-200 bg-white overflow-y-auto flex flex-col min-h-0 shadow-sm">
          {filteredFeedbacks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
              <MessageSquare className="h-8 w-8 mb-3 opacity-30" />
              <p className="text-sm font-semibold">No feedback records found</p>
              <p className="text-xs mt-1">Try resetting filters or changing the search terms.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {filteredFeedbacks.map((fb) => {
                const isActive = fb.id === activeId;
                return (
                  <div
                    key={fb.id}
                    onClick={() => setActiveId(fb.id)}
                    className={`p-4 transition duration-150 cursor-pointer flex flex-col gap-2 relative ${
                      isActive 
                        ? "bg-zinc-50" 
                        : "hover:bg-zinc-50/50"
                    }`}
                  >
                    {/* Active strip */}
                    {isActive && (
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-650 bg-indigo-600" />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">{fb.customer}</span>
                        <span className="text-[10px] text-zinc-500">@{fb.company}</span>
                      </div>
                      <span className="text-[9px] text-zinc-400 font-semibold font-mono">{fb.date}</span>
                    </div>

                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {fb.text}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex gap-2">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-50 text-zinc-650 border border-zinc-200">
                          {fb.category}
                        </span>
                        {fb.resolved && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-50 text-green-600 border border-green-100 flex items-center gap-1">
                            <Check className="h-2 w-2" /> Resolved
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {fb.sentiment === "positive" && <Smile className="h-3.5 w-3.5 text-green-500" />}
                        {fb.sentiment === "neutral" && <Meh className="h-3.5 w-3.5 text-zinc-400" />}
                        {fb.sentiment === "negative" && <Frown className="h-3.5 w-3.5 text-red-500" />}
                        
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          fb.priority === "high" 
                            ? "bg-red-500" 
                            : fb.priority === "medium" 
                              ? "bg-amber-500" 
                              : "bg-zinc-400"
                        }`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Active details & Actions panel */}
        {activeFeedback ? (
          <div className="glass rounded-2xl border border-zinc-200 bg-white overflow-y-auto flex flex-col min-h-0 shadow-sm">
            {/* Header info */}
            <div className="p-6 border-b border-zinc-150 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">{activeFeedback.customer}</h3>
                  <p className="text-[10px] text-zinc-500">
                    {activeFeedback.email} • {activeFeedback.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleResolve(activeFeedback.id)}
                  title={activeFeedback.resolved ? "Reopen issue" : "Mark resolved"}
                  className={`p-2 rounded-xl border transition ${
                    activeFeedback.resolved
                      ? "bg-green-50 border-green-100 text-green-600 font-semibold"
                      : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(activeFeedback.id)}
                  title="Delete feedback log"
                  className="p-2 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-red-650 hover:bg-red-50 hover:border-red-100 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* AI Tags display */}
            <div className="px-6 py-4 bg-zinc-50/50 border-b border-zinc-150 flex flex-wrap gap-3">
              <div className="text-xs bg-white rounded-xl border border-zinc-200 px-3 py-1.5 flex items-center gap-2 shadow-sm">
                <span className="text-zinc-500">Priority:</span>
                <span className={`font-bold ${
                  activeFeedback.priority === "high" 
                    ? "text-red-600" 
                    : activeFeedback.priority === "medium" 
                      ? "text-amber-600" 
                      : "text-zinc-500"
                }`}>{activeFeedback.priority.toUpperCase()}</span>
              </div>

              <div className="text-xs bg-white rounded-xl border border-zinc-200 px-3 py-1.5 flex items-center gap-2 shadow-sm">
                <span className="text-zinc-500">Sentiment:</span>
                <span className={`font-extrabold flex items-center gap-1 ${
                  activeFeedback.sentiment === "positive" 
                    ? "text-green-650" 
                    : activeFeedback.sentiment === "negative" 
                      ? "text-red-650" 
                      : "text-zinc-500"
                }`}>
                  {activeFeedback.sentiment.toUpperCase()}
                </span>
              </div>

              <div className="text-xs bg-white rounded-xl border border-zinc-200 px-3 py-1.5 flex items-center gap-2 shadow-sm">
                <span className="text-zinc-500">Topic Area:</span>
                <span className="font-semibold text-zinc-800">{activeFeedback.category}</span>
              </div>
            </div>

            {/* Full text transcript */}
            <div className="flex-1 p-6 text-zinc-700 leading-relaxed text-sm font-medium whitespace-pre-line bg-white">
              {activeFeedback.text}
            </div>

            {/* Inline Quick reply form */}
            <div className="p-4 border-t border-zinc-150 bg-zinc-50/50">
              <form onSubmit={handleSendReply} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                  <CornerDownRight className="h-3.5 w-3.5" />
                  <span>Draft response to customer</span>
                </div>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Hi ${activeFeedback.customer.split(" ")[0]}, thanks for reaching out. We will inspect the issue...`}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/10 resize-none shadow-sm"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/10"
                  >
                    <span>Send Reply</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 shadow-sm">
            <p className="text-xs">Select a feedback log to view detailed records.</p>
          </div>
        )}
      </div>
    </div>
  );
}
