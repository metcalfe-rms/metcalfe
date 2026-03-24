---
name: nextjs-shadcn-expert
description: "Expert Next.js + shadcn/ui development assistant. Use this skill whenever the user mentions Next.js, shadcn/ui, React components, app router, server actions, TypeScript React projects, or wants to build modern web applications. Handles component generation, configuration setup, TypeScript integration, RSC patterns, form handling, state management, styling, accessibility, and deployment. Automatically applies shadcn/ui best practices, dark mode support, and performant patterns."
compatibility: "Requires Node.js 18+, npm/yarn/pnpm/bun, TypeScript understanding"
---

# Next.js + shadcn/ui Expert Skill

Master modern full-stack React development with Next.js 14+ and shadcn/ui components. This skill automates the entire development workflow.

## Quick Start

### Project Setup

When starting a new Next.js + shadcn project:

```bash
# Create the project
npx create-next-app@latest my-app --typescript --tailwind --app --eslint --src-dir --import-alias '@/*'

# Navigate and add shadcn/ui
cd my-app
npx shadcn-ui@latest init -d  # Default theme

# Install common components
npx shadcn-ui@latest add button card input form select dialog sheet toast
```

### Project Structure

```
src/
├── app/                    # App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── [slug]/            # Dynamic routes
├── components/
│   ├── ui/                # shadcn components (auto-generated)
│   ├── forms/             # Form wrappers
│   ├── features/          # Feature components
│   └── layout/            # Layout components
├── lib/
│   ├── utils.ts           # Utilities (cn() for classnames)
│   ├── hooks.ts           # Custom hooks
│   └── api-client.ts      # API helpers
├── types/
│   └── index.ts           # Shared TypeScript types
├── styles/
│   └── globals.css        # Global styles
└── middleware.ts          # Next.js middleware
```

## Core Patterns

### 1. Server Components (Default in App Router)

```typescript
// app/page.tsx - Server Component by default
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const data = await fetchData() // Direct DB access

  return (
    <div>
      <h1>{data.title}</h1>
      <ClientButton /> {/* Must be 'use client' */}
    </div>
  )
}
```

### 2. Client Components

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ClientButton() {
  const [count, setCount] = useState(0)

  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  )
}
```

### 3. Forms with shadcn + React Hook Form + Zod

```typescript
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

type FormValues = z.infer<typeof formSchema>

export function ProfileForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify(values),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### 4. Server Actions

```typescript
"use server";

import { db } from "@/lib/db";

export async function createPost(formData: FormData) {
  const title = formData.get("title");

  const post = await db.post.create({
    data: { title: String(title) },
  });

  revalidatePath("/posts");
  return post;
}
```

### 5. Custom Hooks

```typescript
// lib/hooks.ts
"use client";

import { useState, useCallback } from "react";

export function useAsync<T>(asyncFunction: () => Promise<T>) {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setStatus("error");
    }
  }, [asyncFunction]);

  return { execute, status, data, error };
}
```

### 6. API Routes

```typescript
// app/api/posts/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await db.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const data = await request.json();
  const post = await db.post.create({ data });
  return NextResponse.json(post, { status: 201 });
}
```

### 7. Middleware

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
```

## shadcn/ui Best Practices

### 1. Dark Mode

```typescript
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout() {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Your content */}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Using cn() for Class Composition

```typescript
import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-6',
        className
      )}
      {...props}
    />
  )
}
```

### 3. Component Composition

```typescript
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function ConfirmDialog({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogContent>
    </Dialog>
  )
}
```

### 4. Toast Notifications

```typescript
'use client'

import { useToast } from '@/components/ui/use-toast'

export function ToastExample() {
  const { toast } = useToast()

  const handleSuccess = () => {
    toast({
      title: 'Success!',
      description: 'Operation completed successfully.',
    })
  }

  return <button onClick={handleSuccess}>Show Toast</button>
}
```

## Configuration Files

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
```

## Testing Setup

### Jest Configuration

```typescript
// jest.config.ts
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
```

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

## Deployment

### Vercel (Recommended)

```bash
# Connect GitHub repo to Vercel
# Environment variables:
DATABASE_URL=...
API_KEY=...

# Deploy
vercel deploy
```

### Docker Deployment

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance Optimization

### 1. Image Optimization

```typescript
import Image from 'next/image'

export function OptimizedImage() {
  return (
    <Image
      src="/photo.jpg"
      alt="Description"
      width={800}
      height={600}
      priority // For above-the-fold images
    />
  )
}
```

### 2. Dynamic Imports

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/heavy'), {
  loading: () => <div>Loading...</div>,
})
```

### 3. Route Caching

```typescript
// app/posts/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function PostsPage() {
  const posts = await fetch('...', { next: { revalidate: 3600 } })
  return <>{posts}</>
}
```

## Common Patterns

### Data Fetching Wrapper

```typescript
// lib/api-client.ts
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
```

### Protected Routes

```typescript
// lib/auth.ts
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (err) {
    return null;
  }
}
```

## When to Use This Skill

✅ **Use this skill for:**

- Creating new Next.js projects with TypeScript + shadcn/ui
- Building shadcn components into existing projects
- Setting up forms with validation (Zod + React Hook Form)
- Implementing Server Components and Server Actions
- Creating API routes and middleware
- Dark mode implementation
- Component composition and reusable patterns
- Performance optimization (images, code splitting, caching)
- Testing setup (Jest, React Testing Library)
- Deployment configuration (Vercel, Docker)

## Dependencies to Install

```bash
npm install next react react-dom typescript
npm install -D tailwindcss postcss autoprefixer typescript @types/react @types/node
npm install @hookform/resolvers react-hook-form zod
npm install next-themes clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-form # etc. (auto-installed by shadcn)
```

## Quick Commands Reference

```bash
# Initialize shadcn in project
npx shadcn-ui@latest init

# Add components
npx shadcn-ui@latest add [component-name]

# List available components
npx shadcn-ui@latest list

# Development
npm run dev         # Start dev server
npm run build       # Production build
npm start           # Run production build
npm test            # Run tests
npm run lint        # Run ESLint

# Add specific component
npx shadcn-ui@latest add button card form input dialog sheet
```

---

**Pro Tips:**

- Always use TypeScript strict mode for better DX
- Leverage Server Components for better performance
- Use shadcn/ui's Radix UI primitives for accessible components
- Test components before deploying
- Keep components small and composable
- Use Tailwind's utility classes for consistent styling
