import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  meta?: Array<{ label: string; value: string }>;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  meta,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#0f3d74_0%,#194d83_45%,#f2f6fb_45%,#ffffff_100%)] p-6 text-white shadow-sm md:p-8",
        className,
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.28em] text-sky-100 uppercase">{eyebrow}</p>
          ) : null}
          <div className="space-y-3">
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
            <p className="max-w-2xl text-sm text-sky-100 md:text-base">{description}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {meta?.length ? (
          <div className="grid gap-3 rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
            {meta.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/10 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-sky-100">{item.label}</p>
                <p className="mt-1 text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

