from urllib.parse import urljoin

from django.conf import settings
from django.urls import reverse
from django.utils import translation
from django.views.generic import TemplateView

from forsati_overlay.keywords.services import extract_keywords, suggest_keywords
from forsati_overlay.opportunities.models import Opportunity


class OpportunityListView(TemplateView):
    template_name = "forsati/opportunities/list.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["opportunities"] = Opportunity.objects.filter(published=True)[:20]
        language = translation.get_language() or settings.LANGUAGE_CODE
        is_ar = language.startswith("ar")
        ctx["suggested_keywords"] = suggest_keywords(
            query="", country="JO", language=language, limit=8, request=self.request
        )
        ctx.update(
            meta_title="الفرص المتاحة | فرصتي" if is_ar else "Opportunities | Forsati",
            meta_description=
            "اكتشف أحدث الفرص للوظائف، التدريب، التطوع، المنح، والأعمال الحرة مع دعم التقديم السهل."  # noqa: E501
            if is_ar
            else "Browse the latest Forsati opportunities across jobs, internships, volunteering, scholarships, and freelance projects.",
            canonical_url=urljoin(self._base_url(), reverse("forsati-opportunity-list")),
            hreflang_urls={
                "ar": urljoin(self._base_url(), self._language_url("ar")),
                "en": urljoin(self._base_url(), self._language_url("en")),
            },
        )
        return ctx

    def _base_url(self) -> str:
        return getattr(settings, "SITE_URL", "http://localhost:8000")

    def _language_url(self, language_code: str) -> str:
        with translation.override(language_code):
            return reverse("forsati-opportunity-list")


class OpportunityDetailView(TemplateView):
    template_name = "forsati/opportunities/detail.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        slug = kwargs.get("slug")
        ctx["opportunity"] = Opportunity.objects.filter(slug=slug).first()
        language = translation.get_language() or settings.LANGUAGE_CODE
        is_ar = language.startswith("ar")
        if ctx["opportunity"]:
            title = ctx["opportunity"].title
            summary = ctx["opportunity"].description[:140]
            ctx["candidate_keywords"] = extract_keywords(
                text=ctx["opportunity"].description,
                language=language,
                country="JO",
                request=self.request,
            ).get("matches", [])[:8]
            ctx["recruiter_suggestions"] = suggest_keywords(
                query="",
                language=language,
                country="JO",
                pack_type=ctx["opportunity"].type,
                limit=8,
                request=self.request,
            )
        else:
            title = "فرصة غير متاحة" if is_ar else "Opportunity unavailable"
            summary = ""

        ctx.update(
            meta_title=f"{title} | فرصتي" if is_ar else f"{title} | Forsati",
            meta_description=summary or ("تفاصيل الفرصة" if is_ar else "Opportunity details"),
            canonical_url=urljoin(self._base_url(), reverse("forsati-opportunity-detail", kwargs={"slug": slug})),
            hreflang_urls={
                "ar": urljoin(self._base_url(), self._language_url("ar", slug)),
                "en": urljoin(self._base_url(), self._language_url("en", slug)),
            },
        )
        return ctx

    def _base_url(self) -> str:
        return getattr(settings, "SITE_URL", "http://localhost:8000")

    def _language_url(self, language_code: str, slug: str) -> str:
        with translation.override(language_code):
            return reverse("forsati-opportunity-detail", kwargs={"slug": slug})
