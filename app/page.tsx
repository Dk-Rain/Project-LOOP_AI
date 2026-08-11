import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  Users,
  CheckCircle2,
} from "lucide-react";

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
            <Image src="/loop logo.png" alt="LOOP" width={184} height={86} className="h-10 w-auto object-contain transition group-hover:scale-105" priority />
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
      <main className="mx-auto max-w-6xl px-6 pt-6 pb-24 text-center relative z-10 sm:pt-10">
        <section className="relative left-1/2 isolate w-screen -translate-x-1/2 overflow-hidden py-8 sm:py-12">
          <Image src="/loop-analytics.gif" alt="" fill unoptimized priority sizes="(max-inline-size: 768px) 100vw, 1152px" className="object-cover opacity-25 dark:opacity-30" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/65 to-white/80 dark:from-[#0b1020]/45 dark:via-[#0b1020]/65 dark:to-[#0b1020]/80" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/90 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-md mb-6 animate-fade-in">
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/90 px-6 py-3.5 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur-md transition hover:bg-white"
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
                <span className="ml-4 text-xs font-medium text-zinc-600 font-mono">loop-workspace-dashboard</span>
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
          </div>
        </section>

        {/* Analytics and AI chat showcase */}
        <section className="mt-28 text-left">
          <div className="mx-auto max-w-2xl text-center"><span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600"><BarChart3 className="h-3.5 w-3.5"/>Live intelligence</span><h2 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">See the work. Ask what matters.</h2><p className="mt-4 text-sm leading-6 text-zinc-600">LOOP connects real-time analytics with an AI teammate that turns insights into clear next steps.</p></div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-5 shadow-lg shadow-indigo-100/60 sm:p-7">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-200/40 blur-3xl animate-pulse"/>
              <div className="relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold text-zinc-900">Productivity overview</p><p className="mt-1 text-[11px] text-zinc-500">This week&apos;s focus performance</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">+18.4%</span></div><div className="mt-6 flex h-28 items-end gap-2">{[42, 68, 51, 78, 66, 92, 81].map((height, index) => <span key={index} className={`flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-sky-400 ${index === 5 ? 'animate-pulse' : ''}`} style={{ blockSize: `${height}%` }}/>)}</div><div className="mt-3 flex justify-between text-[9px] font-medium text-zinc-400"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div className="mt-5 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4"><div><p className="text-[10px] text-zinc-500">Focus time</p><b className="text-sm text-zinc-900">8h 24m</b></div><div><p className="text-[10px] text-zinc-500">Tasks done</p><b className="text-sm text-zinc-900">18</b></div><div><p className="text-[10px] text-zinc-500">Focus score</p><b className="text-sm text-zinc-900">82%</b></div></div></div>
              <div className="relative mt-5 flex items-center gap-2 text-xs font-medium text-indigo-700"><span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping"/><span>Analytics update as your work happens.</span></div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-5 shadow-lg shadow-violet-100/60 sm:p-7">
              <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-cyan-200/40 blur-3xl animate-pulse"/>
              <div className="relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl"><div className="flex items-center gap-3 border-b border-zinc-100 pb-4"><Image src="/loop icon.png" alt="LOOP AI" width={32} height={32} className="h-8 w-8 rounded-xl object-cover"/><div><p className="text-xs font-semibold text-zinc-900">LOOP AI</p><p className="text-[10px] text-emerald-600">● Online and ready to help</p></div></div><div className="space-y-4 py-5 text-xs"><div className="flex gap-2"><Image src="/loop icon.png" alt="" width={24} height={24} className="h-6 w-6 rounded-lg object-cover"/><p className="max-w-[78%] rounded-2xl rounded-tl-sm bg-zinc-100 px-3 py-2.5 text-zinc-600">Your focus score is up 18%. Want a plan for your next task?</p></div><p className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-indigo-600 px-3 py-2.5 text-white">Yes, plan my afternoon.</p><div className="flex gap-2"><Image src="/loop icon.png" alt="" width={24} height={24} className="h-6 w-6 rounded-lg object-cover"/><p className="max-w-[78%] rounded-2xl rounded-tl-sm bg-zinc-100 px-3 py-2.5 text-zinc-600">Start with Design Homepage UI, then complete Authentication before your Team Meeting.</p></div></div><div className="flex items-center gap-1.5 rounded-xl bg-zinc-50 px-3 py-2 text-[10px] text-zinc-400"><span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-bounce"/><span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:150ms]"/><span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:300ms]"/><span className="ml-1">LOOP AI is thinking</span></div></div>
              <p className="relative mt-5 text-xs font-medium text-violet-700">Chat with an AI coach that understands your workload.</p>
            </div>
          </div>
        </section>

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
      <footer className="relative z-10 mt-20 border-t border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-10 px-5 py-12 sm:gap-x-10 sm:px-6 lg:grid-cols-[1.3fr_repeat(5,.7fr)] lg:py-14">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex"><Image src="/loop logo.png" alt="LOOP" width={184} height={86} className="h-10 w-auto object-contain" /></Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">The AI productivity platform that helps teams plan, automate, collaborate, and achieve more with intelligent workflows.</p>
            <a href="mailto:support@loop.ai" className="mt-5 inline-block text-sm font-medium text-indigo-600 transition hover:text-indigo-500">support@loop.ai</a>
            <div className="mt-6 flex items-center gap-2">
              <a href="#" aria-label="LOOP on GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"><GithubIcon className="h-4 w-4" /></a>
              <a href="#" aria-label="LOOP on LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"><LinkedinIcon className="h-4 w-4" /></a>
              <a href="#" aria-label="LOOP on X" className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"><TwitterIcon className="h-4 w-4" /></a>
              <a href="#" aria-label="LOOP on YouTube" className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"><YoutubeIcon className="h-4 w-4" /></a>
            </div>
          </div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Product</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="/dashboard" className="block transition hover:text-indigo-600">Dashboard</Link><Link href="/tasks" className="block transition hover:text-indigo-600">Tasks</Link><Link href="/calendar" className="block transition hover:text-indigo-600">Calendar</Link><Link href="/goals" className="block transition hover:text-indigo-600">Goals</Link><Link href="/ask" className="block transition hover:text-indigo-600">AI Assistant</Link><Link href="/analytics" className="block transition hover:text-indigo-600">Analytics</Link></div></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Resources</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="#" className="block transition hover:text-indigo-600">Help Center</Link><Link href="#" className="block transition hover:text-indigo-600">Tutorials</Link><Link href="#" className="block transition hover:text-indigo-600">Blog</Link><Link href="#" className="block transition hover:text-indigo-600">Community</Link><Link href="#" className="block transition hover:text-indigo-600">Templates</Link></div></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Developers</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="#" className="block transition hover:text-indigo-600">Documentation</Link><Link href="#" className="block transition hover:text-indigo-600">API Reference</Link><Link href="#" className="block transition hover:text-indigo-600">SDKs</Link><Link href="#" className="block transition hover:text-indigo-600">Authentication</Link><Link href="#" className="block transition hover:text-indigo-600">OAuth &amp; Webhooks</Link><Link href="#" className="block transition hover:text-indigo-600">OpenAPI Spec</Link><Link href="#" className="block transition hover:text-indigo-600">Examples</Link></div></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Company</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="#" className="block transition hover:text-indigo-600">About</Link><Link href="#" className="block transition hover:text-indigo-600">Careers</Link><Link href="#" className="block transition hover:text-indigo-600">Security</Link><Link href="#" className="block transition hover:text-indigo-600">Contact</Link></div></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Security</h3><div className="mt-4 space-y-3 text-sm text-zinc-500"><Link href="#" className="block transition hover:text-indigo-600">Trust Center</Link><Link href="#" className="block transition hover:text-indigo-600">Compliance</Link><Link href="#" className="block transition hover:text-indigo-600">SOC 2</Link><Link href="#" className="block transition hover:text-indigo-600">GDPR</Link><Link href="#" className="block transition hover:text-indigo-600">Privacy</Link><Link href="#" className="block transition hover:text-indigo-600">Data Processing</Link><Link href="#" className="block transition hover:text-indigo-600">Responsible AI</Link></div></div>
        </div>
        <div className="border-t border-zinc-100"><div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-5 text-center text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left"><span>© 2026 LOOP Technologies. Built for the future of AI productivity.</span><div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-start"><span className="font-medium text-emerald-600">● Status</span><span>Version 1.0</span><Link href="#" className="transition hover:text-indigo-600">Privacy</Link><Link href="#" className="transition hover:text-indigo-600">Terms</Link><Link href="#" className="transition hover:text-indigo-600">Cookies</Link></div></div></div>
      </footer>
    </div>
  );
}
