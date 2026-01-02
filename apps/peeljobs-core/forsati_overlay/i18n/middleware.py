from django.conf import settings
from django.utils import translation


class ForsatiLocaleMiddleware:
    """Arabic-first language resolution with user preference + cookie fallback."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        language = self._resolve_language(request)
        translation.activate(language)
        request.LANGUAGE_CODE = language
        response = self.get_response(request)
        response.set_cookie(
            key="forsati_lang",
            value=language,
            max_age=60 * 60 * 24 * 365,
            samesite="Lax",
            secure=bool(getattr(settings, "SESSION_COOKIE_SECURE", False)),
        )
        translation.deactivate()
        return response

    def _resolve_language(self, request):
        cookie_lang = request.COOKIES.get("forsati_lang")
        if cookie_lang in dict(settings.LANGUAGES):
            return cookie_lang

        user = getattr(request, "user", None)
        preferred = getattr(user, "preferred_language", None) if user and user.is_authenticated else None
        if preferred in dict(settings.LANGUAGES):
            return preferred

        path_lang = translation.get_language_from_path(getattr(request, "path_info", ""))
        if path_lang in dict(settings.LANGUAGES):
            return path_lang

        # Arabic-first default if no explicit preference was provided.
        return settings.LANGUAGE_CODE
