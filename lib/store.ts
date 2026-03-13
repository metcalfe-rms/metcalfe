"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Project, Alert, User } from "./types"

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "skyline-towers",
    name: "Skyline Towers - Phase A",
    location: "Austin, TX",
    status: "on-track",
    weather: { temp: "72°F", condition: "sunny" },
    progress: 68,
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    teamSize: 12,
    description: "High-rise residential development in downtown Austin, comprising 42 floors of mixed-use space.",
    thumbnailUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    cameras: [
      { id: "sk-cam-01", name: "Main Entrance", label: "CAM_01_SOUTH_ENTRANCE", status: "online", resolution: "4K", fps: 60, location: "South Entrance", thumbnailUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
      { id: "sk-cam-02", name: "Interior - Level 2", label: "CAM_02_INT_LVL2", status: "online", resolution: "1080p", fps: 30, location: "Interior Level 2", thumbnailUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80" },
      { id: "sk-cam-03", name: "Backyard / Loading", label: "CAM_03_LOADING", status: "online", resolution: "1080p", fps: 30, location: "Loading Dock", thumbnailUrl: "https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?w=400&q=80" },
      { id: "sk-cam-04", name: "Crane North", label: "CAM_04_CRANE_N", status: "online", resolution: "4K", fps: 60, location: "Crane North", thumbnailUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
      { id: "sk-cam-05", name: "South Perimeter", label: "CAM_05_PERIM_S", status: "offline", resolution: "1080p", fps: 30, location: "South Perimeter" },
    ],
  },
  {
    id: "harbor-bridge",
    name: "Harbor Bridge Renovation",
    location: "Seattle, WA",
    status: "delayed",
    weather: { temp: "65°F", condition: "rainy" },
    progress: 42,
    startDate: "2023-08-01",
    endDate: "2025-03-31",
    teamSize: 8,
    description: "Major renovation of the historic Harbor Bridge, upgrading structural integrity and adding pedestrian walkways.",
    thumbnailUrl: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",
    cameras: [
      { id: "hb-cam-01", name: "West Span", label: "CAM_01_WEST_SPAN", status: "online", resolution: "4K", fps: 30, location: "West Span", thumbnailUrl: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&q=80" },
      { id: "hb-cam-02", name: "Deck Level", label: "CAM_02_DECK", status: "online", resolution: "1080p", fps: 30, location: "Deck Level", thumbnailUrl: "https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?w=400&q=80" },
      { id: "hb-cam-03", name: "East Pillar", label: "CAM_03_EAST_PILLAR", status: "connecting", resolution: "1080p", fps: 30, location: "East Pillar" },
    ],
  },
  {
    id: "oakwood-mall",
    name: "Oakwood Regional Mall",
    location: "Denver, CO",
    status: "active",
    weather: { temp: "68°F", condition: "cloudy" },
    progress: 55,
    startDate: "2024-03-01",
    endDate: "2026-01-15",
    teamSize: 20,
    description: "400,000 sq ft regional shopping mall with anchor stores and mixed retail units.",
    thumbnailUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    cameras: [
      { id: "om-cam-01", name: "Main Entrance", label: "CAM_01_ENTRANCE", status: "online", resolution: "4K", fps: 60, location: "Main Entrance", thumbnailUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
      { id: "om-cam-02", name: "Food Court Zone", label: "CAM_02_FOODCOURT", status: "online", resolution: "1080p", fps: 30, location: "Food Court", thumbnailUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
    ],
  },
  {
    id: "summit-biz-park",
    name: "Summit Business Park",
    location: "Phoenix, AZ",
    status: "on-track",
    weather: { temp: "98°F", condition: "sunny" },
    progress: 82,
    startDate: "2023-05-10",
    endDate: "2024-12-20",
    teamSize: 15,
    description: "Class-A business park with 6 office buildings and shared amenity spaces.",
    thumbnailUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    cameras: [
      { id: "sb-cam-01", name: "Gate A", label: "CAM_01_GATE_A", status: "online", resolution: "4K", fps: 60, location: "Gate A", thumbnailUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80" },
      { id: "sb-cam-02", name: "Building 1 Lobby", label: "CAM_02_B1_LOBBY", status: "online", resolution: "1080p", fps: 30, location: "Building 1", thumbnailUrl: "https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?w=400&q=80" },
      { id: "sb-cam-03", name: "Parking North", label: "CAM_03_PARK_N", status: "online", resolution: "1080p", fps: 30, location: "Parking North", thumbnailUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80" },
    ],
  },
]

const SAMPLE_ALERTS: Alert[] = [
  { id: "a1", projectId: "skyline-towers", cameraId: "sk-cam-01", type: "motion", message: "Motion detected at Front Gate", timestamp: "2024-01-24T12:45:00Z", read: false },
  { id: "a2", projectId: "skyline-towers", cameraId: "sk-cam-02", type: "low-light", message: "Low light warning on Level 2 Interior", timestamp: "2024-01-24T06:12:00Z", read: false },
  { id: "a3", projectId: "harbor-bridge", cameraId: "hb-cam-03", type: "offline", message: "Camera offline: East Pillar", timestamp: "2024-01-24T11:30:00Z", read: true },
]

interface AppState {
  user: User | null
  projects: Project[]
  alerts: Alert[]
  activeProjectId: string | null
  activeCameraId: string | null
  sidebarOpen: boolean

  setUser: (user: User | null) => void
  setActiveProject: (id: string | null) => void
  setActiveCamera: (id: string | null) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  markAlertRead: (id: string) => void
  markAllAlertsRead: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: { id: "u1", name: "Alex Rivera", email: "alex.rivera@metcalfe.com", role: "admin" },
      projects: SAMPLE_PROJECTS,
      alerts: SAMPLE_ALERTS,
      activeProjectId: "skyline-towers",
      activeCameraId: "sk-cam-01",
      sidebarOpen: true,

      setUser: (user) => set({ user }),
      setActiveProject: (id) => set({ activeProjectId: id }),
      setActiveCamera: (id) => set({ activeCameraId: id }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      markAlertRead: (id) => set((s) => ({ alerts: s.alerts.map((a) => a.id === id ? { ...a, read: true } : a) })),
      markAllAlertsRead: () => set((s) => ({ alerts: s.alerts.map((a) => ({ ...a, read: true })) })),
    }),
    { name: "metcalfe-store", partialize: (s) => ({ activeProjectId: s.activeProjectId, sidebarOpen: s.sidebarOpen }) }
  )
)
