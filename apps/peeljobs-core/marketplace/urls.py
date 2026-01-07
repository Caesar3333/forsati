from django.urls import include, path
from rest_framework.routers import DefaultRouter

from marketplace.views import (
    ProviderAdminView,
    ProviderMeView,
    ProviderRegisterView,
    ProviderServiceViewSet,
    ProviderStatusView,
    ServiceOrderViewSet,
)

router = DefaultRouter()
router.register(r"services", ProviderServiceViewSet, basename="provider-services")
router.register(r"service-orders", ServiceOrderViewSet, basename="service-orders")

urlpatterns = [
    path("providers/register", ProviderRegisterView.as_view(), name="provider-register"),
    path("providers/me", ProviderMeView.as_view(), name="provider-me"),
    path("providers", ProviderAdminView.as_view(), name="provider-admin"),
    path("providers/<uuid:provider_id>/status", ProviderStatusView.as_view(), name="provider-status"),
    path("", include(router.urls)),
]
