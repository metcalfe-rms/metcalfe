"use client"
import { useAppStore } from "@/lib/store"
import { Bell, Menu, Search } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  title?: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const { toggleSidebar, alerts } = useAppStore()
  const unreadCount = alerts.filter((a) => !a.read).length
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 lg:px-6 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-white/10 hover:text-white transition-colors"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        {title && (
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">{title}</h1>
            {subtitle && <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest">{subtitle}</p>}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {searchOpen ? (
          <input
            autoFocus
            onBlur={() => setSearchOpen(false)}
            className="h-8 w-48 rounded-lg bg-white/5 border border-[var(--border)] px-3 text-xs text-white placeholder:text-[var(--muted-foreground)] outline-none focus:border-[#C49A28] transition-colors"
            placeholder="Search projects..."
          />
        ) : (
          <button
            className="p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-white/5 hover:text-white transition-colors"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} />
          </button>
        )}
        <button className="relative p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-white/5 hover:text-white transition-colors">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
          )}
        </button>
        <div className="w-8 h-8 rounded-full bg-[#C49A28]/20 flex items-center justify-center ring-2 ring-[#C49A28]/30">
          <span className="text-[#C49A28] text-xs font-bold">AR</span>
        </div>
      </div>
    </header>
  )
}
