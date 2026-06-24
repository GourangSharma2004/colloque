## PharmaCommute / PharmaFlow – Project Overview

This document captures the current state of the PharmaCommute system: tech stack, architecture, file structure, implemented features, and known gaps/TODOs.

---

## 1. High‑Level Overview

- **Domain**: Pharmaceutical inventory and quality management (batches, cold-chain, recalls, audits, etc.).
- **Architecture**: Monorepo-style layout with:
  - **Frontend**: Next.js 14 app under `apps/web` (React 18, App Router, Tailwind CSS, Radix UI primitives, Zustand state).
  - **Backend API**: NestJS application under `apps/api` with modular domain structure and Prisma-based database access.
- **Key goals**:
  - Centralized, role-based dashboard for pharma operations.
  - Strong auditability, tenant isolation, and configurable security.
  - Clear separation between UI, API, and database layers.

---

## 2. Tech Stack

### 2.1 Frontend (apps/web)

- **Framework**: Next.js `14.0.4` (App Router).
- **Language**: TypeScript.
- **Rendering**: React 18, client/server components.
- **Styling**:
  - Tailwind CSS `^3.3.0` and `tailwindcss-animate`.
  - Global styles in `src/app/globals.css`.
  - Design language: modern SaaS-styled UI with light/dark mode support.
- **Component primitives**:
  - Radix UI:
    - `@radix-ui/react-dialog`
    - `@radix-ui/react-dropdown-menu`
    - `@radix-ui/react-label`
    - `@radix-ui/react-popover`
    - `@radix-ui/react-select`
    - `@radix-ui/react-slot`
  - Utility libraries:
    - `class-variance-authority`, `clsx`, `tailwind-merge`.
  - Icon set:
    - `lucide-react` for consistent iconography.
- **State management**:
  - `zustand` for global client-side state:
    - `src/store/auth-store.ts` – authentication and permissions.
    - `src/store/preferences-store.ts` – UI/user preferences (e.g. theme).
- **Routing**:
  - Next.js App Router under `src/app`:
    - Auth routes under `src/app/auth/...`
    - Dashboard routes under `src/app/(dashboard)/...`
- **Tooling**:
  - ESLint (`eslint`, `eslint-config-next`).
  - TypeScript `^5`.
  - PostCSS + Autoprefixer.

### 2.2 Backend API (apps/api)

- **Framework**: NestJS (modular, dependency-injection-based Node.js framework).
- **Language**: TypeScript.
- **Configuration & environment**:
  - `@nestjs/config` for configuration management.
  - Configuration sources loaded in `app.module.ts`:
    - `databaseConfig`
    - `authConfig`
    - `appConfig`
- **Database**:
  - Prisma service (`database/prisma.service.ts`) suggests:
    - DB: relational database (e.g. PostgreSQL/MySQL – actual provider defined in Prisma schema, not visible in this snapshot).
    - Centralized connection & query layer via Nest module `DatabaseModule`.
- **Core Nest modules** (from `apps/api/src/app.module.ts`):
  - **Infrastructure / core**:
    - `DatabaseModule`
    - `AuditModule`
    - `EventsModule`
  - **Auth & identity**:
    - `AuthModule`
    - `UsersModule`
    - `TenantsModule`
  - **Master data**:
    - `ProductsModule`
    - `WarehousesModule`
    - `SuppliersModule`
    - `CustomersModule`
  - **Core business logic**:
    - `BatchesModule`
    - `InventoryModule`
    - `QualityModule`
    - `RecallsModule`
  - **Supporting services**:
    - `FilesModule`
- **Global guards & interceptors** (applied via `APP_GUARD` and `APP_INTERCEPTOR` in `AppModule`):
  - `JwtAuthGuard` – authentication using JWT.
  - `TenantGuard` – enforces tenant context for multi-tenancy.
  - `RolesGuard` – role-based access control (RBAC).
  - `AuditInterceptor` – logs operations for compliance and traceability.

### 2.3 Cross‑Cutting Concerns

- **Authentication & authorization**:
  - Frontend uses `auth-store` (Zustand) to store authenticated user, role, and permissions.
  - Backend uses JWT-based auth + guards to enforce auth, tenant, and roles for every request.
- **Multi-tenancy**:
  - `TenantGuard` and `TenantsModule` indicate that all core operations are tenant-scoped.
- **Audit logging**:
  - `AuditModule` and `AuditInterceptor` provide global audit logging.
  - Several frontend TODOs mention “save to backend with audit logging”, ensuring business changes are auditable.

---

## 3. Repository & File Structure

> Note: Some files may be hidden by tooling configuration; this section reflects the structure visible within the current workspace.

### 3.1 Top-Level Layout

- `apps/`
  - `web/` – Next.js frontend application.
  - `api/` – NestJS backend application (source under `apps/api/src`).
- `PROJECT_OVERVIEW.md` – this document (high‑level project overview).
- Additional project-level configuration files (e.g. root `package.json`, `nest-cli.json`, Prisma schema, etc.) may exist but are not visible within the current Cursor workspace snapshot.

### 3.2 Frontend – apps/web

- **Configuration & tooling**:
  - `apps/web/package.json` – Next.js app definition and scripts:
    - `dev` – `next dev`
    - `build` – `next build`
    - `start` – `next start`
    - `lint` – `next lint`
  - `apps/web/tsconfig.json` – TypeScript configuration.
  - `apps/web/tailwind.config.js` – Tailwind configuration.
  - `apps/web/postcss.config.js` – PostCSS setup.
  - `apps/web/next.config.js` – Next.js configuration.
  - `apps/web/vercel.json` – Vercel deployment config (if used).
  - `apps/web/next-env.d.ts` – Next.js TS types.
  - `apps/web/public/README-LOGO.md` – docs related to logo/branding.

- **App router & pages (`apps/web/src/app`)**:
  - **Global layout and styling**:
    - `layout.tsx` – root layout for the entire Next.js app (wraps all pages).
    - `globals.css` – global Tailwind-based styles.
    - `global-error.tsx`, `error.tsx` – error boundaries for the app.
    - `not-found.tsx` – 404 page.
    - `loading.tsx` – root loading UI.
  - **Public / marketing / entry**:
    - `page.tsx` – `/` home page:
      - Simple landing page titled “PharmaCommute System – Pharmaceutical Inventory Management System”.
      - Buttons to `/auth/login` and `/dashboard`.
  - **Authentication**:
    - `auth/login/page.tsx` – login page at `/auth/login`.
  - **Dashboard shell and routes** (grouped under `(dashboard)`):
    - `(dashboard)/layout.tsx`:
      - Wraps all dashboard routes with:
        - `AuthGuard` (only authenticated access).
        - `DashboardLayout` (sidebar + topbar + scrollable content).
    - `(dashboard)/dashboard/page.tsx`:
      - Main dashboard overview with:
        - Welcome header (user name, role, tenant).
        - High-level inventory stats (total batches, near expiry, quarantine, available).
        - “Quick Actions” card based on permissions.
        - “Recent Activity” card showing recent events (e.g., release, temperature excursions).
    - Other dashboard feature routes (all under `/dashboard/...`):
      - Inventory & operations:
        - `(dashboard)/dashboard/inventory/page.tsx`
        - `(dashboard)/dashboard/quality/page.tsx`
        - `(dashboard)/dashboard/cold-chain/page.tsx`
        - `(dashboard)/dashboard/procurement/page.tsx`
        - `(dashboard)/dashboard/sales/page.tsx`
        - `(dashboard)/dashboard/recalls/page.tsx`
        - `(dashboard)/dashboard/reports/page.tsx`
        - `(dashboard)/dashboard/audit/page.tsx`
        - `(dashboard)/dashboard/documents/page.tsx`
      - Settings & configuration:
        - `(dashboard)/dashboard/settings/page.tsx`
        - `(dashboard)/dashboard/settings/profile/page.tsx`
        - `(dashboard)/dashboard/settings/organization/page.tsx`
        - `(dashboard)/dashboard/settings/user-access/page.tsx`
        - `(dashboard)/dashboard/settings/security/page.tsx`
        - `(dashboard)/dashboard/settings/system-security/page.tsx`
        - `(dashboard)/dashboard/settings/inventory-rules/page.tsx`
        - `(dashboard)/dashboard/settings/cold-chain/page.tsx`
        - `(dashboard)/dashboard/settings/master-data-governance/page.tsx`
        - `(dashboard)/dashboard/settings/approval-workflows/page.tsx`
        - `(dashboard)/dashboard/settings/notifications/page.tsx`
        - `(dashboard)/dashboard/settings/integrations/page.tsx`
      - Misc:
        - `test/page.tsx` – test page(s) for experimentation.

- **Frontend components (`apps/web/src/components`)**:
  - **Layout**:
    - `layout/dashboard-layout.tsx` – main shell: sidebar + topbar + scrollable content area.
    - `layout/sidebar.tsx` – navigation sidebar for dashboard.
    - `layout/topbar.tsx` – top bar with user info, actions, etc.
  - **Auth**:
    - `auth/auth-guard.tsx` – wraps protected routes/components, enforcing authentication based on `auth-store`.
  - **UI primitives (`ui/` – built on top of Radix + Tailwind)**:
    - `button.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `badge.tsx`, `card.tsx`, `table.tsx`, `alert.tsx`.
    - `dialog.tsx`, `dropdown-menu.tsx`, `popover.tsx`, `select.tsx`, `tabs.tsx`, `sheet.tsx`, `switch.tsx`.
  - **Inventory UI**:
    - `inventory/batch-table.tsx` – table view for batches.
    - `inventory/fefo-indicator.tsx` – FEFO (First-Expired, First-Out) indicator component.
    - `inventory/batch-status-badge.tsx` – status badge for batches.
  - **User & notifications**:
    - `user/UserProfilePopover.tsx` – user profile popover in the topbar.
    - `notifications/notification-dropdown.tsx` – in-app notifications dropdown (includes a TODO to call backend API to acknowledge notifications).
  - **Theme**:
    - `theme-provider.tsx` – wraps app with theme context / dark-light mode control.

- **Frontend state & types**:
  - `store/auth-store.ts` – auth and permissions store (role-based permissions such as `canCreateInventory`, `canPerformQC`, `canApproveQC`, `canReleaseBatch`, `canViewAudit`).
  - `store/preferences-store.ts` – UI preferences (e.g., theme, layout settings).
  - `types/auth.ts` – types for auth-related entities.
  - `types/inventory.ts` – types for inventory domain entities.
  - `lib/permissions.ts` – mapping of roles to display names and permissions (`ROLE_DISPLAY_NAMES`, etc.).
  - `lib/utils.ts` – general frontend utilities.

### 3.3 Backend – apps/api

> Only part of the backend source tree is visible in the current workspace; the structure below focuses on the files we can see explicitly.

- **Core module**:
  - `src/app.module.ts` – central NestJS module wiring:
    - Imports all feature and infrastructure modules.
    - Registers global guards (`JwtAuthGuard`, `TenantGuard`, `RolesGuard`) and global interceptor (`AuditInterceptor`).
- **Database**:
  - `src/database/database.module.ts` – database module.
  - `src/database/prisma.service.ts` – Prisma service responsible for DB interactions and connection management.
- **Common decorators & guards**:
  - `src/common/decorators/public.decorator.ts` – marks public routes (likely bypassing auth guard).
  - `src/common/decorators/roles.decorator.ts` – attaches required roles/permissions metadata to routes.
  - `src/common/guards/jwt-auth.guard.ts` – JWT auth guard.
  - `src/common/guards/roles.guard.ts` – role-based access control.
  - `src/common/guards/tenant.guard.ts` – tenant context guard for multi-tenancy.
  - `src/common/interceptors/audit.interceptor.ts` – interceptor to log/audit requests and responses.
- **Inventory module**:
  - `src/modules/inventory/inventory.module.ts`
  - `src/modules/inventory/inventory.controller.ts` – HTTP API endpoints for inventory operations.
  - `src/modules/inventory/inventory.service.ts` – business logic for inventory.
  - `src/modules/inventory/dto/inventory.dto.ts` – DTOs (data transfer objects) for inventory API.
- **Audit module**:
  - `src/modules/audit/audit.module.ts`
  - `src/modules/audit/audit.controller.ts` – HTTP endpoints for audit logs.
  - `src/modules/audit/audit.service.ts` – audit log creation and retrieval.

Other modules referenced in `app.module.ts` (auth, users, tenants, products, warehouses, suppliers, customers, batches, quality, recalls, files, events) are assumed to be present in the full repository, but are not visible inside the current Cursor workspace snapshot.

---

## 4. Current Feature Progress

This section summarizes what appears to be implemented vs. still in progress, based on the existing code and TODO markers.

### 4.1 Frontend Feature Status

**Implemented / partially implemented:**

- **Routing & shell**
  - Global app layout + error/loading states are in place.
  - Dashboard layout with fixed sidebar and sticky topbar is implemented and fully styled.
  - Route grouping under `(dashboard)` is used to apply `AuthGuard` + `DashboardLayout` to all dashboard routes.

- **Authentication (frontend)**
  - Login screen exists under `/auth/login`.
  - `auth-store` (Zustand) stores authenticated user info, tenant, and role.
  - `AuthGuard` wraps dashboard routes and blocks unauthenticated access.

- **Dashboard overview**
  - Welcome message with user name, role, and tenant.
  - High-level inventory stats (mock data for now: total batches, near expiry, quarantine, available).
  - Quick Actions list derived from permissions (create movement, perform QC, approve QC, release batches, view audit).
  - Recent Activity list, currently using mocked/static data to illustrate event stream.

- **Inventory UI**
  - Batch table, FEFO indicator, batch status badge components are implemented.
  - Screens for inventory/quality/cold-chain/recalls/etc. exist as pages; they likely still use stubbed data or UI‑only implementations in some areas.

- **Settings UI**
  - Multiple settings pages implemented as UI:
    - Organization profile settings.
    - User access & role management.
    - Security/system security.
    - Inventory rules and master data governance.
    - Cold-chain settings.
    - Approval workflows and notifications.
    - Integrations settings.
  - Several of these pages include TODO comments like:
    - “Save to backend with audit logging”
    - “Export audit logs functionality”
  - This indicates the UI is mostly built, but API integration for persistence and audit may still be pending.

- **Notifications & user profile**
  - Notification dropdown UI implemented with a TODO to connect the “acknowledge notification” action to the backend API.
  - User profile popover implemented in the topbar.

**Notable TODOs / in-progress items:**

- In `notification-dropdown.tsx`:
  - TODO: call backend API to acknowledge notifications.
- In multiple settings pages:
  - TODO: save changes to backend with audit logging (organization, system security, inventory rules, user access).
  - TODO: export audit logs functionality (integrations/user access related).

Overall, the frontend is **well-structured and visually complete** for the main dashboard and settings, with **backend integrations and persistence still being wired up** for some actions.

### 4.2 Backend Feature Status

Based on visible code:

- **App wiring & core infrastructure**
  - `AppModule` wires most required modules and global providers.
  - Global guards and audit interceptor are set up, indicating a strong foundation for security and compliance.
  - Database module & Prisma service exist, so DB integration is in place at the infrastructure level.

- **Inventory module**
  - Controller, service, and DTOs are present.
  - This suggests inventory endpoints are at least scaffolded and likely partially implemented.

- **Audit module**
  - Controller + service + interceptor are in place.
  - This supports audit logging and viewing audit trails.

- **Auth, users, tenants, master data, quality, recalls, files, events**
  - These modules are referenced in `AppModule` but their source files are not visible in the current workspace snapshot.
  - We can reasonably assume:
    - Auth module handles login, JWT issuance, and refresh logic.
    - Users/Tenants manage tenant-scoped user accounts and organizations.
    - Products/Warehouses/Suppliers/Customers define master data for inventory operations.
    - Batches/Quality/Recalls handle core GMP/GDP processes.
    - Files/Events manage documents and event streaming or domain events.

Because many frontend UI actions still have “save to backend” TODOs, there is likely **ongoing work to connect the frontend settings and operations screens to these backend endpoints**.

---

## 5. How to Run the System Locally

> The exact backend start command is not visible in this workspace snapshot. The frontend commands below are confirmed from `apps/web/package.json`. Backend commands should follow standard NestJS patterns (`npm run start:dev` etc.) from the appropriate package.

### 5.1 Frontend (Next.js)

From the project root:

```bash
cd apps/web
npm install
npm run dev
```

Then open:

- `http://localhost:3000/` – home page.
- `http://localhost:3000/auth/login` – login page.
- `http://localhost:3000/dashboard` – main dashboard (requires auth, depending on implementation).

### 5.2 Backend (NestJS)

Typical pattern (actual scripts may live in a root `package.json` or within `apps/api`):

```bash
# Example / likely pattern (adjust to actual package.json)
cd apps/api
npm install
npm run start:dev
```

Once running, the API will usually listen on a port like `http://localhost:3001` or `http://localhost:3000` (depending on configuration).

Integration between frontend and backend typically happens via:

- REST endpoints (e.g. `/api/inventory`, `/api/audit`, etc.).
- Secured with JWT in `Authorization` headers.

---

## 6. Design Principles & Non‑Functional Requirements

From the current code structure, the following principles appear to guide the design:

- **Security first**:
  - Global JWT, tenant, and role guards on the API.
  - Clear separation between public and protected routes on the backend via decorators.
  - AuthGuard on frontend routes to prevent unauthorized dashboard access.
- **Auditability & compliance**:
  - Global `AuditInterceptor` for every backend request.
  - Dedicated `AuditModule` and audit pages in the dashboard.
  - TODOs around “save to backend with audit logging” in configuration screens.
- **Multi-tenancy**:
  - Tenant guard and tenant module indicate multi-tenant aware design.
  - Frontend clearly displays tenant context for the logged-in user.
- **Modularity & scalability**:
  - Backend split into feature modules (inventory, quality, recalls, master data).
  - Frontend split into route groups and feature-specific components.
  - UI primitives (`ui` components) reused across the app.
- **UX & consistency**:
  - Shared layout (`DashboardLayout`) with sidebar/topbar.
  - Consistent typography and spacing via Tailwind.
  - Icons sourced from a unified icon library (lucide).

---

## 7. Known Gaps & Next Steps

Based on TODOs and current structure, likely next steps include:

1. **Wire up frontend settings to backend APIs**:
   - Implement API calls for:
     - Organization settings.
     - System security and inventory rules configurations.
     - User access management.
     - Integrations settings.
   - Ensure changes are persisted and audited (via `AuditModule`).

2. **Complete notifications integration**:
   - Implement backend endpoints to fetch notifications.
   - Wire “acknowledge notification” action from `notification-dropdown.tsx` to the API.

3. **Expose and document API endpoints**:
   - Provide OpenAPI/Swagger docs for inventory, audit, auth, and other modules.
   - Align frontend calls with final endpoint contracts.

4. **Finalize auth flow**:
   - Confirm login flow + token storage strategy on the frontend (HTTP-only cookies vs. local storage).
   - Ensure token refresh/expiry handling and logout behavior.

5. **Expand test coverage**:
   - Unit tests for critical backend services (inventory, audit, auth).
   - Integration tests for key flows (batch lifecycle, audit log recording, recalls).
   - E2E tests for main dashboard workflows.

6. **Hardening & performance**:
   - Add rate limiting, input validation, and secure headers on the API.
   - Optimize frequently used queries (inventory and dashboard stats).
   - Consider caching frequently-accessed master data (products, warehouses).

---

## 8. Summary of Progress to Date

- A **robust skeleton** for both frontend and backend is in place:
  - Frontend: fully themed, role-aware dashboard UI with multiple functional pages.
  - Backend: Nest modules, database integration, global guards, and audit interceptor.
- **Core domain concepts** (inventory, audit, quality, recalls, master data) are represented at both API and UI levels.
- **Security, multi-tenancy, and auditability** are first-class concerns in the architecture.
- Remaining work focuses mostly on:
  - Wiring UI actions to backend APIs.
  - Completing module implementations and tests.
  - Hardening, documentation, and performance tuning.

This document should be kept up to date as new modules, routes, and integrations are added.

