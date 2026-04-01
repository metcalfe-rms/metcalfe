import Link from "next/link";
import { notFound } from "next/navigation";
import { MailPlus, ShieldCheck, UserMinus } from "lucide-react";

import { PageHero } from "@/components/workspace/page-hero";
import { StatusBadge } from "@/components/workspace/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestItems, teamMembers } from "@/lib/metcalfe";

type TeamSectionPageProps = {
  params: Promise<{ section: string }>;
};

const validSections = new Set(["request-box", "invite", "remove-member"]);

export default async function TeamSectionPage({ params }: TeamSectionPageProps) {
  const { section } = await params;

  if (!validSections.has(section)) {
    notFound();
  }

  if (section === "request-box") {
    return (
      <div className="workspace-page">
        <PageHero
          eyebrow="Request box process"
          title="Review access, permission, and hardware requests in one queue."
          description="The request box page gives administrators a single route for request review instead of scattering those actions across disconnected screens."
        />
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardHeader>
            <CardTitle className="text-2xl">Request queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {requestItems.map((request) => (
              <div key={request.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{request.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {request.type} by {request.requester}
                    </p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{request.summary}</p>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="rounded-full">
                <Link href="/team">Return to team page</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/requests/admin-join/request">Escalate to admin join flow</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (section === "invite") {
    return (
      <div className="workspace-page">
        <PageHero
          eyebrow="Invite team member process"
          title="Send a new team invitation."
          description="This route makes the invite action explicit and returns users to the team page with a clear success path."
        />
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="grid gap-4 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invite-name">Full name</Label>
              <Input id="invite-name" defaultValue="Adjoa Mensah" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email</Label>
              <Input id="invite-email" defaultValue="adjoa.mensah@partner.build" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="invite-role">Permission scope</Label>
              <Input id="invite-role" defaultValue="Read-only access to Lagos Tower One and request-box visibility" />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3 pt-4">
              <Button asChild className="rounded-full">
                <Link href="/team?invited=1">
                  <MailPlus className="size-4" />
                  Send invitation
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/team">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const removableMember = teamMembers[2];

  return (
    <div className="workspace-page">
      <PageHero
        eyebrow="Remove team member process"
        title={`Remove ${removableMember.name} from the active roster?`}
        description="This route makes removal a deliberate action and returns the user to the team page with a success message."
      />
      <Card className="rounded-[1.75rem] border-rose-200 bg-white/95">
        <CardHeader>
          <CardTitle className="text-2xl">Removal confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5 text-sm leading-6 text-rose-800">
            {removableMember.name} currently has {removableMember.permission.toLowerCase()} in {removableMember.zone}.
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="destructive" className="rounded-full">
              <Link href={`/team?removed=${removableMember.id}`}>
                <UserMinus className="size-4" />
                Remove member
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
              <Link href="/team">
                <ShieldCheck className="size-4" />
                Cancel
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
