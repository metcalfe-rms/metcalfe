import Link from "next/link";
import { notFound } from "next/navigation";
import { LockKeyhole, ShieldCheck, UserRound, UserX } from "lucide-react";

import { PageHero } from "@/components/workspace/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profileSettings } from "@/lib/metcalfe";

type SettingsSectionPageProps = {
  params: Promise<{ section: string }>;
};

const validSections = new Set(["profile", "access", "account", "deactivate"]);

export default async function SettingsSectionPage({ params }: SettingsSectionPageProps) {
  const { section } = await params;

  if (!validSections.has(section)) {
    notFound();
  }

  if (section === "profile") {
    return (
      <div className="space-y-6">
        <PageHero
          eyebrow="Profile setting page"
          title="Maintain the operator profile used across the workspace."
          description="Profile settings remain simple and reachable so the user always has a working destination for identity and contact updates."
        />
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="grid gap-4 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input id="full-name" defaultValue={profileSettings.fullName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={profileSettings.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue={profileSettings.role} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue={profileSettings.phone} />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3 pt-4">
              <Button asChild className="rounded-full">
                <Link href="/settings/account">Save profile</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/settings/access">Access settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (section === "access") {
    return (
      <div className="space-y-6">
        <PageHero
          eyebrow="Access & permissions"
          title="Review privacy and permission controls."
          description="This page anchors the user-facing access settings route linked from auth, support, privacy, and team flows."
        />
        <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
          <CardContent className="grid gap-4 p-6 md:grid-cols-3">
            {[
              "Role-based permissions are scoped by project and operational need.",
              "Sensitive footage, hardware controls, and security alerts remain limited to approved roles.",
              "Privacy policy and support routes are one click away if this page raises questions.",
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="rounded-full">
            <Link href="/privacy-policy">Privacy policy</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
            <Link href="/support">Support</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (section === "account") {
    return (
      <div className="space-y-6">
        <PageHero
          eyebrow="Logout & account actions"
          title="Manage account-level actions from one route."
          description="This page consolidates the account actions that were previously easy to lose: logout, deactivate, privacy review, and profile maintenance."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
            <CardContent className="space-y-3 p-5">
              <UserRound className="size-5 text-slate-700" />
              <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
              <p className="text-sm leading-6 text-muted-foreground">Update identity, contact details, and the role shown across the workspace.</p>
              <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/settings/profile">Open profile</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
            <CardContent className="space-y-3 p-5">
              <LockKeyhole className="size-5 text-slate-700" />
              <h2 className="text-lg font-semibold text-slate-900">Logout</h2>
              <p className="text-sm leading-6 text-muted-foreground">Use the dedicated logout route to complete sign-out cleanly.</p>
              <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/logout">Open logout flow</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
            <CardContent className="space-y-3 p-5">
              <UserX className="size-5 text-rose-600" />
              <h2 className="text-lg font-semibold text-slate-900">Deactivate</h2>
              <p className="text-sm leading-6 text-muted-foreground">Route deactivation through a confirmation page with a safe exit back to login.</p>
              <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
                <Link href="/settings/deactivate">Open deactivate flow</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Deactivate process"
        title="Deactivate this account?"
        description="This route exists so account deactivation has a real confirmation step and a clear success destination."
      />
      <Card className="rounded-[1.75rem] border-rose-200 bg-white/95">
        <CardHeader>
          <CardTitle className="text-2xl">Account deactivation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5 text-sm leading-6 text-rose-800">
            Deactivation removes access to dashboards, project routes, team actions, and account settings until the account is restored.
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="destructive" className="rounded-full">
              <Link href="/login?deactivated=1">
                <UserX className="size-4" />
                Deactivate account
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
              <Link href="/settings/account">
                <ShieldCheck className="size-4" />
                Cancel
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

