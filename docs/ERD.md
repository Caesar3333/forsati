# Forsati ERD (outline)

> Detailed diagrams will be generated after upstream code is present. Key planned tables (peeljobs-core overlays):

- `opportunities` (type: job/internship/volunteer/scholarship/freelance, org_id, location, salary, skills, keywords)
- `applications` (candidate_id, opportunity_id, status, attachments, cv_source)
- `application_stages` (application_id, stage, actor_id, timestamp, notes)
- `shortlists` (opportunity_id, candidate_id, reason)
- `rejection_reasons` (application_id, tags, feedback)
- `offers` (application_id, terms, expiry)
- `saved_opportunities` (candidate_id, opportunity_id)
- `job_alerts` (candidate_id, query, schedule)
- `verification_requests` (subject_type, subject_id, status, documents)
- `trust_scores` (org_id, score, signals)
- `secure_documents` (owner_id, metadata only; file stored in encrypted object storage)
- `document_access_requests` (document_id, requester_id, consent_status, expiry)
- `audit_logs` (actor, action, target, timestamp, metadata)
- `ai_prompts` (name, version, content, variables, enabled)

