from django.urls import include, path
from rest_framework.routers import DefaultRouter

from jobs.views import OpportunitySearchView, OpportunityViewSet

router = DefaultRouter()
router.register(r"opportunities", OpportunityViewSet, basename="opportunity")

urlpatterns = [
    path("opportunities/search", OpportunitySearchView.as_view(), name="opportunities-search"),
    path("", include(router.urls)),
]
