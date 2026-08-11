"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
const MessageSquare = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const HelpCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
    <path d="M10 9H8"></path>
    <path d="M16 13H8"></path>
    <path d="M16 17H8"></path>
  </svg>
);

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const Lightbulb = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .5 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5"></path>
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
  </svg>
);

const Terminal = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

interface Message {
  role: "user" | "assistant";
  content: string;
  isAiReport?: boolean;
  reportData?: {
    summary: string;
    points: string[];
    sentiment: string;
    recommendation: string;
  };
}

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am LOOP AI. Ask me to analyze customer sentiment, summarize bug reports, or extract feature recommendations from your workspace feedback logs."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Summarize billing checkout bugs",
    "What are the top requests for new features?",
    "Generate a sentiment report for last week",
    "Analyze mobile login and Safari issues"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getMockResponse = (query: string): Message => {
    const q = query.toLowerCase();
    
    if (q.includes("billing") || q.includes("stripe") || q.includes("checkout")) {
      return {
        role: "assistant",
        content: "Here is the AI-generated intelligence report on billing checkout bugs:",
        isAiReport: true,
        reportData: {
          summary: "Customers are experiencing severe checkout blockages due to Stripe 500 errors. This is actively hurting checkout conversion rates and causing customer churn signals.",
          points: [
            "Checkout fails intermittently during checkout submission step (3 reports in last 24h).",
            "Stripe API credentials or webhook failures are suspected.",
            "Two high-value customers (Acme Corp and Stark Labs) mentioned loss of business."
          ],
          sentiment: "Highly Negative (CSAT 12%)",
          recommendation: "Inspect Stripe payment integration logs, verify API keys, and implement retry states for payment submissions."
        }
      };
    }

    if (q.includes("feature") || q.includes("request") || q.includes("offline")) {
      return {
        role: "assistant",
        content: "Here is the summary of feature requests and offline capability:",
        isAiReport: true,
        reportData: {
          summary: "The most trending feature request is the support for an 'Offline Sync Mode' for workers operating with unstable internet connection.",
          points: [
            "Users lose unsaved data when network connection drops.",
            "Suggested layout: LocalStorage caching with automatic background synchronization on network rejoin.",
            "Highly requested by field agents and logistics team users."
          ],
          sentiment: "Mixed / High Interest",
          recommendation: "Design a proof-of-concept offline storage mechanism using IndexedDB or browser LocalStorage."
        }
      };
    }

    if (q.includes("login") || q.includes("safari") || q.includes("auth")) {
      return {
        role: "assistant",
        content: "Here is the analysis regarding login sessions and Safari errors:",
        isAiReport: true,
        reportData: {
          summary: "Users report frequent session expirations and logouts when closing tabs on Safari, indicating a refresh token cookie configuration issue.",
          points: [
            "Cookie 'SameSite' attributes or Safari's Intelligent Tracking Prevention (ITP) may block token storage.",
            "Affecting repeat dashboard engagements.",
            "Reported primarily by macOS/iOS client viewports."
          ],
          sentiment: "Annoyed (Negative)",
          recommendation: "Ensure cookies use Secure, SameSite=None, and explore session recovery fallbacks."
        }
      };
    }

    // Default response
    return {
      role: "assistant",
      content: `I analyzed your feedback logs matching "${query}". Overall, sentiment remains moderately stable with minor complaints concerning documentation accessibility and styling performance. No blocking API errors were detected in other categories. Let me know if you would like a detailed summary of a specific feature.`
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, getMockResponse(text)]);
    }, 1500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 flex items-center gap-2.5">
          <Zap className="h-7 w-7 text-indigo-600 animate-pulse" />
          Ask LOOP AI
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Perform natural language queries against your accumulated customer feedback reports.
        </p>
      </div>

      {/* Main chat window container */}
      <div className="flex-1 min-h-0 glass rounded-2xl border border-zinc-200 bg-white flex flex-col justify-between shadow-sm">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => {
            const isAi = msg.role === "assistant";
            return (
              <div key={index} className={`flex gap-4 ${isAi ? "justify-start" : "justify-end"}`}>
                {/* Avatar */}
                {isAi && (
                  <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Zap className="h-4.5 w-4.5" />
                  </div>
                )}

                {/* Bubble content */}
                <div className="space-y-3 max-w-2xl">
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isAi 
                      ? "bg-zinc-50 text-zinc-800 border border-zinc-150 shadow-sm" 
                      : "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  }`}>
                    {msg.content}
                  </div>

                  {/* Rich AI Intelligence Report Details card */}
                  {msg.isAiReport && msg.reportData && (
                    <div className="glass border border-zinc-200 bg-zinc-50/50 rounded-2xl p-5 space-y-4">
                      {/* Badge / Sentiment */}
                      <div className="flex justify-between items-center border-b border-zinc-150 pb-3">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5" />
                          AI Synthesized Report
                        </span>
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                          {msg.reportData.sentiment}
                        </span>
                      </div>

                      {/* Summary */}
                      <div className="space-y-1">
                        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1">
                          <FileText className="h-3 w-3" /> Summary
                        </p>
                        <p className="text-xs text-zinc-800 leading-relaxed font-semibold">
                          {msg.reportData.summary}
                        </p>
                      </div>

                      {/* Points */}
                      <div className="space-y-2">
                        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Key Feedback Signals
                        </p>
                        <ul className="space-y-1.5 pl-3 list-disc text-xs text-zinc-600">
                          {msg.reportData.points.map((pt, i) => (
                            <li key={i} className="leading-relaxed font-medium">{pt}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommendation */}
                      <div className="space-y-1 bg-indigo-50 border border-indigo-100 p-3 rounded-xl">
                        <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider flex items-center gap-1">
                          <Lightbulb className="h-3.5 w-3.5" /> Recommendation
                        </p>
                        <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                          {msg.reportData.recommendation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* User avatar */}
                {!isAi && (
                  <div className="h-9 w-9 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-650 flex items-center justify-center shrink-0">
                <Zap className="h-4.5 w-4.5 animate-spin" />
              </div>
              <div className="bg-zinc-50 border border-zinc-150 p-4 rounded-2xl text-xs text-zinc-500 flex items-center gap-2 font-semibold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce delay-200" />
                LOOP AI is querying workspace files...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length === 1 && (
          <div className="px-6 py-3 border-t border-zinc-150 bg-zinc-50">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5" /> Suggested Queries
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-xs bg-white hover:bg-zinc-50 text-zinc-700 px-3.5 py-2 rounded-xl border border-zinc-200 transition shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Input Area */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50/50">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about client feedback e.g., 'What checkout bugs were reported?'"
              className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
