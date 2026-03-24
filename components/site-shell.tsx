import Image from "next/image";
import Link from "next/link";

import { MetcalfeLogo } from "@/assets";
import { cn } from "@/lib/utils";

type SiteShellProps = {
  children: React.ReactNode;
  className?: string;
};

const publicLinks = [
  { label: "Support", href: "/support" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Login", href: "/login" },
  { label: "Sign up", href: "/register" },
];

export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div className={cn("min-h-screen bg-[#f4f7fb] text-foreground", className)}>
      <header className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link href="/" className="inline-flex items-center gap-3 font-semibold tracking-tight">
            <Image
              src={MetcalfeLogo}
              alt="Metcalfe logo"
              className="h-9 w-9 rounded-xl border border-border bg-white p-1"
            />
            <span className="text-lg">Metcalfe</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 transition hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/70 bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <p>Operational monitoring, access control, and project transparency for remote builds.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/support" className="hover:text-foreground">
              Support
            </Link>
            <Link href="/privacy-policy" className="hover:text-foreground">
              Privacy policy
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              Demo dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

