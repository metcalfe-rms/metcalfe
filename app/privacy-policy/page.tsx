import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { PageHero } from "@/components/workspace/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { privacySections } from "@/lib/metcalfe";

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <div className="page-shell">
        <PageHero
          eyebrow="Privacy policy"
          title="Operational privacy guidance for the Metcalfe monitoring workspace."
          description="This public page gives users a clean place to understand what data is used, how project access is limited, and where to manage permissions."
          actions={
            <>
              <Button asChild className="rounded-full bg-white px-5 text-slate-900 hover:bg-slate-100">
                <Link href="/settings/access">Access settings</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
                <Link href="/support">Contact support</Link>
              </Button>
            </>
          }
        />

        <section className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {privacySections.map((section) => (
            <Card key={section.title} className="rounded-[1.75rem] border-slate-200 bg-white/95">
              <CardHeader>
                <CardTitle className="text-2xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{section.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="grid gap-5 p-6 md:p-7 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-emerald-600" />
                <p className="font-semibold text-slate-900">Permission-aware by design</p>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Permission and privacy controls are also available inside the authenticated workspace so admins can review access boundaries without leaving their current flow.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-full">
                <Link href="/settings/access">
                  Review access controls
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/login">Back to login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}
