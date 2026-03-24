import Link from "next/link";
import { FolderPlus, ShieldCheck, UserPlus, Users } from "lucide-react";

import { ActionGrid } from "@/components/workspace/action-grid";
import { PageHero } from "@/components/workspace/page-hero";
import { StatCard } from "@/components/workspace/stat-card";
import { StatusBadge } from "@/components/workspace/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats, findProject, projects, requestItems, teamMembers } from "@/lib/metcalfe";

type DashboardPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getBanner(params: Record<string, string | string[] | undefined>) {
  const deletedId = typeof params.deleted === "string" ? params.deleted : undefined;
  const updatedId = typeof params.updated === "string" ? params.updated : undefined;
  const created = typeof params.created === "string" ? params.created : undefined;

  if (deletedId) {
    return `Project "${findProject(deletedId).name}" was removed from the dashboard flow.`;
  }

  if (updatedId) {
    return `Project "${findProject(updatedId).name}" was updated and returned to the project options flow.`;
  }

  if (created) {
    return `New project launch completed successfully. The dashboard is ready for handoff and monitoring.`;
  }

  return null;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolvedSearchParams = await searchParams;
  const banner = getBanner(resolvedSearchParams);

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Website dashboard"
        title="Monitor projects, unblock teams, and keep every workflow moving."
        description="This dashboard ties together active sites, onboarding checkpoints, request-box traffic, and operational shortcuts into a single demo workspace."
        actions={
          <>
            <Button asChild className="rounded-full bg-white px-5 text-slate-900 hover:bg-slate-100">
              <Link href="/projects/access-gate">Project access gate</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
              <Link href="/team/request-box">Open request box</Link>
            </Button>
          </>
        }
        meta={[
          { label: "Active projects", value: `${projects.length}` },
          { label: "Team members", value: `${teamMembers.length}` },
          { label: "Open requests", value: `${requestItems.length}` },
        ]}
      />

      {banner ? (
        <Card className="rounded-[1.75rem] border-emerald-200 bg-emerald-50">
          <CardContent className="flex items-start gap-3 p-5 text-emerald-800">
            <ShieldCheck className="mt-0.5 size-5 shrink-0" />
            <p className="text-sm font-medium">{banner}</p>
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Project snapshot</p>
              <CardTitle className="text-2xl">Current monitored builds</CardTitle>
            </div>
            <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
              <Link href="/dashboard/empty">View empty state</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1.4fr_0.9fr]"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">{project.name}</h3>
                    <StatusBadge status={project.status} />
                    <StatusBadge status={project.access} />
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{project.location}</p>
                    <p>{project.phase}</p>
                    <p>Updated {project.updatedAt}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Progress</p>
                    <p className="mt-1 text-xl font-semibold">{project.progress}%</p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cameras</p>
                    <p className="mt-1 text-xl font-semibold">{project.cameras}</p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Team</p>
                    <p className="mt-1 text-xl font-semibold">{project.teamSize}</p>
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full">
                    <Link href={`/projects/${project.id}/options`}>More options</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                    <Link href={`/projects/${project.id}/add-camera/device`}>Add camera</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
            <CardHeader>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Quick actions</p>
              <CardTitle className="text-2xl">Keep work moving</CardTitle>
            </CardHeader>
            <CardContent>
              <ActionGrid
                className="md:grid-cols-1"
                items={[
                  {
                    title: "Create project",
                    description: "Start the new-project workflow from the access gate.",
                    href: "/projects/create/details",
                    icon: FolderPlus,
                  },
                  {
                    title: "Invite team member",
                    description: "Send a new invite and assign permissions cleanly.",
                    href: "/team/invite",
                    icon: UserPlus,
                  },
                  {
                    title: "Review readiness",
                    description: "Check verification and system readiness before launch.",
                    href: "/orientation/system-readiness",
                    icon: ShieldCheck,
                  },
                ]}
              />
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
            <CardHeader>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Request box</p>
              <CardTitle className="text-2xl">Recent access and hardware requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requestItems.map((request) => (
                <div key={request.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">{request.title}</p>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{request.summary}</p>
                </div>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild className="rounded-full">
                  <Link href="/team/request-box">Open request box</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                  <Link href="/team">
                    <Users className="size-4" />
                    Team page
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
