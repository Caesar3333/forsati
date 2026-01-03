import uuid

from django.db import models


class VerificationRequest(models.Model):
    TYPE_CHOICES = [
        ("id", "ID"),
        ("passport", "Passport"),
        ("non_criminal", "Non-criminal"),
        ("medical", "Medical"),
        ("other", "Other"),
    ]

    STATUS_CHOICES = [
        ("requested", "Requested"),
        ("pending_upload", "Pending upload"),
        ("submitted", "Submitted"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="requested")
    requested_by_org = models.ForeignKey(
        "accounts.OrganizationProfile",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="verification_requests",
    )
    candidate = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="verification_requests",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "verification_requests"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"VerificationRequest({self.id})"


class SecureDocumentMeta(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    request = models.ForeignKey(
        VerificationRequest,
        on_delete=models.CASCADE,
        related_name="documents",
    )
    file_key = models.CharField(max_length=512, unique=True)
    storage_provider = models.CharField(max_length=50, default="s3")
    sha256 = models.CharField(max_length=128, blank=True)
    mime = models.CharField(max_length=255, blank=True)
    size = models.PositiveBigIntegerField(null=True, blank=True)
    retention_until = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "secure_document_meta"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"SecureDocumentMeta({self.file_key})"


class ConsentGrant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    candidate = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="consents",
    )
    org = models.ForeignKey(
        "accounts.OrganizationProfile",
        on_delete=models.CASCADE,
        related_name="consents",
    )
    scope = models.CharField(max_length=255, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "consent_grants"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"ConsentGrant({self.id})"


class AuditLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    actor = models.ForeignKey(
        "accounts.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="audit_logs",
    )
    action = models.CharField(max_length=100, db_index=True)
    resource_type = models.CharField(max_length=50, blank=True)
    resource_id = models.CharField(max_length=64, blank=True)
    ip = models.CharField(max_length=64, blank=True)
    user_agent = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "audit_logs"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"AuditLog({self.action})"
