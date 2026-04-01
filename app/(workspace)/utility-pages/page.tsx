import Link from "next/link";
import { FileStack, LifeBuoy, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/workspace/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { utilityLinks } from "@/lib/metcalfe";

export default function UtilityPagesPage() {
  return (
    <div className="workspace-page">
      <PageHero
        eyebrow="Utility pages"
        title="Grouped utility and redundant pages now have a single clear home."
        description="Instead of scattering loosely defined pages across the app, this hub collects common support, empty-state, and request utilities in one place."
      />

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {utilityLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full rounded-[1.75rem] border-slate-200 bg-white/95 transition hover:-translate-y-0.5 hover:border-slate-300">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <FileStack className="size-5" />
                  </span>
                  <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="space-y-3 p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-slate-900">Why this grouping exists</h2>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              It keeps smaller pages discoverable without inventing unnecessary route sprawl for ambiguous items.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="space-y-3 p-5">
            <div className="flex items-center gap-3">
              <LifeBuoy className="size-5 text-sky-600" />
              <h2 className="text-lg font-semibold text-slate-900">Need a named page later?</h2>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              This hub is easy to split later if you decide any utility or redundant page deserves its own dedicated route.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
