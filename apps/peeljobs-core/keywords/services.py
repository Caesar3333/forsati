from typing import List

from keywords.models import KeywordItem
from keywords.normalize import normalize_keyword


def suggest_keywords(country: str, language: str, query: str, pack: str = "", limit: int = 50) -> List[KeywordItem]:
    normalized = normalize_keyword(query, language)
    queryset = KeywordItem.objects.filter(country=country, language=language)
    if pack:
        queryset = queryset.filter(pack=pack)
    if normalized:
        queryset = queryset.filter(norm_kw__icontains=normalized)
    return list(queryset.order_by("-weight")[:limit])


def extract_keywords(country: str, language: str, text: str, limit: int = 50) -> List[str]:
    normalized = normalize_keyword(text, language)
    results = suggest_keywords(country, language, normalized, limit=limit)
    return [item.kw for item in results]


def ats_score(lang: str, job_text: str, cv_text: str) -> dict:
    job_norm = normalize_keyword(job_text, lang)
    cv_norm = normalize_keyword(cv_text, lang)
    job_tokens = set(job_norm.split())
    cv_tokens = set(cv_norm.split())
    matched = sorted(job_tokens.intersection(cv_tokens))
    missing = sorted(job_tokens.difference(cv_tokens))
    score = 0 if not job_tokens else int((len(matched) / len(job_tokens)) * 100)
    tips = [
        "Add missing keywords naturally in experience and skills.",
        "Ensure your summary highlights the role requirements.",
    ]
    return {"score": score, "matched": matched, "missing": missing, "tips": tips}
