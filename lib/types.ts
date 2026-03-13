export type ProjectStatus = "on-track" | "delayed" | "active" | "completed" | "paused"

export interface Camera {
  id: string
  name: string
  label: string
  status: "online" | "offline" | "connecting"
  resolution: string
  fps: number
  location: string
  lastSeen?: string
  thumbnailUrl?: string
}

export interface Project {
  id: string
  name: string
  location: string
  status: ProjectStatus
  weather?: { temp: string; condition: string }
  cameras: Camera[]
  thumbnailUrl?: string
  progress?: number
  startDate?: string
  endDate?: string
  teamSize?: number
  description?: string
}

export interface Alert {
  id: string
  projectId: string
  cameraId?: string
  type: "motion" | "offline" | "low-light" | "intrusion" | "system"
  message: string
  timestamp: string
  read: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "supervisor" | "viewer"
  avatarUrl?: string
}
