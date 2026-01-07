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
            name="OrganizationMember",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("role", models.CharField(choices=[("org_owner", "Organization owner"), ("hr_manager", "HR manager"), ("recruiter", "Recruiter"), ("interviewer", "Interviewer"), ("opportunity_manager", "Opportunity manager")], default="recruiter", max_length=40)),
                ("status", models.CharField(choices=[("active", "Active"), ("invited", "Invited")], default="active", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("organization", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="members", to="accounts.organizationprofile")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="org_memberships", to="accounts.user")),
            ],
            options={"db_table": "organization_members", "unique_together": {("organization", "user")}},
        ),
        migrations.CreateModel(
            name="OrganizationInvite",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("email", models.EmailField(max_length=254)),
                ("role", models.CharField(choices=[("org_owner", "Organization owner"), ("hr_manager", "HR manager"), ("recruiter", "Recruiter"), ("interviewer", "Interviewer"), ("opportunity_manager", "Opportunity manager")], max_length=40)),
                ("token", models.UUIDField(default=uuid.uuid4, editable=False)),
                ("status", models.CharField(choices=[("pending", "Pending"), ("accepted", "Accepted"), ("expired", "Expired")], default="pending", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("organization", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="invites", to="accounts.organizationprofile")),
            ],
            options={"db_table": "organization_invites"},
        ),
    ]
