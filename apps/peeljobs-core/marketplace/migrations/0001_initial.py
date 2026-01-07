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
            name="ProviderProfile",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("provider_type", models.CharField(choices=[("provider_coach", "Coach"), ("provider_reviewer", "Reviewer"), ("provider_training", "Training")], max_length=40)),
                ("status", models.CharField(choices=[("pending", "Pending"), ("approved", "Approved"), ("suspended", "Suspended")], default="pending", max_length=20)),
                ("headline", models.CharField(max_length=255, blank=True)),
                ("bio", models.TextField(blank=True)),
                ("skills_json", models.JSONField(default=list, blank=True)),
                ("languages_json", models.JSONField(default=list, blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="provider_profile", to="accounts.user")),
            ],
            options={"db_table": "provider_profiles"},
        ),
        migrations.CreateModel(
            name="ProviderService",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True)),
                ("category", models.CharField(choices=[("cv_review", "CV review"), ("interview_prep", "Interview prep"), ("career_strategy", "Career strategy")], default="cv_review", max_length=40)),
                ("price", models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ("currency", models.CharField(default="USD", max_length=10)),
                ("status", models.CharField(choices=[("draft", "Draft"), ("published", "Published"), ("archived", "Archived")], default="draft", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("provider", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="services", to="marketplace.providerprofile")),
            ],
            options={"db_table": "provider_services", "ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="ServiceOrder",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("status", models.CharField(choices=[("requested", "Requested"), ("accepted", "Accepted"), ("in_progress", "In progress"), ("completed", "Completed"), ("canceled", "Canceled")], default="requested", max_length=20)),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("requester", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="service_orders", to="accounts.user")),
                ("service", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="orders", to="marketplace.providerservice")),
            ],
            options={"db_table": "service_orders", "ordering": ["-created_at"]},
        ),
    ]
