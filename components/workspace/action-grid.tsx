import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ActionGridItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

type ActionGridProps = {
  items: ActionGridItem[];
  className?: string;
};

export function ActionGrid({ items, className }: ActionGridProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <Card className="h-full rounded-[1.75rem] border-slate-200 bg-white/95 transition hover:-translate-y-0.5 hover:border-slate-300">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="size-5" />
                  </span>
                  {item.badge ? (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                  <span>Open flow</span>
                  <ArrowRight className="size-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

