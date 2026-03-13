"use client"
import { useAppStore } from "@/lib/store"
import { Header } from "@/components/layout/Header"
import Link from "next/link"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChevronRight, Fullscreen, Camera, ZoomIn, Settings2,
  History, AlertTriangle, Video, VideoOff, Grid2x2
} from "lucide-react"

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { projects, activeCameraId, setActiveCamera } = useAppStore()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full text-[var(--muted-foreground)]">
        Project not found
      </div>
    )
  }

  const activeCamera = project.cameras.find((c) => c.id === activeCameraId) ?? project.cameras[0]

  return (
    <div className="flex flex-col min-h-full">
      <Header title={project.name} subtitle="Live Monitoring" />

      <div className="flex-1 px-4 lg:px-8 py-5 space-y-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
          <Link href="/dashboard" className="hover:text-white transition-colors">Projects</Link>
          <ChevronRight size={12} />
          <span className="text-white font-semibold">{project.name}</span>
          <ChevronRight size={12} />
          <span className="text-white font-semibold">{activeCamera?.name ?? "Camera"}</span>
        </div>

        {/* Main Video Player */}
        <div className="relative group rounded-xl overflow-hidden border border-[var(--border)] bg-black aspect-video shadow-2xl">
          {/* Simulated feed background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeCamera?.thumbnailUrl ?? "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"})` }}
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Top overlays */}
          <div className="camera-overlay-top absolute inset-0 pointer-events-none" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-red-600/90 text-white text-[10px] font-bold px-2 py-1 rounded live-badge">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              LIVE
            </span>
            <span className="glass text-white text-[10px] font-mono px-2 py-1 rounded">
              {activeCamera?.label ?? "CAM_01"} | {activeCamera?.resolution ?? "4K"} | {activeCamera?.fps ?? 60}FPS
            </span>
          </div>
          <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded text-[10px] font-mono text-white flex flex-col items-end">
            <span>{new Date().toLocaleDateString()}</span>
            <span className="text-[#C49A28]">{new Date().toLocaleTimeString()} UTC</span>
          </div>

          {/* Center play */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-16 h-16 rounded-full bg-[#C49A28]/90 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>

          {/* Bottom controls */}
          <div className="camera-overlay absolute inset-0 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[
                { icon: Fullscreen, label: "Fullscreen" },
                { icon: Camera, label: "Screenshot" },
                { icon: ZoomIn, label: "Zoom" },
                { icon: Settings2, label: "Settings" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} title={label} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
                  <Icon size={18} />
                </button>
              ))}
            </div>
            {/* Progress bar */}
            <div className="flex-1 mx-4 max-w-sm">
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#C49A28] w-full shadow-[0_0_8px_rgba(196,154,40,0.8)]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${id}/grid`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
              >
                <Grid2x2 size={15} />
                Grid View
              </Link>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all">
                <History size={15} />
                Archives
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all">
                <AlertTriangle size={15} />
                Report Issue
              </button>
            </div>
          </div>
        </div>

        {/* Camera Selector */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Grid2x2 size={16} className="text-[#C49A28]" />
              <h3 className="text-base font-bold text-white">Active Camera Feeds</h3>
              <span className="bg-white/10 text-[var(--muted-foreground)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                {project.cameras.length} TOTAL
              </span>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {project.cameras.map((cam) => (
              <button
                key={cam.id}
                onClick={() => setActiveCamera(cam.id)}
                className={cn(
                  "flex-none w-56 rounded-xl overflow-hidden border-2 transition-all",
                  cam.id === (activeCameraId ?? project.cameras[0]?.id)
                    ? "border-[#C49A28] shadow-lg shadow-[#C49A28]/20"
                    : "border-[var(--border)] hover:border-[#C49A28]/40",
                  cam.status === "offline" && "opacity-60"
                )}
              >
                <div className="relative aspect-video bg-slate-900">
                  {cam.status === "online" && cam.thumbnailUrl ? (
                    <img src={cam.thumbnailUrl} alt={cam.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                      {cam.status === "offline" ? <VideoOff size={20} /> : <Video size={20} />}
                    </div>
                  )}
                  {cam.id === (activeCameraId ?? project.cameras[0]?.id) && (
                    <div className="absolute inset-0 bg-[#C49A28]/15" />
                  )}
                  <div className="camera-overlay absolute inset-0" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      cam.status === "online" ? "bg-green-400" : cam.status === "connecting" ? "bg-amber-400 animate-pulse" : "bg-red-500"
                    )} />
                    <span className="text-[10px] font-bold text-white uppercase">{cam.name}</span>
                  </div>
                  {cam.status === "offline" && (
                    <div className="absolute top-2 right-2 bg-red-500/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      OFFLINE
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Alerts / Storage Bar */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-amber-400" />
              <h4 className="text-sm font-bold text-white">Recent Site Alerts</h4>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {[
                "Motion detected at Front Gate — 12:45 PM",
                "Low light warning on Level 2 Interior — 06:12 AM",
              ].map((msg) => (
                <p key={msg} className="text-xs text-[var(--muted-foreground)]">{msg}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-[10px] text-[var(--muted-foreground)] uppercase font-bold">Storage</span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#C49A28] w-3/4 rounded-full" />
            </div>
            <span className="text-[9px] text-[var(--muted-foreground)]">1.2 TB / 2.0 TB used</span>
          </div>
        </div>
      </div>
    </div>
  )
}
