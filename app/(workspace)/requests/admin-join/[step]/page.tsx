import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { WorkflowFrame } from "@/components/workspace/workflow-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminJoinSteps } from "@/lib/metcalfe";

type AdminJoinPageProps = {
  params: Promise<{ step: string }>;
};

export default async function AdminJoinPage({ params }: AdminJoinPageProps) {
  const { step } = await params;
  const currentHref = `/requests/admin-join/${step}`;
  const currentStep = adminJoinSteps.find((item) => item.href === currentHref);

  if (!currentStep) {
    notFound();
  }

  const title =
    step === "request"
      ? "Escalate access to an administrator when the normal join path is blocked."
      : "Administrator join request submitted.";
  const description =
    step === "request"
      ? "Use this path when you need a human approver to connect you to the correct project or permission level."
      : "The request has a clear confirmation page so the user knows the process completed successfully.";

  return (
    <WorkflowFrame
      eyebrow="Requesting admin to join process"
      title={title}
      description={description}
      steps={adminJoinSteps}
      currentHref={currentHref}
      footer={
        step === "request" ? (
          <>
            <Button asChild className="rounded-full">
              <Link href="/requests/admin-join/submitted">Submit admin request</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
              <Link href="/projects/access-gate">Cancel</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild className="rounded-full">
              <Link href="/dashboard">Return to dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
              <Link href="/support">Contact support</Link>
            </Button>
          </>
        )
      }
      aside={
        step === "request" ? (
          <>
            <p className="text-sm font-semibold text-slate-900">When to use this</p>
            <p className="text-sm leading-6 text-muted-foreground">
              Use administrator escalation when you know the project exists but the invite, join, or permission flow is blocked.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-slate-900">Expected follow-up</p>
            <p className="text-sm leading-6 text-muted-foreground">
              An administrator should confirm project placement and permission scope before granting access.
            </p>
          </>
        )
      }
    >
      {step === "request" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="admin-project">Project name</Label>
            <Input id="admin-project" defaultValue="Ibadan Health Campus" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-role">Requested role</Label>
            <Input id="admin-role" defaultValue="Security lead" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="admin-reason">Why admin help is needed</Label>
            <Input id="admin-reason" defaultValue="Existing invite expired and access must be restored for night monitoring." />
          </div>
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 text-emerald-700" />
            <div>
              <h2 className="text-xl font-semibold text-emerald-900">Administrator escalation confirmed.</h2>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                The request includes project name, role intent, and the reason the normal join route could not finish.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-sm text-emerald-900">
            Next stop: wait for administrator review or continue to support if the issue is urgent.
          </div>
        </div>
      )}
    </WorkflowFrame>
  );
}
