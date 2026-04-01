import Link from "next/link";
import { ArrowRight, ShieldCheck, UserMinus, UserPlus } from "lucide-react";

import { PageHero } from "@/components/workspace/page-hero";
import { StatusBadge } from "@/components/workspace/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requestItems, teamMembers } from "@/lib/metcalfe";

type TeamPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getBanner(params: Record<string, string | string[] | undefined>) {
  if (typeof params.invited === "string") {
    return "Team invitation sent successfully. The team page remains the next place to review status.";
  }

  if (typeof params.removed === "string") {
    return "Team member removal completed. Permissions have been cleared from the active roster.";
  }

  return null;
}

export default async function TeamPage({ searchParams }: TeamPageProps) {
  const resolvedSearchParams = await searchParams;
  const banner = getBanner(resolvedSearchParams);

  return (
    <div className="workspace-page">
      <PageHero
        eyebrow="Team & permission management process"
        title="Manage people, permissions, and request flow without losing context."
        description="This team page anchors invitation, removal, permission review, and request-box routes so the surrounding pages have a stable home."
        actions={
          <>
            <Button asChild className="rounded-full bg-white px-5 text-slate-900 hover:bg-slate-100">
              <Link href="/team/invite">Invite member</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
              <Link href="/team/request-box">Open request box</Link>
            </Button>
          </>
        }
        meta={[
          { label: "Active roster", value: `${teamMembers.length}` },
          { label: "Request queue", value: `${requestItems.length}` },
          { label: "Permission model", value: "Role and project scoped" },
        ]}
      />

      {banner ? (
        <Card className="rounded-[1.75rem] border-emerald-200 bg-emerald-50">
          <CardContent className="p-5 text-sm font-medium text-emerald-800">{banner}</CardContent>
        </Card>
      ) : null}

      <section className="grid gap-8 xl:grid-cols-[1.45fr_0.95fr]">
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardHeader>
            <CardTitle className="text-2xl">Current team roster</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{member.name}</h2>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <StatusBadge status={member.status} />
                </div>
                <div className="mt-3 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
                  <p>Permission: {member.permission}</p>
                  <p>Zone: {member.zone}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-7">
          <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
            <CardHeader>
              <CardTitle className="text-2xl">Quick team actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full rounded-full">
                <Link href="/team/invite">
                  <UserPlus className="size-4" />
                  Invite team member
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/team/remove-member">
                  <UserMinus className="size-4" />
                  Remove team member
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/settings/access">
                  <ShieldCheck className="size-4" />
                  Access and permissions
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
            <CardHeader>
              <CardTitle className="text-2xl">Request box summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requestItems.slice(0, 2).map((request) => (
                <div key={request.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">{request.title}</p>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{request.summary}</p>
                </div>
              ))}
              <Button asChild variant="outline" className="w-full rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/team/request-box">
                  View all requests
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
