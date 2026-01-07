from rest_framework import permissions, status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from marketplace.models import ProviderProfile, ProviderService, ServiceOrder
from marketplace.serializers import (
    ProviderProfileSerializer,
    ProviderServiceSerializer,
    ServiceOrderSerializer,
)
from rbac.permissions import IsOwnerAdmin


class ProviderRegisterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        existing = ProviderProfile.objects.filter(user=request.user).first()
        if existing:
            return Response(ProviderProfileSerializer(existing).data, status=status.HTTP_200_OK)
        provider_type = request.data.get("provider_type", "provider_coach")
        provider = ProviderProfile.objects.create(user=request.user, provider_type=provider_type)
        return Response(ProviderProfileSerializer(provider).data, status=status.HTTP_201_CREATED)


class ProviderMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        provider = ProviderProfile.objects.filter(user=request.user).first()
        if not provider:
            return Response({"detail": "provider not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(ProviderProfileSerializer(provider).data)

    def patch(self, request):
        provider = ProviderProfile.objects.filter(user=request.user).first()
        if not provider:
            return Response({"detail": "provider not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProviderProfileSerializer(provider, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ProviderAdminView(APIView):
    permission_classes = [IsOwnerAdmin]

    def get(self, request):
        providers = ProviderProfile.objects.all().order_by("-created_at")
        return Response(ProviderProfileSerializer(providers, many=True).data)


class ProviderStatusView(APIView):
    permission_classes = [IsOwnerAdmin]

    def patch(self, request, provider_id):
        provider = ProviderProfile.objects.filter(id=provider_id).first()
        if not provider:
            return Response({"detail": "provider not found"}, status=status.HTTP_404_NOT_FOUND)
        status_value = request.data.get("status")
        if status_value not in dict(ProviderProfile.STATUS_CHOICES):
            return Response({"detail": "invalid status"}, status=status.HTTP_400_BAD_REQUEST)
        provider.status = status_value
        provider.save(update_fields=["status"])
        return Response(ProviderProfileSerializer(provider).data)


class ProviderServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ProviderServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and (user.is_superuser or user.role in {"owner", "admin"}):
            return ProviderService.objects.all()
        provider = ProviderProfile.objects.filter(user=user).first() if user.is_authenticated else None
        if provider:
            return ProviderService.objects.filter(provider=provider)
        return ProviderService.objects.filter(status="published")

    def perform_create(self, serializer):
        provider = ProviderProfile.objects.filter(user=self.request.user).first()
        if not provider:
            raise ValidationError("Provider profile required.")
        serializer.save(provider=provider)


class ServiceOrderViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or user.role in {"owner", "admin"}:
            return ServiceOrder.objects.all()
        provider = ProviderProfile.objects.filter(user=user).first()
        if provider:
            return ServiceOrder.objects.filter(service__provider=provider)
        return ServiceOrder.objects.filter(requester=user)

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)
