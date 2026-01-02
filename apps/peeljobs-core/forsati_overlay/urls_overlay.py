from django.conf.urls.i18n import i18n_patterns
from django.urls import include, path

from forsati_overlay.i18n.views import LanguageSwitchView
from forsati_overlay.opportunities.api import router as opportunities_router
from forsati_overlay.keywords.api import (
    AtsScoreView,
    KeywordExtractView,
    KeywordSuggestView,
    MatchCandidatesView,
    MatchOpportunitiesView,
)
from forsati_overlay.public_pages.views import (
    LocalizedRootRedirectView,
    PublicPageView,
    RobotsTxtView,
    SitemapView,
)
from forsati_overlay.trust.api import router as trust_router
from forsati_overlay.opportunities.views import OpportunityDetailView, OpportunityListView

urlpatterns = [
    path("api/forsati/", include(opportunities_router.urls)),
    path("api/forsati/trust/", include(trust_router.urls)),
    path("api/keywords/suggest", KeywordSuggestView.as_view(), name="forsati-keywords-suggest"),
    path("api/keywords/extract", KeywordExtractView.as_view(), name="forsati-keywords-extract"),
    path("api/ats/score", AtsScoreView.as_view(), name="forsati-ats-score"),
    path("api/match/candidates", MatchCandidatesView.as_view(), name="forsati-match-candidates"),
    path("api/match/opportunities", MatchOpportunitiesView.as_view(), name="forsati-match-opportunities"),
    path("", LocalizedRootRedirectView.as_view(), name="forsati-root"),
    path("robots.txt", RobotsTxtView.as_view(), name="forsati-robots"),
    path("sitemap.xml", SitemapView.as_view(), name="forsati-sitemap"),
]

urlpatterns += i18n_patterns(
    path("switch-language/", LanguageSwitchView.as_view(), name="forsati-language-switch"),
    path("", OpportunityListView.as_view(), name="forsati-opportunity-list"),
    path("opportunities/<slug:slug>/", OpportunityDetailView.as_view(), name="forsati-opportunity-detail"),
    path("about/", PublicPageView.as_view(page_key="about"), name="forsati-about"),
    path("privacy/", PublicPageView.as_view(page_key="privacy"), name="forsati-privacy"),
    path("cookies/", PublicPageView.as_view(page_key="cookies"), name="forsati-cookies"),
    path("security/", PublicPageView.as_view(page_key="security"), name="forsati-security"),
    path("terms/", PublicPageView.as_view(page_key="terms"), name="forsati-terms"),
    path("contact/", PublicPageView.as_view(page_key="contact"), name="forsati-contact"),
    prefix_default_language=True,
)
