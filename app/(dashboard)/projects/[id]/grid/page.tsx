"use client"
import { useAppStore } from "@/lib/store"
import { Header } from "@/components/layout/Header"
import Link from "next/link"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight, Camera, ZoomIn, Video, VideoOff, Maximize2 } from "lucide-react"

export default function CameraGridPage() {
  const { id } = useParams<{ id: string }>()
  const { projects } = useAppStore()
  const project = projects.find((p) => p.id === id)

  if (!project) return null

  const activeCameras = project.cameras.filter((c) => c.status !== "offline")

  return (
    <div className="flex flex-col min-h-full">
      <Header title={project.name} subtitle="Multi-Camera Grid" />

      <div className="flex-1 px-4 lg:px-8 py-5 space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
          <Link href="/dashboard" className="hover:text-white">Projects</Link>
          <ChevronRight size={12} />
          <Link href={`/projects/${id}`} className="hover:text-white">{project.name}</Link>
          <ChevronRight size={12} />
          <span className="text-white font-semibold">Grid View</span>
        </div>

        {/* Header Controls */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">Multi-Camera Grid</h1>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              Real-time site surveillance · {activeCameras.length} Active Streams
            </p>
          </div>
          {/* View mode toggle */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-[var(--border)]">
            {["Grid", "Single", "Full"].map((mode) => (
              <button
                key={mode}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  mode === "Grid"
                    ? "bg-[var(--card)] text-[#C49A28] shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-white"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Camera Tabs */}
        <div className="overflow-x-auto">
          <div className="flex border-b border-[var(--border)] gap-6 min-w-max">
            <button className="flex items-center gap-2 pb-3 text-sm font-bold text-[#C49A28] border-b-2 border-[#C49A28]">
              All Feeds (Grid)
            </button>
            {project.cameras.map((cam) => (
              <button
                key={cam.id}
                className="flex items-center gap-2 pb-3 text-sm font-medium text-[var(--muted-foreground)] hover:text-white border-b-2 border-transparent hover:border-[var(--border)] transition-colors"
              >
                {cam.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className={cn(
          "grid gap-3",
          activeCameras.length <= 1 ? "grid-cols-1" :
          activeCameras.length <= 2 ? "grid-cols-1 lg:grid-cols-2" :
          "grid-cols-1 lg:grid-cols-2"
        )}>
          {project.cameras.map((cam) => (
            <div key={cam.id} className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 group shadow-lg border border-[var(--border)]">
              {cam.status === "online" && cam.thumbnailUrl ? (
                <>
                  <img
                    src={cam.thumbnailUrl}
                    alt={cam.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 bg-slate-900">
                  <VideoOff size={32} className="mb-2" />
                  <span className="text-xs font-bold uppercase">
                    {cam.status === "offline" ? "Camera Offline" : "Connecting..."}
                  </span>
                </div>
              )}

              {/* Top overlay */}
              <div className="camera-overlay-top absolute inset-0 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
                <div>
                  <div className="glass px-2.5 py-1 rounded text-white text-[10px] font-bold flex items-center gap-1.5">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      cam.status === "online" ? "bg-amber-400 animate-pulse" : "bg-slate-500"
                    )} />
                    {cam.status === "online" ? `LIVE: ${cam.name.toUpperCase()}` : cam.status.toUpperCase()}
                  </div>
                </div>
                <div className="glass text-white text-[10px] font-mono px-2 py-1 rounded">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              {/* Bottom hover overlay */}
              <div className="camera-overlay absolute inset-0 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1.5">
                    <button className="glass hover:bg-white/30 p-1.5 rounded-lg text-white transition-all">
                      <Video size={16} />
                    </button>
                    <button className="glass hover:bg-white/30 p-1.5 rounded-lg text-white transition-all">
                      <Camera size={16} />
                    </button>
                    <button className="glass hover:bg-white/30 p-1.5 rounded-lg text-white transition-all">
                      <ZoomIn size={16} />
                    </button>
                  </div>
                  <Link
                    href={`/projects/${id}`}
                    className="bg-[#C49A28] hover:bg-[#D4AA3A] px-3 py-1.5 rounded-lg text-white text-[10px] font-bold transition-colors flex items-center gap-1"
                  >
                    <Maximize2 size={12} />
                    EXPAND
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
