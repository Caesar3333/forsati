# Forsati API Overview (initial)

## Gateway (Nginx)
- `/api/` → peeljobs-core Django API
- `/resume/` → openresume-service
- `/interview/` → mock-interview
- `/ai/` → ai-orchestrator

## Planned AI Orchestrator endpoints
- `POST /ai/cv/analyze`
- `POST /ai/cv/generate`
- `POST /ai/jd/enhance`
- `POST /ai/match/job`
- `POST /ai/skill-gap`
- `POST /ai/interview/questions`
- `POST /ai/fraud/detect`
- `POST /ai/support/chat`

## Security
- JWT/Session auth expected from upstream services; enforce RBAC per service.
- Rate-limit auth, job posting, candidate search, and AI endpoints at Nginx and app layers.

