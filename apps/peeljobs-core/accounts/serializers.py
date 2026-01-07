from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.models import CandidateProfile, OrganizationProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "role", "status", "created_at")


class AdminUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("role", "status", "is_staff", "is_active")


class CandidateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateProfile
        fields = (
            "city",
            "country",
            "phone",
            "headline",
            "summary",
            "skills_text",
            "experience_years",
            "availability",
            "languages",
            "portfolio_links",
        )


class OrganizationProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationProfile
        fields = (
            "legal_name",
            "brand_name",
            "website",
            "description_ar",
            "description_en",
            "industry",
            "size",
            "address",
            "seo_title_ar",
            "seo_desc_ar",
            "seo_title_en",
            "seo_desc_en",
            "verification_status",
            "trust_score",
        )


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, default="job_seeker")


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=8)


class VerifyCodeSerializer(serializers.Serializer):
    code = serializers.CharField()
