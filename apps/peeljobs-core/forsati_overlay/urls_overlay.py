from django.urls import include, path

from forsati_overlay.i18n.views import LanguageSwitchView
from forsati_overlay.opportunities.api import router as opportunities_router
from forsati_overlay.opportunities.views import OpportunityDetailView, OpportunityListView

urlpatterns = [
    path("switch-language/", LanguageSwitchView.as_view(), name="forsati-language-switch"),
    path("opportunities/", OpportunityListView.as_view(), name="forsati-opportunity-list"),
    path("opportunities/<slug:slug>/", OpportunityDetailView.as_view(), name="forsati-opportunity-detail"),
    path("api/forsati/", include(opportunities_router.urls)),
]
