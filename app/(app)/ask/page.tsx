"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Zap, MessageSquare, HelpCircle, FileText, Frown, Smile, Meh } from "lucide-react";

interface EvidenceItem {
  id: string;
  customerName: string | null;
  customerEmail: string | null;
  content: string;
  sentiment: string;
  channel: string;
  createdAt: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  evidence?: EvidenceItem[];
}

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Ask LOOP. Ask me anything about customer feedback in your workspace, and I will search real database records to answer with grounded evidence."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What are users saying about onboarding?",
    "Summarize issues related to billing or Stripe",
    "Are there any dark mode requests?",
    "What are the major feature suggestions?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.answer,
            evidence: data.evidence,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "I encountered an error querying the database logs.",
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection failed. Please check your local server or network and try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
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
          <Zap className="h-7 w-7 text-indigo-650 text-indigo-600 animate-pulse" />
          Ask LOOP AI
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Perform grounded, evidence-backed natural language queries against your customer feedback data.
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
                      : "bg-indigo-600 text-white shadow-md shadow-indigo-600/10 font-medium"
                  }`}>
                    {msg.content}
                  </div>

                  {/* Grounded Evidence Citing Card */}
                  {isAi && msg.evidence && msg.evidence.length > 0 && (
                    <div className="border border-zinc-200 bg-zinc-50/50 rounded-2xl p-4 space-y-3 shadow-inner">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        Grounded Evidence ({msg.evidence.length} sources)
                      </p>
                      
                      <div className="space-y-2">
                        {msg.evidence.map((ev) => (
                          <div key={ev.id} className="bg-white border border-zinc-150 p-2.5 rounded-xl text-xs space-y-1.5 shadow-sm">
                            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                              <span>{ev.customerName || "Anonymous"}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="bg-zinc-100 border border-zinc-200 px-1 py-0.2 rounded font-mono text-[9px]">{ev.channel}</span>
                                {ev.sentiment === "Positive" && <Smile className="h-3 w-3 text-green-500" />}
                                {ev.sentiment === "Neutral" && <Meh className="h-3 w-3 text-zinc-400" />}
                                {ev.sentiment === "Negative" && <Frown className="h-3 w-3 text-red-500" />}
                              </div>
                            </div>
                            <p className="text-zinc-700 leading-normal font-semibold">"{ev.content}"</p>
                          </div>
                        ))}
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
                Ask LOOP is searching customer logs...
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
              placeholder="Search or ask questions, e.g. 'What are users saying about Stripe?'"
              className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-indigo-500"
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
