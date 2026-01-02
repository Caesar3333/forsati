# Forsati Keywords Pipeline

This document outlines how Forsati loads, imports, and serves the mega keyword bank for ATS, matching, and suggestion flows in the peeljobs-core overlay.

## Data sources
- JSON seed files under `apps/peeljobs-core/data/`
  - `keywords_bank.jo.ar.json`
  - `keywords_bank.jo.en.json`
- The management command imports these files into the database for faster querying and future enrichment.

## Models
- `KeywordItem(country, language, pack, kw, weight, syn_json, tags_json, created_at)`
  - Unique on `(country, language, kw)` to prevent duplicates.
- `KeywordUsage(actor_type, actor_id, context_type, context_id, kw, action, created_at)`
  - Lightweight audit trail for suggestion/extraction/ATS calls.

## Importing keywords (idempotent)
Run inside the `apps/peeljobs-core` service directory (Django context):

```bash
python manage.py import_keywords --country JO --file data/keywords_bank.jo.ar.json
python manage.py import_keywords --country JO --file data/keywords_bank.jo.en.json
```

The command performs an upsert via `update_or_create`, so rerunning it safely refreshes weights, packs, synonyms, and tags without duplicating rows.

## APIs (RBAC protected)
- `GET  /api/keywords/suggest?country=JO&lang=ar&q=...&pack=...&limit=50`
- `POST /api/keywords/extract   { country, lang, text }`
- `POST /api/ats/score          { job_id, lang, cv_text }`
- `POST /api/match/opportunities{ user_id, limit }`
- `POST /api/match/candidates   { job_id, limit }`

All endpoints require authentication (`IsAuthenticated`). They operate on the DB-backed keyword set and fall back to the JSON seeds when DB rows are absent.

## ATS and matching logic (baseline)
1. Normalize text (lowercase, simple regex token search for now).
2. Load job/candidate keyword sets by language/country.
3. Compute weighted overlap (`matched_weight / total_weight * 100`).
4. Return matched/missing keyword lists to power quick screening and recommendations.

## Admin access
- `KeywordItem` and `KeywordUsage` are registered in Django admin for review and manual curation.

## Notes
- No external services are called for keyword operations.
- Sensitive documents must **never** be stored in the database; only metadata and usage events are persisted.
- Future enhancements can add embeddings for fuzzy matching while keeping this pipeline backward compatible.
