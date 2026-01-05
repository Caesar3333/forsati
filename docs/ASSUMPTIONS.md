# Assumptions

1) AGENTS.md was not accessed because file reading via shell commands is disallowed. Please confirm if project-specific agent instructions exist.
2) Existing `docker-compose.yml`, `docker-compose.prod.yml`, nginx configs, and README were not modified because their contents could not be read under the no-shell-command constraint.
3) A new Next.js frontend was created at `apps/web-frontend` with standalone output for Docker.
4) Demo data is used whenever API endpoints are missing or return errors; Demo Mode banners appear in core data-driven views.
