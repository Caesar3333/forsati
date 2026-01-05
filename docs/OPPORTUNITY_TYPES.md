# Opportunity Types (Unified Model)

All opportunities in Forsati use a single Opportunity model with a `type` flag:
- `job`
- `internship`
- `volunteer`
- `scholarship`
- `program` (training programs, free or paid, cohort-based)

## Core fields
- `title`, `summary`, `description`
- `type`, `category`, `tags`
- `location` (on-site/remote/hybrid, city/country)
- `eligibility_rules` (age, education, experience, skills)
- `required_documents` (CV, ID, certificates)
- `application_deadline`
- `organization_id`
- `approval_required` (boolean)

## Optional fields by type
- `job`: salary range, employment type, work hours.
- `internship`: duration, stipend, mentor.
- `volunteer`: hours, responsibilities, impact area.
- `scholarship`: funding amount, eligibility, partner orgs.
- `program`: cohorts, schedule, enrollment limit, price.

## Application pipeline
Default stages:
1) submitted
2) screening
3) interview/assessment
4) offer/acceptance
5) closed

Stages are configurable per organization.

## Approval workflow
- Organizations may publish directly or require approval.
- Volunteer and scholarship types default to moderation.
- Admin or Moderator can approve/reject with notes.
