"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Check, ArrowRight } from "lucide-react";

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Viewer");
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

    // include role in the simulated signup payload
    const payload = { fullName, email, role };
    // eslint-disable-next-line no-console
    console.log("Signup payload:", payload);

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

        {/* User Role */}
        <div className="space-y-1.5">
          <label htmlFor="role" className="text-xs font-semibold text-zinc-500">
            User Role
          </label>
          <div className="relative">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
            >
              <option value="Admin">Admin</option>
              <option value="Analysis">Analysis</option>
              <option value="Viewer">Viewer</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
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

      <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-wider text-zinc-400">
        <div className="h-px flex-1 bg-zinc-200" />
        <span>Or continue with</span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition"
      >
        <div className="flex h-5 w-5 items-center justify-center">
          <GoogleIcon className="h-5 w-5" />
        </div>
        <span className="truncate">Continue with Google</span>
      </button>

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
