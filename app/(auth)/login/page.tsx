"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: "alex.rivera@metcalfe.com", password: "password" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate login
    await new Promise((r) => setTimeout(r, 800))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: brand panel */}
      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center bg-[#0a1020] p-12 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(196,154,40,0.3) 40px, rgba(196,154,40,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(196,154,40,0.3) 40px, rgba(196,154,40,0.3) 41px)`
          }}
        />
        {/* Radial spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,154,40,0.15),transparent_70%)]" />

        <div className="relative z-10 text-center space-y-8">
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-16 h-16">
              <Image src="/metcalfe-logo.svg" alt="Metcalfe" fill className="object-contain" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black tracking-tight text-white">Metcalfe</p>
              <p className="text-sm font-medium text-[#C49A28] tracking-widest uppercase">& Partners</p>
            </div>
          </div>

          <div className="space-y-4 max-w-sm mx-auto">
            <h1 className="text-4xl font-black text-white leading-tight">
              Monitor Your Site from{" "}
              <span className="text-[#C49A28]">Anywhere</span>{" "}
              in the World.
            </h1>
            <p className="text-sm text-slate-400">
              Real-time CCTV access and project intelligence for architects and site managers.
            </p>
          </div>

          {/* Simulated camera feeds */}
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {[
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80",
              "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&q=80",
              "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80",
            ].map((url, i) => (
              <div key={i} className="aspect-video rounded-lg overflow-hidden border border-white/10 relative">
                <img src={url} alt="" className="w-full h-full object-cover opacity-70" />
                <div className="absolute top-1 left-1 flex items-center gap-0.5 bg-red-600/80 px-1 py-0.5 rounded text-white text-[7px] font-bold">
                  <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 justify-center text-xs text-slate-500">
            <span>1,200+ Projects</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full" />
            <span>500+ Site Owners</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full" />
            <span>99.8% Uptime</span>
          </div>
        </div>
      </div>

      {/* Right: login form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[var(--background)]">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo (mobile) */}
          <div className="lg:hidden flex items-center gap-3 justify-center">
            <div className="relative w-10 h-10">
              <Image src="/metcalfe-logo.svg" alt="Metcalfe" fill className="object-contain" />
            </div>
            <div>
              <p className="font-black text-white tracking-tight">Metcalfe</p>
              <p className="text-[10px] font-medium text-[#C49A28] tracking-widest uppercase">& Partners</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">Welcome back</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2 block">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-11 rounded-lg bg-white/5 border border-[var(--border)] pl-10 pr-4 text-sm text-white placeholder:text-[var(--muted-foreground)] outline-none focus:border-[#C49A28] transition-colors"
                  placeholder="you@metcalfe.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs text-[#C49A28] hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full h-11 rounded-lg bg-white/5 border border-[var(--border)] pl-10 pr-10 text-sm text-white placeholder:text-[var(--muted-foreground)] outline-none focus:border-[#C49A28] transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#C49A28] hover:bg-[#D4AA3A] text-white font-bold text-sm transition-all shadow-lg shadow-[#C49A28]/25 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-[var(--border)] text-center">
            <p className="text-xs text-[var(--muted-foreground)]">
              Don't have access?{" "}
              <Link href="/join" className="text-[#C49A28] font-semibold hover:underline">
                Join with invite code
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
