# TMSRendon Foundation: Supabase Auth + Branding + Backend Wiring

## Approved Approach
SSR-ready foundation (Approach 2).

## Goal
Replace the placeholder "Acme Inc." / "shadcn" branding with TransRendon/TMSRendon assets, and wire Supabase email/password authentication end-to-end:

```
Next.js App Router (SSR)
       ↓
Supabase Auth (email/password)
       ↓
NestJS API (JWT validation via Supabase JWKS)
       ↓
PostgreSQL/Supabase via Prisma
```

## Branding
- System name: **TMSRendon**
- Company name: **TransRendon**
- `frontend-tms/public/Logo.jpeg` — displayed on login and signup pages.
- `frontend-tms/public/TR.png` — used as the dashboard sidebar header / hero background.

## Frontend

### Dependencies
- `@supabase/supabase-js`
- `@supabase/ssr`

### New files
- `lib/supabase/client.ts` — browser client for auth actions.
- `lib/supabase/server.ts` — server-component client for SSR reads.
- `lib/supabase/middleware.ts` — session refresh + route protection.
- `frontend-tms/middleware.ts` — top-level middleware that guards `/dashboard` and redirects `/`.

### Updated files
- `app/login/page.tsx` and `app/signup/page.tsx`:
  - Show `Logo.jpeg` above the auth card.
  - Replace "Acme Inc." with "TransRendon" / "TMSRendon" copy.
- `components/login-form.tsx` and `components/signup-form.tsx`:
  - Handle email/password submission through Supabase Auth.
  - Redirect to `/dashboard` on success.
  - Show errors via `sonner`.
- `components/app-sidebar.tsx`:
  - Replace "Acme Inc." branding with "TMSRendon".
  - Use `TR.png` as the sidebar header background.
  - Display the authenticated user's email in `NavUser`.
- `components/nav-user.tsx`:
  - Add a logout action that calls Supabase `signOut()`.
- `app/dashboard/page.tsx`:
  - Server-fetch the current user via the server Supabase client.
  - Show a welcome message with the user's email.

### Route behavior
- Unauthenticated users hitting `/dashboard` are redirected to `/login`.
- Authenticated users hitting `/login` or `/signup` are redirected to `/dashboard`.
- `/` redirects to `/dashboard` for authenticated users and `/login` for unauthenticated users.

## Backend

### Dependencies
- `@nestjs/config`
- `@nestjs/swagger`
- `class-validator`
- `class-transformer`
- `@prisma/client`
- `@nestjs/passport`
- `passport`
- `passport-jwt`
- `jwks-rsa`

### New modules / files
- `prisma/prisma.module.ts` + `prisma/prisma.service.ts` — Prisma client lifecycle.
- `config/config.module.ts` — loads `.env` with validation.
- `supabase/supabase.module.ts` + `supabase/supabase.service.ts` — admin/service client.
- `auth/auth.module.ts`:
  - `SupabaseJwtStrategy` — validates access tokens using Supabase JWKS.
  - `SupabaseJwtAuthGuard` — global guard.
- `auth/auth.controller.ts`:
  - `GET /auth/me` — protected route returning current JWT claims.

### Updated files
- `src/main.ts`:
  - Enable global `ValidationPipe`.
  - Enable CORS for the frontend origin.
  - Serve Swagger OpenAPI docs at `/api/docs`.
  - Listen on `PORT` env var (default `8080`).
- `src/app.module.ts`:
  - Import `ConfigModule`, `PrismaModule`, `AuthModule`.

## Database
- Use the existing Prisma schema in `prisma/schema.prisma`.
- `DATABASE_URL` must point to the Supabase/Postgres instance.
- Run `prisma generate` and `prisma db push` to sync the client and schema.
- User profile sync from `auth.users` to `public.User` is **out of scope** for this foundation; it will be handled in a follow-up focused on multi-tenant onboarding.

## Environment Variables

### Root `.env`
```env
DATABASE_URL="postgresql://..."
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

### Backend `.env`
```env
PORT=8080
DATABASE_URL="postgresql://..."
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_JWT_ISSUER=https://<project>.supabase.co/auth/v1
SUPABASE_JWT_AUDIENCE=authenticated
```

## Verification Checklist
- [ ] `pnpm dev` in `frontend-tms` shows the TransRendon logo on `/login`.
- [ ] Sign up creates a user in Supabase Auth.
- [ ] Login redirects to `/dashboard`.
- [ ] Dashboard displays the user's email and the `TR.png` sidebar styling.
- [ ] `pnpm run start:dev` in `backend-tms` serves Swagger at `/api/docs`.
- [ ] `GET /api/auth/me` with a valid Bearer token returns the current user claims.
- [ ] Unauthenticated requests to `/api/auth/me` return `401 Unauthorized`.
- [ ] Frontend typecheck passes (`pnpm run typecheck`).
- [ ] Backend tests pass (`pnpm run test`).
