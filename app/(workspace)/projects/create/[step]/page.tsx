import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera, CheckCircle2, ShieldCheck, Users } from "lucide-react";

import { WorkflowFrame } from "@/components/workspace/workflow-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { createProjectSteps } from "@/lib/metcalfe";

type CreateProjectPageProps = {
  params: Promise<{ step: string }>;
};

export default async function CreateProjectPage({ params }: CreateProjectPageProps) {
  const { step } = await params;
  const currentHref = `/projects/create/${step}`;
  const currentStep = createProjectSteps.find((item) => item.href === currentHref);

  if (!currentStep) {
    notFound();
  }

  let title = "";
  let description = "";
  let content: React.ReactNode = null;
  let footer: React.ReactNode = null;
  let aside: React.ReactNode = null;

  switch (step) {
    case "details":
      title = "Define the new project before you assign people and devices.";
      description = "Capture the site identity, project owner, and security tier so every later step inherits the correct context.";
      content = (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input id="project-name" defaultValue="Harbour View Residences" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-location">Site location</Label>
            <Input id="project-location" defaultValue="Tema, Greater Accra" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Project owner</Label>
            <Input id="owner" defaultValue="Metcalfe Capital Projects" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tier">Security tier</Label>
            <Select id="tier" defaultValue="enhanced">
              <option value="standard">Standard</option>
              <option value="enhanced">Enhanced</option>
              <option value="mission-critical">Mission critical</option>
            </Select>
          </div>
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/projects/create/team">Continue to team setup</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/projects/access-gate">Cancel</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">What this drives</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Project details influence the team roles, camera coverage recommendations, and dashboard summaries shown after launch.
          </p>
        </>
      );
      break;
    case "team":
      title = "Assign the people who will own approvals, updates, and site visibility.";
      description = "Use this step to decide who approves access, who receives alerts, and who can make operational changes after launch.";
      content = (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Project administrator",
              body: "Amina James will own approvals, settings, and account verification follow-up.",
            },
            {
              title: "Site supervisor",
              body: "Oliver Koomson will post updates and coordinate day-to-day camera oversight.",
            },
            {
              title: "Investor stakeholders",
              body: "Read-only access goes to the remote investment and compliance team.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <Users className="size-5 text-slate-700" />
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/projects/create/cameras">Continue to camera planning</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/projects/create/details">Back</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Tip</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Invite and removal flows remain available later from the team management section, so this step only needs the starting team.
          </p>
        </>
      );
      break;
    case "cameras":
      title = "Plan site coverage and device readiness.";
      description = "Choose the devices and placement assumptions that should be in place before the project goes live.";
      content = (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Perimeter kit",
              body: "4 weatherproof cameras covering gate, fence line, and material staging.",
            },
            {
              title: "Crane and upper deck kit",
              body: "2 elevated units for lift oversight, schedule validation, and incident review.",
            },
            {
              title: "Night visibility package",
              body: "IR coverage with incident alerts for low-light zones and access breaches.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <Camera className="size-5 text-slate-700" />
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/projects/create/review">Review project setup</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/projects/create/team">Back</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Related route</p>
          <Link href="/orientation/system-readiness" className="text-sm text-primary hover:underline">
            Re-check system readiness
          </Link>
        </>
      );
      break;
    case "review":
      title = "Review the project launch package before you commit it.";
      description = "This final review confirms identity, team, and readiness details so the dashboard and project options pages start in a coherent state.";
      content = (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Project details",
              body: "Harbour View Residences, Tema, Enhanced security tier.",
              icon: ShieldCheck,
            },
            {
              title: "Core team",
              body: "Admin owner, site supervisor, and investor viewers aligned.",
              icon: Users,
            },
            {
              title: "Coverage plan",
              body: "Perimeter, elevated deck, and low-light monitoring package selected.",
              icon: Camera,
            },
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
            <Link href="/projects/create/success">Create project</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/projects/create/cameras">Back</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">After launch</p>
          <p className="text-sm leading-6 text-muted-foreground">
            The project will surface on the dashboard and the options page so edits, updates, and camera additions can continue without dead links.
          </p>
        </>
      );
      break;
    case "success":
      title = "New project created successfully.";
      description = "The project setup process is complete and the dashboard is ready to receive the new record.";
      content = (
        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 text-emerald-700" />
              <div>
                <h2 className="text-xl font-semibold text-emerald-900">Harbour View Residences is queued for monitoring.</h2>
                <p className="mt-2 text-sm leading-6 text-emerald-800">
                  The workflow completed all setup steps: details, team, cameras, and review.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/dashboard?created=1">Return to dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/projects/access-gate">Open access gate</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Next recommended flow</p>
          <Link href="/team/invite" className="text-sm text-primary hover:underline">
            Invite initial project members
          </Link>
        </>
      );
      break;
    default:
      notFound();
  }

  return (
    <WorkflowFrame
      eyebrow="Creating project process"
      title={title}
      description={description}
      steps={createProjectSteps}
      currentHref={currentHref}
      footer={footer}
      aside={aside}
    >
      {content}
    </WorkflowFrame>
  );
}

