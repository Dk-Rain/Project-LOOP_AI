"use client";

import { useState } from "react";
import { 
  User, 
  Settings, 
  Share2, 
  Globe, 
  Smartphone, 
  Mail,
  Shield, 
  Key, 
  Check, 
  Info,
  CheckCircle2
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  // Profile Form States
  const [fullName, setFullName] = useState("Lawrence Dike");
  const [email, setEmail] = useState("lawrence@zidiotech.com");
  const [role, setRole] = useState("Senior Product Specialist");

  // Integrations states
  const [integrations, setIntegrations] = useState([
    { id: "slack", name: "Slack channel sync", desc: "Push negative feedback alerts and summaries to developer channels.", connected: true, icon: Share2 },
    { id: "zendesk", name: "Zendesk ticket import", desc: "Automatically import user support transcripts into LOOP inbox.", connected: true, icon: Key },
    { id: "analytics", name: "Google Analytics sync", desc: "Map demographic trends to feedback logs automatically.", connected: false, icon: Globe }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(item => item.id === id ? { ...item, connected: !item.connected } : item)
    );
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile settings saved successfully.");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage your account profile, workspace connections, and team configurations.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex gap-2 border-b border-zinc-205 border-zinc-200 pb-px">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === "profile" 
              ? "border-indigo-600 text-zinc-900 font-extrabold" 
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          Account Profile
        </button>
        <button
          onClick={() => setActiveTab("integrations")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === "integrations" 
              ? "border-indigo-600 text-zinc-900 font-extrabold" 
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          Active Integrations
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === "api" 
              ? "border-indigo-600 text-zinc-900 font-extrabold" 
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          API Developer Keys
        </button>
      </div>

      {/* Active Panel */}
      {activeTab === "profile" && (
        <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 max-w-xl shadow-sm">
          <form onSubmit={handleProfileSave} className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 mb-4">Personal Details</h3>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-550">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-indigo-500"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-555 text-zinc-500">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-indigo-500"
                required
              />
            </div>

            {/* Job Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-555 text-zinc-500">Job Title</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-500 transition"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {activeTab === "integrations" && (
        <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Workspace Integrations</h3>
            <p className="text-zinc-500 text-xs mt-0.5">Connect external platforms to import and analyze customer feedback automatically.</p>
          </div>

          <div className="divide-y divide-zinc-100">
            {integrations.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-zinc-50 border border-zinc-205 border-zinc-200 flex items-center justify-center text-zinc-500">
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">{item.name}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5 max-w-md">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                      item.connected 
                        ? "bg-green-50 text-green-600 border border-green-100" 
                        : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                    }`}>
                      {item.connected ? "Active" : "Disabled"}
                    </span>

                    <button
                      onClick={() => toggleIntegration(item.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
                        item.connected
                          ? "bg-zinc-50 border-zinc-200 text-zinc-650 hover:text-zinc-900"
                          : "bg-indigo-600 text-white border-transparent hover:bg-indigo-500"
                      }`}
                    >
                      {item.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "api" && (
        <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 space-y-6 max-w-xl shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Developer API Credentials</h3>
            <p className="text-zinc-500 text-xs mt-0.5">Use these keys to authenticate server requests when pushing custom data payloads to LOOP.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500">Secret Token Key</label>
              <div className="relative">
                <input
                  type={apiKeyVisible ? "text" : "password"}
                  value="loop_sk_prod_7719fbc923dd88e1a4ef"
                  readOnly
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 pr-16 text-xs text-zinc-600 font-mono outline-none"
                />
                <button
                  type="button"
                  onClick={() => setApiKeyVisible(!apiKeyVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-indigo-600 hover:text-indigo-700"
                >
                  {apiKeyVisible ? "Hide" : "Reveal"}
                </button>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex gap-3 text-xs text-zinc-600">
              <Info className="h-5 w-5 text-indigo-650 text-indigo-600 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-900">Keep secret keys hidden</p>
                <p className="mt-0.5 leading-relaxed font-medium">
                  Do not share secret keys in public code repositories or frontend client layouts. Regenerate the key if compromised.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
