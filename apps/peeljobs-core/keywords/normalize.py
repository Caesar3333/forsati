import re


ARABIC_DIACRITICS = re.compile(r"[\u0617-\u061A\u064B-\u0652]")
ARABIC_TATWEEL = re.compile(r"\u0640")


def normalize_arabic(text: str) -> str:
    if not text:
        return ""
    value = text.strip().lower()
    value = ARABIC_DIACRITICS.sub("", value)
    value = ARABIC_TATWEEL.sub("", value)
    value = value.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
    value = value.replace("ة", "ه")
    value = value.replace("ى", "ي")
    value = re.sub(r"\s+", " ", value)
    return value


def normalize_english(text: str) -> str:
    if not text:
        return ""
    value = text.strip().lower()
    value = re.sub(r"[^a-z0-9\s\-\+]", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value


def normalize_keyword(text: str, lang: str) -> str:
    if lang == "ar":
        return normalize_arabic(text)
    return normalize_english(text)
