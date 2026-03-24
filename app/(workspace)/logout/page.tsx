import Link from "next/link";
import { LogOut, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/workspace/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LogoutPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Logout process"
        title="Log out of the Metcalfe workspace?"
        description="This route gives logout its own confirmation surface instead of leaving it as a dead menu action."
      />
      <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
        <CardHeader>
          <CardTitle className="text-2xl">Confirm sign-out</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-muted-foreground">
            Signing out returns you to the login page, while support and privacy routes remain publicly available if you need help afterward.
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/login?loggedOut=1">
                <LogOut className="size-4" />
                Log out now
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white shadow-none">
              <Link href="/settings/account">
                <ShieldCheck className="size-4" />
                Return to account actions
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
