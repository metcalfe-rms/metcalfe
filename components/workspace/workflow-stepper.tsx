import Link from "next/link";

import { cn } from "@/lib/utils";
import type { WorkflowStep } from "@/lib/metcalfe";

type WorkflowStepperProps = {
  steps: WorkflowStep[];
  currentHref: string;
};

export function WorkflowStepper({ steps, currentHref }: WorkflowStepperProps) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => {
        const isActive = step.href === currentHref;
        const isComplete = !isActive && steps.findIndex((item) => item.href === currentHref) > index;

        return (
          <li key={step.href || step.label} className="flex gap-3">
            <div
              className={cn(
                "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : isComplete
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </div>
            <div className="space-y-1">
              {step.href ? (
                <Link
                  href={step.href}
                  className={cn(
                    "text-sm font-semibold",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {step.label}
                </Link>
              ) : (
                <p className={cn("text-sm font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>
                  {step.label}
                </p>
              )}
              <p className="text-xs leading-5 text-muted-foreground">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

