import Link from "next/link";
import { FolderPlus, LifeBuoy, UserPlus } from "lucide-react";

import { ActionGrid } from "@/components/workspace/action-grid";
import { PageHero } from "@/components/workspace/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmptyDashboardPage() {
  return (
    <div className="workspace-page">
      <PageHero
        eyebrow="Empty dashboard"
        title="No live projects yet. The workspace is ready when you are."
        description="Use the project access gate to create a new site, join an existing one, or request administrator help if you have not been granted access yet."
        actions={
          <>
            <Button asChild className="rounded-full bg-white px-5 text-slate-900 hover:bg-slate-100">
              <Link href="/projects/create/details">Create a project</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
              <Link href="/projects/join/search">Join existing project</Link>
            </Button>
          </>
        }
      />

      <Card className="rounded-[1.75rem] border-dashed border-slate-300 bg-white/95">
        <CardContent className="space-y-6 p-8 text-center md:p-10">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Start by opening one of the guided routes below.</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              The dashboard stays lightweight until you either create a monitored build, receive an invite, or submit an admin join request.
            </p>
          </div>
          <ActionGrid
            items={[
              {
                title: "Launch a new project",
                description: "Create site details, assign a team, and review camera readiness.",
                href: "/projects/create/details",
                icon: FolderPlus,
              },
              {
                title: "Request project access",
                description: "Search for an existing project and submit a structured access request.",
                href: "/projects/join/search",
                icon: UserPlus,
              },
              {
                title: "Get guided support",
                description: "Use the public support page if you are blocked before account handoff.",
                href: "/support",
                icon: LifeBuoy,
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
