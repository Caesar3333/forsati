# Production Readiness Checklist (Forsati)

- [ ] Upstream services cloned and build reproducibly in CI.
- [ ] Secrets stored in vault/SSM; `.env` files only for local dev.
- [ ] TLS certificates configured for `forsati.org` (Let's Encrypt/ACME) and renewed automatically.
- [ ] Database backups scheduled and tested; PITR enabled.
- [ ] Redis persistence configured for queues/sessions as needed.
- [ ] Object storage buckets created with server-side encryption and limited IAM.
- [ ] Monitoring: Sentry/OTEL exporters wired; health endpoints `/health` + `/ready` responding.
- [ ] Rate limits and WAF (Nginx/Cloud provider) enabled for auth, posting, AI endpoints.
- [ ] CI: lint, type-check, tests, container scans, license scans.
- [ ] Disaster recovery runbook prepared; RPO/RTO documented.

