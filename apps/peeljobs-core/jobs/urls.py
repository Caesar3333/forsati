from django.urls import include, path
from rest_framework.routers import DefaultRouter

from jobs.views import OpportunitySearchView, OpportunityViewSet, SavedOpportunitiesView, SaveOpportunityView

router = DefaultRouter()
router.register(r"opportunities", OpportunityViewSet, basename="opportunity")

urlpatterns = [
    path("opportunities/search", OpportunitySearchView.as_view(), name="opportunities-search"),
    path("opportunities/saved", SavedOpportunitiesView.as_view(), name="opportunities-saved"),
    path("opportunities/<uuid:opportunity_id>/save", SaveOpportunityView.as_view(), name="opportunities-save"),
    path("", include(router.urls)),
]
