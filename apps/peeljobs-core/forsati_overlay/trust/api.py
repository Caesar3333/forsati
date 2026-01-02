from django.db import models
from rest_framework import permissions, routers, viewsets

from forsati_overlay.trust.models import (
    AuditLog,
    DocumentAccessRequest,
    SecureDocument,
    TrustScore,
    VerificationRequest,
)
from forsati_overlay.trust.serializers import (
    AuditLogSerializer,
    DocumentAccessRequestSerializer,
    SecureDocumentSerializer,
    TrustScoreSerializer,
    VerificationRequestSerializer,
)


class IsStaffOrOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True
        owner = getattr(obj, "owner", None) or getattr(obj, "requester", None)
        return owner == request.user


class VerificationRequestViewSet(viewsets.ModelViewSet):
    serializer_class = VerificationRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = VerificationRequest.objects.all()
        if not self.request.user.is_staff:
            qs = qs.filter(requester=self.request.user)
        return qs


class TrustScoreViewSet(viewsets.ModelViewSet):
    serializer_class = TrustScoreSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = TrustScore.objects.all()


class SecureDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = SecureDocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsStaffOrOwner]

    def get_queryset(self):
        qs = SecureDocument.objects.all()
        if not self.request.user.is_staff:
            qs = qs.filter(owner=self.request.user)
        return qs


class DocumentAccessRequestViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentAccessRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsStaffOrOwner]

    def get_queryset(self):
        qs = DocumentAccessRequest.objects.select_related("secure_document")
        user = self.request.user
        if not user.is_staff:
            qs = qs.filter(
                models.Q(requester=user) | models.Q(secure_document__owner=user)
            )
        return qs


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = AuditLog.objects.all()


router = routers.DefaultRouter()
router.register(r"verification-requests", VerificationRequestViewSet, basename="forsati-verification-request")
router.register(r"trust-scores", TrustScoreViewSet, basename="forsati-trust-score")
router.register(r"secure-documents", SecureDocumentViewSet, basename="forsati-secure-document")
router.register(r"document-access-requests", DocumentAccessRequestViewSet, basename="forsati-document-access-request")
router.register(r"audit-logs", AuditLogViewSet, basename="forsati-audit-log")
