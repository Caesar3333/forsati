# Forsati Local Server Runbook (Windows and Linux)

This runbook lists the steps and commands to run Forsati locally. Do not run these commands in this audit environment.

## 0) Preconditions
Blockers must be fixed first:
- Resolve merge conflicts in `docker-compose.yml`, `docker-compose.prod.yml`, `.env.example`, and `README.md`.
- Align service names and build contexts (resume/interview/openresume/mock-interview).
- Fix embeddings migrations vs models.
- Fix frontend env var mismatch (`NEXT_PUBLIC_API_BASE`/`NEXT_PUBLIC_AI_BASE`).

## 1) System Requirements
### Windows (recommended)
- Windows 10/11
- Docker Desktop (Linux containers)
- WSL2 enabled
- Git

### Linux
- Docker Engine 24+
- Docker Compose v2
- Git

## 2) WSL2 Setup (Windows)
Run in PowerShell (admin):
```
wsl --status
```
If WSL2 is disabled, enable:
```
wsl --install
```
Then open Docker Desktop and enable WSL2 integration.

## 3) Environment Files
Create `.env` files (examples below; update secrets):
```
# root .env
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgres://forsati:forsati@postgres:5432/forsati
REDIS_URL=redis://redis:6379/0
CORS_ALLOWED_ORIGINS=http://localhost,http://localhost:80
CSRF_TRUSTED_ORIGINS=http://localhost,http://localhost:80

POSTGRES_USER=forsati
POSTGRES_PASSWORD=forsati
POSTGRES_DB=forsati

MINIO_ROOT_USER=forsati
MINIO_ROOT_PASSWORD=forsati123
S3_ENDPOINT=http://minio:9000
S3_BUCKET=forsati-secure
S3_ACCESS_KEY=forsati
S3_SECRET_KEY=forsati123
S3_USE_SSL=False

NEXT_PUBLIC_API_BASE=/api
NEXT_PUBLIC_AI_BASE=/ai
NEXT_PUBLIC_SITE_URL=http://localhost

OPENAI_API_KEY=
REQUEST_LOG_LEVEL=INFO

NGINX_HTTP_PORT=80
NGINX_HTTPS_PORT=443
```

If you decide to use per-service `.env` files, place them under:
- `apps/peeljobs-core/.env`
- `apps/ai-orchestrator/.env`
- `apps/web-frontend/.env`

## 4) Ports to Open (local firewall)
- 80/443 (nginx)
- 8000 (Django)
- 8003 (AI orchestrator)
- 3000 (web-frontend)
- 5432 (Postgres)
- 6379 (Redis)
- 9000/9001 (MinIO)
- 8025/1025 (Mailhog if used)

## 5) Start the Stack (Docker Compose)
Development:
```
docker compose -f docker-compose.yml up --build
```

Production-like:
```
docker compose -f docker-compose.prod.yml up --build -d
```

## 6) Django Migrations and Admin User
Run inside the Django container:
```
python manage.py migrate
python manage.py createsuperuser
```

Keyword import (command is missing and must be implemented):
```
python manage.py import_keywords --country JO --file data/keywords_bank.jo.ar.json
python manage.py import_keywords --country JO --file data/keywords_bank.jo.en.json
```

## 7) Verification Storage (MinIO)
Create bucket `forsati-secure` and apply a retention policy (recommended 365 days).
Ensure the app uses presigned URLs instead of direct URLs.

## 8) Health Checks (manual)
```
curl http://localhost/api/health
curl http://localhost/api/ready
curl http://localhost/ai/health
curl http://localhost/ai/ready
curl http://localhost/
```

## 9) Expected Routes
- `/` -> web frontend
- `/api` -> Django API
- `/ai` -> AI orchestrator
- `/resume` -> resume service (must exist)
- `/interview` -> interview service (must exist)

## 10) Troubleshooting
- If compose fails to start, check for unresolved merge conflict markers.
- If migrations fail, fix embeddings migrations and ensure pgvector is available.
- If frontend API calls fail, check `NEXT_PUBLIC_API_BASE` and nginx routing.
