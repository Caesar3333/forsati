# Deployment Guide for forsati.org

## Prerequisites
- Populate `.env` and service-specific `.env` files with production secrets.
- Ensure upstream service code is present under `apps/`.
- TLS certificates available under `infra/nginx/certs` or via ACME sidecar.

## Steps
1. Build images:
   ```bash
   docker-compose --env-file .env -f docker-compose.prod.yml build
   ```
2. Start stack:
   ```bash
   docker-compose --env-file .env -f docker-compose.prod.yml up -d
   ```
3. Run database migrations inside `peeljobs-core`:
   ```bash
   docker-compose exec peeljobs-core python manage.py migrate
   ```
4. Verify health endpoints (`/health`, `/ready`) and Nginx routing for `/`, `/api/`, `/resume/`, `/interview/`, `/ai/`.
5. Configure DNS for `forsati.org` pointing to the Nginx host.

## Notes
- Sensitive documents must be stored in encrypted object storage only; databases must not hold raw documents.
- Keep Forsati extensions in separate Django apps/modules to minimize upstream divergence.

