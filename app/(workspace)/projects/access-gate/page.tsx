import Link from "next/link";
import { FolderPlus, Search, ShieldCheck, UserPlus } from "lucide-react";

import { ActionGrid } from "@/components/workspace/action-grid";
import { PageHero } from "@/components/workspace/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectAccessGatePage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Project access gate"
        title="Choose how you want to enter the workspace."
        description="This gate branches into new project creation, existing project join flows, and administrator escalation when access is not yet available."
        actions={
          <>
            <Button asChild className="rounded-full bg-white px-5 text-slate-900 hover:bg-slate-100">
              <Link href="/projects/create/details">Create project</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
              <Link href="/projects/join/search">Join existing project</Link>
            </Button>
          </>
        }
        meta={[
          { label: "New setup", value: "Details -> team -> cameras -> review" },
          { label: "Existing access", value: "Search -> request -> status" },
          { label: "Escalation", value: "Admin request route available" },
        ]}
      />

      <ActionGrid
        items={[
          {
            title: "Create a new project",
            description: "Start a monitored build from scratch, assign the team, and confirm camera readiness.",
            href: "/projects/create/details",
            icon: FolderPlus,
            badge: "New project",
          },
          {
            title: "Join an existing project",
            description: "Search for a live site, request access, and follow the review status page.",
            href: "/projects/join/search",
            icon: Search,
            badge: "Join flow",
          },
          {
            title: "Request admin assistance",
            description: "Escalate to the administrator when the normal invite or join path is blocked.",
            href: "/requests/admin-join/request",
            icon: UserPlus,
            badge: "Escalation",
          },
        ]}
      />

      <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
        <CardHeader>
          <CardTitle className="text-2xl">Before you continue</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-3">
          {[
            "Confirm your account verification level and role permissions.",
            "Review system readiness if you plan to add hardware or security alerts.",
            "Use the empty dashboard view when onboarding a brand-new organisation.",
          ].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 text-emerald-600" />
                <span>{item}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

