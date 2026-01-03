from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                ("last_login", models.DateTimeField(blank=True, null=True, verbose_name="last login")),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone", models.CharField(max_length=30, blank=True)),
                ("role", models.CharField(choices=[("job_seeker", "Job seeker"), ("recruiter", "Recruiter"), ("admin", "Admin")], default="job_seeker", max_length=20)),
                ("status", models.CharField(choices=[("active", "Active"), ("suspended", "Suspended")], default="active", max_length=20)),
                ("is_staff", models.BooleanField(default=False)),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "db_table": "users",
                "indexes": [models.Index(fields=["role", "status"], name="accounts_us_role_5f3d74_idx")],
            },
        ),
        migrations.CreateModel(
            name="CandidateProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("city", models.CharField(max_length=255, blank=True)),
                ("country", models.CharField(max_length=5, default="JO")),
                ("phone", models.CharField(max_length=30, blank=True)),
                ("headline", models.CharField(max_length=255, blank=True)),
                ("summary", models.TextField(blank=True)),
                ("skills_text", models.TextField(blank=True)),
                ("experience_years", models.PositiveIntegerField(default=0)),
                (
                    "availability",
                    models.CharField(
                        choices=[("available", "Available"), ("notice_period", "Notice period"), ("not_available", "Not available")],
                        default="available",
                        max_length=30,
                    ),
                ),
                ("languages", models.JSONField(default=list, blank=True)),
                ("portfolio_links", models.JSONField(default=list, blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="candidate_profile", to="accounts.user")),
            ],
            options={"db_table": "candidate_profiles"},
        ),
        migrations.CreateModel(
            name="OrganizationProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("legal_name", models.CharField(max_length=255)),
                ("brand_name", models.CharField(max_length=255)),
                ("website", models.URLField(blank=True)),
                ("description_ar", models.TextField(blank=True)),
                ("description_en", models.TextField(blank=True)),
                ("industry", models.CharField(max_length=255, blank=True)),
                ("size", models.CharField(max_length=100, blank=True)),
                ("address", models.CharField(max_length=255, blank=True)),
                ("seo_title_ar", models.CharField(max_length=255, blank=True)),
                ("seo_desc_ar", models.CharField(max_length=255, blank=True)),
                ("seo_title_en", models.CharField(max_length=255, blank=True)),
                ("seo_desc_en", models.CharField(max_length=255, blank=True)),
                ("verification_status", models.CharField(choices=[("unverified", "Unverified"), ("pending", "Pending"), ("verified", "Verified")], default="unverified", max_length=20)),
                ("trust_score", models.IntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="organization_profile", to="accounts.user")),
            ],
            options={"db_table": "organization_profiles"},
        ),
    ]
