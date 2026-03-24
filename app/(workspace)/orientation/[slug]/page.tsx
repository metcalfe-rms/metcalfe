import Link from "next/link";
import { notFound } from "next/navigation";
import { BellRing, LaptopMinimalCheck, ShieldCheck, UserRoundCog } from "lucide-react";

import { WorkflowFrame } from "@/components/workspace/workflow-frame";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { orientationSteps } from "@/lib/metcalfe";

type OrientationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OrientationPage({ params }: OrientationPageProps) {
  const { slug } = await params;
  const currentHref = `/orientation/${slug}`;
  const currentStep = orientationSteps.find((step) => step.href === currentHref);

  if (!currentStep) {
    notFound();
  }

  let title = "";
  let description = "";
  let content: React.ReactNode = null;
  let footer: React.ReactNode = null;
  let aside: React.ReactNode = null;

  switch (slug) {
    case "welcome":
      title = "Welcome to the Metcalfe orientation process.";
      description = "Start with the first-run overview, then move through verification and readiness before entering full project operations.";
      content = (
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Role-based setup",
                body: "Administrators, clients, and contractors each follow access checks suited to their control level.",
                icon: UserRoundCog,
              },
              {
                title: "Security-first access",
                body: "Verification and readiness checkpoints keep project, camera, and team actions inside the right guardrails.",
                icon: ShieldCheck,
              },
              {
                title: "Operational continuity",
                body: "The dashboard, request box, and support routes stay linked so users are never stuck in a dead end.",
                icon: BellRing,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="rounded-[1.5rem] border-slate-200 bg-slate-50">
                  <CardContent className="space-y-3 p-5">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white text-slate-700">
                      <Icon className="size-5" />
                    </span>
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                      <p className="text-sm leading-6 text-muted-foreground">{item.body}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-muted-foreground">
            The orientation flow is intentionally short: it gets new users ready without asking them to guess where the next step lives.
          </div>
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/orientation/account-verification">Continue to account verification</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/dashboard">Skip to dashboard</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Expected outcome</p>
          <p className="text-sm leading-6 text-muted-foreground">
            By the end of orientation, users know their role, readiness state, and the best access route into project work.
          </p>
        </>
      );
      break;
    case "account-verification":
      title = "Match the account type to the right verification track.";
      description = "This page clarifies role-based checks so administrators, clients, and contractors understand what unlocks each permission tier.";
      content = (
        <div className="space-y-4">
          {[
            {
              role: "Administrator",
              status: "Verified for organisation controls, project creation, and team approvals.",
            },
            {
              role: "Client",
              status: "Verified for portfolio visibility, read-only reports, and approval tracking.",
            },
            {
              role: "Contractor",
              status: "Verified for site updates, camera reviews, and scoped team actions.",
            },
          ].map((item) => (
            <div key={item.role} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">{item.role}</h2>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  Verification ready
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.status}</p>
            </div>
          ))}
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/orientation/system-readiness">Continue to system readiness</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/orientation/welcome">Back</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Related routes</p>
          <div className="space-y-2 text-sm">
            <Link href="/settings/access" className="block text-primary hover:underline">
              Access and permissions
            </Link>
            <Link href="/privacy-policy" className="block text-primary hover:underline">
              Privacy policy
            </Link>
          </div>
        </>
      );
      break;
    case "system-readiness":
      title = "Check device, alert, and workflow readiness before launch.";
      description = "Use this step to confirm your browser, notifications, and monitoring policies are ready before you start creating or joining projects.";
      content = (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Device readiness",
              body: "Browser supported, network stable, and session security enabled.",
              icon: LaptopMinimalCheck,
            },
            {
              title: "Alert readiness",
              body: "Email and in-app notifications are enabled for incidents and access updates.",
              icon: BellRing,
            },
            {
              title: "Policy readiness",
              body: "Access settings reviewed for privacy and permission boundaries.",
              icon: ShieldCheck,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white text-slate-700">
                  <Icon className="size-5" />
                </span>
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
            <Link href="/orientation/complete">Finish orientation</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/orientation/account-verification">Back</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Best next action</p>
          <p className="text-sm leading-6 text-muted-foreground">
            If you expect to install or re-position hardware soon, continue from here into the project access gate and camera setup flows.
          </p>
        </>
      );
      break;
    case "complete":
      title = "Orientation complete. The workspace is ready for project work.";
      description = "Onboarding, verification, and readiness checkpoints are done. Continue into the access gate, dashboard, or team workflows.";
      content = (
        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-xl font-semibold text-emerald-900">You are ready to enter the main product flows.</h2>
            <p className="mt-2 text-sm leading-6 text-emerald-800">
              Use the project access gate if you are creating or joining a site, or go straight to the dashboard for a global view.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Dashboard", href: "/dashboard" },
              { title: "Project access gate", href: "/projects/access-gate" },
              { title: "Team management", href: "/team" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      );
      footer = (
        <>
          <Button asChild className="rounded-full">
            <Link href="/projects/access-gate">Open project access gate</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </>
      );
      aside = (
        <>
          <p className="text-sm font-semibold text-slate-900">Need help first?</p>
          <Link href="/support" className="text-sm text-primary hover:underline">
            Support remains available from here too.
          </Link>
        </>
      );
      break;
    default:
      notFound();
  }

  return (
    <WorkflowFrame
      eyebrow="Orientation"
      title={title}
      description={description}
      steps={orientationSteps}
      currentHref={currentHref}
      footer={footer}
      aside={aside}
    >
      {content}
    </WorkflowFrame>
  );
}

