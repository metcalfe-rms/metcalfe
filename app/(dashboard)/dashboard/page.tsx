"use client"
import { useAppStore } from "@/lib/store"
import { Header } from "@/components/layout/Header"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Activity, AlertTriangle, CheckCircle2, Wifi, Plus,
  MapPin, Video, MoreHorizontal, Sun, Cloud, CloudRain, TrendingUp, Grid3x3
} from "lucide-react"

const statusConfig = {
  "on-track": { label: "On-Track", color: "bg-green-500", text: "text-green-400", border: "border-green-500/30" },
  "delayed": { label: "Delayed", color: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/30" },
  "active": { label: "Active", color: "bg-blue-500", text: "text-blue-400", border: "border-blue-500/30" },
  "completed": { label: "Completed", color: "bg-slate-500", text: "text-slate-400", border: "border-slate-500/30" },
  "paused": { label: "Paused", color: "bg-red-500", text: "text-red-400", border: "border-red-500/30" },
}

const weatherIcons: Record<string, React.ReactNode> = {
  sunny: <Sun size={13} className="text-amber-400" />,
  cloudy: <Cloud size={13} className="text-slate-400" />,
  rainy: <CloudRain size={13} className="text-blue-400" />,
}

const projectImages: Record<string, string> = {
  "skyline-towers": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  "harbor-bridge": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80",
  "oakwood-mall": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  "summit-biz-park": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
}

export default function DashboardPage() {
  const { projects, alerts, setActiveProject } = useAppStore()
  const unreadAlerts = alerts.filter((a) => !a.read)
  const totalCameras = projects.reduce((s, p) => s + p.cameras.length, 0)
  const onlineCameras = projects.reduce((s, p) => s + p.cameras.filter((c) => c.status === "online").length, 0)

  return (
    <div className="flex flex-col min-h-full">
      <Header />

      {/* Page Header */}
      <div className="px-6 lg:px-8 pt-6 pb-4 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Portfolio Overview</h2>
          <div className="flex items-center gap-4 mt-1 text-xs text-[var(--muted-foreground)] font-medium">
            <span className="flex items-center gap-1.5">
              <Grid3x3 size={12} /> {projects.length} Projects
            </span>
            <span className="text-[var(--border)]">|</span>
            <span className="flex items-center gap-1.5">
              <Activity size={12} className="text-green-400" /> {onlineCameras}/{totalCameras} Cameras Online
            </span>
          </div>
        </div>
        <Link
          href="/projects/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C49A28] hover:bg-[#D4AA3A] text-white text-sm font-bold transition-all shadow-lg shadow-[#C49A28]/20"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      <div className="flex-1 px-6 lg:px-8 py-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Global Status"
            value="All Active"
            sub={<span className="flex items-center gap-1 text-green-400"><CheckCircle2 size={13} /> 100% Connectivity</span>}
            accent="gold"
          />
          <StatCard
            label="Active Alerts"
            value={String(unreadAlerts.length).padStart(2, "0")}
            sub={<span className="flex items-center gap-1 text-amber-400"><AlertTriangle size={13} /> Action Required</span>}
            accent="amber"
          />
          <StatCard
            label="Network Health"
            value="99.8%"
            sub={<span className="flex items-center gap-1 text-[#C49A28]"><TrendingUp size={13} /> Stabilized</span>}
            accent="gold"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {["All", "On-Track", "Delayed"].map((f) => (
              <button
                key={f}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors",
                  f === "All"
                    ? "bg-[#C49A28] text-white"
                    : "bg-white/5 text-[var(--muted-foreground)] hover:bg-white/10 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              className="h-9 w-56 rounded-lg bg-white/5 border border-[var(--border)] pl-9 pr-3 text-xs text-white placeholder:text-[var(--muted-foreground)] outline-none focus:border-[#C49A28] transition-colors"
              placeholder="Search projects..."
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project) => {
            const cfg = statusConfig[project.status]
            return (
              <div
                key={project.id}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[#C49A28]/40 transition-all flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={projectImages[project.id] ?? "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80"}
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white", cfg.color)}>
                      <span className={cn("w-1.5 h-1.5 rounded-full bg-white", project.status === "on-track" && "animate-pulse")} />
                      {cfg.label}
                    </span>
                  </div>
                  {/* Weather */}
                  {project.weather && (
                    <div className="absolute top-3 right-3 glass px-2 py-1 rounded-lg flex items-center gap-1.5">
                      {weatherIcons[project.weather.condition] ?? <Sun size={13} className="text-amber-400" />}
                      <span className="text-[11px] font-bold text-white">{project.weather.temp}</span>
                    </div>
                  )}
                  {/* Camera count */}
                  <div className="absolute bottom-3 right-3 glass px-2 py-1 rounded-lg flex items-center gap-1.5">
                    <Video size={11} className="text-[#C49A28]" />
                    <span className="text-[10px] font-bold text-white">{project.cameras.filter(c => c.status === "online").length}/{project.cameras.length}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white text-base leading-tight">{project.name}</h3>
                    <button className="text-[var(--muted-foreground)] hover:text-white transition-colors p-0.5">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 mb-3">
                    <MapPin size={11} /> {project.location}
                  </p>

                  {/* Progress */}
                  {project.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] font-bold text-[var(--muted-foreground)] mb-1.5">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C49A28] rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={`/projects/${project.id}`}
                      onClick={() => setActiveProject(project.id)}
                      className="text-xs font-bold text-[#C49A28] hover:underline underline-offset-4"
                    >
                      VIEW DETAILS
                    </Link>
                    <Link
                      href={`/projects/${project.id}/grid`}
                      onClick={() => setActiveProject(project.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C49A28] hover:bg-[#D4AA3A] text-white text-xs font-bold transition-all shadow-md shadow-[#C49A28]/20"
                    >
                      <Video size={13} />
                      WATCH LIVE
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Connectivity Check */}
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white/2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-2">
              <Wifi size={13} className="text-[#C49A28]" />
              Quick Connectivity Check
            </h3>
            <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase">Live Pulse: 1.2s</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-12 gap-3">
            {projects.flatMap((p) => p.cameras).map((cam) => (
              <div
                key={cam.id}
                className={cn(
                  "group relative aspect-video rounded-lg overflow-hidden border transition-colors",
                  cam.status === "online"
                    ? "border-white/10 hover:border-green-500/50"
                    : "border-white/5 opacity-60"
                )}
              >
                {cam.status === "online" && cam.thumbnailUrl ? (
                  <img src={cam.thumbnailUrl} alt={cam.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <Video size={14} className="text-slate-600" />
                  </div>
                )}
                <div className="camera-overlay absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-black text-white uppercase truncate">{cam.id.split("-").slice(-1)[0].toUpperCase()}</span>
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    cam.status === "online" ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]"
                      : cam.status === "connecting" ? "bg-amber-400 animate-pulse"
                        : "bg-slate-600"
                  )} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, accent }: {
  label: string
  value: string
  sub: React.ReactNode
  accent: "gold" | "amber"
}) {
  return (
    <div className="relative rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 overflow-hidden">
      <div className={cn(
        "absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl -mr-10 -mt-10",
        accent === "gold" ? "bg-[#C49A28]/10" : "bg-amber-500/10"
      )} />
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">{label}</p>
      <p className="text-3xl font-black text-white tracking-tight mb-1">{value}</p>
      <div className="text-xs font-semibold">{sub}</div>
    </div>
  )
}
