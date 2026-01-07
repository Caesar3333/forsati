from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from rbac.models import Permission, Role, UserRole
from rbac.permissions import IsOwnerAdmin
from rbac.serializers import PermissionSerializer, RoleSerializer, UserRoleSerializer

User = get_user_model()


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all().prefetch_related("permissions")
    serializer_class = RoleSerializer
    permission_classes = [IsOwnerAdmin]


class PermissionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [IsOwnerAdmin]


class UserRoleViewSet(viewsets.ModelViewSet):
    queryset = UserRole.objects.all().select_related("role", "user")
    serializer_class = UserRoleSerializer
    permission_classes = [IsOwnerAdmin]


class MyRolesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        assignments = UserRole.objects.filter(user=request.user).select_related("role")
        roles = [assignment.role.key for assignment in assignments]
        if request.user.role and request.user.role not in roles:
            roles.append(request.user.role)
        return Response({"roles": roles})
