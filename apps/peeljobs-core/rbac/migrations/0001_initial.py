from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("accounts", "0001_initial"),
        ("marketplace", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Permission",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("key", models.CharField(max_length=120, unique=True)),
                ("description", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"db_table": "rbac_permissions", "ordering": ["key"]},
        ),
        migrations.CreateModel(
            name="Role",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("key", models.CharField(max_length=120, unique=True)),
                ("label", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True)),
                ("is_system", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"db_table": "rbac_roles", "ordering": ["key"]},
        ),
        migrations.CreateModel(
            name="RolePermission",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("permission", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="rbac.permission")),
                ("role", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="rbac.role")),
            ],
            options={"db_table": "rbac_role_permissions", "unique_together": {("role", "permission")}},
        ),
        migrations.CreateModel(
            name="UserRole",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("scope", models.CharField(choices=[("platform", "Platform"), ("organization", "Organization"), ("marketplace_provider", "Marketplace provider"), ("self", "Self")], default="self", max_length=32)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("organization", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name="rbac_roles", to="accounts.organizationprofile")),
                ("provider", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name="rbac_roles", to="marketplace.providerprofile")),
                ("role", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="user_roles", to="rbac.role")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="rbac_roles", to="accounts.user")),
            ],
            options={"db_table": "rbac_user_roles", "unique_together": {("user", "role", "scope", "organization", "provider")}},
        ),
        migrations.AddField(
            model_name="role",
            name="permissions",
            field=models.ManyToManyField(blank=True, related_name="roles", through="rbac.RolePermission", to="rbac.permission"),
        ),
    ]
