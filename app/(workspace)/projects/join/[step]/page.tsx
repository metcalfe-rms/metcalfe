import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Search, ShieldCheck, UserPlus } from "lucide-react";

import { WorkflowFrame } from "@/components/workspace/workflow-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { joinProjectSteps, projects } from "@/lib/metcalfe";

type JoinProjectPageProps = {
  params: Promise<{ step: string }>;
};

export default async function JoinProjectPage({ params }: JoinProjectPageProps) {
  const { step } = await params;
  const currentHref = `/projects/join/${step}`;
  const currentStep = joinProjectSteps.find((item) => item.href === currentHref);

  if (!currentStep) {
    notFound();
  }

  let title = "";
  let description = "";
  let content: React.ReactNode = null;
  let footer: React.ReactNode = null;
  let aside: React.ReactNode = null;

  switch (step) {
    case "search":
      title = "Search for the project you need to access.";
      description = "This route gives users a guided entry point into existing project participation instead of leaving them stranded on a blank page.";
      content = (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-project">Project or invitation code</Label>
            <Input id="search-project" defaultValue="Accra Hills Estate" />
          </div>
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-slate-900">{project.name}</h2>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {project.location}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.phase}</p>
              </div>
            ))}
          </div>
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/projects/join/request">Continue to access request</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/projects/access-gate">Back to access gate</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Can&apos;t find the site?</p>
          <Link href="/requests/admin-join/request" className="text-sm text-primary hover:underline">
            Escalate to an administrator
          </Link>
        </>
      );
      break;
    case "request":
      title = "Submit your join request with the right level of access.";
      description = "Capture why the user needs entry and which permission set matches their responsibilities.";
      content = (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="join-project">Project</Label>
            <Input id="join-project" defaultValue="Accra Hills Estate" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="join-role">Requested access</Label>
            <Select id="join-role" defaultValue="read-only">
              <option value="read-only">Read-only monitoring</option>
              <option value="operations">Operations updates</option>
              <option value="admin">Admin review</option>
            </Select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="reason">Reason for joining</Label>
            <Input id="reason" defaultValue="Investor reporting and weekly progress validation" />
          </div>
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/projects/join/status">Submit join request</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/projects/join/search">Back</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Privacy-aware join requests</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Permission selection here should match the minimum access needed for the user&apos;s role and reporting duties.
          </p>
        </>
      );
      break;
    case "status":
      title = "The project join request is now in review.";
      description = "This status page gives the user a clear stopping point and directs them to the next helpful surfaces while approval is pending.";
      content = (
        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 text-emerald-700" />
              <div>
                <h2 className="text-xl font-semibold text-emerald-900">Access request submitted for Accra Hills Estate.</h2>
                <p className="mt-2 text-sm leading-6 text-emerald-800">
                  The request includes a read-only investor monitoring profile and is waiting for administrator review.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Review window", body: "Expected within one business day.", icon: Search },
              { title: "Escalation path", body: "Administrator request flow remains available.", icon: UserPlus },
              { title: "Policy route", body: "Permission rules live on the access settings page.", icon: ShieldCheck },
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
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/team/request-box">Open request box</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/dashboard">Return to dashboard</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">If approval stalls</p>
          <Link href="/requests/admin-join/request" className="text-sm text-primary hover:underline">
            Request admin intervention
          </Link>
        </>
      );
      break;
    default:
      notFound();
  }

  return (
    <WorkflowFrame
      eyebrow="Joining existing project process"
      title={title}
      description={description}
      steps={joinProjectSteps}
      currentHref={currentHref}
      footer={footer}
      aside={aside}
    >
      {content}
    </WorkflowFrame>
  );
}

