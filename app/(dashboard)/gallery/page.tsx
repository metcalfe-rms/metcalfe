"use client"
import { useAppStore } from "@/lib/store"
import { Header } from "@/components/layout/Header"
import { cn } from "@/lib/utils"
import { Download, Filter, Grid2x2, List, Play, Camera } from "lucide-react"

const galleryItems = [
  { id: "g1", project: "Skyline Towers", camera: "Main Entrance", type: "photo", date: "2024-01-24", time: "14:32", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
  { id: "g2", project: "Skyline Towers", camera: "Interior - Level 2", type: "video", date: "2024-01-24", time: "09:15", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80" },
  { id: "g3", project: "Harbor Bridge", camera: "West Span", type: "photo", date: "2024-01-23", time: "16:40", url: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&q=80" },
  { id: "g4", project: "Oakwood Mall", camera: "Main Entrance", type: "photo", date: "2024-01-23", time: "11:22", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "g5", project: "Summit Business Park", camera: "Gate A", type: "video", date: "2024-01-22", time: "08:05", url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80" },
  { id: "g6", project: "Skyline Towers", camera: "Crane North", type: "photo", date: "2024-01-22", time: "13:50", url: "https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?w=400&q=80" },
  { id: "g7", project: "Harbor Bridge", camera: "Deck Level", type: "photo", date: "2024-01-21", time: "07:30", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
  { id: "g8", project: "Summit Business Park", camera: "Building 1 Lobby", type: "video", date: "2024-01-21", time: "17:15", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
]

const projects = ["All Projects", "Skyline Towers", "Harbor Bridge", "Oakwood Mall", "Summit Business Park"]
const types = ["All Types", "Photos", "Videos"]

export default function GalleryPage() {
  const { projects: storeProjects } = useAppStore()

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Gallery" subtitle="Media Hub" />

      <div className="flex-1 px-6 lg:px-8 py-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Gallery Directory</h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{galleryItems.length} items across {storeProjects.length} projects</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--muted-foreground)] text-xs font-medium border border-[var(--border)] transition-colors">
              <Filter size={14} />
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--muted-foreground)] text-xs font-medium border border-[var(--border)] transition-colors">
              <Download size={14} />
              Export
            </button>
            <div className="flex bg-white/5 p-0.5 rounded-lg border border-[var(--border)]">
              <button className="p-1.5 rounded-md bg-[var(--card)] text-[#C49A28]"><Grid2x2 size={14} /></button>
              <button className="p-1.5 rounded-md text-[var(--muted-foreground)] hover:text-white"><List size={14} /></button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {projects.map((p, i) => (
            <button
              key={p}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                i === 0
                  ? "bg-[#C49A28] text-white border-[#C49A28]"
                  : "bg-white/5 text-[var(--muted-foreground)] border-[var(--border)] hover:border-[#C49A28]/40 hover:text-white"
              )}
            >
              {p}
            </button>
          ))}
          <div className="w-px bg-[var(--border)] mx-1" />
          {types.map((t, i) => (
            <button
              key={t}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                i === 0
                  ? "bg-[#C49A28]/20 text-[#C49A28] border-[#C49A28]/40"
                  : "bg-white/5 text-[var(--muted-foreground)] border-[var(--border)] hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {galleryItems.map((item) => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:border-[#C49A28]/40 transition-all cursor-pointer">
              <div className="aspect-video relative">
                <img src={item.url} alt={item.camera} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="camera-overlay absolute inset-0" />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-[#C49A28]/90 flex items-center justify-center">
                      <Play size={16} className="text-white ml-0.5" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={cn(
                    "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase",
                    item.type === "video" ? "bg-[#C49A28] text-white" : "glass text-white"
                  )}>
                    {item.type === "video" ? "VIDEO" : "PHOTO"}
                  </span>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-bold text-white truncate">{item.camera}</p>
                <p className="text-[10px] text-[var(--muted-foreground)] truncate">{item.project}</p>
                <p className="text-[9px] text-[var(--muted-foreground)] mt-0.5">{item.date} · {item.time}</p>
              </div>
              {/* Hover actions */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="glass p-1.5 rounded-lg text-white hover:bg-white/30 transition-all">
                  <Download size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Photos", value: "1,248", icon: Camera },
            { label: "Total Videos", value: "364", icon: Play },
            { label: "Storage Used", value: "1.2 TB", icon: Grid2x2 },
            { label: "Archived Items", value: "892", icon: Download },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C49A28]/15 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-[#C49A28]" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{value}</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
