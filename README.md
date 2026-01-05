# Forsati (فرصتي) Monorepo

Forsati is an Arabic-first opportunity platform for jobs, internships, volunteering, scholarships, training programs, and freelance projects. This monorepo provides a local stack with a Django backend, Next.js frontend, AI gateway, and resume/interview stubs.

## Repo Layout
```
apps/
  peeljobs-core/         # Django API (service name: forsati-core)
  web-frontend/          # Next.js web app
  ai-orchestrator/       # FastAPI AI gateway
  openresume-service/    # Resume service stub (service name: resume-service)
  mock-interview/        # Mock interview stub (service name: interview-service)
nginx/                   # Reverse proxy configs
scripts/                 # Local run helpers
configs/                 # RBAC configs
docs/                    # Documentation
```

## Prerequisites
- Docker Engine 24+
- Docker Compose v2 (`docker compose`)
- Windows: Docker Desktop + WSL2 enabled

## Quick Start (Local)
1) Copy the environment template:
```
cp .env.example .env
```
2) Run the local stack:
```
./scripts/run-local.sh
```
Windows PowerShell:
```
.\scripts\run-local.ps1
```

## Local Routes
- `/` -> web-frontend (Next.js)
- `/api` -> forsati-core (Django)
- `/ai` -> ai-orchestrator (FastAPI)
- `/resume` -> resume-service (stub)
- `/interview` -> interview-service (stub)

## Health Checks
- `GET /api/health`
- `GET /api/ready`
- `GET /ai/health`
- `GET /ai/ready`

## Notes
- The resume and interview services are stubs for local MVP routing stability.
- RBAC defaults live under `configs/rbac`.
- See `docs/LOCAL_RUNBOOK.md` for detailed setup steps.
