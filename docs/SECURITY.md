# Security Guidelines

- Enforce RBAC for all endpoints; server-side checks only.
- Enable rate limiting for auth, job posting, candidate search, and AI calls (Nginx + app-level).
- Validate and sanitize inputs; enable CSRF protection for forms; configure CORS for allowed origins only.
- Store sensitive documents exclusively in encrypted object storage (S3-compatible). **Never** store raw docs in databases.
- Log sensitive actions to `audit_logs`: document access, stage changes, admin actions, verification steps.
- Issue time-bound signed URLs for document access (e.g., 72h) and record access in audit logs.
- Ensure HTTPS end-to-end; secure cookies; HSTS at the edge.
- Regularly patch dependencies; use image vulnerability scanning in CI.

