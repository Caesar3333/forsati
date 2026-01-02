import json
from functools import lru_cache
from pathlib import Path
from typing import Dict, List, Optional

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"


@lru_cache()
def load_keyword_bank(language: str) -> Dict:
    """Load the keyword bank JSON for the requested language.

    Defaults to Arabic if the file or language is missing.
    """
    lang = language or "ar"
    filename = DATA_DIR / f"keywords_bank.{lang}.json"
    if not filename.exists():
        filename = DATA_DIR / "keywords_bank.ar.json"
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
