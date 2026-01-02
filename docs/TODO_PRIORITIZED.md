# Forsati TODO (Prioritized)

1. **Clone upstream services** (apps/peeljobs-core, apps/openresume-service, apps/mock-interview) once network access is available; verify baseline builds with docker-compose.
2. **Create Forsati overlay Django app(s)** to add Opportunity model unification, i18n (AR/EN + RTL), trust/verification tables, and recruiters' pipeline without heavy upstream edits.
3. **Implement AI Orchestrator service** (FastAPI): prompt store, redaction middleware, logging without sensitive payloads, endpoints per Phase F.
4. **Nginx + infra hardening**: TLS, gzip/brotli, caching headers, rate limits, health endpoints, robots/sitemap wiring.
5. **Arabic-first UX rollout** across peeljobs-core, openresume-service, mock-interview: language switcher, RTL styling, translated public pages, accessible AR/EN metadata.
6. **Trust & verification storage**: integrate encrypted object storage; ensure documents never stored in DB; add redaction pipeline and consent flows.
7. **Keyword bank (AR/EN, JO)**: seed JSON files and search/extraction APIs; connect to ATS scoring and SEO generator.
8. **Assessments + reporting**: build assessment builder, attempts, AI feedback, HR and candidate reports, hiring decisions tracking.
9. **Security & compliance**: RBAC enforcement, rate limiting, CSRF/CORS hardening, audit logs, OWASP checklist; finalize COMPLIANCE_AGPL actions.
10. **CI/CD + observability**: add lint/test pipelines, Sentry/OTEL hooks, image scanning, backups, and production deployment playbooks.

