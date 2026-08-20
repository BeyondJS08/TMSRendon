# CLAUDE.md

## TMSRendon (TMS + ERP + IMS)
**TMSRendon** is an enterprise-grade Transportation Management System (TMS), Enterprise Resource Planning (ERP) and Inventory Management System (IMS) built specifically for a trucking company in Mexico named TransRendon (Trucks, tortons, and heavy transport units).

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
- 
## AI Code Agent Guidelines
To coordinate efficiently between human developers and AI Code Agents, please refer to **[AGENTS.md](file:///home/bjs/Repositories/TMSRendon/AGENTS.md)**. 
*   **Code Style:** Keep standard TypeScript styles, maintain validation decorators, and ensure that new modules are fully self-contained.
*   **Integrity:** Always preserve existing comments, structure, and type mappings unless explicitly told otherwise.