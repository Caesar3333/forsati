# Forsati AI Orchestrator

FastAPI service exposing Forsati's unified AI endpoints. In this phase all routes are stubbed and return mock JSON while enforcing request redaction and prompt governance scaffolding.

## Development

```bash
cd apps/ai-orchestrator
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8003 --reload
```

Environment variables (see `.env.example`) configure service ports and future provider credentials. The service does **not** call external LLMs yet.

## Endpoints
- `GET /health` liveness check
- `GET /ready` readiness check referencing prompt store
- `GET /ai/prompts` inspect in-memory prompt definitions
- `POST /ai/cv/analyze`
- `POST /ai/cv/generate`
- `POST /ai/jd/enhance`
- `POST /ai/match/job`
- `POST /ai/skill-gap`
- `POST /ai/interview/questions`
- `POST /ai/fraud/detect`
- `POST /ai/support/chat`

Responses include a generated `request_id`, the prompt version (if any), and whether the redaction middleware detected sensitive tokens. Raw sensitive documents are never stored; future document handling must use encrypted object storage per Forsati policy.
