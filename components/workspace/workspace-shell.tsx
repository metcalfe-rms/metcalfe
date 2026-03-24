"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

import { MetcalfeLogoWhite } from "@/assets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  findProject,
  humanizeSegment,
  workspacePrimaryNav,
  workspaceSecondaryNav,
  type NavItem,
} from "@/lib/metcalfe";

type WorkspaceShellProps = {
  children: React.ReactNode;
};

function isActive(pathname: string, item: NavItem) {
  if (pathname === item.href) {
    return true;
  }

  if (item.match?.some((path) => pathname.startsWith(path))) {
    return true;
  }

  return pathname.startsWith(`${item.href}/`);
}

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const project = findProject(segment);
    const label = project?.id === segment ? project.name : humanizeSegment(segment);

    return { href, label };
  });
}

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const mobileNav = [...workspacePrimaryNav, ...workspaceSecondaryNav];

  return (
    <div className="min-h-screen bg-[#edf3f8] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-80 flex-col border-r border-slate-200 bg-[linear-gradient(180deg,#0f3d74_0%,#123d69_45%,#102f4f_100%)] px-6 py-7 text-white lg:flex">
          <Link href="/dashboard" className="inline-flex items-center gap-3">
            <Image
              src={MetcalfeLogoWhite}
              alt="Metcalfe logo"
              className="h-10 w-10 rounded-xl border border-white/20 object-cover"
            />
            <div>
              <p className="text-lg font-semibold tracking-tight">Metcalfe</p>
              <p className="text-xs text-sky-100">Remote site intelligence</p>
            </div>
          </Link>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">Launch mode</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">All critical routes online</p>
            <p className="mt-2 text-sm text-sky-100">
              This workspace groups dashboard, onboarding, project flows, team actions, and account controls.
            </p>
          </div>

          <nav className="mt-8 space-y-2">
            {workspacePrimaryNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                    active ? "bg-white text-slate-900" : "text-sky-50 hover:bg-white/10",
                  )}
                >
                  <Icon className="size-4" />
                  <div className="min-w-0">
                    <p className="font-semibold">{item.label}</p>
                    <p className={cn("truncate text-xs", active ? "text-slate-500" : "text-sky-100")}>
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2 pt-8">
            {workspaceSecondaryNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                    active ? "bg-white text-slate-900" : "text-sky-50 hover:bg-white/10",
                  )}
                >
                  <Icon className="size-4" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#edf3f8]/95 backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Workspace navigation
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/dashboard" className="font-medium text-foreground">
                      Home
                    </Link>
                    {breadcrumbs.map((crumb, index) => (
                      <span key={crumb.href} className="flex items-center gap-2">
                        <span>/</span>
                        {index === breadcrumbs.length - 1 ? (
                          <span className="font-medium text-foreground">{crumb.label}</span>
                        ) : (
                          <Link href={crumb.href} className="hover:text-foreground">
                            {crumb.label}
                          </Link>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex min-w-[220px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-muted-foreground">
                    <Search className="size-4" />
                    <span>Search routes, projects, or cameras</span>
                  </div>
                  <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white px-4 shadow-none">
                    <Link href="/projects/access-gate">
                      <Sparkles className="size-4" />
                      Quick action
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-slate-200 bg-white shadow-none">
                    <Bell className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {mobileNav.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(pathname, item);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm whitespace-nowrap",
                        active
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700",
                      )}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
