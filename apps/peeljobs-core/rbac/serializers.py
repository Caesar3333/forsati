from rest_framework import serializers

from rbac.models import Permission, Role, UserRole


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ("id", "key", "description", "created_at")
        read_only_fields = ("id", "created_at")


class RoleSerializer(serializers.ModelSerializer):
    permissions = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="key",
    )
    permission_keys = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Role
        fields = ("id", "key", "label", "description", "is_system", "permissions", "permission_keys")
        read_only_fields = ("id",)

    def create(self, validated_data):
        permission_keys = validated_data.pop("permission_keys", [])
        role = super().create(validated_data)
        if permission_keys:
            perms = Permission.objects.filter(key__in=permission_keys)
            role.permissions.set(perms)
        return role

    def update(self, instance, validated_data):
        permission_keys = validated_data.pop("permission_keys", None)
        instance = super().update(instance, validated_data)
        if permission_keys is not None:
            perms = Permission.objects.filter(key__in=permission_keys)
            instance.permissions.set(perms)
        return instance


class UserRoleSerializer(serializers.ModelSerializer):
    role_key = serializers.CharField(source="role.key", read_only=True)

    class Meta:
        model = UserRole
        fields = ("id", "user", "role", "role_key", "scope", "organization", "provider", "created_at")
        read_only_fields = ("id", "created_at", "role_key")
