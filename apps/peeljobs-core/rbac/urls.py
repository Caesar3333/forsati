from django.urls import include, path
from rest_framework.routers import DefaultRouter

from rbac.views import MyRolesView, PermissionViewSet, RoleViewSet, UserRoleViewSet

router = DefaultRouter()
router.register(r"rbac/roles", RoleViewSet, basename="rbac-roles")
router.register(r"rbac/permissions", PermissionViewSet, basename="rbac-permissions")
router.register(r"rbac/user-roles", UserRoleViewSet, basename="rbac-user-roles")

urlpatterns = [
    path("rbac/me", MyRolesView.as_view(), name="rbac-me"),
    path("", include(router.urls)),
]
