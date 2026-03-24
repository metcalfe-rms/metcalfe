import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera, MapPinned, ShieldCheck } from "lucide-react";

import { WorkflowFrame } from "@/components/workspace/workflow-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { findProject, getAddCameraSteps } from "@/lib/metcalfe";

type AddCameraPageProps = {
  params: Promise<{ projectId: string; step: string }>;
};

export default async function AddCameraPage({ params }: AddCameraPageProps) {
  const { projectId, step } = await params;
  const project = findProject(projectId);
  const steps = getAddCameraSteps(project.id);
  const currentHref = `/projects/${project.id}/add-camera/${step}`;
  const currentStep = steps.find((item) => item.href === currentHref);

  if (!currentStep) {
    notFound();
  }

  let title = "";
  let description = "";
  let content: React.ReactNode = null;
  let footer: React.ReactNode = null;
  let aside: React.ReactNode = null;

  switch (step) {
    case "device":
      title = `Select the camera package for ${project.name}.`;
      description = "Choose the device profile and deployment intent before deciding where it should be mounted.";
      content = (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="camera-model">Camera model</Label>
            <Select id="camera-model" defaultValue="ptz-pro">
              <option value="ptz-pro">PTZ Pro 360</option>
              <option value="perimeter-max">Perimeter Max IR</option>
              <option value="tower-lite">Tower Lite</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="camera-purpose">Deployment purpose</Label>
            <Input id="camera-purpose" defaultValue="Night gate visibility and incident review" />
          </div>
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href={`/projects/${project.id}/add-camera/placement`}>Continue to placement</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href={`/projects/${project.id}/options`}>Cancel</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Current project status</p>
          <p className="text-sm leading-6 text-muted-foreground">
            {project.phase}. Existing coverage: {project.cameras} cameras.
          </p>
        </>
      );
      break;
    case "placement":
      title = `Choose the placement strategy for ${project.name}.`;
      description = "Define where the unit should sit and which zones require alerts or protected visibility.";
      content = (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Gate and visitor entry lane",
            "Material staging and perimeter fence",
            "Tower deck and lift corridor",
          ].map((zone) => (
            <div key={zone} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <MapPinned className="size-5 text-slate-700" />
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{zone}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Recommended if this zone has recurring blind spots or high-value movement after hours.
              </p>
            </div>
          ))}
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href={`/projects/${project.id}/add-camera/review`}>Review installation plan</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href={`/projects/${project.id}/add-camera/device`}>Back</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Coverage note</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Placement choices here should line up with the site’s readiness and incident history.
          </p>
        </>
      );
      break;
    case "review":
      title = `Review the camera deployment for ${project.name}.`;
      description = "Use this final step to confirm model, purpose, and placement before returning to the project options page.";
      content = (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Device", body: "PTZ Pro 360 selected for night gate monitoring.", icon: Camera },
            { title: "Placement", body: "Mounted above the primary gate with a wide sweep to perimeter fencing.", icon: MapPinned },
            { title: "Alerting", body: "Incident and after-hours motion alerts enabled.", icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <Icon className="size-5 text-slate-700" />
                <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </div>
            );
          })}
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href={`/projects/${project.id}/options?cameraAdded=1`}>Add camera and return</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href={`/projects/${project.id}/add-camera/placement`}>Back</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Success destination</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Returning to project options surfaces the add-camera success state in context.
          </p>
        </>
      );
      break;
    default:
      notFound();
  }

  return (
    <WorkflowFrame
      eyebrow="Add camera process"
      title={title}
      description={description}
      steps={steps}
      currentHref={currentHref}
      footer={footer}
      aside={aside}
    >
      {content}
    </WorkflowFrame>
  );
}

