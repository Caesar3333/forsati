# API Requirements for Forsati Frontend

The frontend uses a demo fallback when endpoints are missing. Implement the following endpoints to disable Demo Mode.

## Base URLs
- `NEXT_PUBLIC_API_BASE` (default `/api`)
- `NEXT_PUBLIC_AI_BASE` (default `/ai`)

## Health
- `GET /api/health`
  - Response: `{ "status": "ok" }`

## Auth
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Response: `{ accessToken, refreshToken }`
- `POST /api/auth/register`
  - Body: `{ name, email, password }`
  - Response: `{ id, email }`
- `POST /api/auth/forgot-password`
  - Body: `{ email }`
  - Response: `{ ok: true }`

## Opportunities
- `GET /api/opportunities/search`
  - Query: `q`, `type`, `level`, `city`, `category`, `page`
  - Response: `Job[]`
- `GET /api/opportunities/:id`
  - Response: `Job`
- `POST /api/opportunities/:id/apply`
  - Body: `{ name, email, message }`
  - Response: `{ ok: true }`

## Applications
- `GET /api/applications/my`
  - Response: `Application[]`

## Keywords / ATS
- `GET /api/keywords/suggest?q=...`
  - Response: `string[]`
- `POST /api/ats/score`
  - Body: `{ text }`
  - Response: `{ score, tips[] }`

## AI Services
- `POST /ai/cv/analyze`
  - Body: `{ text }`
  - Response: `{ score, strengths[], improvements[] }`
- `POST /ai/interview/questions`
  - Body: `{ role }`
  - Response: `{ questions[] }`

## Verification
- `POST /api/verify/upload`
  - Body: `{ type, fileName }`
  - Response: `{ ok: true }`

## Notes
- Auth tokens can be set in HttpOnly cookies if supported. The frontend uses `credentials: include`.
