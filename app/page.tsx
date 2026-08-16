"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Lock,
  Globe,
  Settings,
  Terminal,
  Clock,
  CornerDownRight,
} from "lucide-react";

// Social Proof Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

// Mock data for the interactive simulator
const SIMULATOR_DATA = {
  zendesk: {
    source: "Zendesk Integration",
    user: "Sarah Jenkins (Enterprise Administrator)",
    time: "2 minutes ago",
    content: "The new dashboard filters are loading too slowly, it takes about 10 seconds to refresh the team logs. We need this fixed ASAP as it blocks our reporting.",
    sentiment: "Negative (Speed/Performance)",
    sentimentScore: "18%",
    statusColor: "bg-red-500",
    textColor: "text-red-705 text-red-700",
    bgColor: "bg-red-50/50",
    borderColor: "border-red-150",
    aiAction: "Created Jira Bug ticket: #J-829, set Priority: High, and Slack notification dispatched to #platform-performance.",
  },
  appstore: {
    source: "App Store Review",
    user: "App User 'johndoe_dev'",
    time: "15 minutes ago",
    content: "Absolutely love the clean workspace! The AI action planning saves me at least 3 hours every week. Looking forward to offline support.",
    sentiment: "Positive (User Delight)",
    sentimentScore: "96%",
    statusColor: "bg-emerald-500",
    textColor: "text-emerald-705 text-emerald-700",
    bgColor: "bg-emerald-50/50",
    borderColor: "border-emerald-150",
    aiAction: "Auto-replied: 'Thanks John! Offline mode is in active development.', and logged feature request 'Offline Support' (Volume: 12).",
  },
  discord: {
    source: "Discord Community",
    user: "@pixel_perfect",
    time: "32 minutes ago",
    content: "Hey! Is there any way to change the background to dark mode? The white dashboard is a bit too bright at night.",
    sentiment: "Neutral (Feature Request)",
    sentimentScore: "54%",
    statusColor: "bg-amber-500",
    textColor: "text-amber-705 text-amber-750",
    bgColor: "bg-amber-50/50",
    borderColor: "border-amber-150",
    aiAction: "Categorized under UX/UI requests, tagged 'Dark Mode', and auto-replied with public product roadmap link.",
  },
  intercom: {
    source: "Intercom Chat",
    user: "Alex Rivera (Operations Lead)",
    time: "1 hour ago",
    content: "We are trying to export our monthly analytics report to CSV, but the export button is greyed out. Is this feature disabled for our tier?",
    sentiment: "Neutral (Support Inquiry)",
    sentimentScore: "48%",
    statusColor: "bg-indigo-500",
    textColor: "text-indigo-705 text-indigo-700",
    bgColor: "bg-indigo-50/50",
    borderColor: "border-indigo-150",
    aiAction: "Retrieved Knowledge Base article 'CSV Exports limit', checked workspace plan (Pro), and sent instructions to resolve.",
  },
};

// FAQ Data
const FAQS = [
  {
    q: "How does Loop aggregate feedback?",
    a: "Loop integrates natively with Slack, Discord, Zendesk, the App Store, and other common channels to pull transcripts, reviews, and tickets in real-time."
  },
  {
    q: "Can we customize the AI actions?",
    a: "Yes! You can configure custom rules, auto-reply flows, and issue trackers (like Jira or Linear) based on the categorized sentiment and keywords detected by our AI."
  },
  {
    q: "Is my customer data secure?",
    a: "Absolutely. Loop is SOC-2 compliant and encrypts all customer logs. We never use your customer data to train external public models."
  },
  {
    q: "Is there a free trial?",
    a: "Yes! We offer a 14-day free trial on the Pro tier. You can sign up without a credit card and cancel anytime."
  }
];

export default function Home() {
  const [selectedSource, setSelectedSource] = useState<keyof typeof SIMULATOR_DATA>("zendesk");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState("");

  const handleSourceChange = (source: keyof typeof SIMULATOR_DATA) => {
    setIsAnalyzing(true);
    setSelectedSource(source);
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
    return () => clearTimeout(timer);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const currentData = SIMULATOR_DATA[selectedSource];

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-x-hidden gradient-bg selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_50%)] animate-pulse-slow" />
      <div className="pointer-events-none absolute right-10 bottom-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(14,165,233,0.03),transparent_50%)]" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass border-b border-zinc-200/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/loop logo.png"
              alt="LOOP"
              width={184}
              height={86}
              className="h-10 w-auto object-contain transition group-hover:scale-105"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition">Features</a>
            <a href="#pricing" className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition">Pricing</a>
            <a href="#testimonials" className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition">Testimonials</a>
            <a href="#faq" className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl px-6 pt-12 pb-24 relative z-10">
        
        {/* Animated Pill Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-150 bg-indigo-50/50 px-4 py-1.5 text-xs font-bold text-indigo-700 shadow-sm backdrop-blur-md hover:bg-indigo-50 transition cursor-pointer">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Introducing Loop AI Agent Workspace v1.0</span>
            <ArrowRight className="h-3 w-3 text-indigo-500" />
          </div>
        </div>

        {/* Hero Copy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
            Where customer voice turns into <span className="gradient-text">product action.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Aggregating reviews, support tickets, and community logs into a unified AI interface that categorizes sentiment, builds roadmaps, and automates workflows instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white hover:bg-indigo-500 transition shadow-xl shadow-indigo-600/30 active:scale-95 group"
            >
              Start 14-Day Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/95 px-7 py-4 text-sm font-semibold text-zinc-800 shadow-md backdrop-blur-md transition hover:bg-zinc-50 active:scale-95"
            >
              Explore Live Demo
            </Link>
          </div>
          <p className="text-xs text-zinc-400 mt-4 font-medium">No credit card required. Cancel anytime.</p>
        </div>

        {/* INTERACTIVE WORKSPACE SIMULATOR */}
        <section className="mb-28">
          <div className="rounded-3xl glass border border-zinc-200 p-3 shadow-2xl bg-zinc-50/50">
            <div className="rounded-2xl overflow-hidden bg-white border border-zinc-150 p-6 md:p-8 text-left shadow-inner">
              
              {/* Browser Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 pb-5 mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/85" />
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/85" />
                  <span className="w-3.5 h-3.5 rounded-full bg-green-500/85" />
                  <span className="ml-4 text-xs font-semibold text-zinc-600 bg-zinc-100/85 border border-zinc-200 px-3 py-1.5 rounded-lg font-mono">
                    loop-ai-workspace
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-zinc-650 bg-indigo-50/65 px-4 py-2 rounded-xl border border-indigo-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="font-semibold">Live Simulator Syncing</span>
                </div>
              </div>

              {/* Source Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {(Object.keys(SIMULATOR_DATA) as Array<keyof typeof SIMULATOR_DATA>).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSourceChange(key)}
                    className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border text-sm font-bold transition ${
                      selectedSource === key
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10 scale-102"
                        : "bg-zinc-50/80 border-zinc-200 text-zinc-600 hover:bg-zinc-100/80"
                    }`}
                  >
                    <span>{key === "zendesk" ? "📞 Zendesk" : key === "appstore" ? "📱 App Store" : key === "discord" ? "💬 Discord" : "📧 Intercom"}</span>
                  </button>
                ))}
              </div>

              {/* Simulator Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
                
                {/* Incoming Feedback Box */}
                <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50/50 flex flex-col justify-between min-h-[300px] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between border-b border-zinc-150 pb-3 mb-4">
                      <div>
                        <span className="text-xs font-bold text-indigo-650 uppercase tracking-wide">Source: {currentData.source}</span>
                        <h4 className="text-sm font-bold text-zinc-900 mt-1">{currentData.user}</h4>
                      </div>
                      <span className="text-xs font-medium text-zinc-400">{currentData.time}</span>
                    </div>

                    {isAnalyzing ? (
                      <div className="space-y-4 animate-pulse py-8">
                        <div className="h-4 bg-zinc-200 rounded w-full" />
                        <div className="h-4 bg-zinc-200 rounded w-5/6" />
                        <div className="h-4 bg-zinc-200 rounded w-2/3" />
                      </div>
                    ) : (
                      <p className="text-sm md:text-base text-zinc-700 leading-relaxed font-semibold transition duration-300">
                        &ldquo;{currentData.content}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-150 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${currentData.statusColor}`} />
                      <span className="text-xs font-bold text-zinc-500">AI Sentiment</span>
                    </div>
                    {isAnalyzing ? (
                      <span className="text-xs font-semibold text-zinc-400">Analyzing...</span>
                    ) : (
                      <span className={`text-sm font-bold px-3 py-1 rounded-lg ${currentData.bgColor} ${currentData.textColor} border ${currentData.borderColor}`}>
                        {currentData.sentiment}
                      </span>
                    )}
                  </div>
                </div>

                {/* AI Actions Box */}
                <div className="border border-zinc-200 rounded-2xl p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white min-h-[300px] flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                  
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-indigo-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Loop AI Agent Decision</span>
                      </div>
                      <span className="text-[10px] bg-indigo-500/25 border border-indigo-400/20 px-2 py-0.5 rounded-md text-indigo-200 font-semibold">Active</span>
                    </div>

                    {isAnalyzing ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <span className="animate-spin h-6 w-6 border-2 border-indigo-400 border-t-transparent rounded-full" />
                        <p className="text-xs text-indigo-300 font-medium">Auto-scheduling...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex gap-2 text-xs text-indigo-200">
                          <CornerDownRight className="h-4 w-4 shrink-0 text-indigo-400" />
                          <p className="font-semibold">Classification: Issue Auto-Routing</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl font-mono text-xs md:text-sm text-indigo-50 leading-relaxed shadow-sm">
                          {currentData.aiAction}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Actions auto-executed</span>
                    <span className="font-semibold font-mono">0.6s execution time</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* LOGO WALL */}
        <section className="mb-28 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">
            Powering workflow intelligence for fast-growing companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            <span className="text-sm md:text-lg font-bold text-zinc-500 hover:text-zinc-800 transition cursor-pointer select-none">▼ STRIPE</span>
            <span className="text-sm md:text-lg font-bold text-zinc-500 hover:text-zinc-800 transition cursor-pointer select-none">✦ VERCEL</span>
            <span className="text-sm md:text-lg font-bold text-zinc-500 hover:text-zinc-800 transition cursor-pointer select-none">■ LINEAR</span>
            <span className="text-sm md:text-lg font-bold text-zinc-500 hover:text-zinc-800 transition cursor-pointer select-none">▲ SUPABASE</span>
            <span className="text-sm md:text-lg font-bold text-zinc-500 hover:text-zinc-800 transition cursor-pointer select-none">● FIGMA</span>
          </div>
        </section>

        {/* CORE PLATFORM FEATURES */}
        <section id="features" className="mb-28 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-650">
              <BarChart3 className="h-3.5 w-3.5" />
              SaaS Infrastructure
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
              Built to manage, classify, and automate customer logs
            </h2>
            <p className="mt-4 text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
              Consolidate support tickets, community insights, and application errors into a clean workflow dashboard optimized for quick prioritization and automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass p-8 rounded-2xl border border-zinc-200 hover:border-indigo-300 hover:shadow-lg transition duration-300 group">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-650 mb-6 group-hover:scale-110 transition duration-300">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Consolidated Omni-Inbox</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
                Connect email, Intercom, App Store, Discord, and Zendesk. View every client query, suggestion, and bug report in one performant table.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass p-8 rounded-2xl border border-zinc-200 hover:border-purple-300 hover:shadow-lg transition duration-300 group">
              <div className="h-12 w-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition duration-300">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">AI Sentiment Analysis</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
                Every ticket is scored by sentiment intensity. Identify customer friction zones, spikes in complaints, or users looking to upgrade instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass p-8 rounded-2xl border border-zinc-200 hover:border-sky-300 hover:shadow-lg transition duration-300 group">
              <div className="h-12 w-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition duration-300">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Actionable Workflows</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
                Set automation rules. Turn critical server complaints into Jira tickets automatically, assign owners, and send Slack notifications in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* VALUE-PROP BENTO GRID */}
        <section className="mb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: Main Callout */}
            <div className="md:col-span-2 rounded-3xl border border-zinc-200 bg-gradient-to-br from-indigo-50/40 via-white to-sky-50/40 p-8 shadow-sm flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-xs font-bold text-indigo-650 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-md">Performance</span>
                <h3 className="text-2xl font-extrabold text-zinc-900 mt-4 max-w-md">
                  Keep your entire product development cycle in sync.
                </h3>
                <p className="text-zinc-500 text-sm mt-3 max-w-lg leading-relaxed font-semibold">
                  Loop continuously monitors integration feeds. When users experience bugs, the dev team receives alerts with full debug contexts, tickets, and traces.
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-6 text-xs text-zinc-400 font-bold border-t border-zinc-100 pt-6">
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-indigo-500" /> Real-time updates</div>
                <div className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-indigo-500" /> Multi-region sync</div>
              </div>
            </div>

            {/* Bento Card 2: Interactive metrics */}
            <div className="rounded-3xl border border-zinc-200 p-8 shadow-sm bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md">Accuracy</span>
                <h3 className="text-2xl font-extrabold text-zinc-900 mt-4">
                  99.4% AI Accuracy
                </h3>
                <p className="text-zinc-500 text-sm mt-3 leading-relaxed font-semibold">
                  Our LLM classifications match human labeling precision, routing logs to developers correctly without noise.
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-zinc-50/70 rounded-2xl border border-zinc-150">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-500 mb-1">
                  <span>Routing Accuracy</span>
                  <span>99.4%</span>
                </div>
                <div className="w-full bg-zinc-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full w-[99.4%]" />
                </div>
              </div>
            </div>

            {/* Bento Card 3: Security */}
            <div className="rounded-3xl border border-zinc-200 p-8 shadow-sm bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-650 uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-md">Compliance</span>
                <h3 className="text-xl font-extrabold text-zinc-900 mt-4">
                  SOC-2 Type II Certified
                </h3>
                <p className="text-zinc-500 text-sm mt-3 leading-relaxed font-semibold">
                  We guarantee industry-grade compliance. Your customers&apos; private data is strictly encrypted at rest and in transit.
                </p>
              </div>
              <div className="mt-8 flex justify-start text-indigo-650">
                <Lock className="h-8 w-8 text-indigo-500" />
              </div>
            </div>

            {/* Bento Card 4: Detailed API support */}
            <div className="md:col-span-2 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-sky-655 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-md">Integrations</span>
                <h3 className="text-2xl font-extrabold text-zinc-900 mt-4">
                  Complete Developer API Toolkit
                </h3>
                <p className="text-zinc-500 text-sm mt-3 leading-relaxed font-semibold">
                  Connect Loop directly into your proprietary internal backends with our lightweight SDKs or send raw custom payloads using our secure Webhook endpoints.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-zinc-650">
                <div className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl flex items-center justify-center gap-2">
                  <Terminal className="h-4 w-4 text-indigo-500" /> JS / TS SDK
                </div>
                <div className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl flex items-center justify-center gap-2">
                  <Settings className="h-4 w-4 text-indigo-500" /> REST API
                </div>
                <div className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl flex items-center justify-center gap-2">
                  <Globe className="h-4 w-4 text-indigo-500" /> Webhooks
                </div>
                <div className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4 text-indigo-500" /> OAuth 2.0
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="mb-28 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-650">
              Pricing Plans
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
              Simple, transparent pricing tiers
            </h2>
            <p className="mt-4 text-zinc-500 text-sm font-semibold">
              Start with our free plan or upgrade to accelerate your customer insights with automated triggers and Slack integrations.
            </p>

            {/* Toggle Switch */}
            <div className="mt-8 flex justify-center items-center gap-3">
              <span className={`text-sm font-bold ${billingPeriod === "monthly" ? "text-zinc-900" : "text-zinc-400"}`}>Billed Monthly</span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
                className="w-12 h-6.5 bg-indigo-600 rounded-full p-1 relative flex items-center transition duration-300"
              >
                <span className={`bg-white w-4.5 h-4.5 rounded-full shadow transition-all duration-300 absolute ${
                  billingPeriod === "yearly" ? "right-1" : "left-1"
                }`} />
              </button>
              <span className={`text-sm font-bold flex items-center gap-1.5 ${billingPeriod === "yearly" ? "text-zinc-900" : "text-zinc-400"}`}>
                Billed Yearly
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                  Save 20% 🎉
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Plan 1: Starter */}
            <div className="glass p-8 rounded-3xl border border-zinc-200 bg-white flex flex-col justify-between hover:shadow-md transition">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Starter</h3>
                <p className="text-xs text-zinc-400 mt-1">For side projects and testing</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-zinc-900">$0</span>
                  <span className="text-xs text-zinc-400 ml-1">/ month</span>
                </div>
                
                <ul className="mt-8 space-y-4 text-xs font-semibold text-zinc-650">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Up to 150 customer logs / mo</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Standard AI sentiment score</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Discord and Webhook integrations</li>
                  <li className="flex items-center gap-2.5 text-zinc-400 line-through"><CheckCircle2 className="h-4 w-4" /> Automations & issue routing</li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="mt-8 inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/50 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 transition"
              >
                Sign Up for Free
              </Link>
            </div>

            {/* Plan 2: Pro (Featured) */}
            <div className="glass p-8 rounded-3xl border-2 border-indigo-600 bg-white flex flex-col justify-between shadow-lg shadow-indigo-600/5 relative hover:scale-101 transition duration-300">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                Most Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Pro</h3>
                <p className="text-xs text-zinc-400 mt-1">For fast-growing product teams</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-zinc-900">
                    {billingPeriod === "yearly" ? "$39" : "$49"}
                  </span>
                  <span className="text-xs text-zinc-400 ml-1">/ month</span>
                </div>
                
                <ul className="mt-8 space-y-4 text-xs font-semibold text-zinc-650">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Unlimited feed connections</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Up to 5,000 customer logs / mo</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Advanced AI sentiment categories</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Jira & Slack automation routes</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Weekly email summary reports</li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 active:scale-98"
              >
                Get Started
              </Link>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="glass p-8 rounded-3xl border border-zinc-200 bg-white flex flex-col justify-between hover:shadow-md transition">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Enterprise</h3>
                <p className="text-xs text-zinc-400 mt-1">For operations scaling up</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-zinc-900">
                    {billingPeriod === "yearly" ? "$149" : "$189"}
                  </span>
                  <span className="text-xs text-zinc-400 ml-1">/ month</span>
                </div>
                
                <ul className="mt-8 space-y-4 text-xs font-semibold text-zinc-650">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Custom volume allocations</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Dedicated secure LLM instance</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Custom integrations with CRM/Helpdesk</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> SLA Response guarantee (4 hours)</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Dedicated accounts representative</li>
                </ul>
              </div>

              <Link
                href="mailto:sales@loop.ai"
                className="mt-8 inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/50 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 transition"
              >
                Contact Sales
              </Link>
            </div>

          </div>
        </section>

        {/* CUSTOMER TESTIMONIALS */}
        <section id="testimonials" className="mb-28 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-650">
              Testimonials
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
              Loved by customer-driven founders
            </h2>
            <p className="mt-4 text-zinc-500 text-sm font-semibold">
              See how modern product managers and engineers use Loop to translate logs into tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="glass p-6 rounded-2xl border border-zinc-200 bg-white hover:scale-102 transition duration-300">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-sm">
                  MD
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Marcus Davies</h4>
                  <p className="text-[10px] text-zinc-400">CTO, CloudScale</p>
                </div>
              </div>
              <p className="text-xs text-zinc-550 leading-relaxed font-semibold">
                &ldquo;Before Loop, sorting bug reports from Zendesk was a full-time task. Now the AI categorizes and templates Jira bugs automatically. Our dev speed increased by 30%.&rdquo;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="glass p-6 rounded-2xl border border-zinc-200 bg-white hover:scale-102 transition duration-300">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-sm">
                  TL
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Tanya Lopez</h4>
                  <p className="text-[10px] text-zinc-400">Head of Support, DevKit</p>
                </div>
              </div>
              <p className="text-xs text-zinc-550 leading-relaxed font-semibold">
                &ldquo;The real-time sentiment alerts let us know immediately when a billing API issue affected checkout. We resolved the bug before a massive wave of tickets could hit us.&rdquo;
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="glass p-6 rounded-2xl border border-zinc-200 bg-white hover:scale-102 transition duration-300">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-sm">
                  JH
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">James Hunt</h4>
                  <p className="text-[10px] text-zinc-400">Product Lead, WebFlow Pro</p>
                </div>
              </div>
              <p className="text-xs text-zinc-550 leading-relaxed font-semibold">
                &ldquo;Loop matches community inquiries on Discord with ticketing workflows. We can instantly trace requests for specific features, giving us clear insights on what to build next.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <section id="faq" className="mb-28 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-650">
              FAQ
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
              Got Questions? We have answers.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-zinc-200 rounded-2xl bg-white overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base text-zinc-900 hover:bg-zinc-550 hover:bg-zinc-50 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform duration-250 ${
                      isOpen ? "rotate-180" : ""
                    }`} />
                  </button>
                  <div className={`transition-all duration-350 ${
                    isOpen ? "max-h-[300px] border-t border-zinc-100 p-5 bg-zinc-50/40" : "max-h-0"
                  } overflow-hidden`}>
                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-semibold">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONVERSION BOTTOM CTA CARD */}
        <section className="rounded-3xl glass border border-zinc-200 p-8 sm:p-14 relative overflow-hidden text-center bg-gradient-to-r from-zinc-50 via-zinc-100/50 to-zinc-50 shadow-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.04),transparent_50%)]" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-4">
              Unlock the power of your customer voice
            </h3>
            <p className="text-zinc-550 max-w-lg mx-auto mb-8 text-sm md:text-base leading-relaxed font-semibold">
              Consolidate streams, score sentiments, and automate key engineering tickets within minutes. Free 14-day trial, cancel anytime.
            </p>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/signup?email=${encodeURIComponent(emailInput)}`;
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your work email"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition shadow-sm"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20 active:scale-95"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-10 px-5 py-12 sm:gap-x-10 sm:px-6 lg:grid-cols-[1.3fr_repeat(5,.7fr)] lg:py-14">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex"><Image src="/loop logo.png" alt="LOOP" width={184} height={86} className="h-10 w-auto object-contain" /></Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500 font-semibold">The AI productivity platform that helps teams plan, automate, collaborate, and achieve more with intelligent workflows.</p>
            <a href="mailto:support@loop.ai" className="mt-5 inline-block text-sm font-semibold text-indigo-600 transition hover:text-indigo-500">support@loop.ai</a>
            <div className="mt-6 flex items-center gap-2">
              <a href="#" aria-label="LOOP on GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"><GithubIcon className="h-4 w-4" /></a>
              <a href="#" aria-label="LOOP on LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"><LinkedinIcon className="h-4 w-4" /></a>
              <a href="#" aria-label="LOOP on X" className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"><TwitterIcon className="h-4 w-4" /></a>
              <a href="#" aria-label="LOOP on YouTube" className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"><YoutubeIcon className="h-4 w-4" /></a>
            </div>
          </div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Product</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="/dashboard" className="block transition hover:text-indigo-600 font-semibold">Dashboard</Link><Link href="/inbox" className="block transition hover:text-indigo-600 font-semibold font-semibold">Feedback Inbox</Link><Link href="/ask" className="block transition hover:text-indigo-600 font-semibold">Ask LOOP AI</Link><Link href="/trends" className="block transition hover:text-indigo-600 font-semibold font-semibold">Trend Analysis</Link><Link href="/reports" className="block transition hover:text-indigo-600 font-semibold font-semibold">Reports</Link></div></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Resources</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Help Center</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Tutorials</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Blog</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Community</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Templates</Link></div></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Developers</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Documentation</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">API Reference</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">SDKs</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Authentication</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">OAuth &amp; Webhooks</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">OpenAPI Spec</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Examples</Link></div></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Company</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="#" className="block transition hover:text-indigo-600 font-semibold">About</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Careers</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Security</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Contact</Link></div></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Security</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Trust Center</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold font-semibold">Compliance</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">SOC 2</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">GDPR</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Privacy</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold font-semibold">Data Processing</Link><Link href="#" className="block transition hover:text-indigo-600 font-semibold">Responsible AI</Link></div></div>
        </div>
        <div className="border-t border-zinc-100"><div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-5 text-center text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left"><span>© 2026 LOOP Technologies. Built for the future of AI productivity.</span><div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-start"><span className="font-semibold text-emerald-600">● Status</span><span>Version 1.0</span><Link href="#" className="transition hover:text-indigo-600 font-semibold font-semibold">Privacy</Link><Link href="#" className="transition hover:text-indigo-600 font-semibold font-semibold">Terms</Link><Link href="#" className="transition hover:text-indigo-600 font-semibold font-semibold">Cookies</Link></div></div></div>
      </footer>
    </div>
  );
}
