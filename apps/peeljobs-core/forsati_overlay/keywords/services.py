import re
from typing import Dict, List, Optional, Tuple

from forsati_overlay.keywords.loader import fetch_db_keywords, flatten_keywords, load_keyword_bank
from forsati_overlay.keywords.models import KeywordUsage
from forsati_overlay.opportunities.models import Opportunity, OpportunityApplication


def _normalize(text: str) -> str:
    return (text or "").lower()


def _token_hit(token: str, haystack: str) -> bool:
    pattern = re.escape(token.lower())
    return bool(re.search(pattern, haystack))


def _load_items(language: str, country: str, pack_type: Optional[str] = None) -> List[Dict]:
    items = fetch_db_keywords(country=country, language=language, pack_type=pack_type)
    if items:
        return items
    bank = load_keyword_bank(language, country)
    return flatten_keywords(bank, pack_type=pack_type)


def _record_usage(action: str, kw: str, request=None, context_type: str = "", context_id: Optional[int] = None):
    actor_type = None
    actor_id = None
    if request and getattr(request, "user", None) and request.user.is_authenticated:
        actor_type = request.user.__class__.__name__
        actor_id = request.user.id
    KeywordUsage.objects.create(
        actor_type=actor_type or "anonymous",
        actor_id=actor_id,
        context_type=context_type,
        context_id=context_id,
        kw=kw,
        action=action,
    )


def suggest_keywords(
    query: str,
    language: str = "ar",
    country: str = "JO",
    pack_type: Optional[str] = None,
    limit: int = 50,
    request=None,
) -> List[Dict]:
    normalized_query = _normalize(query)
    haystack = _load_items(language=language, country=country, pack_type=pack_type)
    suggestions = []
    for item in haystack:
        tokens = [item.get("kw", ""), *item.get("syn", []), *item.get("synonyms", [])]
        search_blob = " ".join(tokens).lower()
        if not normalized_query or normalized_query in search_blob:
            suggestions.append(
                {
                    "keyword": item.get("kw"),
                    "weight": item.get("weight", 0),
                    "pack": item.get("pack"),
                    "synonyms": item.get("syn", []) or item.get("synonyms", []),
                }
            )
            _record_usage("suggest", item.get("kw", ""), request=request, context_type="keyword")
    return suggestions[:limit]


def extract_keywords(
    text: str,
    language: str = "ar",
    country: str = "JO",
    pack_type: Optional[str] = None,
    request=None,
) -> Dict:
    items = _load_items(language, country, pack_type)
    normalized_text = _normalize(text)
    matched = []
    total_weight = sum(item.get("weight", 0) for item in items) or 1
    matched_weight = 0

    for item in items:
        patterns = [item.get("kw", ""), *(item.get("syn", []) or [])]
        for token in patterns:
            if not token:
                continue
            if _token_hit(token, normalized_text):
                matched.append(
                    {
                        "keyword": item.get("kw"),
                        "match": token,
                        "weight": item.get("weight", 0),
                        "pack": item.get("pack"),
                    }
                )
                matched_weight += item.get("weight", 0)
                _record_usage("extract", item.get("kw", ""), request=request, context_type="text")
                break

    score = round((matched_weight / total_weight) * 100, 2)
    return {
        "language": language,
        "country": country,
        "matches": matched,
        "score": score,
        "max_score": 100,
        "total_keywords": len(items),
    }


def _ats_score_for_text(job_keywords: List[Dict], candidate_text: str) -> Tuple[float, List[Dict], List[Dict]]:
    normalized_text = _normalize(candidate_text)
    matched = []
    missing = []
    total_weight = sum(item.get("weight", 0) for item in job_keywords) or 1
    matched_weight = 0

    for item in job_keywords:
        hit = False
        for token in [item.get("kw", ""), *(item.get("syn", []) or [])]:
            if token and _token_hit(token, normalized_text):
                matched.append({"keyword": item.get("kw"), "weight": item.get("weight", 0), "pack": item.get("pack")})
                matched_weight += item.get("weight", 0)
                hit = True
                break
        if not hit:
            missing.append({"keyword": item.get("kw"), "weight": item.get("weight", 0), "pack": item.get("pack")})

    score = round((matched_weight / total_weight) * 100, 2)
    return score, matched, missing


def ats_score(job: Opportunity, cv_text: str, language: Optional[str] = None) -> Dict:
    lang = language or getattr(job, "language", "ar") or "ar"
    job_keywords = _load_items(language=lang, country="JO")
    score, matched, missing = _ats_score_for_text(job_keywords, cv_text)
    return {"score": score, "matched": matched, "missing": missing, "language": lang}


def match_candidates(job: Opportunity, limit: int = 5) -> List[Dict]:
    candidates = {}
    job_keywords = _load_items(language=job.language or "ar", country="JO")
    applications = OpportunityApplication.objects.filter(opportunity=job).select_related("applicant")
    for application in applications:
        score, matched, missing = _ats_score_for_text(job_keywords, application.cover_letter or "")
        prior = candidates.get(application.applicant_id)
        payload = {
            "candidate_id": application.applicant_id,
            "score": score,
            "matched": matched,
            "missing": missing,
        }
        if not prior or score > prior["score"]:
            candidates[application.applicant_id] = payload
    return sorted(candidates.values(), key=lambda row: row["score"], reverse=True)[:limit]


def match_opportunities(user_id: int, limit: int = 5) -> List[Dict]:
    user_texts = list(
        OpportunityApplication.objects.filter(applicant_id=user_id).values_list("cover_letter", flat=True)
    )
    aggregated_text = "\n".join([t for t in user_texts if t])
    opportunities = Opportunity.objects.filter(published=True)[:100]
    matches = []
    for opportunity in opportunities:
        job_keywords = _load_items(language=opportunity.language or "ar", country="JO")
        score, matched, missing = _ats_score_for_text(job_keywords, aggregated_text)
        matches.append(
            {
                "opportunity_id": opportunity.id,
                "score": score,
                "matched": matched,
                "missing": missing,
            }
        )
    return sorted(matches, key=lambda row: row["score"], reverse=True)[:limit]
