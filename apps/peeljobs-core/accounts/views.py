from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import CandidateProfile, OrganizationProfile
from marketplace.models import ProviderProfile
from organizations.models import OrganizationMember
from accounts.serializers import (
    AdminUserUpdateSerializer,
    CandidateProfileSerializer,
    ForgotPasswordSerializer,
    LoginSerializer,
    OrganizationProfileSerializer,
    RegisterSerializer,
    ResetPasswordSerializer,
    UserSerializer,
    VerifyCodeSerializer,
)
from marketplace.serializers import ProviderProfileSerializer
from rbac.permissions import IsOwnerAdmin

User = get_user_model()


def _token_pair_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {"refresh": str(refresh), "access": str(refresh.access_token)}


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "auth"

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]
        role = serializer.validated_data["role"]

        if User.objects.filter(email=email).exists():
            return Response({"detail": "email already registered"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(email=email, password=password, role=role)
        if role == "job_seeker":
            CandidateProfile.objects.create(user=user)
        if role in {"org_owner", "hr_manager", "recruiter", "interviewer", "opportunity_manager"}:
            org = OrganizationProfile.objects.create(
                user=user,
                legal_name="",
                brand_name="",
            )
            OrganizationMember.objects.create(organization=org, user=user, role=role, status="active")
        if role in {"provider_coach", "provider_reviewer", "provider_training"}:
            ProviderProfile.objects.create(user=user, provider_type=role, status="pending")

        data = {"user": UserSerializer(user).data, "tokens": _token_pair_for_user(user)}
        return Response(data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "auth"

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = authenticate(request, email=email, password=password)
        if not user:
            return Response({"detail": "invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({"user": UserSerializer(user).data, "tokens": _token_pair_for_user(user)})


class RefreshView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "auth"

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"detail": "refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
        refresh = RefreshToken(refresh_token)
        return Response({"access": str(refresh.access_token)})


class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "auth"

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Dev-mode response only; production should integrate a real mailer.
        if settings.DEBUG:
            return Response({"ok": True, "dev_code": "000000"})
        return Response({"ok": True})


class ResetPasswordView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "auth"

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"detail": "invalid request"}, status=status.HTTP_400_BAD_REQUEST)
        if not settings.DEBUG:
            return Response({"detail": "reset disabled"}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(password)
        user.save(update_fields=["password"])
        return Response({"ok": True})


class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "auth"

    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"ok": True})


class VerifyMobileView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "auth"

    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"ok": True})


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        payload = {"user": UserSerializer(user).data}
        if hasattr(user, "candidate_profile"):
            payload["candidate_profile"] = CandidateProfileSerializer(user.candidate_profile).data
        if hasattr(user, "organization_profile"):
            payload["organization_profile"] = OrganizationProfileSerializer(user.organization_profile).data
        if hasattr(user, "provider_profile"):
            payload["provider_profile"] = ProviderProfileSerializer(user.provider_profile).data
        return Response(payload)


class CandidateProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        user = request.user
        profile, _ = CandidateProfile.objects.get_or_create(user=user)
        serializer = CandidateProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class OrganizationProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        user = request.user
        profile, _ = OrganizationProfile.objects.get_or_create(
            user=user,
            defaults={"legal_name": "", "brand_name": ""},
        )
        serializer = OrganizationProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class AdminUsersView(APIView):
    permission_classes = [IsOwnerAdmin]

    def get(self, request):
        users = User.objects.all().order_by("-created_at")
        return Response(UserSerializer(users, many=True).data)


class AdminUserDetailView(APIView):
    permission_classes = [IsOwnerAdmin]

    def patch(self, request, user_id):
        user = User.objects.filter(id=user_id).first()
        if not user:
            return Response({"detail": "user not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AdminUserUpdateSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserSerializer(user).data)
