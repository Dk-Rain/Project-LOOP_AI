import Link from "next/link";
import { 
  ArrowRight, 
  MessageSquare, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  CheckCircle2 
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-hidden gradient-bg">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_50%)] animate-pulse-slow" />
      <div className="pointer-events-none absolute right-10 bottom-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(14,165,233,0.03),transparent_50%)]" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-zinc-200/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500 text-white font-bold transition group-hover:scale-105 shadow-lg shadow-indigo-500/20">
              ◆
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-650 bg-clip-text text-transparent font-extrabold">
              LOOP
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center justify-center rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-800 border border-zinc-200 hover:bg-zinc-200/80 transition"
            >
              Dashboard
            </Link>
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl px-6 pt-20 pb-24 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-indigo-600 ring-1 ring-zinc-200 mb-6 animate-fade-in">
          <Zap className="h-3.5 w-3.5" />
          <span>Next-generation Customer Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6 animate-fade-in max-w-4xl mx-auto leading-tight">
          Understand every customer voice, <span className="gradient-text">instantly.</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-650 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
          LOOP aggregates feedback from multiple channels, uses advanced AI to classify sentiment, and helps your team act on key trends to drive product growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
          >
            Start your free trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50 transition"
          >
            Explore live demo dashboard
          </Link>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-16 rounded-2xl glass border border-zinc-200 p-2 shadow-xl animate-fade-in bg-zinc-50/50">
          <div className="rounded-xl overflow-hidden bg-white border border-zinc-150 p-6 text-left">
            {/* Top Mockup bar */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/85" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/85" />
                <span className="w-3 h-3 rounded-full bg-green-500/85" />
                <span className="ml-4 text-xs text-zinc-400 font-mono">loop-workspace-dashboard</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-650 bg-zinc-50 px-3 py-1 rounded-lg border border-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Feed Syncing
              </div>
            </div>

            {/* Metrics cards mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="glass p-4 rounded-xl border border-zinc-200">
                <span className="text-xs text-zinc-500 block mb-1">Total feedback analyzed</span>
                <span className="text-2xl font-bold text-zinc-900">4,819</span>
                <span className="text-[10px] text-green-600 block mt-1">+14.2% from last month</span>
              </div>
              <div className="glass p-4 rounded-xl border border-zinc-200">
                <span className="text-xs text-zinc-500 block mb-1">Overall Sentiment Index</span>
                <span className="text-2xl font-bold text-zinc-900">88%</span>
                <span className="text-[10px] text-indigo-600 block mt-1">Excellent customer health</span>
              </div>
              <div className="glass p-4 rounded-xl border border-zinc-200">
                <span className="text-xs text-zinc-500 block mb-1">AI Automated Actions</span>
                <span className="text-2xl font-bold text-zinc-900">99.4%</span>
                <span className="text-[10px] text-zinc-500 block mt-1">Accuracy rating</span>
              </div>
            </div>

            {/* Chart + feed mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
              <div className="glass p-4 rounded-xl border border-zinc-200 flex flex-col justify-between bg-white">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Weekly Sentiment Pulse</h4>
                  <p className="text-xs text-zinc-500 mb-4">Positive customer signals are at an all-time high.</p>
                </div>
                {/* SVG Mock chart */}
                <div className="h-32 w-full flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,25 Q15,10 30,18 T60,8 T90,5 T100,6 L100,30 L0,30 Z" fill="url(#gradient)" />
                    <path d="M0,25 Q15,10 30,18 T60,8 T90,5 T100,6" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              <div className="glass p-4 rounded-xl border border-zinc-200 bg-white">
                <h4 className="text-sm font-semibold text-zinc-900 mb-4">AI Critical Alerts</h4>
                <div className="space-y-3">
                  <div className="flex gap-3 text-xs bg-red-50 border border-red-100 p-2.5 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                    <div>
                      <p className="font-semibold text-red-700">Billing checkout failing</p>
                      <p className="text-zinc-500">3 reports in the last hour</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs bg-indigo-50 border border-indigo-100 p-2.5 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
                    <div>
                      <p className="font-semibold text-indigo-800">Request for Offline Mode</p>
                      <p className="text-zinc-500">Trending in feature requests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-28">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">
            Everything you need to turn feedback into growth
          </h2>
          <p className="text-zinc-650 max-w-xl mx-auto mb-16 text-sm">
            Stop losing critical customer feedback in separate support channels. Centralize, tag, and analyze everything in one single platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="glass p-6 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Centralized Feedback Inbox</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Import customer tickets, reviews, and survey responses into a single, cohesive team inbox. Search, filter, and tag seamlessly.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-5">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">AI Insights & Categorization</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Automatically classify sentiment, assign priorities, and extract main bug categories using our LLM models trained on SaaS reviews.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-650 mb-5">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Visual Sentiment Trends</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Track how sentiment changes after app updates. Visualize volume spikes and spot recurring feature requests before they drop off.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action section */}
        <div className="mt-28 rounded-3xl glass border border-zinc-200 p-8 sm:p-12 relative overflow-hidden text-center bg-gradient-to-r from-zinc-50 via-zinc-100/50 to-zinc-50 shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.04),transparent_50%)]" />
          <h3 className="text-2xl sm:text-4xl font-bold text-zinc-900 mb-4 relative z-10">
            Ready to listen to your users?
          </h3>
          <p className="text-zinc-650 max-w-lg mx-auto mb-8 text-sm relative z-10">
            Get started with LOOP in minutes. Sign up, create your team workspace, and load your first customer transcripts.
          </p>
          <div className="flex justify-center relative z-10">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
            >
              Sign up for free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 relative z-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-bold">
              ◆
            </div>
            <span className="text-sm font-semibold text-zinc-500 tracking-tight">
              LOOP &copy; 2026. All rights reserved.
            </span>
          </div>

          <div className="flex gap-6 text-xs text-zinc-500">
            <Link href="#" className="hover:text-zinc-800 transition">Terms</Link>
            <Link href="#" className="hover:text-zinc-800 transition">Privacy</Link>
            <Link href="#" className="hover:text-zinc-800 transition">Cookies</Link>
            <Link href="#" className="hover:text-zinc-800 transition">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
