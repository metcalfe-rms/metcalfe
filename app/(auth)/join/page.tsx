"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Hash, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function JoinPage() {
  const router = useRouter()
  const [step, setStep] = useState<"enter" | "validated">("enter")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))

    if (code.toUpperCase() === "METCALFE2024") {
      setStep("validated")
    } else {
      setError("Invalid invite code. Please check and try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative w-12 h-12">
            <Image src="/metcalfe-logo.svg" alt="Metcalfe" fill className="object-contain" />
          </div>
          <div>
            <p className="font-black text-white tracking-tight text-lg">Metcalfe</p>
            <p className="text-[10px] font-medium text-[#C49A28] tracking-widest uppercase">& Partners</p>
          </div>
        </div>

        {step === "enter" ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-black text-white">Join a Project</h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">Enter the invite code provided by your project admin</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2 block">Invite Code</label>
                <div className="relative">
                  <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full h-11 rounded-lg bg-white/5 border border-[var(--border)] pl-10 pr-4 text-sm text-white placeholder:text-[var(--muted-foreground)] outline-none focus:border-[#C49A28] transition-colors font-mono tracking-wider text-center"
                    placeholder="XXXX-XXXX"
                    required
                    maxLength={20}
                  />
                </div>
                {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
                <p className="text-[10px] text-[var(--muted-foreground)] mt-1.5">Hint: try METCALFE2024</p>
              </div>

              <button
                type="submit"
                disabled={loading || !code}
                className="w-full h-11 rounded-lg bg-[#C49A28] hover:bg-[#D4AA3A] text-white font-bold text-sm transition-all shadow-lg shadow-[#C49A28]/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Validate Code <ArrowRight size={15} /></>}
              </button>
            </form>

            <div className="text-center border-t border-[var(--border)] pt-4">
              <Link href="/login" className="text-xs text-[var(--muted-foreground)] hover:text-white flex items-center justify-center gap-1 transition-colors">
                <ArrowLeft size={12} />
                Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-green-500/30 bg-[var(--card)] p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Code Validated!</h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">You've been granted access to the Metcalfe project portal.</p>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full h-11 rounded-lg bg-[#C49A28] hover:bg-[#D4AA3A] text-white font-bold text-sm transition-all shadow-lg shadow-[#C49A28]/25 flex items-center justify-center gap-2"
            >
              Enter Dashboard <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
