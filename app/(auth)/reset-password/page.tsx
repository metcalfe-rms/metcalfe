import Link from "next/link";
import Image from "next/image";
import { Shield } from "lucide-react";

import { MetcalfeLogo } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function ResetPasswordPage() {
  return (
    <main className="auth-page-shell bg-[#f3f5f8]">
      <header className="auth-page-header">
        <div className="flex items-center gap-2">
          <Image src={MetcalfeLogo} alt="Metcalfe logo" className="h-8 w-8 rounded-md p-1" />
          <p className="text-xl font-semibold">Metcalfe</p>
        </div>
        <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
          Need help?
        </Link>
      </header>

      <div className="mx-auto w-full max-w-lg">
        <Card className="rounded-[1.75rem] bg-white/95">
          <CardHeader>
            <CardTitle>Set New Password</CardTitle>
            <CardDescription>Ensure your Metcalfe account stays secure.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
              <p className="mb-1 flex items-center gap-2 font-semibold text-foreground">
                <Shield className="size-4 text-primary" />
                Security Notice
              </p>
              Submitting this form will log you out of all other devices for your security.
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm your password" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Password Strength</Label>
                <span className="text-xs font-semibold text-primary">Good</span>
              </div>
              <Progress value={72} />
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <p>• At least 12 characters</p>
                <p>• Uppercase letter</p>
                <p>• At least one number</p>
                <p>• Special character</p>
              </div>
            </div>

            <Button asChild className="h-11 w-full rounded-xl">
              <Link href="/password-reset-successful">Update Password</Link>
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <Link href="/login" className="font-medium hover:underline">
                Cancel and return to login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
