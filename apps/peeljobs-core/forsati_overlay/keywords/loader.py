import json
from functools import lru_cache
from pathlib import Path
from typing import Dict, List, Optional

from django.db import models

from forsati_overlay.keywords.models import KeywordItem

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"


@lru_cache()
def load_keyword_bank(language: str, country: str = "JO") -> Dict:
    """Load the keyword bank JSON for the requested language/country.

    Defaults to Arabic if the file or language is missing.
    """
    lang = (language or "ar").lower()
    country_code = (country or "").lower()
    prioritized_files = [
        DATA_DIR / f"keywords_bank.{country_code}.{lang}.json",
        DATA_DIR / f"keywords_bank.{lang}.json",
        DATA_DIR / "keywords_bank.ar.json",
    ]
    filename = next((f for f in prioritized_files if f.exists()), None)
    if not filename:
        return {"packs": [], "language": lang, "country": country_code}
    with filename.open(encoding="utf-8") as f:
        return json.load(f)


def flatten_keywords(bank: Dict, pack_type: Optional[str] = None) -> List[Dict]:
    items: List[Dict] = []
    for pack in bank.get("packs", []):
        if pack_type and pack_type not in pack.get("tags", []):
            continue
        for item in pack.get("items", []):
            merged = {"pack": pack.get("name"), **item}
            items.append(merged)
    return items


def fetch_db_keywords(country: str = "JO", language: str = "ar", pack_type: Optional[str] = None) -> List[Dict]:
    qs = KeywordItem.objects.filter(country__iexact=country, language__iexact=language)
    if pack_type:
        qs = qs.filter(models.Q(pack__iexact=pack_type) | models.Q(tags_json__contains=[pack_type]))
    qs = qs.order_by("country", "language", "pack", "-weight", "kw")
    items = []
    for item in qs:
        items.append(
            {
                "kw": item.kw,
                "weight": item.weight,
                "syn": item.syn_json or [],
                "pack": item.pack,
                "tags": item.tags_json or [],
            }
        )
    return items
