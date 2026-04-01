import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera, ClipboardList, PencilLine, ShieldAlert, Trash2 } from "lucide-react";

import { ActionGrid } from "@/components/workspace/action-grid";
import { PageHero } from "@/components/workspace/page-hero";
import { StatusBadge } from "@/components/workspace/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProjectActions, findProject } from "@/lib/metcalfe";

type ProjectActionPageProps = {
  params: Promise<{ projectId: string; action: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const allowedActions = new Set(["options", "edit", "update", "delete"]);

export default async function ProjectActionPage({
  params,
  searchParams,
}: ProjectActionPageProps) {
  const { projectId, action } = await params;
  const resolvedSearchParams = await searchParams;

  if (!allowedActions.has(action)) {
    notFound();
  }

  const project = findProject(projectId);
  const cameraAdded = typeof resolvedSearchParams.cameraAdded === "string";
  const updated = typeof resolvedSearchParams.updated === "string";

  if (action === "options") {
    return (
      <div className="workspace-page">
        <PageHero
          eyebrow="More options process"
          title={`${project.name} project options`}
          description="This is the route-backed options hub for editing, updating, deleting, and extending camera coverage on a live project."
          actions={
            <>
              <Button asChild className="rounded-full bg-white px-5 text-slate-900 hover:bg-slate-100">
                <Link href={`/projects/${project.id}/edit`}>Edit project</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
                <Link href={`/projects/${project.id}/add-camera/device`}>Add camera</Link>
              </Button>
            </>
          }
          meta={[
            { label: "Status", value: project.status },
            { label: "Progress", value: `${project.progress}%` },
            { label: "Cameras", value: `${project.cameras}` },
          ]}
        />

        {cameraAdded || updated ? (
          <Card className="rounded-[1.75rem] border-emerald-200 bg-emerald-50">
            <CardContent className="p-5 text-sm font-medium text-emerald-800">
              {cameraAdded
                ? `New camera deployment has been added to the project options flow for ${project.name}.`
                : `${project.name} has been updated and the options flow is ready for the next action.`}
            </CardContent>
          </Card>
        ) : null}

        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="grid gap-5 p-6 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{project.location}</p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Access</p>
              <div className="mt-2">
                <StatusBadge status={project.access} />
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Updated</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{project.updatedAt}</p>
            </div>
          </CardContent>
        </Card>

        <ActionGrid
          items={getProjectActions(project.id).map((item, index) => ({
            ...item,
            icon: [PencilLine, ClipboardList, Camera, Trash2][index],
            badge: index === 3 ? "Destructive" : "Project flow",
          }))}
        />
      </div>
    );
  }

  if (action === "edit") {
    return (
      <div className="workspace-page">
        <PageHero
          eyebrow="Edit project"
          title={`Edit ${project.name}`}
          description="Update the core project metadata and return to the options page with a visible success path."
        />
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="grid gap-4 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Project name</Label>
              <Input id="edit-name" defaultValue={project.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input id="edit-location" defaultValue={project.location} />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3 pt-4">
              <Button asChild className="rounded-full">
                <Link href={`/projects/${project.id}/options?updated=${project.id}`}>Save changes</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                <Link href={`/projects/${project.id}/options`}>Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (action === "update") {
    return (
      <div className="workspace-page">
        <PageHero
          eyebrow="Update project"
          title={`Post an operating update for ${project.name}`}
          description="Use this page for milestone updates, incident notes, and operating changes that should not live inside the project edit form."
        />
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="space-y-4 p-6">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-muted-foreground">
              Latest note: Night shift requested improved gate visibility and a tighter access review around the lift corridor.
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <Link href={`/projects/${project.id}/options?updated=${project.id}`}>Publish update</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                <Link href={`/projects/${project.id}/options`}>Back to options</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="workspace-page">
      <PageHero
        eyebrow="Delete project"
        title={`Delete ${project.name}?`}
        description="This flow asks for confirmation before leaving the user on a clear success destination instead of a dead page."
      />
      <Card className="rounded-[1.75rem] border-rose-200 bg-white/95">
        <CardHeader>
          <CardTitle className="text-2xl">Deletion impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5 text-sm leading-6 text-rose-800">
            Removing this project will archive its demo dashboard visibility, options workflow, and camera setup entry points.
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="destructive" className="rounded-full">
              <Link href={`/dashboard?deleted=${project.id}`}>
                <ShieldAlert className="size-4" />
                Delete project
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
              <Link href={`/projects/${project.id}/options`}>Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
