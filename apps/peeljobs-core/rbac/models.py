import uuid

from django.conf import settings
from django.db import models


ROLE_SCOPE_CHOICES = [
    ("platform", "Platform"),
    ("organization", "Organization"),
    ("marketplace_provider", "Marketplace provider"),
    ("self", "Self"),
]


class Permission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "rbac_permissions"
        ordering = ["key"]

    def __str__(self) -> str:
        return self.key


class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(max_length=120, unique=True)
    label = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_system = models.BooleanField(default=False)
    permissions = models.ManyToManyField(
        Permission,
        through="RolePermission",
        related_name="roles",
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "rbac_roles"
        ordering = ["key"]

    def __str__(self) -> str:
        return self.key


class RolePermission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

    class Meta:
        db_table = "rbac_role_permissions"
        unique_together = ("role", "permission")

    def __str__(self) -> str:
        return f"{self.role_id}:{self.permission_id}"


class UserRole(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="rbac_roles")
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="user_roles")
    scope = models.CharField(max_length=32, choices=ROLE_SCOPE_CHOICES, default="self")
    organization = models.ForeignKey(
        "accounts.OrganizationProfile",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="rbac_roles",
    )
    provider = models.ForeignKey(
        "marketplace.ProviderProfile",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="rbac_roles",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "rbac_user_roles"
        unique_together = ("user", "role", "scope", "organization", "provider")

    def __str__(self) -> str:
        return f"{self.user_id}:{self.role_id}:{self.scope}"
