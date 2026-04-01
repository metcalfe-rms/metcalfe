import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type LoginPageViewProps = {
  notice?: string;
};

export default function LoginPageView({ notice }: LoginPageViewProps) {
  return (
    <AuthShell
      title="Advanced Property Intelligence."
      description="Remote surveillance, access control, and project management in one secure platform."
      badge="REC - CAM-08"
    >
      <Card className="w-full max-w-md border-none">
        <CardHeader className="space-y-3 px-0">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Access your construction dashboard and live feeds.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          {notice ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
              {notice}
            </div>
          ) : null}

          <form action="/2fa" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/reset-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox />
              Keep me signed in for 30 days
            </label>

            <Button type="submit" className="h-11 w-full rounded-xl shadow-none">
              Sign In
            </Button>
          </form>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Or continue with
              </span>
              <Separator className="flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="rounded-xl shadow-none">
                Google
              </Button>
              <Button variant="outline" className="rounded-xl shadow-none">
                Microsoft
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>

          <p className="text-center text-sm text-muted-foreground">
            Need policy or support help?{" "}
            <Link href="/privacy-policy" className="font-semibold text-primary hover:underline">
              Privacy
            </Link>
            {" · "}
            <Link href="/support" className="font-semibold text-primary hover:underline">
              Support
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
