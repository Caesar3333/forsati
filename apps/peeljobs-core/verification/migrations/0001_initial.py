from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="VerificationRequest",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("user_id", models.PositiveIntegerField(blank=True, null=True)),
                ("status", models.CharField(choices=[("requested", "Requested"), ("pending_upload", "Pending upload"), ("submitted", "Submitted"), ("approved", "Approved"), ("rejected", "Rejected")], default="requested", max_length=30)),
                ("purpose", models.CharField(blank=True, max_length=255)),
                ("notes", models.TextField(blank=True)),
                ("consent_given", models.BooleanField(default=False)),
                ("consent_scope", models.CharField(blank=True, max_length=255)),
                ("consented_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="AuditLog",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("actor_type", models.CharField(blank=True, max_length=50)),
                ("actor_id", models.PositiveIntegerField(blank=True, null=True)),
                ("action", models.CharField(db_index=True, max_length=100)),
                ("context_type", models.CharField(blank=True, max_length=50)),
                ("context_id", models.PositiveIntegerField(blank=True, null=True)),
                ("ip_address", models.CharField(blank=True, max_length=64)),
                ("user_agent", models.CharField(blank=True, max_length=255)),
                ("details_json", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="SecureDocumentMeta",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("storage_key", models.CharField(max_length=512, unique=True)),
                ("original_filename", models.CharField(blank=True, max_length=255)),
                ("content_type", models.CharField(blank=True, max_length=255)),
                ("size_bytes", models.PositiveBigIntegerField(blank=True, null=True)),
                ("checksum_sha256", models.CharField(blank=True, max_length=128)),
                ("provider", models.CharField(default="s3", max_length=50)),
                ("metadata_json", models.JSONField(blank=True, default=dict)),
                ("status", models.CharField(choices=[("pending_upload", "Pending upload"), ("uploaded", "Uploaded"), ("verified", "Verified"), ("rejected", "Rejected")], default="pending_upload", max_length=30)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("request", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="documents", to="verification.verificationrequest")),
            ],
            options={"ordering": ["-created_at"]},
        ),
    ]
