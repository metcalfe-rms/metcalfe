"use client"
import { useAppStore } from "@/lib/store"
import { Header } from "@/components/layout/Header"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Video, VideoOff, ExternalLink } from "lucide-react"

export default function LiveFeedsPage() {
  const { projects } = useAppStore()
  const allCameras = projects.flatMap((p) => p.cameras.map((c) => ({ ...c, projectId: p.id, projectName: p.name })))
  const onlineCameras = allCameras.filter((c) => c.status === "online")

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Live Feeds" subtitle="All Cameras" />

      <div className="flex-1 px-6 lg:px-8 py-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">All Live Feeds</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {onlineCameras.length} ONLINE
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">/ {allCameras.length} total</span>
            </div>
          </div>
        </div>

        {projects.map((project) => (
          <div key={project.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C49A28] rounded-full" />
                {project.name}
                <span className="text-[10px] font-normal text-[var(--muted-foreground)]">— {project.location}</span>
              </h3>
              <Link href={`/projects/${project.id}/grid`} className="text-[10px] font-bold text-[#C49A28] hover:underline flex items-center gap-1">
                View All <ExternalLink size={10} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {project.cameras.map((cam) => (
                <Link
                  key={cam.id}
                  href={`/projects/${project.id}`}
                  className="group relative rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:border-[#C49A28]/40 transition-all"
                >
                  <div className="aspect-video relative bg-slate-900">
                    {cam.status === "online" && cam.thumbnailUrl ? (
                      <img src={cam.thumbnailUrl} alt={cam.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <VideoOff size={20} className="text-slate-600" />
                      </div>
                    )}
                    <div className="camera-overlay absolute inset-0" />
                    <div className="absolute top-2 left-2">
                      {cam.status === "online" ? (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-white bg-red-600/90 px-1.5 py-0.5 rounded live-badge">
                          <span className="w-1 h-1 bg-white rounded-full" />
                          LIVE
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-white bg-slate-700/90 px-1.5 py-0.5 rounded uppercase">
                          {cam.status}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-[9px] font-black text-white uppercase truncate">{cam.name}</span>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full flex-shrink-0",
                        cam.status === "online" ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" : "bg-slate-600"
                      )} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
