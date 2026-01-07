from rest_framework import serializers

from organizations.models import OrganizationInvite, OrganizationMember


class OrganizationMemberSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = OrganizationMember
        fields = ("id", "organization", "user", "user_email", "role", "status", "created_at")
        read_only_fields = ("id", "created_at", "user_email")


class OrganizationInviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationInvite
        fields = ("id", "organization", "email", "role", "token", "status", "created_at")
        read_only_fields = ("id", "token", "status", "created_at")
