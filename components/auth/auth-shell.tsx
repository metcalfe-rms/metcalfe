import Image from "next/image";
import Link from "next/link";

import { MetcalfeLogo } from "@/assets";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  badge?: string;
};

export function AuthShell({ title, description, children, badge }: AuthShellProps) {
  return (
    <main className="min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#0f3d74] via-[#0f4f92] to-[#0b2f58] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-10">
            <Link href="/login" className="inline-flex items-center gap-3 text-2xl font-semibold">
              <Image src={MetcalfeLogo} alt="Metcalfe logo" className="h-8 w-8 rounded-md bg-white/10 p-1" />
              <span>Metcalfe</span>
            </Link>
            {badge ? (
              <span className="inline-flex w-fit rounded-full border border-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white/85">
                {badge}
              </span>
            ) : null}
          </div>

          <div className="space-y-6">
            <Image
              src={MetcalfeLogo}
              alt="Metcalfe logo"
              className="h-auto w-20 rounded-xl border border-white/20 bg-white/10 p-2"
            />
            <h1 className="max-w-md text-5xl leading-tight font-semibold tracking-tight">{title}</h1>
            <p className="max-w-md text-lg text-white/80">{description}</p>
          </div>

          <p className="text-xs text-white/70">© 2026 Metcalfe Technologies Inc.</p>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.25),transparent_40%)]" />
        </section>

        <section className={cn("flex items-center justify-center p-6 md:p-10", "bg-background")}>{children}</section>
      </div>
    </main>
  );
}
