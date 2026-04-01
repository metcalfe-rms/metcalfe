import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { MetcalfeLogo } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PasswordResetSuccessfulPage() {
  return (
    <main className="auth-page-shell bg-[#f4f8f4]">
      <header className="auth-page-header">
        <div className="flex items-center gap-2">
          <Image src={MetcalfeLogo} alt="Metcalfe logo" className="h-8 w-8 rounded-md p-1" />
          <p className="text-xl font-semibold">Metcalfe</p>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <Link href="/projects/access-gate" className="hover:text-foreground">
            Projects
          </Link>
          <Link href="/settings/access" className="hover:text-foreground">
            Safety
          </Link>
          <Link href="/support" className="hover:text-foreground">
            Support
          </Link>
        </nav>
      </header>

      <div className="mx-auto w-full max-w-xl">
        <Card className="rounded-[1.75rem] border-green-200 bg-white/95">
          <CardHeader className="items-center text-center">
            <span className="inline-flex size-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="size-8 text-green-600" />
            </span>
            <CardTitle>Password Updated Successfully</CardTitle>
            <CardDescription>
              Your account security is important to us. You can now log in with your new credentials.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-7">
            <Button asChild className="h-11 w-full rounded-xl bg-green-500 text-white hover:bg-green-600">
              <Link href="/login">Go to Login</Link>
            </Button>

            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold">Enable Two-Factor Authentication</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Protect your account with an extra layer of security.
              </p>
              <Link href="/settings/access" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                Go to Settings
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
