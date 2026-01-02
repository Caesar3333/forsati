from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class VerificationRequest(models.Model):
    class RequestType(models.TextChoices):
        ORGANIZATION = "organization", _("Organization")
        CANDIDATE = "candidate", _("Candidate")

    class Status(models.TextChoices):
        PENDING = "pending", _("Pending")
        APPROVED = "approved", _("Approved")
        REJECTED = "rejected", _("Rejected")

    requester = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="forsati_verification_requests",
    )
    request_type = models.CharField(max_length=20, choices=RequestType.choices)
    organization_name = models.CharField(max_length=255, blank=True)
    evidence_object_uri = models.URLField(
        blank=True,
        help_text=_("Encrypted object storage URI for supporting evidence."),
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )
    notes = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="forsati_reviewed_verification_requests",
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Verification request")
        verbose_name_plural = _("Verification requests")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.get_request_type_display()} - {self.status}"


class TrustScore(models.Model):
    subject_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="forsati_trust_scores",
    )
    organization_name = models.CharField(max_length=255, blank=True)
    score = models.PositiveIntegerField(default=0)
    weight = models.PositiveIntegerField(default=1)
    reason = models.TextField(blank=True)
    calculated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Trust score")
        verbose_name_plural = _("Trust scores")
        ordering = ["-calculated_at"]

    def __str__(self):
        label = self.organization_name or getattr(self.subject_user, "email", "unknown")
        return f"TrustScore({label}={self.score})"


class SecureDocument(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="forsati_secure_documents",
    )
    label = models.CharField(max_length=255)
    object_uri = models.URLField(
        help_text=_("Encrypted object storage URI; raw documents are never stored in DB."),
    )
    checksum_sha256 = models.CharField(max_length=64, blank=True)
    size_bytes = models.PositiveBigIntegerField(default=0)
    mime_type = models.CharField(max_length=255, blank=True)
    is_encrypted = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = _("Secure document")
        verbose_name_plural = _("Secure documents")
        ordering = ["-uploaded_at"]

    def __str__(self):
        return f"Doc({self.label})"


class DocumentAccessRequest(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", _("Pending")
        APPROVED = "approved", _("Approved")
        DENIED = "denied", _("Denied")
        REVOKED = "revoked", _("Revoked")

    secure_document = models.ForeignKey(
        SecureDocument,
        on_delete=models.CASCADE,
        related_name="access_requests",
    )
    requester = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="forsati_document_access_requests",
    )
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    reason = models.TextField(blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    consent_granted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="forsati_document_consent_grants",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    responded_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = _("Document access request")
        verbose_name_plural = _("Document access requests")
        ordering = ["-created_at"]
        unique_together = ("secure_document", "requester", "status")

    def __str__(self):
        return f"AccessRequest({self.status}) for {self.secure_document}"


class AuditLog(models.Model):
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="forsati_audit_logs",
    )
    action = models.CharField(max_length=255)
    object_type = models.CharField(max_length=255, blank=True)
    object_id = models.CharField(max_length=64, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Audit log")
        verbose_name_plural = _("Audit logs")
        ordering = ["-created_at"]

    def __str__(self):
        return f"Audit({self.action})"
