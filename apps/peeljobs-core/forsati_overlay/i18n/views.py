from django.conf import settings
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils import translation
from django.views import View


class LanguageSwitchView(View):
    def post(self, request, *args, **kwargs):
        language = request.POST.get("language") or request.GET.get("language") or settings.LANGUAGE_CODE
        if language not in dict(settings.LANGUAGES):
            language = settings.LANGUAGE_CODE
        translation.activate(language)
        try:
            fallback_url = reverse("forsati-opportunity-list")
        except Exception:
            fallback_url = "/"
        response = HttpResponseRedirect(request.META.get("HTTP_REFERER", fallback_url))
        response.set_cookie("forsati_lang", language, max_age=60 * 60 * 24 * 365, samesite="Lax")
        user = getattr(request, "user", None)
        if user and user.is_authenticated and hasattr(user, "preferred_language"):
            setattr(user, "preferred_language", language)
            try:
                user.save(update_fields=["preferred_language"])
            except Exception:
                # Silent fallback if user model does not support the field.
                pass
        translation.deactivate()
        return response
