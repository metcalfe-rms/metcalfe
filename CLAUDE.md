# CLAUDE.md — Metcalfe & Partners

> Update this file whenever structural changes are made to the codebase.

## Project Overview
Metcalfe & Partners is a construction site monitoring and access control platform. The web app currently covers authentication flows (login, registration, 2FA, password reset) with a planned dashboard for project monitoring.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Component Library**: shadcn/ui — components are local copies in `components/ui/`, not imported from an external package
- **Icons**: Lucide React
- **Primitives**: Radix UI (via `radix-ui` package)
- **Utilities**: `clsx` + `tailwind-merge` via `cn()` in `lib/utils.ts`

## File Structure
```
app/
  (auth)/                   # Route group — no layout wrapping
    login/page.tsx          # Re-exports login.tsx
    login.tsx               # Login page view
    register/page.tsx       # Re-exports register.tsx
    register.tsx            # 3-step registration wizard (client component)
    2fa/page.tsx            # Login 2FA verification page
    reset-password/page.tsx
    password-reset-successful/page.tsx
  layout.tsx                # Root layout (Inter font, metadata)
  page.tsx                  # Home — shows LoadingScreen, redirects to /login
  globals.css               # Tailwind imports + CSS custom properties (oklch)

assets/
  index.ts                  # Exports MetcalfeLogo (PNG) and MetcalfeLogoWhite (JPG)
  metcalfe-logo.png
  metcalfe-logo-white.jpg

components/
  auth/
    auth-shell.tsx          # Two-column full-screen layout wrapper for auth pages
  ui/                       # Local shadcn/ui component copies
    button.tsx, card.tsx, checkbox.tsx, input.tsx,
    label.tsx, progress.tsx, select.tsx, separator.tsx
  loading-screen.tsx        # Fullscreen logo + pulse animation

lib/
  utils.ts                  # cn() utility
```

## Key Patterns

### AuthShell
`components/auth/auth-shell.tsx` is the layout wrapper for login and the first two steps of registration. It renders a full-screen two-column grid:
- Left: dark blue gradient panel with Metcalfe logo, title, description (hidden on mobile)
- Right: white content area with `flex items-center justify-center`

Usage:
```tsx
<AuthShell title="..." description="..." badge="optional">
  {/* form content */}
</AuthShell>
```

### Client Components
All interactive auth pages use `"use client"` at the top. Server components (page.tsx re-exports) stay as server components — they simply re-export the client view.

### cn() Utility
Always use `cn()` from `@/lib/utils` for conditional Tailwind classes:
```tsx
import { cn } from "@/lib/utils";
className={cn("base-classes", condition && "conditional-class")}
```

### Asset Imports
```tsx
import { MetcalfeLogo, MetcalfeLogoWhite } from "@/assets";
// Use with next/image <Image src={MetcalfeLogo} alt="..." />
```

## Auth Flow

### Registration (3-step wizard in `register.tsx`)
1. **Step 1** — Choose Account Type (Administrator / Client / Contractor) inside AuthShell
2. **Step 2** — Fill details (name, company, email, role, password + strength indicator) inside AuthShell
3. **Step 3** — 2FA setup (Authenticator App or SMS, QR code, recovery codes) — custom full-screen layout, no AuthShell

### Login (`login.tsx`)
- Work email + password, "keep me signed in" checkbox
- OAuth: Google, Microsoft
- Link to register and forgot password
- Uses AuthShell

### Login 2FA (`2fa/page.tsx`)
- 6-digit OTP input
- Uses AuthShell

### Password Reset
- `reset-password/page.tsx` — custom layout (not AuthShell)
- `password-reset-successful/page.tsx` — success screen

## Design Conventions
- Full-screen layouts: no outer padding/grey wrappers, edge-to-edge
- No visible card borders on auth pages (`border-none` on `<Card>`)
- No border on `outline` button variant (border-transparent)
- Rounded inputs: `rounded-xl`
- Button height: `h-11` for primary CTAs
- Color theme: CSS custom properties in `globals.css` using oklch color space
- Primary color: dark blue (`--primary`)
- Gold accent used in logo (`& Partners` text)
