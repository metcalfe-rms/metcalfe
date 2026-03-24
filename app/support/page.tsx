import Link from "next/link";
import { ArrowRight, LifeBuoy, ShieldCheck } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { PageHero } from "@/components/workspace/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supportChannels } from "@/lib/metcalfe";

export default function SupportPage() {
  return (
    <SiteShell>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
        <PageHero
          eyebrow="Support"
          title="Support routes for onboarding, access, readiness, and mission blockers."
          description="Metcalfe support stays reachable from both public and authenticated flows so users are not stranded when a process needs help."
          actions={
            <>
              <Button asChild className="rounded-full bg-white px-5 text-slate-900 hover:bg-slate-100">
                <Link href="/login">Return to login</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
            </>
          }
        />

        <section className="grid gap-4 lg:grid-cols-3">
          {supportChannels.map((channel) => (
            <Card key={channel.title} className="rounded-[1.75rem] border-slate-200 bg-white/95">
              <CardHeader>
                <CardTitle className="text-2xl">{channel.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">{channel.description}</p>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{channel.hours}</div>
                <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                  <Link href={channel.href}>
                    Open related flow
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="grid gap-4 p-6 lg:grid-cols-2">
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-emerald-600" />
                <p className="font-semibold text-slate-900">Common unblockers</p>
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>Login and two-factor issues route back to the auth pages cleanly.</p>
                <p>Join requests and admin escalations connect to project access workflows.</p>
                <p>Privacy and permission concerns link directly into the access settings page.</p>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-[#0f3d74] p-5 text-white">
              <div className="flex items-center gap-3">
                <LifeBuoy className="size-5" />
                <p className="font-semibold">Need the policy view instead?</p>
              </div>
              <p className="mt-4 text-sm text-sky-100">
                The privacy policy page explains access boundaries, retention expectations, and how project data is handled.
              </p>
              <Button asChild className="mt-5 rounded-full bg-white text-slate-900 hover:bg-slate-100">
                <Link href="/privacy-policy">Open privacy policy</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}

