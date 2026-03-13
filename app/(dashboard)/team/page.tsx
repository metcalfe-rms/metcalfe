"use client"
import { Header } from "@/components/layout/Header"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Plus, Search, Shield, Eye, Settings, MoreHorizontal, Mail } from "lucide-react"

const members = [
  { id: "u1", name: "Alex Rivera", email: "alex.rivera@metcalfe.com", role: "admin" as const, projects: 4, lastActive: "2 mins ago", status: "online" },
  { id: "u2", name: "Sarah Chen", email: "s.chen@metcalfe.com", role: "supervisor" as const, projects: 2, lastActive: "1 hour ago", status: "online" },
  { id: "u3", name: "Marcus Webb", email: "m.webb@metcalfe.com", role: "viewer" as const, projects: 1, lastActive: "Yesterday", status: "offline" },
  { id: "u4", name: "Priya Nair", email: "p.nair@metcalfe.com", role: "supervisor" as const, projects: 3, lastActive: "3 hours ago", status: "away" },
]

const roleConfig = {
  admin: { label: "Admin", color: "bg-[#C49A28]/20 text-[#C49A28]", icon: Shield },
  supervisor: { label: "Supervisor", color: "bg-blue-500/20 text-blue-400", icon: Settings },
  viewer: { label: "Viewer", color: "bg-white/10 text-[var(--muted-foreground)]", icon: Eye },
}

const statusColors = {
  online: "bg-green-400",
  offline: "bg-slate-500",
  away: "bg-amber-400",
}

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Team" subtitle="Access Management" />

      <div className="flex-1 px-6 lg:px-8 py-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Team Members</h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{members.length} members across all projects</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C49A28] hover:bg-[#D4AA3A] text-white text-sm font-bold transition-all shadow-lg shadow-[#C49A28]/20">
            <Plus size={15} />
            Invite Member
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input className="w-full h-9 rounded-lg bg-white/5 border border-[var(--border)] pl-9 pr-3 text-xs text-white placeholder:text-[var(--muted-foreground)] outline-none focus:border-[#C49A28] transition-colors" placeholder="Search members..." />
        </div>

        {/* Members Table */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_80px] gap-3 px-5 py-3 border-b border-[var(--border)] text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
            <span>Member</span>
            <span>Email</span>
            <span>Role</span>
            <span>Projects</span>
            <span>Actions</span>
          </div>
          {members.map((member) => {
            const roleCfg = roleConfig[member.role]
            return (
              <div key={member.id} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_80px] gap-3 px-5 py-4 border-b border-[var(--border)] last:border-0 items-center hover:bg-white/2 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-[#C49A28]/20 flex items-center justify-center text-[#C49A28] text-sm font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <span className={cn("absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--card)]", statusColors[member.status as keyof typeof statusColors])} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{member.name}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{member.lastActive}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] truncate">{member.email}</p>
                <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full w-fit", roleCfg.color)}>
                  <roleCfg.icon size={10} />
                  {roleCfg.label}
                </span>
                <span className="text-sm font-semibold text-white">{member.projects}</span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-[var(--muted-foreground)] hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Mail size={14} />
                  </button>
                  <button className="p-1.5 text-[var(--muted-foreground)] hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pending Invites */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[var(--border)] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Pending Invites</h3>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full">2 PENDING</span>
          </div>
          <div className="px-5 py-3 space-y-3">
            {["james.hartley@firma.co.uk", "m.okonkwo@partner.ng"].map((email) => (
              <div key={email} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--muted-foreground)] text-xs">
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">{email}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]/60">Invite sent · Viewer</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors">Resend</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
