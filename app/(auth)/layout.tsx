import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Sparkles, Globe, Activity } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 flex flex-col lg:grid lg:grid-cols-12 overflow-x-hidden">
      {/* Decorative Orbs for the entire page background */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.03),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.02),transparent_70%)]" />

      {/* LEFT SIDE PANEL (Desktop Only, lg and above) */}
      <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 bg-zinc-50 border-r border-zinc-200 flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Glow behind visual elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none animate-pulse-slow" />

        {/* Branding header */}
        <div className="z-10">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <Image src="/loop logo.png" alt="LOOP logo" width={184} height={86} className="h-10 w-auto object-contain" priority />
          </Link>
        </div>

        {/* Dynamic visual graphic showing feedback cards floating around the central core */}
        <div className="my-auto py-12 flex flex-col items-center justify-center z-10 relative h-[400px] w-full">
          {/* Central LOOP core */}
          <div className="h-20 w-20 rounded-2xl bg-white border border-zinc-200 shadow-xl flex items-center justify-center relative animate-float-medium">
            <Image src="/loop logo.png" alt="LOOP logo" width={64} height={30} className="h-auto w-16 object-contain" priority />
            {/* Pulsing rings */}
            <div className="absolute -inset-4 rounded-3xl border border-indigo-500/20 animate-ping [animation-duration:3s]" />
            <div className="absolute -inset-8 rounded-[36px] border border-indigo-500/10 animate-ping [animation-duration:4s] [animation-delay:1s]" />
          </div>

          {/* Floating Pill 1 (Top-Left) */}
          <div className="absolute top-10 left-4 bg-white/95 backdrop-blur border border-zinc-200/80 rounded-2xl p-3 shadow-md flex items-center gap-3 max-w-[210px] animate-float-slow">
            <div className="h-8 w-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-zinc-800 truncate">Slack sync active</p>
              <p className="text-[9px] text-purple-600 font-semibold font-mono mt-0.5">#dev-alerts</p>
            </div>
          </div>

          {/* Floating Pill 2 (Top-Right) */}
          <div className="absolute top-20 right-6 bg-white/95 backdrop-blur border border-red-100 rounded-2xl p-3 shadow-md flex items-center gap-3 max-w-[220px] animate-float-medium">
            <div className="h-8 w-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
              <Activity className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-zinc-800 truncate">Stripe checkout fail</p>
              <p className="text-[9px] text-red-500 font-semibold font-mono mt-0.5">500 error logged</p>
            </div>
          </div>

          {/* Floating Pill 3 (Bottom-Left) */}
          <div className="absolute bottom-16 left-6 bg-white/95 backdrop-blur border border-emerald-100 rounded-2xl p-3 shadow-md flex items-center gap-3 max-w-[210px] animate-float-medium">
            <div className="h-8 w-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-zinc-800 truncate">Feature requested</p>
              <p className="text-[9px] text-emerald-600 font-semibold font-mono mt-0.5">Offline sync support</p>
            </div>
          </div>

          {/* Floating Pill 4 (Bottom-Right) */}
          <div className="absolute bottom-10 right-4 bg-white/95 backdrop-blur border border-zinc-200/80 rounded-2xl p-3 shadow-md flex items-center gap-3 max-w-[200px] animate-float-slow">
            <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Globe className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-zinc-800 truncate">Zendesk import</p>
              <p className="text-[9px] text-indigo-600 font-semibold font-mono mt-0.5">24 transcripts</p>
            </div>
          </div>
        </div>

        {/* Writeup at the bottom */}
        <div className="z-10 space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 leading-tight">
            Collect feedback. Automate analysis. Coordinate roadmap.
          </h2>
          <p className="text-zinc-500 text-xs leading-relaxed max-w-sm font-medium">
            Ingest user reviews, tag bug reports, and sync engineering workflows automatically within one clean unified workspace.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE PANEL (Auth form for both Desktop and Mobile layout container) */}
      <div className="flex-1 lg:col-span-7 xl:col-span-7 flex flex-col justify-between min-h-screen p-6 md:p-12 z-10">
        {/* Mobile Header Branding & Compact Illustration */}
        <header className="w-full flex flex-col gap-4 lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/loop logo.png" alt="LOOP logo" width={184} height={86} className="h-10 w-auto object-contain" priority />
            </Link>
          </div>

          {/* Compact visual illustration block for Mobile (Stacked top view) */}
          <div className="glass-light rounded-2xl border border-zinc-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-500/5 blur-2xl rounded-full" />
            <div className="space-y-1 sm:max-w-[65%]">
              <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">LOOP Customer Intelligence</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                Collect support logs, analyze user sentiment, and sync developer workflows automatically.
              </p>
            </div>

            {/* Mobile compact animated float badges (horizontal flex) */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-white/95 border border-red-100 rounded-xl px-2.5 py-1.5 shadow-sm flex items-center gap-1.5 animate-float-medium text-[9px] font-bold text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Checkout Error
              </div>
              <div className="bg-white/95 border border-emerald-100 rounded-xl px-2.5 py-1.5 shadow-sm flex items-center gap-1.5 animate-float-slow text-[9px] font-bold text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Slack Synced
              </div>
            </div>
          </div>
        </header>

        {/* Blank spacer on desktop headers */}
        <header className="hidden lg:block h-8" />

        {/* Core Form Container */}
        <main className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-md animate-fade-in">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-[11px] text-zinc-500 font-medium">
          &copy; 2026 LOOP Customer Intelligence. Built for high-growth product teams.
        </footer>
      </div>
    </div>
  );
}
