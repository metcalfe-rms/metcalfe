"use client"
import { Header } from "@/components/layout/Header"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import {
  Bell, Shield, Palette, Globe, Video, Users,
  ChevronRight, Save, Trash2, Key
} from "lucide-react"
import { useState } from "react"

const tabs = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "cameras", label: "Cameras", icon: Video },
  { id: "team", label: "Team Access", icon: Users },
]

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <button
      onClick={() => setOn(!on)}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors",
        on ? "bg-[#C49A28]" : "bg-white/10"
      )}
    >
      <span className={cn(
        "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform",
        on && "translate-x-5"
      )} />
    </button>
  )
}

export default function SettingsPage() {
  const { user } = useAppStore()
  const [activeTab, setActiveTab] = useState("notifications")

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Settings" />

      <div className="flex-1 px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Settings</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Manage your account and preferences</p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar tabs */}
            <div className="w-48 flex-shrink-0 space-y-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-[#C49A28]/15 text-[#C49A28] border border-[#C49A28]/25"
                      : "text-[var(--muted-foreground)] hover:bg-white/5 hover:text-white"
                  )}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              {activeTab === "notifications" && (
                <>
                  <SettingsSection title="Alert Preferences">
                    {[
                      { label: "Motion Detection", desc: "Receive alerts when motion is detected on cameras", on: true },
                      { label: "Camera Offline", desc: "Notify when a camera loses connection", on: true },
                      { label: "Low Light Warning", desc: "Alert when camera visibility is poor", on: false },
                      { label: "Site Intrusion", desc: "Critical alert for unauthorised access", on: true },
                      { label: "Storage Full", desc: "Alert when storage exceeds 90%", on: true },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-[var(--border)] last:border-0">
                        <div>
                          <p className="text-sm font-semibold text-white">{item.label}</p>
                          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle defaultChecked={item.on} />
                      </div>
                    ))}
                  </SettingsSection>

                  <SettingsSection title="Delivery Methods">
                    {[
                      { label: "In-App Notifications", desc: "Show notifications within the dashboard", on: true },
                      { label: "Email Alerts", desc: "Send alerts to your registered email", on: true },
                      { label: "SMS Alerts", desc: "Send text messages for critical alerts", on: false },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-[var(--border)] last:border-0">
                        <div>
                          <p className="text-sm font-semibold text-white">{item.label}</p>
                          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle defaultChecked={item.on} />
                      </div>
                    ))}
                  </SettingsSection>
                </>
              )}

              {activeTab === "security" && (
                <>
                  <SettingsSection title="Account Security">
                    <div className="space-y-3 py-2">
                      <div>
                        <label className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5 block">Current Password</label>
                        <input type="password" className="w-full h-10 rounded-lg bg-white/5 border border-[var(--border)] px-3 text-sm text-white placeholder:text-[var(--muted-foreground)] outline-none focus:border-[#C49A28] transition-colors" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5 block">New Password</label>
                        <input type="password" className="w-full h-10 rounded-lg bg-white/5 border border-[var(--border)] px-3 text-sm text-white placeholder:text-[var(--muted-foreground)] outline-none focus:border-[#C49A28] transition-colors" placeholder="••••••••" />
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C49A28] hover:bg-[#D4AA3A] text-white text-sm font-bold transition-all">
                        <Key size={14} />
                        Update Password
                      </button>
                    </div>
                  </SettingsSection>

                  <SettingsSection title="Session Management">
                    {[
                      { label: "Auto Logout", desc: "Automatically log out after 30 minutes of inactivity", on: true },
                      { label: "Two-Factor Authentication", desc: "Require OTP on every login", on: false },
                      { label: "Session Audit Logs", desc: "Keep records of all login activity", on: true },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-[var(--border)] last:border-0">
                        <div>
                          <p className="text-sm font-semibold text-white">{item.label}</p>
                          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle defaultChecked={item.on} />
                      </div>
                    ))}
                  </SettingsSection>
                </>
              )}

              {activeTab === "appearance" && (
                <SettingsSection title="Display Preferences">
                  {[
                    { label: "Dark Mode", desc: "Use the dark theme across the application", on: true },
                    { label: "Compact Sidebar", desc: "Show icons only in sidebar", on: false },
                    { label: "High Contrast Mode", desc: "Increase contrast for accessibility", on: false },
                    { label: "Animated Transitions", desc: "Enable page and component animations", on: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-[var(--border)] last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle defaultChecked={item.on} />
                    </div>
                  ))}
                </SettingsSection>
              )}

              {activeTab === "cameras" && (
                <SettingsSection title="Camera Defaults">
                  {[
                    { label: "Auto-reconnect", desc: "Automatically attempt to reconnect offline cameras", on: true },
                    { label: "Motion Recording", desc: "Record clips when motion is detected", on: true },
                    { label: "Night Mode", desc: "Enable enhanced night vision mode", on: false },
                    { label: "Cloud Backup", desc: "Automatically backup footage to cloud storage", on: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-[var(--border)] last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle defaultChecked={item.on} />
                    </div>
                  ))}
                </SettingsSection>
              )}

              {activeTab === "team" && (
                <SettingsSection title="Team Members">
                  <div className="space-y-3 py-2">
                    {[
                      { name: "Alex Rivera", email: "alex.rivera@metcalfe.com", role: "Admin" },
                      { name: "Sarah Chen", email: "s.chen@metcalfe.com", role: "Supervisor" },
                      { name: "Marcus Webb", email: "m.webb@metcalfe.com", role: "Viewer" },
                    ].map((member) => (
                      <div key={member.email} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#C49A28]/20 flex items-center justify-center text-[#C49A28] text-xs font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{member.name}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                            member.role === "Admin" ? "bg-[#C49A28]/20 text-[#C49A28]" :
                            member.role === "Supervisor" ? "bg-blue-500/20 text-blue-400" :
                            "bg-white/10 text-[var(--muted-foreground)]"
                          )}>
                            {member.role}
                          </span>
                          <button className="text-[var(--muted-foreground)] hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="w-full mt-2 px-4 py-2 rounded-lg border border-dashed border-[var(--border)] text-xs font-medium text-[var(--muted-foreground)] hover:border-[#C49A28]/40 hover:text-[#C49A28] transition-colors">
                      + Invite Team Member
                    </button>
                  </div>
                </SettingsSection>
              )}

              <div className="flex justify-end pt-2">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C49A28] hover:bg-[#D4AA3A] text-white text-sm font-bold transition-all shadow-lg shadow-[#C49A28]/20">
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      <div className="px-5 py-3.5 border-b border-[var(--border)]">
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>
      <div className="px-5 py-1">{children}</div>
    </div>
  )
}
