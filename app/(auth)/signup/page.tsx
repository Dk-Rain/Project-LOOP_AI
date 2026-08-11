"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Check, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password Validations
  const lengthMet = password.length >= 8;
  const uppercaseMet = /[A-Z]/.test(password);
  const lowercaseMet = /[a-z]/.test(password);
  const numberMet = /[0-9]/.test(password);
  
  const isPasswordValid = lengthMet && uppercaseMet && lowercaseMet && numberMet;
  const canSubmit = fullName && email && isPasswordValid;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="glass rounded-2xl border border-zinc-200 p-8 shadow-xl bg-white relative">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Create your account</h2>
        <p className="text-zinc-500 text-sm mt-1">Get started with customer intelligence.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="text-xs font-semibold text-zinc-500">
            Full Name
          </label>
          <div className="relative">
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pl-11 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-zinc-500">
            Work Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pl-11 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              required
            />
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-semibold text-zinc-500">
            Choose Password
          </label>
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

        {/* Password strength checklist */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 space-y-2">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
            Password checklist
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Requirement label="8+ characters" met={lengthMet} />
            <Requirement label="Uppercase letter" met={uppercaseMet} />
            <Requirement label="Lowercase letter" met={lowercaseMet} />
            <Requirement label="One number" met={numberMet} />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || isLoading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating workspace..." : "Create Account"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-indigo-650 text-indigo-600 hover:text-indigo-700 transition">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function Requirement({ label, met }: { label: string; met: boolean }) {
  return (
    <div className={`flex items-center gap-2 transition-colors ${met ? "text-green-600" : "text-zinc-500"}`}>
      <span className={`flex h-4.5 w-4.5 items-center justify-center rounded-full transition-all border ${
        met ? "bg-green-50 border-green-100 text-green-600" : "border-zinc-200 bg-white"
      }`}>
        {met && <Check className="h-3 w-3 stroke-[2.5]" />}
      </span>
      <span className="text-[11px] font-medium">{label}</span>
    </div>
  );
}
