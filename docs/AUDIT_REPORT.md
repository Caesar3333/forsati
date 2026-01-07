## Forsati Repo Audit Report (EN)

### Summary
- Repo builds a multi-service stack (Django, Next.js, FastAPI, Redis, Postgres, MinIO, Nginx) but several MVP requirements are not yet met.
- No merge conflict markers found in `.env.example`, `docker-compose.yml`, `docker-compose.prod.yml`, or `README.md`.
- Frontend uses `/[lang]` routes and middleware redirects `/` to `/ar`, which conflicts with required path list and 200 response for `/`.
- Backend lacks RBAC implementation, marketplace/provider flows, and seed command. Embeddings migration does not match models.
- Branding assets and public folder are missing in `apps/web-frontend/public`.

### Services & Ports (from docker-compose.yml)
- nginx: `80` (proxy for `/`, `/api`, `/ai`, `/resume`, `/interview`)
- web-frontend (Next.js): `3000`
- forsati-core (Django): `8000`
- ai-orchestrator (FastAPI): `8003`
- resume-service (Node stub): `3001`
- interview-service (Node stub): `3002`
- postgres (pgvector): `5432`
- redis: `6379`
- minio: `9000` (API), `9001` (console)
- mailhog: `1025` (SMTP), `8025` (UI)

### Env Vars by Service
Global/root:
- `COMPOSE_PROJECT_NAME`, `DOMAIN`, `NGINX_HTTP_PORT`, `NGINX_HTTPS_PORT`

postgres:
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`

redis:
- `REDIS_PORT`

minio:
- `MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`, `MINIO_PORT`, `MINIO_CONSOLE_PORT`

mailhog:
- `MAILHOG_SMTP_PORT`, `MAILHOG_UI_PORT`

forsati-core (Django):
- `DJANGO_SETTINGS_MODULE`, `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`
- `DATABASE_URL`, `REDIS_URL`
- `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS`
- `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_USE_SSL`
- `DJANGO_PORT`

ai-orchestrator:
- `APP_PORT`, `OPENAI_API_KEY`, `REQUEST_LOG_LEVEL`, `AI_PORT`

web-frontend:
- `NEXT_PUBLIC_API_BASE`, `NEXT_PUBLIC_AI_BASE`, `NEXT_PUBLIC_SITE_URL`, `WEB_PORT`

resume-service:
- `PORT`, `RESUME_PORT`

interview-service:
- `PORT`, `INTERVIEW_PORT`

nginx:
- `NGINX_HTTP_PORT`, `NGINX_HTTPS_PORT` (prod)

### Missing / Incomplete Areas
- `apps/peeljobs-core/organizations/` is empty (no models/urls/logic for org teams or invites).
- Branding assets not present: `apps/web-frontend/public/brand/forsati/*` required by spec.
- `scripts/run-local.sh` / `scripts/run-local.ps1` referenced in README are missing (only `dev-up.sh` / `dev-down.sh` exist).
- `docs/LOCAL_RUNBOOK.md`, `docs/LOCAL_RUNBOOK_XAMPP.md`, `docs/ENV_TEMPLATE.md`, `docs/RBAC_MATRIX.md`, `docs/ROUTES_MAP.md`, `docs/GITHUB_PUBLISH.md` are missing.
- ai-orchestrator lacks required endpoints (`/ai/cv/*`, `/ai/interview/*`, `/ai/match`) and stub responses.
- Frontend does not provide required routes (`/auth/*`, `/app/*`, `/legal/*`) and middleware forces `/` redirect.
- Arabic strings are garbled in multiple files (encoding issue in Next.js and Django templates).
- `apps/peeljobs-core/embeddings` migration does not match current models (VectorField models diverged).

### Merge Conflicts
- No `<<<<<<<`, `=======`, `>>>>>>>` markers found in `.env.example`, `docker-compose.yml`, `docker-compose.prod.yml`, or `README.md`.

### Blocking Issues (Must Fix for MVP)
1) Root route `/` returns redirect (not 200) due to `apps/web-frontend/middleware.ts`.
2) Required route structure missing: `/pricing`, `/faq`, `/blog`, `/auth/*`, `/app/*`, `/legal/*`.
3) RBAC models/permissions not implemented in Django despite `configs/rbac/*`.
4) Marketplace/provider flows missing in backend (provider register/approval, services, orders).
5) Seed command `seed_forsati` missing.
6) Embeddings migration mismatch likely breaks `python manage.py migrate`.
7) Branding assets and metadata not updated; Arabic text appears corrupted.
8) ai-orchestrator endpoints missing for MVP.

### Recommended Fixes (Exact Paths)
- Update routing and i18n:
  - `apps/web-frontend/middleware.ts`
  - `apps/web-frontend/app/*` (add required routes)
  - `apps/web-frontend/components/*` (language switch + links)
- Fix branding/assets:
  - Create `apps/web-frontend/public/brand/forsati/*`
  - Update `apps/web-frontend/app/layout.tsx` metadata
- Align service naming in compose/nginx:
  - `docker-compose.yml`, `docker-compose.prod.yml`, `nginx/default.conf`, `nginx/prod.conf`
- Backend RBAC + marketplace + seed:
  - `apps/peeljobs-core/accounts/*` (roles/permissions)
  - `apps/peeljobs-core/jobs/*` (opportunity types + publish)
  - `apps/peeljobs-core/applications/*` (pipeline endpoints + permissions)
  - New apps or modules for provider/services/orders
  - New command: `apps/peeljobs-core/*/management/commands/seed_forsati.py`
- Fix embeddings migration:
  - `apps/peeljobs-core/embeddings/migrations/0001_initial.py` (or new migration)
- Implement AI endpoints:
  - `apps/ai-orchestrator/main.py`
- Docs/runbooks:
  - `docs/LOCAL_RUNBOOK.md`
  - `docs/LOCAL_RUNBOOK_XAMPP.md`
  - `docs/ENV_TEMPLATE.md`
  - `docs/RBAC_MATRIX.md`
  - `docs/ROUTES_MAP.md`
  - `docs/TESTING_PLAN.md` (update)
  - `docs/GITHUB_PUBLISH.md`
  - `docs/COMPLIANCE.md` (if any external code is vendored)
