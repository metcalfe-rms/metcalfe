"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Copy,
  Download,
  KeyRound,
  MessageSquare,
  QrCode,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { MetcalfeLogo } from "@/assets";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;
type AccountType = "administrator" | "client" | "contractor";
type TwoFaMethod = "app" | "sms";

const accountTypes = [
  {
    value: "administrator" as AccountType,
    title: "Administrator",
    description: "Manage multiple projects, oversee team access, and control organisation-wide security settings.",
    icon: KeyRound,
  },
  {
    value: "client" as AccountType,
    title: "Client",
    description: "Monitor your investment progress with live feeds, daily logs, and direct communication with contractors.",
    icon: ShieldCheck,
  },
  {
    value: "contractor" as AccountType,
    title: "Contractor",
    description: "Upload site updates, manage task checklists, and provide transparency to project stakeholders.",
    icon: Smartphone,
  },
] as const;

function getPasswordStrength(password: string): { value: number; label: string } {
  if (!password) return { value: 0, label: "" };
  let score = 0;
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 20;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 20;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;
  const label = score <= 20 ? "Weak" : score <= 60 ? "Fair" : "Strong";
  return { value: score, label };
}

const RECOVERY_CODES = [
  "A1B2-C3D4", "E5F6-G7H8", "I9J0-K1L2", "M3N4-O5P6",
  "Q7R8-S9T0", "U1V2-W3X4", "Y5Z6-A7B8", "C9D0-E1F2",
];

export default function RegisterPageView() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [accountType, setAccountType] = useState<AccountType>("client");

  // Step 2 state
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Step 3 state
  const [twoFaMethod, setTwoFaMethod] = useState<TwoFaMethod>("app");

  const strength = getPasswordStrength(password);

  if (step === 1) {
    return (
      <AuthShell
        title="Secure your vision, wherever you are."
        description="Join the world's most trusted construction monitoring platform. Get real-time updates and peace of mind for your remote property investments."
      >
        <Card className="w-full max-w-lg border-none shadow-none">
          <CardHeader className="space-y-3 px-0">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">Step 1 of 3</p>
            <CardTitle className="text-2xl">Choose Your Account Type</CardTitle>
            <CardDescription>Select the role that best describes how you will use the Metcalfe platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-0">
            <fieldset className="space-y-4">
              <div className="space-y-4">
                {accountTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <label
                      key={type.value}
                      className={cn(
                        "flex cursor-pointer items-start gap-4 rounded-xl border px-4 py-4 transition-colors",
                        accountType === type.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <input
                        type="radio"
                        name="account-type"
                        value={type.value}
                        checked={accountType === type.value}
                        onChange={() => setAccountType(type.value)}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
                          accountType === type.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold">{type.title}</span>
                        <span className="text-xs text-muted-foreground">{type.description}</span>
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                          accountType === type.value ? "border-primary bg-primary" : "border-muted-foreground/40"
                        )}
                      >
                        {accountType === type.value && (
                          <span className="size-2 rounded-full bg-white" />
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Button className="h-11 w-full rounded-xl shadow-none" onClick={() => setStep(2)}>
              Create Account →
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>

            <div className="flex items-center justify-center gap-5 pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5" /> Encrypted</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5" /> GDPR Compliant</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5" /> Pro Standard</span>
            </div>
          </CardContent>
        </Card>
      </AuthShell>
    );
  }

  if (step === 2) {
    return (
      <AuthShell
        title="Secure your vision, wherever you are."
        description="Join the world's most trusted construction monitoring platform."
      >
        <Card className="w-full max-w-lg border-none shadow-none">
          <CardHeader className="space-y-3 px-0">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">Step 2 of 3</p>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Start monitoring your construction site today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-0">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                placeholder="Acme Construction Ltd."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="work-email">Work Email</Label>
              <Input
                id="work-email"
                type="email"
                placeholder="john@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="" disabled>Select your role</option>
                <option value="project-manager">Project Manager</option>
                <option value="site-supervisor">Site Supervisor</option>
                <option value="operations-head">Operations Head</option>
                <option value="investor">Investor</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Create Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && (
                <>
                  <Progress value={strength.value} />
                  <p className={cn("text-xs", strength.label === "Strong" ? "text-green-600" : strength.label === "Fair" ? "text-yellow-600" : "text-red-500")}>
                    Strength: {strength.label}
                  </p>
                </>
              )}
            </div>

            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <Checkbox
                className="mt-0.5"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I agree to the{" "}
                <Link href="/privacy-policy" className="font-semibold text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="font-semibold text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <Button className="h-11 w-full rounded-xl shadow-none" onClick={() => setStep(3)}>
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-semibold text-primary hover:underline"
              >
                ← Back
              </button>
              {" · "}
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </AuthShell>
    );
  }

  // Step 3 — 2FA Setup (full-screen, no AuthShell)
  return (
    <main className="min-h-screen bg-background">
      <header className="auth-page-header flex-wrap rounded-none border-x-0 border-t-0 bg-background">
        <Link href="/login" className="inline-flex items-center gap-3">
          <Image
            src={MetcalfeLogo}
            alt="Metcalfe logo"
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-green-500" />
            Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-green-500" />
            GDPR Compliant
          </span>
          <span className="font-semibold text-foreground">Step 3 of 3</span>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10 xl:px-8">
        <div className="mb-10 space-y-2">
          <h1 className="text-2xl font-bold">2FA & Security Setup</h1>
          <p className="text-muted-foreground">Secure your construction monitoring access.</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          {/* Left: method + QR/SMS panel */}
          <div className="space-y-7">
            {/* Method toggle */}
            <div className="space-y-4">
              <p className="text-sm font-medium">Choose your 2FA Method</p>
              <div className="grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setTwoFaMethod("app")}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-colors",
                    twoFaMethod === "app"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <QrCode className={cn("size-6", twoFaMethod === "app" ? "text-primary" : "text-muted-foreground")} />
                  <span className="block text-sm font-semibold">Authenticator App</span>
                  <span className="text-xs text-muted-foreground">Google, Authy, or Microsoft Authenticator.</span>
                  {twoFaMethod === "app" && (
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-white text-xs">✓</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setTwoFaMethod("sms")}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-colors",
                    twoFaMethod === "sms"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <MessageSquare className={cn("size-6", twoFaMethod === "sms" ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("block text-sm font-semibold", twoFaMethod === "sms" ? "" : "text-muted-foreground")}>SMS Verification</span>
                  <span className="text-xs text-muted-foreground">Receive a 6-digit code via text message.</span>
                  {twoFaMethod === "sms" && (
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-white text-xs">✓</span>
                  )}
                </button>
              </div>
            </div>

            {/* QR / SMS setup panel */}
            <div className="space-y-6 rounded-xl border border-border p-6 md:p-7">
              {twoFaMethod === "app" ? (
                <>
                  <h3 className="font-semibold">Scan QR Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Scan this code with your authenticator app. If you can&apos;t scan it, enter the secret key manually:
                  </p>
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
                    {/* QR placeholder */}
                    <div className="flex size-36 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <QrCode className="size-16 text-muted-foreground/50" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide">Secret Key</p>
                        <code className="block rounded-lg bg-muted px-3 py-2 font-mono text-sm tracking-widest">
                          JB5W Y3DP EBLK K3PZ
                        </code>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide">Verification Code</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Input placeholder="000 000" className="font-mono tracking-widest" />
                          <Button className="rounded-xl px-5 shadow-none">Verify</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-semibold">SMS Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your mobile number to receive verification codes via SMS.
                  </p>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="phone">Mobile Number</Label>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="flex-1" />
                        <Button className="rounded-xl px-5 shadow-none">Send Code</Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="sms-code">Verification Code</Label>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Input id="sms-code" placeholder="000 000" className="font-mono tracking-widest" />
                        <Button className="rounded-xl px-5 shadow-none">Verify</Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: recovery codes */}
          <div className="space-y-5">
            <div className="space-y-5 rounded-xl border border-border p-5 md:p-6">
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">Recovery Codes</h3>
                <p className="text-xs text-muted-foreground">
                  In case you lose your device, these codes will allow you to access your account. Keep them in a safe place.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {RECOVERY_CODES.map((code) => (
                  <code key={code} className="rounded-md bg-muted px-2 py-1.5 text-center font-mono text-xs tracking-wide">
                    {code}
                  </code>
                ))}
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full rounded-xl text-xs gap-2 h-9 shadow-none">
                  <Download className="size-3.5" /> Download PDF
                </Button>
                <Button variant="outline" className="w-full rounded-xl text-xs gap-2 h-9 shadow-none">
                  <Copy className="size-3.5" /> Copy All Codes
                </Button>
              </div>

              <div className="space-y-1 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <p className="text-xs font-semibold text-yellow-800">Warning</p>
                <p className="text-xs text-yellow-700">
                  Recovery codes can only be used once. After using a code, it will be marked as invalid.
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-border p-5 md:p-6">
              <h3 className="text-sm font-semibold">Security Support</h3>
              <p className="text-xs text-muted-foreground">Need help setting up your high-security monitoring access?</p>
              <Link href="/support" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                Contact Security Team →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-col gap-4 border-t border-border bg-background px-4 py-4 md:px-6 md:py-5 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <button
            type="button"
            onClick={() => router.push("/orientation/welcome")}
            className="hover:text-foreground"
          >
            Setup later
          </button>
          <span>·</span>
          <Link href="/settings/access" className="hover:text-foreground">Privacy Settings</Link>
        </div>
        <Button
          className="rounded-xl h-11 px-8 shadow-none"
          onClick={() => router.push("/orientation/welcome")}
        >
          Complete Setup
        </Button>
      </div>
    </main>
  );
}
