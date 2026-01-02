# Forsati (فرصتي) Monorepo

Forsati is an Arabic-first, bilingual opportunity marketplace covering jobs, internships, volunteering, scholarships, and freelance projects. This monorepo wires multiple upstream services behind an Nginx reverse proxy with consistent Forsati-specific configuration.

## Repo Layout
```
apps/
  peeljobs-core/       # Django marketplace (vendored from MicroPyramid/opensource-job-portal)
  openresume-service/  # CV builder/parser (AGPL-3.0) from xitanggg/open-resume
  mock-interview/      # AI mock interview service from modamaan/Ai-mock-Interview
  ai-orchestrator/     # New Forsati AI gateway
infra/
  nginx/               # Reverse-proxy configuration
  docker/              # Shared Docker assets
scripts/               # Helper scripts
```

## Bootstrapping the upstream projects
GitHub access is required to populate the vendored services. From a networked environment run:
```bash
git clone https://github.com/MicroPyramid/opensource-job-portal apps/peeljobs-core
git clone https://github.com/xitanggg/open-resume apps/openresume-service
git clone https://github.com/modamaan/Ai-mock-Interview apps/mock-interview
```

> In this environment outbound GitHub access is blocked (HTTP 403), so only placeholders are present. See `docs/AUDIT_REPORT.md` for details.

## Environment files
Copy the provided examples and update secrets before running any stack:
```bash
cp .env.example .env
cp apps/peeljobs-core/.env.example apps/peeljobs-core/.env
cp apps/openresume-service/.env.example apps/openresume-service/.env
cp apps/mock-interview/.env.example apps/mock-interview/.env
cp apps/ai-orchestrator/.env.example apps/ai-orchestrator/.env
```

## Prerequisites
- Docker Engine (24+) and Docker Compose v2 (`docker compose` is preferred; v1 `docker-compose` also works).
- Run `./scripts/check-prereqs.sh` to verify the tooling before starting any stack.

If Docker or Compose are missing, install them following the official guides:
- Docker Engine: https://docs.docker.com/engine/install/
- Docker Compose plugin: https://docs.docker.com/compose/install/

> In constrained environments (like this sandbox) Docker may be unavailable. Use a machine with Docker installed to build and run the stack.

## Development (docker-compose)
```bash
./scripts/dev-up.sh
# browse http://localhost:8080
./scripts/dev-down.sh
```

## Production (docker-compose)
```bash
./scripts/prod-up.sh
./scripts/prod-down.sh
```

## Routing
Nginx terminates TLS (certs to be mounted) and routes:
- `/` and `/api/` → peeljobs-core
- `/resume/` → openresume-service
- `/interview/` → mock-interview
- `/ai/` → ai-orchestrator

## Security and Compliance
- Secrets are never committed; populate local `.env` files.
- Sensitive documents must be stored only in encrypted object storage—never in databases.
- OpenResume is AGPL-3.0; see `docs/COMPLIANCE_AGPL.md` for obligations.

