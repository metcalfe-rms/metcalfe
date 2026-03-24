import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WorkflowStep } from "@/lib/metcalfe";

import { PageHero } from "./page-hero";
import { WorkflowStepper } from "./workflow-stepper";

type WorkflowFrameProps = {
  eyebrow?: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
  currentHref: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  aside?: React.ReactNode;
};

export function WorkflowFrame({
  eyebrow,
  title,
  description,
  steps,
  currentHref,
  children,
  footer,
  aside,
}: WorkflowFrameProps) {
  return (
    <div className="space-y-6">
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="space-y-6 p-6 md:p-7">
            {children}
            {footer ? <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">{footer}</div> : null}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
            <CardHeader>
              <CardTitle className="text-xl">Process tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkflowStepper steps={steps} currentHref={currentHref} />
            </CardContent>
          </Card>

          {aside ? (
            <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
              <CardContent className="space-y-4 p-6">{aside}</CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}

