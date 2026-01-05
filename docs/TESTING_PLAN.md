# Forsati Testing Plan

This plan defines the minimum testing stack required for backend, frontend, and integration testing.

## 1) Backend (Django) Testing
### Tooling (to add)
- pytest
- pytest-django
- factory_boy
- faker
- freezegun
- coverage

### Test Categories
1) Auth and RBAC
   - Register, login, refresh token
   - Role-based access per endpoint (admin, recruiter, job_seeker, provider, moderator)
   - Scope checks (platform, organization, provider, self)
2) Opportunities
   - CRUD for each opportunity type
   - Publish/unpublish transitions
   - Moderation flows
3) Applications
   - Apply once per user per opportunity
   - Stage transitions and timestamps
   - Recruiter notes and audit logs
4) Keywords and ATS
   - Suggest/extract endpoints
   - ATS scoring inputs and outputs
   - Match endpoints return expected schema
5) Verification
   - Request creation and status transitions
   - Upload URL generation (presigned URL expected)
   - Consent grant creation
   - Audit log entries
6) Embeddings and pgvector
   - Vector extension present
   - Embedder writes/reads as expected

### Database Strategy
- Use Postgres only (no SQLite).
- Provision pgvector extension in the test database.

## 2) Frontend (Next.js) Testing
### Tooling (to add)
- Vitest or Jest
- React Testing Library
- MSW (mock service worker)

### Test Categories
1) Route rendering per locale (ar/en) and RTL/LTR layout
2) Auth flows (login, register, forgot password, check email)
3) Job search and details pages
4) Recruiter dashboard and job creation forms
5) Admin dashboard sections
6) AI CV analyzer and mock interview screens
7) Verification upload UI
8) SEO output (metadata, sitemap, robots)

## 3) E2E Testing
### Tooling (to add)
- Playwright (recommended) or Cypress

### E2E Scenarios
1) Guest visits landing -> search -> job details
2) User registers -> applies -> views application status
3) Recruiter creates opportunity -> views applications
4) Admin reviews approvals -> changes user status
5) Provider uploads verification -> status pending

## 4) Linting and Formatting
### Backend
- ruff
- black
- isort

### Frontend
- eslint
- prettier

## 5) Seed Data Plan
Add a data seeding command (management command) to create:
- Admin owner user
- Sample organization
- Sample recruiter
- Sample provider
- Sample opportunities of each type
- Sample applications in multiple stages
- Keyword bank imports

## 6) CI Recommendations
- Run lint + unit tests on every PR.
- Run E2E tests on main branch or nightly.
- Use coverage thresholds (backend >= 80%, frontend >= 70%).
