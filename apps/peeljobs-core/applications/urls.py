from django.urls import include, path
from rest_framework.routers import DefaultRouter

from applications.views import (
    ApplicationNoteView,
    ApplicationStageView,
    ApplicationViewSet,
    ApplyView,
    MyApplicationsView,
    OrgApplicationsView,
)

router = DefaultRouter()
router.register(r"applications", ApplicationViewSet, basename="application")

urlpatterns = [
    path("opportunities/<uuid:opportunity_id>/apply", ApplyView.as_view(), name="opportunity-apply"),
    path("applications/my", MyApplicationsView.as_view(), name="applications-my"),
    path("applications/org", OrgApplicationsView.as_view(), name="applications-org"),
    path("applications/<uuid:application_id>/stage", ApplicationStageView.as_view(), name="applications-stage"),
    path("applications/<uuid:application_id>/notes", ApplicationNoteView.as_view(), name="applications-notes"),
    path("", include(router.urls)),
]
