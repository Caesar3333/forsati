# Forsati Local Stack (Placeholders)

This repository contains a runnable local stack with placeholder services wired through Nginx.

## Prerequisites
- Docker Engine
- Docker Compose v2 (`docker compose`)

## Quick start (development)
```bash
./scripts/check-prereqs.sh
docker compose -f docker-compose.yml up --build
```

Open http://localhost:8080 and the following routed paths:
- `/api/` -> Django placeholder (peeljobs-core)
- `/resume/` -> OpenResume placeholder
- `/interview/` -> Mock Interview placeholder
- `/ai/` -> AI Orchestrator placeholder

## Production-style run
```bash
docker compose -f docker-compose.prod.yml up --build -d
```

## Services and ports
- Nginx: `8080`
- peeljobs-core: `8000`
- openresume-service: `3000`
- mock-interview: `3002`
- ai-orchestrator: `8003`
