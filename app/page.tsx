import Link from "next/link";
import {
  ArrowRight,
  Camera,
  FolderPlus,
  LifeBuoy,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { ActionGrid } from "@/components/workspace/action-grid";
import { PageHero } from "@/components/workspace/page-hero";
import { StatCard } from "@/components/workspace/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const landingStats = [
  {
    label: "Projects monitored",
    value: "36",
    detail: "Distributed across investor, contractor, and administrator teams.",
  },
  {
    label: "Average incident response",
    value: "14m",
    detail: "Escalations route directly into support and security workflows.",
  },
  {
    label: "Readiness coverage",
    value: "98%",
    detail: "Live checks for onboarding, system readiness, and camera placement.",
  },
];

const landingActions = [
  {
    title: "Create a monitored project",
    description: "Launch a new build with team assignment, camera planning, and review checkpoints.",
    href: "/projects/create/details",
    icon: FolderPlus,
    badge: "New flow",
  },
  {
    title: "Coordinate team access",
    description: "Invite members, review requests, and keep permissions aligned with project scope.",
    href: "/team",
    icon: Users,
    badge: "Live",
  },
  {
    title: "Prepare site visibility",
    description: "Use readiness and add-camera processes to reduce blind spots before go-live.",
    href: "/orientation/system-readiness",
    icon: Camera,
    badge: "Readiness",
  },
  {
    title: "Reach the support desk",
    description: "Open the public support page for onboarding help, access issues, and policy guidance.",
    href: "/support",
    icon: LifeBuoy,
    badge: "24/7",
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
        <PageHero
          eyebrow="Metcalfe platform"
          title="Construction monitoring, access control, and project workflows that actually connect."
          description="This prototype now routes landing, authentication, onboarding, dashboard, projects, team management, support, and policy pages into one consistent front-end experience."
          actions={
            <>
              <Button asChild className="h-11 rounded-full bg-white px-5 text-slate-900 hover:bg-slate-100">
                <Link href="/login">
                  Login
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
                <Link href="/register">Sign up</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
                <Link href="/dashboard">
                  Demo dashboard
                  <Sparkles className="size-4" />
                </Link>
              </Button>
            </>
          }
          meta={[
            { label: "Core flows", value: "Auth, dashboard, projects, team" },
            { label: "Policy access", value: "Public support + privacy routes" },
            { label: "Prototype mode", value: "Front-end only, route complete" },
          ]}
        />

        <section className="grid gap-4 md:grid-cols-3">
          {landingStats.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} detail={item.detail} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Linked experiences</p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Every major route now has a destination and a next step.</h2>
            </div>
            <ActionGrid items={landingActions} />
          </div>

          <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
            <CardContent className="space-y-5 p-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">What changed</p>
                <h3 className="text-xl font-semibold tracking-tight">From splash screen to working workflow map</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  Authentication links, onboarding checkpoints, project access flows, team actions, utility hubs, and account controls now connect through real routes instead of dead ends.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  "Role-based account verification and orientation pages",
                  "Project access gate plus create, join, and admin request flows",
                  "Dashboard, empty states, request box, and support surfaces",
                  "Profile, access, logout, deactivate, and privacy destinations",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/projects/access-gate">Open access gate</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                  <Link href="/privacy-policy">View privacy policy</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </SiteShell>
  );
}

