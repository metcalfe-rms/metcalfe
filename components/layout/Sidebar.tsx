"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Video, FolderKanban, Images, BarChart2,
  Settings, Users, ChevronRight, Bell, LogOut, X
} from "lucide-react"
import Image from "next/image"

const navItems = [
  { href: "/dashboard", label: "Portfolio", icon: LayoutDashboard },
  { href: "/live", label: "Live Feeds", icon: Video },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/team", label: "Team", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, alerts, sidebarOpen, setSidebarOpen } = useAppStore()
  const unreadCount = alerts.filter((a) => !a.read).length

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r transition-transform duration-300",
          "bg-[var(--sidebar)] border-[var(--sidebar-border)]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[var(--sidebar-border)]">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src="/metcalfe-logo.svg" alt="Metcalfe" fill className="object-contain" />
            </div>
            <div>
              <p className="text-sm font-black tracking-tight text-white leading-tight">Metcalfe</p>
              <p className="text-[10px] font-medium text-[var(--muted-foreground)] tracking-widest uppercase">& Partners</p>
            </div>
          </Link>
          <button
            className="lg:hidden text-[var(--muted-foreground)] hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  active
                    ? "bg-[#C49A28]/15 text-[#C49A28] border border-[#C49A28]/25"
                    : "text-[var(--muted-foreground)] hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon
                  size={18}
                  className={cn(active ? "text-[#C49A28]" : "group-hover:text-white")}
                />
                <span>{item.label}</span>
                {item.label === "Live Feeds" && (
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-green-400">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    LIVE
                  </span>
                )}
                {active && <ChevronRight size={14} className="ml-auto text-[#C49A28] opacity-60" />}
              </Link>
            )
          })}
        </nav>

        {/* Alerts + User */}
        <div className="border-t border-[var(--sidebar-border)] p-3 space-y-1">
          <Link
            href="/notifications"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--muted-foreground)] hover:bg-white/5 hover:text-white transition-all"
          >
            <Bell size={18} />
            <span>Alerts</span>
            {unreadCount > 0 && (
              <span className="ml-auto text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--muted-foreground)] hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </Link>
        </div>

        {/* User profile */}
        <div className="border-t border-[var(--sidebar-border)] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C49A28]/20 flex items-center justify-center flex-shrink-0 ring-2 ring-[#C49A28]/30">
              <span className="text-[#C49A28] text-sm font-bold">
                {user?.name?.charAt(0) ?? "U"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name ?? "User"}</p>
              <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider truncate">
                {user?.role ?? "viewer"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
