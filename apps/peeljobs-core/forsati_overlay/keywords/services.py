import re
from typing import Dict, List, Optional

from forsati_overlay.keywords.loader import flatten_keywords, load_keyword_bank


def suggest_keywords(query: str, language: str = "ar", country: str = "JO", pack_type: Optional[str] = None) -> List[Dict]:
    bank = load_keyword_bank(language)
    if country and bank.get("country") and bank["country"].lower() != country.lower():
        # still allow suggestions even if country mismatches
        pass

    normalized_query = (query or "").lower()
    suggestions = []
    for item in flatten_keywords(bank, pack_type=pack_type):
        haystack = [item.get("kw", ""), *item.get("syn", [])]
        haystack_text = " ".join(haystack).lower()
        if not normalized_query or normalized_query in haystack_text:
            suggestions.append({
                "keyword": item.get("kw"),
                "weight": item.get("weight", 0),
                "pack": item.get("pack"),
                "synonyms": item.get("syn", []),
            })
    return suggestions[:50]


def extract_keywords(text: str, language: str = "ar", country: str = "JO", pack_type: Optional[str] = None) -> Dict:
    bank = load_keyword_bank(language)
    items = flatten_keywords(bank, pack_type=pack_type)
    normalized_text = (text or "").lower()
    matched = []
    total_weight = sum(item.get("weight", 0) for item in items) or 1
    matched_weight = 0

    for item in items:
        patterns = [item.get("kw", ""), *(item.get("syn", []) or [])]
        for token in patterns:
            if not token:
                continue
            pattern = re.escape(token.lower())
            if re.search(pattern, normalized_text):
                matched.append({
                    "keyword": item.get("kw"),
                    "match": token,
                    "weight": item.get("weight", 0),
                    "pack": item.get("pack"),
                })
                matched_weight += item.get("weight", 0)
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
