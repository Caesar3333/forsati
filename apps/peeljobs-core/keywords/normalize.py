import re

ARABIC_DIACRITICS = re.compile(r"[\u0617-\u061A\u064B-\u0652]")
ARABIC_TATWEEL = re.compile(r"\u0640")
ARABIC_TRANSLATION = str.maketrans(
    {
        "\u0623": "\u0627",  # ? -> ?
        "\u0625": "\u0627",  # ? -> ?
        "\u0622": "\u0627",  # ? -> ?
        "\u0671": "\u0627",  # ? -> ?
        "\u0649": "\u064a",  # ? -> ?
        "\u0624": "\u0648",  # ? -> ?
        "\u0626": "\u064a",  # ? -> ?
        "\u0629": "\u0647",  # ? -> ?
        "\ufefb": "\u0644\u0627",  # ? -> ??
        "\ufef7": "\u0644\u0627",  # ? -> ??
        "\ufef9": "\u0644\u0627",  # ? -> ??
        "\ufef5": "\u0644\u0627",  # ? -> ??
    }
)


def normalize_arabic(text: str) -> str:
    if not text:
        return ""
    value = text.strip().lower()
    value = ARABIC_DIACRITICS.sub("", value)
    value = ARABIC_TATWEEL.sub("", value)
    value = value.translate(ARABIC_TRANSLATION)
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
