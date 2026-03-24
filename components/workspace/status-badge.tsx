import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

const toneMap: Record<string, string> = {
  live: "border-emerald-200 bg-emerald-50 text-emerald-700",
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  strong: "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  "needs attention": "border-rose-200 bg-rose-50 text-rose-700",
  "needs review": "border-rose-200 bg-rose-50 text-rose-700",
  limited: "border-sky-200 bg-sky-50 text-sky-700",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const tone = toneMap[status.toLowerCase()] ?? "border-border bg-muted text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        tone,
        className,
      )}
    >
      {status}
    </span>
  );
}

