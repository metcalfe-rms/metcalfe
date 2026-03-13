"use client"
import { Header } from "@/components/layout/Header"
import { useAppStore } from "@/lib/store"
import { TrendingUp, Activity, Clock, AlertTriangle } from "lucide-react"

export default function AnalyticsPage() {
  const { projects } = useAppStore()

  const stats = [
    { label: "Total Uptime", value: "99.8%", change: "+0.2%", icon: Activity, color: "text-green-400" },
    { label: "Avg. Response Time", value: "1.2s", change: "-0.3s", icon: Clock, color: "text-blue-400" },
    { label: "Incidents (30d)", value: "14", change: "-3", icon: AlertTriangle, color: "text-amber-400" },
    { label: "Cameras Online", value: "10/12", change: "+2", icon: TrendingUp, color: "text-[#C49A28]" },
  ]

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Analytics" />

      <div className="flex-1 px-6 lg:px-8 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Analytics</h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Performance metrics across all active projects</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, change, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">{label}</p>
                <Icon size={16} className={color} />
              </div>
              <p className="text-3xl font-black text-white tracking-tight">{value}</p>
              <p className={`text-xs font-semibold mt-1 ${color}`}>{change} this month</p>
            </div>
          ))}
        </div>

        {/* Placeholder charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 h-64 flex flex-col">
            <h3 className="text-sm font-bold text-white mb-4">Camera Uptime (Last 7 Days)</h3>
            <div className="flex-1 flex items-end gap-2">
              {[85, 92, 78, 95, 99, 97, 100].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-[#C49A28]/80 hover:bg-[#C49A28] transition-colors"
                    style={{ height: `${v}%` }}
                  />
                  <span className="text-[9px] text-[var(--muted-foreground)]">{["M","T","W","T","F","S","S"][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 h-64 flex flex-col">
            <h3 className="text-sm font-bold text-white mb-4">Alerts by Project (30d)</h3>
            <div className="flex-1 space-y-3 justify-center flex flex-col">
              {projects.map((p) => {
                const count = Math.floor(Math.random() * 10) + 1
                return (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="text-xs text-[var(--muted-foreground)] w-32 truncate">{p.name.split(" - ")[0]}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C49A28] rounded-full" style={{ width: `${count * 10}%` }} />
                    </div>
                    <span className="text-xs font-bold text-white w-4">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
