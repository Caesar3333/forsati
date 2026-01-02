from django.utils import translation


def language_meta(request):
    language = translation.get_language() or "ar"
    text_direction = "rtl" if language.startswith("ar") else "ltr"
    return {
        "language_code": language,
        "text_direction": text_direction,
        "is_rtl": text_direction == "rtl",
    }
