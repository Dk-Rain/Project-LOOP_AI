"use client";

import { useState, useEffect } from "react";
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
  // Profile Form States (populated from session)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  // Members states
  const [members, setMembers] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("ANALYST");
  const [inviteResult, setInviteResult] = useState<string | null>(null);
  const [profileResult, setProfileResult] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const isAdmin = currentUser?.role === "ADMIN";

  // (Integrations and Developer Keys removed per request)

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileResult(null);
    setIsSavingProfile(true);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save profile");
      setCurrentUser(data.user);
      setFullName(data.user.name);
      setEmail(data.user.email);
      setProfileResult("Profile saved.");
    } catch (error: any) {
      setProfileResult(error.message || "Failed to save profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  async function fetchMembers() {
    try {
      const res = await fetch('/api/members');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch members');
      setMembers(data.members || []);
      setInvites(data.invites || []);
    } catch (err) {
      // ignore errors silently for now
      setMembers([]);
    }
  }

  async function fetchCurrentUser() {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) throw new Error('Unauthenticated');
      const data = await res.json();
      setCurrentUser(data.user || null);
      if (data.user) {
        setFullName(data.user.name || '');
        setEmail(data.user.email || '');
        setRole(data.user.role || '');
      }
    } catch (e) {
      setCurrentUser(null);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
    if (activeTab === 'members') fetchMembers();
  }, [activeTab]);

  // Ensure members list includes current user (defensive)
  useEffect(() => {
    if (!currentUser) return;
    const exists = members.some(m => m.email === currentUser.email);
    if (!exists && currentUser.workspaceId) {
      setMembers(prev => [{ id: currentUser.id, name: currentUser.name, email: currentUser.email, role: currentUser.role, createdAt: new Date().toISOString() }, ...prev]);
    }
  }, [currentUser, members]);

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
        {isAdmin && (
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition ${
              activeTab === "members"
                ? "border-indigo-600 text-zinc-900 font-extrabold"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Team / Members
          </button>
        )}
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

            {/* Workspace role */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-555 text-zinc-500">Workspace Role</label>
              <input
                type="text"
              value={role}
                readOnly
                className="w-full rounded-xl border border-zinc-200 bg-zinc-100 px-3.5 py-2.5 text-xs text-zinc-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSavingProfile}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-500 transition"
            >
              {isSavingProfile ? "Saving..." : "Save Profile Changes"}
            </button>
            {profileResult && <p className={`text-xs font-medium ${profileResult === "Profile saved." ? "text-green-600" : "text-red-600"}`}>{profileResult}</p>}
          </form>
        </div>
      )}

      {/* Removed Integrations and Developer Keys panels */}

      {activeTab === "members" && isAdmin && (
        <div className="glass rounded-2xl border border-zinc-200 bg-white p-6 space-y-6 shadow-sm max-w-3xl">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Workspace Members</h3>
            <p className="text-zinc-500 text-xs mt-0.5">View and invite teammates to this workspace. Invitations are delivered in-app via a copyable link.</p>
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-50 p-4 rounded-xl">
              <h4 className="text-xs font-semibold mb-2">Invite Teammate</h4>
              <div className="flex flex-wrap gap-2 items-center">
                <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="email@company.com" className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs outline-none w-full sm:w-64" />
                <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="rounded-xl border border-zinc-200 px-3 py-2 text-xs">
                  <option value="ANALYST">Analyst</option>
                  <option value="VIEWER">Viewer</option>
                </select>
                <button onClick={async () => {
                  setInviteResult(null);
                  try {
                    const res = await fetch('/api/members/invite', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email: inviteEmail, role: inviteRole }) });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Invite failed');
                    setInviteResult(data.inviteUrl || data.token || 'Invitation created');
                    setInviteEmail('');
                    // Refresh members list
                    fetchMembers();
                  } catch (err: any) {
                    setInviteResult(err.message || String(err));
                  }
                }} className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white">Send Invitation</button>
              </div>
              {inviteResult && <p className="text-[12px] mt-2">Invite link / token: <span className="font-mono text-indigo-600">{inviteResult}</span></p>}
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-2">Members</h4>
              <div className="space-y-2">
                {invites.length === 0 && members.length === 0 && <p className="text-zinc-500 text-xs">No members or pending invites yet.</p>}

                {/* Pending invitations */}
                {invites.map(inv => (
                  <div key={`inv-${inv.id}`} className="flex items-center justify-between bg-white border border-zinc-100 rounded-xl p-3 text-xs">
                    <div>
                      <p className="font-semibold text-zinc-900">{inv.email}</p>
                      <p className="text-zinc-500 text-[11px]">Invited as {inv.role} • Pending</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => {
                        const url = `${window.location.origin}/accept-invite?token=${inv.token}`;
                        navigator.clipboard.writeText(url);
                        setInviteResult('Copied invite link to clipboard');
                      }} className="text-[11px] text-indigo-600 font-semibold">Copy Link</button>
                      <div className="text-[11px] text-zinc-500">Invited {new Date(inv.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}

                {/* Active members */}
                {members.map(m => (
                  <div key={m.id} className="flex items-center justify-between bg-white border border-zinc-100 rounded-xl p-3 text-xs">
                    <div>
                      <p className="font-semibold text-zinc-900">{m.name || m.email}</p>
                      <p className="text-zinc-500 text-[11px]">{m.email} • {m.role}</p>
                    </div>
                    <div className="text-[11px] text-zinc-500">Joined {new Date(m.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
