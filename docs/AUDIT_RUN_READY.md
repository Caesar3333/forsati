# Forsati Local Run Readiness Audit

Status legend:
- ✅ Ready
- ⚠️ Partial
- ❌ Missing or Blocker

## File Tree (important)
```
.
├─ apps/
│  ├─ ai-orchestrator/
│  │  ├─ Dockerfile
│  │  ├─ main.py
│  │  ├─ requirements.txt
│  │  └─ rbac/
│  ├─ mock-interview/            (empty)
│  ├─ openresume-service/        (empty)
│  ├─ peeljobs-core/
│  │  ├─ accounts/
│  │  ├─ applications/
│  │  ├─ embeddings/
│  │  ├─ jobs/
│  │  ├─ keywords/
│  │  ├─ verification/
│  │  ├─ data/keywords_bank.jo.*.json
│  │  ├─ manage.py
│  │  ├─ requirements.txt
│  │  └─ peeljobs_core/
│  │     ├─ settings.py
│  │     └─ settings/
│  └─ web-frontend/
│     ├─ app/
│     ├─ components/
│     ├─ lib/
│     ├─ messages/
│     ├─ Dockerfile
│     ├─ middleware.ts
│     ├─ next.config.mjs
│     ├─ package.json
│     ├─ tailwind.config.ts
│     └─ tsconfig.json
├─ configs/rbac/
├─ nginx/
│  ├─ default.conf
│  └─ prod.conf
├─ scripts/
│  ├─ check-prereqs.ps1
│  ├─ check-prereqs.sh
│  ├─ dev-up.sh
│  ├─ dev-down.sh
│  ├─ prod-up.sh
│  └─ prod-down.sh
├─ .env.example          (merge conflict)
├─ docker-compose.yml    (merge conflict)
├─ docker-compose.prod.yml (merge conflict)
└─ README.md             (merge conflict)
```

## Run Readiness Summary
| Area | Status | Notes |
| --- | --- | --- |
| Docker Compose (dev) | ❌ | `docker-compose.yml` contains unresolved merge conflicts. |
| Docker Compose (prod) | ❌ | `docker-compose.prod.yml` contains unresolved merge conflicts. |
| Nginx routing | ⚠️ | Config exists, but upstream services mismatch and compose conflicts. |
| Backend (Django) | ⚠️ | Runs in principle, but migrations mismatch and RBAC is incomplete. |
| AI Orchestrator | ❌ | Placeholder only; required AI endpoints missing. |
| Frontend (Next.js) | ⚠️ | App exists, but env var mismatch and API gaps remain. |
| Docs / Env templates | ❌ | `.env.example` and `README.md` have merge conflicts. |
| Testing readiness | ❌ | No test frameworks or configs present. |

## Blockers (must fix to run locally)
1) Merge conflicts in `docker-compose.yml`, `docker-compose.prod.yml`, `.env.example`, and `README.md` make the stack non-runnable.
2) Service mismatch:
   - Compose and Nginx reference `resume-service` and `interview-service`, but these folders do not exist.
   - `openresume-service` and `mock-interview` directories exist but are empty (no Dockerfile/package).
3) `embeddings` migrations do not match current models (migration defines old tables; code uses new FK-based models). This will break database schema and runtime queries.
4) Compose sets `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_AI_BASE_URL`, while the frontend reads `NEXT_PUBLIC_API_BASE` and `NEXT_PUBLIC_AI_BASE`.
5) One compose variant uses `postgres:14-alpine` (no pgvector), but embeddings migration requires `vector` extension.
6) One compose variant runs `gunicorn opensourcejobportal.wsgi` which does not match current Django project (`peeljobs_core.wsgi`).

## Gaps by Priority
### Critical
- Resolve all merge conflicts in compose/env/readme.
- Align service names and build contexts (resume/interview/openresume/mock-interview).
- Fix embeddings migrations to match models and pgvector usage.
- Fix frontend env var mismatch (`NEXT_PUBLIC_API_BASE`/`NEXT_PUBLIC_AI_BASE`).
- Ensure Postgres image supports pgvector or install extension.

### High
- RBAC is not implemented in Django (only `job_seeker`, `recruiter`, `admin` roles exist; endpoints are not scoped).
- Organization/company endpoints are missing, while frontend uses `/companies/:slug`.
- Verification endpoints are `csrf_exempt` and do not enforce auth or scoped access.
- No forgot-password endpoint exists, but frontend calls `/auth/forgot-password`.

### Medium
- JWT response shape mismatch: backend returns `{ user, tokens: { refresh, access } }` but frontend expects `accessToken` and `refreshToken`.
- Nginx security headers missing HSTS/CSP; rate-limits only on auth and AI.
- No env examples for backend and AI orchestrator services.

### Low
- Arabic text in backend placeholder pages and frontend demo data appears garbled (encoding issue).
- Duplicate settings module (`peeljobs_core/settings.py` and `peeljobs_core/settings/`) causes confusion.

## Environment Variables (required)
### Global / Compose
- `NGINX_HTTP_PORT` (e.g., `80` or `8080`)
- `NGINX_HTTPS_PORT` (e.g., `443` or `8443`)
- `POSTGRES_USER` (e.g., `forsati`)
- `POSTGRES_PASSWORD` (e.g., `forsati`)
- `POSTGRES_DB` (e.g., `forsati`)
- `REDIS_PORT` (optional, e.g., `6379`)
- `MINIO_PORT` / `MINIO_CONSOLE_PORT` (e.g., `9000` / `9001`)
- `MAILHOG_SMTP_PORT` / `MAILHOG_UI_PORT` (if Mailhog is used)

### Django (peeljobs-core)
- `DJANGO_SECRET_KEY` (required for prod)
- `DJANGO_DEBUG` (True/False)
- `DJANGO_ALLOWED_HOSTS` (comma-separated)
- `DATABASE_URL` (Postgres only, e.g., `postgres://user:pass@postgres:5432/forsati`)
- `REDIS_URL` (e.g., `redis://redis:6379/0`)
- `CORS_ALLOWED_ORIGINS` (comma-separated)
- `CSRF_TRUSTED_ORIGINS` (comma-separated)
- `SECURE_HSTS_SECONDS` (prod)

### Storage (MinIO / S3)
- `MINIO_ROOT_USER`
- `MINIO_ROOT_PASSWORD`
- `S3_ENDPOINT` (e.g., `http://minio:9000`)
- `S3_BUCKET` (e.g., `forsati-secure`)
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `S3_USE_SSL` (True/False)

### AI Orchestrator
- `APP_PORT` (default `8003`)
- `OPENAI_API_KEY` (if real AI integration)
- `REQUEST_LOG_LEVEL` (e.g., `INFO`)

### Frontend (Next.js)
- `NEXT_PUBLIC_API_BASE` (e.g., `/api`)
- `NEXT_PUBLIC_AI_BASE` (e.g., `/ai`)
- `NEXT_PUBLIC_SITE_URL` (e.g., `http://localhost`)

Notes:
- Compose currently uses `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_AI_BASE_URL`, which do not match frontend usage.
- `.env` files for backend and AI services do not exist in repo; they must be created.

## Compose / Nginx Audit
- `docker-compose.yml` and `docker-compose.prod.yml` are not valid YAML due to merge conflicts.
- Nginx routes `/`, `/api`, `/ai`, `/resume`, `/interview` but upstream services do not exist or are empty.
- `nginx/default.conf` and `nginx/prod.conf` include gzip and basic security headers; missing CSP and HSTS.
- No Windows PowerShell scripts exist for dev-up/prod-up (only `check-prereqs.ps1`).

## Backend (Django) Audit
- Settings: split config exists under `peeljobs_core/settings/` but not used. `manage.py` uses `peeljobs_core.settings`.
- Database: `settings.py` falls back to SQLite if `DATABASE_URL` is missing. This conflicts with pgvector requirements.
- Migrations: `embeddings/migrations/0001_initial.py` is incompatible with current `embeddings/models.py`.
- Auth: JWT in place via SimpleJWT. RBAC/scopes not enforced.
- Opportunities: unified `Opportunity` model exists; no moderation workflow.
- Applications: pipeline statuses exist; permissions not scoped to org.
- Keywords: ATS endpoints exist; import command missing.
- Verification: upload URL is a placeholder (not presigned), endpoints are `csrf_exempt`.

## AI Orchestrator Audit
Present endpoints:
- `GET /health`
- `GET /ready`
- `GET /`

Missing endpoints (required):
- `POST /ai/cv/analyze`
- `POST /ai/cv/improve`
- `POST /ai/interview/questions`
- `POST /ai/interview/feedback`
- `POST /ai/match`

No stub mode for missing `OPENAI_API_KEY`; service is a placeholder only.

## Frontend Audit
- Next.js app exists with App Router, i18n middleware, and Tailwind.
- Required pages are present for public, auth, candidate, recruiter, admin, and legal routes.
- API client uses demo fallback when endpoints fail; good for UI but hides real integration gaps.
- Env var mismatch (`NEXT_PUBLIC_API_BASE_URL` vs `NEXT_PUBLIC_API_BASE`) will break API calls.
- SEO: `robots.ts` and `sitemap.ts` present.

## Testing Readiness
No test framework or configs found for backend or frontend.

## Security Checklist (local server)
- Ensure `DJANGO_SECRET_KEY` is set and not committed.
- Restrict `DJANGO_ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`.
- Add HSTS and CSP headers in prod Nginx.
- Ensure MinIO credentials are non-default.
- Do not store raw verification files in DB; keep only metadata.
- Enforce auth and scope checks on verification and application endpoints.

## Verification Storage Notes
- `S3_BUCKET` used: `forsati-secure` (default).
- Upload URL is not presigned; it is a placeholder.
- Retention is set to 365 days in code, but no cleanup job is defined.

## Conclusions
Local run is currently blocked primarily by merge conflicts, missing service directories, and schema mismatches. Fixing those is required before any local server can run.
