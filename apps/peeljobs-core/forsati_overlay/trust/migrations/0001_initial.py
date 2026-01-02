from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="AuditLog",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("action", models.CharField(max_length=255)),
                ("object_type", models.CharField(blank=True, max_length=255)),
                ("object_id", models.CharField(blank=True, max_length=64)),
                ("metadata", models.JSONField(blank=True, default=dict)),
                ("ip_address", models.GenericIPAddressField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "actor",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="forsati_audit_logs",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Audit log",
                "verbose_name_plural": "Audit logs",
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="SecureDocument",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("label", models.CharField(max_length=255)),
                (
                    "object_uri",
                    models.URLField(
                        help_text="Encrypted object storage URI; raw documents are never stored in DB.",
                    ),
                ),
                ("checksum_sha256", models.CharField(blank=True, max_length=64)),
                ("size_bytes", models.PositiveBigIntegerField(default=0)),
                ("mime_type", models.CharField(blank=True, max_length=255)),
                ("is_encrypted", models.BooleanField(default=True)),
                ("uploaded_at", models.DateTimeField(auto_now_add=True)),
                ("expires_at", models.DateTimeField(blank=True, null=True)),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="forsati_secure_documents",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Secure document",
                "verbose_name_plural": "Secure documents",
                "ordering": ["-uploaded_at"],
            },
        ),
        migrations.CreateModel(
            name="TrustScore",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("organization_name", models.CharField(blank=True, max_length=255)),
                ("score", models.PositiveIntegerField(default=0)),
                ("weight", models.PositiveIntegerField(default=1)),
                ("reason", models.TextField(blank=True)),
                ("calculated_at", models.DateTimeField(auto_now_add=True)),
                (
                    "subject_user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="forsati_trust_scores",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Trust score",
                "verbose_name_plural": "Trust scores",
                "ordering": ["-calculated_at"],
            },
        ),
        migrations.CreateModel(
            name="VerificationRequest",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "request_type",
                    models.CharField(
                        choices=[("organization", "Organization"), ("candidate", "Candidate")],
                        max_length=20,
                    ),
                ),
                ("organization_name", models.CharField(blank=True, max_length=255)),
                (
                    "evidence_object_uri",
                    models.URLField(blank=True, help_text="Encrypted object storage URI for supporting evidence."),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[("pending", "Pending"), ("approved", "Approved"), ("rejected", "Rejected")],
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("notes", models.TextField(blank=True)),
                ("reviewed_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "requester",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="forsati_verification_requests",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "reviewed_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="forsati_reviewed_verification_requests",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Verification request",
                "verbose_name_plural": "Verification requests",
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="DocumentAccessRequest",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("approved", "Approved"),
                            ("denied", "Denied"),
                            ("revoked", "Revoked"),
                        ],
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("reason", models.TextField(blank=True)),
                ("expires_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("responded_at", models.DateTimeField(blank=True, null=True)),
                (
                    "consent_granted_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="forsati_document_consent_grants",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "requester",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="forsati_document_access_requests",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "secure_document",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="access_requests",
                        to="trust.securedocument",
                    ),
                ),
            ],
            options={
                "verbose_name": "Document access request",
                "verbose_name_plural": "Document access requests",
                "ordering": ["-created_at"],
                "unique_together": {("secure_document", "requester", "status")},
            },
        ),
    ]
