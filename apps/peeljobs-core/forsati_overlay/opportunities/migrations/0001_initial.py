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
            name="Opportunity",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("slug", models.SlugField(unique=True)),
                ("description", models.TextField()),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("job", "Job"),
                            ("internship", "Internship"),
                            ("volunteering", "Volunteering"),
                            ("scholarship", "Scholarship"),
                            ("freelance", "Freelance"),
                        ],
                        default="job",
                        max_length=20,
                    ),
                ),
                ("organization_name", models.CharField(max_length=255)),
                ("location", models.CharField(blank=True, max_length=255)),
                ("is_remote", models.BooleanField(default=False)),
                (
                    "language",
                    models.CharField(
                        choices=[("ar", "Arabic"), ("en", "English")],
                        default="ar",
                        max_length=5,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("published", models.BooleanField(default=True)),
                (
                    "posted_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Opportunity",
                "verbose_name_plural": "Opportunities",
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="OpportunityApplication",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("cover_letter", models.TextField(blank=True)),
                (
                    "resume_object_uri",
                    models.URLField(help_text="Object storage URI for the applicant resume. Do not store raw documents in DB."),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("submitted", "Submitted"),
                            ("in_review", "In review"),
                            ("shortlisted", "Shortlisted"),
                            ("rejected", "Rejected"),
                            ("offered", "Offer extended"),
                        ],
                        default="submitted",
                        max_length=20,
                    ),
                ),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "applicant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="forsati_applications",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "opportunity",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="applications",
                        to="opportunities.opportunity",
                    ),
                ),
            ],
            options={
                "verbose_name": "Opportunity application",
                "verbose_name_plural": "Opportunity applications",
                "unique_together": {("opportunity", "applicant")},
            },
        ),
        migrations.CreateModel(
            name="OpportunityAttachment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("label", models.CharField(max_length=255)),
                (
                    "object_uri",
                    models.URLField(help_text="Encrypted object storage URI; file data is not stored in the database."),
                ),
                ("uploaded_at", models.DateTimeField(auto_now_add=True)),
                (
                    "application",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="attachments",
                        to="opportunities.opportunityapplication",
                    ),
                ),
            ],
            options={
                "verbose_name": "Application attachment",
                "verbose_name_plural": "Application attachments",
            },
        ),
    ]
