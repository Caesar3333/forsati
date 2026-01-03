from django.contrib.auth import authenticate, get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import CandidateProfile, OrganizationProfile
from accounts.serializers import (
    CandidateProfileSerializer,
    LoginSerializer,
    OrganizationProfileSerializer,
    RegisterSerializer,
    UserSerializer,
)

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
        if role == "recruiter":
            OrganizationProfile.objects.create(
                user=user,
                legal_name="",
                brand_name="",
            )

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


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        payload = {"user": UserSerializer(user).data}
        if hasattr(user, "candidate_profile"):
            payload["candidate_profile"] = CandidateProfileSerializer(user.candidate_profile).data
        if hasattr(user, "organization_profile"):
            payload["organization_profile"] = OrganizationProfileSerializer(user.organization_profile).data
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
