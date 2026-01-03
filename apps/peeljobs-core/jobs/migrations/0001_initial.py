from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Opportunity",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("type", models.CharField(choices=[("job", "Job"), ("internship", "Internship"), ("graduate_training", "Graduate training"), ("volunteering", "Volunteering"), ("scholarship", "Scholarship"), ("freelance", "Freelance")], default="job", max_length=30)),
                ("title_ar", models.CharField(max_length=255, blank=True)),
                ("title_en", models.CharField(max_length=255, blank=True)),
                ("description_ar", models.TextField(blank=True)),
                ("description_en", models.TextField(blank=True)),
                ("requirements_ar", models.TextField(blank=True)),
                ("requirements_en", models.TextField(blank=True)),
                ("city", models.CharField(max_length=255, blank=True)),
                ("country", models.CharField(max_length=5, blank=True)),
                ("work_mode", models.CharField(choices=[("onsite", "On-site"), ("remote", "Remote"), ("hybrid", "Hybrid")], default="onsite", max_length=20)),
                ("salary_min", models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ("salary_max", models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ("currency", models.CharField(max_length=10, blank=True)),
                ("employment_type", models.CharField(max_length=30, blank=True)),
                ("category", models.CharField(max_length=255, blank=True)),
                ("domain", models.CharField(max_length=255, blank=True)),
                ("keywords_json", models.JSONField(default=list, blank=True)),
                ("status", models.CharField(choices=[("draft", "Draft"), ("published", "Published"), ("archived", "Archived")], default="draft", max_length=20)),
                ("published_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("organization", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="opportunities", to="accounts.organizationprofile")),
            ],
            options={
                "db_table": "opportunities",
                "ordering": ["-created_at"],
                "indexes": [models.Index(fields=["organization", "status", "published_at"], name="jobs_opport_organiz_3b92da_idx")],
            },
        ),
    ]
