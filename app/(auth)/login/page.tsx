"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Simulate login progress
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="glass rounded-2xl border border-zinc-200 p-8 shadow-xl bg-white relative">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Welcome back</h2>
        <p className="text-zinc-500 text-sm mt-1">Sign in to your customer workspace</p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-zinc-550 text-zinc-500">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pl-11 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              required
            />
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-semibold text-zinc-555 text-zinc-500">
              Password
            </label>
            <Link 
              href="#" 
              className="text-xs text-indigo-650 hover:text-indigo-750 text-indigo-600 hover:text-indigo-700 transition"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pl-11 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              required
            />
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition"
            >
              {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-zinc-200 bg-zinc-50 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0 accent-indigo-600"
          />
          <label htmlFor="remember-me" className="text-xs text-zinc-500 cursor-pointer select-none">
            Keep me signed in for 30 days
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Sign In"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-wider text-zinc-400">
        <div className="h-px flex-1 bg-zinc-200" />
        <span>Or continue with</span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      {/* Social Logins */}
      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 transition"
      >
        <Globe className="h-4 w-4 text-zinc-500" />
        Single Sign-On with Google
      </button>

      <p className="mt-8 text-center text-xs text-zinc-500">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-indigo-650 text-indigo-600 hover:text-indigo-700 transition">
          Create one free
        </Link>
      </p>
    </div>
  );
}
