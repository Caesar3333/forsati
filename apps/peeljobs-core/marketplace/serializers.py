from django.contrib.auth import get_user_model
from rest_framework import serializers

from marketplace.models import ProviderProfile, ProviderService, ServiceOrder

User = get_user_model()


class ProviderProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = ProviderProfile
        fields = (
            "id",
            "user",
            "user_email",
            "provider_type",
            "status",
            "headline",
            "bio",
            "skills_json",
            "languages_json",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "status", "created_at", "updated_at", "user_email")


class ProviderServiceSerializer(serializers.ModelSerializer):
    provider_id = serializers.UUIDField(source="provider.id", read_only=True)

    class Meta:
        model = ProviderService
        fields = (
            "id",
            "provider",
            "provider_id",
            "title",
            "description",
            "category",
            "price",
            "currency",
            "status",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at", "provider_id")


class ServiceOrderSerializer(serializers.ModelSerializer):
    requester_email = serializers.EmailField(source="requester.email", read_only=True)

    class Meta:
        model = ServiceOrder
        fields = (
            "id",
            "service",
            "requester",
            "requester_email",
            "status",
            "notes",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at", "requester_email")
