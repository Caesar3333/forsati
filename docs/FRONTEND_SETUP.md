# Forsati Web Frontend

## Overview
The frontend lives at `apps/web-frontend` and uses Next.js App Router, TypeScript, Tailwind CSS, and lightweight UI components. It ships an Arabic-first UX with English support and full RTL handling.

## Running locally
1) Install dependencies inside `apps/web-frontend`.
2) Run `npm run dev` for development or `npm run build && npm run start` for production.

## Structure
- `apps/web-frontend/app`: App Router routes (all pages under `/ar` and `/en`).
- `apps/web-frontend/components`: Shared UI building blocks and page widgets.
- `apps/web-frontend/lib`: API client, demo data, SEO helpers, and content.
- `apps/web-frontend/messages`: Arabic/English dictionaries.

## i18n & RTL
- Arabic is default and served under `/ar`.
- English is served under `/en`.
- Direction is set per language, and the UI flips logical spacing and icon direction.

## Demo Mode
If backend endpoints are missing or return errors, the UI falls back to demo data and surfaces a "Demo Mode" banner. This allows UX to remain functional while APIs are being built.

## Pages (MVP)
Public:
- `/ar` / `/en` landing
- `/[lang]/jobs` + `/[lang]/jobs/[id]`
- `/[lang]/companies/[slug]`
- `/[lang]/login`, `/[lang]/register`, `/[lang]/forgot-password`, `/[lang]/check-email`

Job Seeker:
- `/[lang]/me`
- `/[lang]/me/applications`
- `/[lang]/me/saved`
- `/[lang]/me/cv`
- `/[lang]/me/ai/cv-analyzer`
- `/[lang]/me/ai/mock-interview`
- `/[lang]/me/verification`

Recruiter:
- `/[lang]/recruiter/dashboard`
- `/[lang]/recruiter/jobs`
- `/[lang]/recruiter/jobs/new`
- `/[lang]/recruiter/jobs/[id]/applications`
- `/[lang]/recruiter/candidates/search`
- `/[lang]/recruiter/reports`

Legal:
- `/[lang]/about`
- `/[lang]/privacy`
- `/[lang]/cookies`
- `/[lang]/terms`
- `/[lang]/security`
- `/[lang]/ai-disclaimer`

## Environment
Create `.env.local` with:
- `NEXT_PUBLIC_API_BASE=/api`
- `NEXT_PUBLIC_AI_BASE=/ai`
- `NEXT_PUBLIC_SITE_URL=https://forsati.example`

## Docker & Nginx (reference snippet)
Example service:
```
web-frontend:
  build:
    context: ./apps/web-frontend
  ports:
    - "3000:3000"
  environment:
    - NEXT_PUBLIC_API_BASE=/api
    - NEXT_PUBLIC_AI_BASE=/ai
```

Example nginx routing:
```
location / {
  proxy_pass http://web-frontend:3000;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
}
```

## SEO
Each page sets metadata with canonical and hreflang alternates. A sitemap and robots file are in `apps/web-frontend/app`.
