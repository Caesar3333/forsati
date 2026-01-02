from urllib.parse import urljoin

from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.utils import translation
from django.views.generic import TemplateView, View

from .content import PAGE_CONTENT


class LocalizedRootRedirectView(View):
    def get(self, request, *args, **kwargs):
        preferred = request.COOKIES.get("forsati_lang") or getattr(request, "LANGUAGE_CODE", settings.LANGUAGE_CODE)
        language = preferred if preferred in dict(settings.LANGUAGES) else settings.LANGUAGE_CODE
        with translation.override(language):
            target = reverse("forsati-opportunity-list")
        return HttpResponseRedirect(target)


class PublicPageView(TemplateView):
    template_name = "forsati/public/page.html"
    page_key: str = "about"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        language = translation.get_language() or settings.LANGUAGE_CODE
        content = PAGE_CONTENT[self.page_key]["ar" if language.startswith("ar") else "en"]
        base_url = getattr(settings, "SITE_URL", "http://localhost:8000")
        canonical_path = reverse(f"forsati-{self.page_key}")
        context.update(
            page_key=self.page_key,
            page_title=content.title,
            page_body=content.body,
            meta_title=content.title,
            meta_description=content.meta_description,
            canonical_url=urljoin(base_url, canonical_path),
            hreflang_urls={
                "ar": urljoin(base_url, self._language_url("ar")),
                "en": urljoin(base_url, self._language_url("en")),
            },
        )
        return context

    def _language_url(self, language_code: str) -> str:
        with translation.override(language_code):
            return reverse(f"forsati-{self.page_key}")


class RobotsTxtView(View):
    def get(self, request, *args, **kwargs):
        base_url = getattr(settings, "SITE_URL", request.build_absolute_uri("/").rstrip("/"))
        content = "\n".join([
            "User-agent: *",
            "Disallow:",
            f"Sitemap: {base_url}/sitemap.xml",
        ])
        return HttpResponse(content, content_type="text/plain")


class SitemapView(View):
    def get(self, request, *args, **kwargs):
        base_url = getattr(settings, "SITE_URL", request.build_absolute_uri("/").rstrip("/"))
        page_names = [
            "forsati-opportunity-list",
            "forsati-about",
            "forsati-privacy",
            "forsati-cookies",
            "forsati-security",
            "forsati-terms",
            "forsati-contact",
        ]
        languages = ["ar", "en"]

        url_entries = []
        for name in page_names:
            for lang in languages:
                with translation.override(lang):
                    path = reverse(name)
                loc = urljoin(base_url + "/", path.lstrip("/"))
                alternates = []
                for alt_lang in languages:
                    with translation.override(alt_lang):
                        alt_path = reverse(name)
                    alternates.append(
                        f'    <xhtml:link rel="alternate" hreflang="{alt_lang}" href="{urljoin(base_url + "/", alt_path.lstrip("/"))}" />'
                    )
                url_entries.append(
                    "  <url>\n"
                    f"    <loc>{loc}</loc>\n"
                    + "\n".join(alternates)
                    + "\n  </url>"
                )

        xml = (
            "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
            "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" "
            "xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\n"
            + "\n".join(url_entries)
            + "\n</urlset>"
        )
        return HttpResponse(xml, content_type="application/xml")
