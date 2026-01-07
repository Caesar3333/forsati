from django.db.models import Q
from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import OrganizationProfile
from organizations.models import OrganizationMember
from jobs.models import Opportunity, SavedOpportunity
from jobs.serializers import OpportunitySerializer, SavedOpportunitySerializer
from rbac.permissions import IsOwnerAdmin


class OpportunityPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return view._can_manage(request.user, obj)


class OpportunityViewSet(viewsets.ModelViewSet):
    serializer_class = OpportunitySerializer
    permission_classes = [OpportunityPermission]

    def _resolve_org(self, user):
        org = OrganizationProfile.objects.filter(user=user).first()
        if org:
            return org
        membership = OrganizationMember.objects.filter(user=user).select_related("organization").first()
        return membership.organization if membership else None

    def _can_manage(self, user, opportunity):
        if user.is_superuser or user.role in {"owner", "admin"}:
            return True
        org = self._resolve_org(user)
        return bool(org and opportunity.organization_id == org.id)

    def get_queryset(self):
        user = self.request.user
        queryset = Opportunity.objects.all()
        if user.is_authenticated and (user.is_superuser or user.role in {"owner", "admin"}):
            return queryset
        org = self._resolve_org(user) if user.is_authenticated else None
        if org:
            return queryset.filter(Q(organization=org) | Q(status="published", moderation_status="approved"))
        return queryset.filter(status="published", moderation_status="approved")

    def perform_create(self, serializer):
        org = self._resolve_org(self.request.user)
        if not org:
            raise ValidationError("Organization profile required.")
        moderation_status = "approved" if self.request.user.role in {"owner", "admin"} or self.request.user.is_superuser else "pending"
        serializer.save(organization=org, moderation_status=moderation_status)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def publish(self, request, pk=None):
        opportunity = self.get_object()
        if not self._can_manage(request.user, opportunity):
            return Response({"detail": "forbidden"}, status=status.HTTP_403_FORBIDDEN)
        opportunity.status = "published"
        opportunity.published_at = timezone.now()
        opportunity.save(update_fields=["status", "published_at"])
        return Response(OpportunitySerializer(opportunity).data)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def unpublish(self, request, pk=None):
        opportunity = self.get_object()
        if not self._can_manage(request.user, opportunity):
            return Response({"detail": "forbidden"}, status=status.HTTP_403_FORBIDDEN)
        opportunity.status = "draft"
        opportunity.save(update_fields=["status"])
        return Response(OpportunitySerializer(opportunity).data)

    @action(detail=True, methods=["post"], permission_classes=[IsOwnerAdmin])
    def moderate(self, request, pk=None):
        opportunity = self.get_object()
        moderation_status = request.data.get("moderation_status")
        if moderation_status not in dict(Opportunity.MODERATION_CHOICES):
            return Response({"detail": "invalid moderation_status"}, status=status.HTTP_400_BAD_REQUEST)
        opportunity.moderation_status = moderation_status
        opportunity.moderation_notes = request.data.get("moderation_notes", "")
        opportunity.save(update_fields=["moderation_status", "moderation_notes"])
        return Response(OpportunitySerializer(opportunity).data)


class OpportunitySearchView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        q = request.GET.get("q", "")
        city = request.GET.get("city", "")
        country = request.GET.get("country", "")
        opportunity_type = request.GET.get("type", "")
        queryset = Opportunity.objects.filter(status="published", moderation_status="approved")
        if q:
            queryset = queryset.filter(
                Q(title_en__icontains=q)
                | Q(title_ar__icontains=q)
                | Q(description_en__icontains=q)
                | Q(description_ar__icontains=q)
            )
        if city:
            queryset = queryset.filter(city__iexact=city)
        if country:
            queryset = queryset.filter(country__iexact=country)
        if opportunity_type:
            queryset = queryset.filter(type=opportunity_type)
        serializer = OpportunitySerializer(queryset[:200], many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SavedOpportunitiesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        saved = SavedOpportunity.objects.filter(user=request.user).select_related("opportunity")
        return Response(SavedOpportunitySerializer(saved, many=True).data)


class SaveOpportunityView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, opportunity_id):
        opportunity = Opportunity.objects.filter(id=opportunity_id).first()
        if not opportunity:
            return Response({"detail": "opportunity not found"}, status=status.HTTP_404_NOT_FOUND)
        saved, _ = SavedOpportunity.objects.get_or_create(user=request.user, opportunity=opportunity)
        return Response(SavedOpportunitySerializer(saved).data, status=status.HTTP_201_CREATED)

    def delete(self, request, opportunity_id):
        SavedOpportunity.objects.filter(user=request.user, opportunity_id=opportunity_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
