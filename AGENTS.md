# AGENTS.md

## Technical Stack
- Frontend: Next.js + Tailwind + shadcn/ui + React Query
- Backend: NestJS + TypeScript
- Database: Supabase/PostgreSQL + PostGIS
- ORM: Prisma
- Caching: Redis + BullMQ
- Infrastructure: Docker/Podman, GitHub Actions
- Authentication: Supabase Auth
- Deployment: Vercel (Frontend) + VPS Ubuntu (Database, Backend and Caching)
- APIs: PAC API (Facturama), Samsara/Geotab API, CONTPAQi

## Architecture & Development Approach
- **Modular Monolith:** One repo. Separate domains by folders (`/modules/operations`, `/modules/hr`, `/modules/invoicing`, etc.). Share DB models but isolate business logic. Split to microservices later only if needed.
- **API-First Design:** RESTful endpoints with OpenAPI docs. All external integrations go through dedicated adapters (e.g., `SatAdapter`, `TelematicsAdapter`).
- **Event-Driven Async:** Redis queues for:
  - CFDI generation & SAT validation
  - GPS heartbeat processing
  - Payroll tax calculations
  - Maintenance alerts & parts inventory sync
- **Idempotency & Retries:** Every external API call must be idempotent. Implement exponential backoff + dead-letter queues.