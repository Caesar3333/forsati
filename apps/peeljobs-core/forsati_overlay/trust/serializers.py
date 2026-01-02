from django.utils import timezone
from rest_framework import serializers

from forsati_overlay.trust.models import (
    AuditLog,
    DocumentAccessRequest,
    SecureDocument,
    TrustScore,
    VerificationRequest,
)


class VerificationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationRequest
        fields = [
            "id",
            "request_type",
            "organization_name",
            "evidence_object_uri",
            "status",
            "notes",
            "reviewed_by",
            "reviewed_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["status", "reviewed_by", "reviewed_at", "created_at", "updated_at"]

    def update(self, instance, validated_data):
        user = self.context["request"].user
        if not user.is_staff:
            validated_data.pop("status", None)
            validated_data.pop("reviewed_by", None)
            validated_data.pop("reviewed_at", None)
        else:
            if "status" in validated_data:
                validated_data.setdefault("reviewed_by", user)
                validated_data.setdefault("reviewed_at", timezone.now())
        return super().update(instance, validated_data)

    def create(self, validated_data):
        request = self.context["request"]
        return VerificationRequest.objects.create(requester=request.user, **validated_data)


class TrustScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrustScore
        fields = [
            "id",
            "subject_user",
            "organization_name",
            "score",
            "weight",
            "reason",
            "calculated_at",
        ]
        read_only_fields = ["calculated_at"]

    def validate(self, attrs):
        user = self.context["request"].user
        if not user.is_staff:
            raise serializers.ValidationError("Only staff can manage trust scores.")
        return super().validate(attrs)


class SecureDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecureDocument
        fields = [
            "id",
            "label",
            "object_uri",
            "checksum_sha256",
            "size_bytes",
            "mime_type",
            "is_encrypted",
            "uploaded_at",
            "expires_at",
        ]
        read_only_fields = ["is_encrypted", "uploaded_at"]

    def create(self, validated_data):
        request = self.context["request"]
        return SecureDocument.objects.create(owner=request.user, is_encrypted=True, **validated_data)


class DocumentAccessRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentAccessRequest
        fields = [
            "id",
            "secure_document",
            "requester",
            "status",
            "reason",
            "expires_at",
            "consent_granted_by",
            "created_at",
            "responded_at",
        ]
        read_only_fields = ["requester", "consent_granted_by", "created_at", "responded_at"]

    def create(self, validated_data):
        request = self.context["request"]
        return DocumentAccessRequest.objects.create(requester=request.user, **validated_data)

    def update(self, instance, validated_data):
        user = self.context["request"].user
        if user.is_staff or user == instance.secure_document.owner:
            if "status" in validated_data:
                validated_data["consent_granted_by"] = user
                validated_data["responded_at"] = timezone.now()
        else:
            validated_data.pop("status", None)
        validated_data.pop("requester", None)
        return super().update(instance, validated_data)


class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = ["id", "actor", "action", "object_type", "object_id", "metadata", "ip_address", "created_at"]
        read_only_fields = ["id", "actor", "created_at"]

    def create(self, validated_data):
        request = self.context["request"]
        return AuditLog.objects.create(actor=request.user if request.user.is_authenticated else None, **validated_data)
