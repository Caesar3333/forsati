from django.contrib import admin

from forsati_overlay.trust.models import (
    AuditLog,
    DocumentAccessRequest,
    SecureDocument,
    TrustScore,
    VerificationRequest,
)


@admin.register(VerificationRequest)
class VerificationRequestAdmin(admin.ModelAdmin):
    list_display = ("requester", "request_type", "status", "created_at", "reviewed_by")
    list_filter = ("status", "request_type")
    search_fields = ("requester__email", "organization_name")


@admin.register(TrustScore)
class TrustScoreAdmin(admin.ModelAdmin):
    list_display = ("subject_user", "organization_name", "score", "weight", "calculated_at")
    list_filter = ("score",)
    search_fields = ("subject_user__email", "organization_name")


@admin.register(SecureDocument)
class SecureDocumentAdmin(admin.ModelAdmin):
    list_display = ("label", "owner", "is_encrypted", "uploaded_at", "expires_at")
    search_fields = ("label", "owner__email")


@admin.register(DocumentAccessRequest)
class DocumentAccessRequestAdmin(admin.ModelAdmin):
    list_display = ("secure_document", "requester", "status", "created_at", "expires_at")
    list_filter = ("status",)
    search_fields = ("secure_document__label", "requester__email")


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ("action", "actor", "object_type", "object_id", "created_at")
    search_fields = ("action", "actor__email", "object_type", "object_id")
    readonly_fields = ("actor", "created_at")
