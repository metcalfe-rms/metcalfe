import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function TwoFactorPage() {
  return (
    <AuthShell
      title="Verification Required"
      description="We've detected a sign-in attempt. Enter your 6-digit code to continue."
    >
      <Card className="w-full max-w-md border-none shadow-none">
        <CardHeader className="space-y-2 px-0">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">Secure Login</p>
          <CardTitle className="text-2xl">Login 2FA Verification</CardTitle>
          <CardDescription>Enter the 6-digit code from your Authenticator app or SMS.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 px-0">
          <form action="/dashboard" className="space-y-5">
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Input
                  key={`otp-${index}`}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-12 text-center text-lg"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox />
              Don&apos;t ask again on this device
            </label>

            <Button type="submit" className="h-11 w-full rounded-xl shadow-none">
              Verify and Sign In
            </Button>
          </form>

          <div className="space-y-2 text-center text-sm">
            <Link href="/support" className="font-semibold text-primary hover:underline">
              Use a backup code
            </Link>
            <p className="text-muted-foreground">
              Didn&apos;t receive a code?{" "}
              <Link href="/support" className="font-semibold text-primary hover:underline">
                Resend SMS
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
