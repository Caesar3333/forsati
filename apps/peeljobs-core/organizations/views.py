from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import OrganizationProfile
from organizations.models import OrganizationInvite, OrganizationMember
from organizations.serializers import OrganizationInviteSerializer, OrganizationMemberSerializer

User = get_user_model()


def _resolve_org(user):
    org = OrganizationProfile.objects.filter(user=user).first()
    if org:
        return org
    membership = OrganizationMember.objects.filter(user=user).select_related("organization").first()
    return membership.organization if membership else None


class OrganizationMembersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        org = _resolve_org(request.user)
        if not org:
            return Response([], status=status.HTTP_200_OK)
        members = OrganizationMember.objects.filter(organization=org).select_related("user")
        return Response(OrganizationMemberSerializer(members, many=True).data)

    def post(self, request):
        org = _resolve_org(request.user)
        if not org:
            return Response({"detail": "organization not found"}, status=status.HTTP_404_NOT_FOUND)
        email = request.data.get("email")
        role = request.data.get("role", "recruiter")
        if not email:
            return Response({"detail": "email required"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.filter(email=email).first()
        if user:
            member, _ = OrganizationMember.objects.update_or_create(
                organization=org,
                user=user,
                defaults={"role": role, "status": "active"},
            )
            return Response(OrganizationMemberSerializer(member).data, status=status.HTTP_201_CREATED)
        invite = OrganizationInvite.objects.create(organization=org, email=email, role=role)
        return Response(OrganizationInviteSerializer(invite).data, status=status.HTTP_201_CREATED)


class OrganizationInvitesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        org = _resolve_org(request.user)
        if not org:
            return Response([], status=status.HTTP_200_OK)
        invites = OrganizationInvite.objects.filter(organization=org).order_by("-created_at")
        return Response(OrganizationInviteSerializer(invites, many=True).data)


class OrganizationInviteAcceptView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"detail": "token required"}, status=status.HTTP_400_BAD_REQUEST)
        invite = OrganizationInvite.objects.filter(token=token, status="pending").first()
        if not invite:
            return Response({"detail": "invite not found"}, status=status.HTTP_404_NOT_FOUND)
        if invite.email.lower() != request.user.email.lower():
            return Response({"detail": "invite email mismatch"}, status=status.HTTP_400_BAD_REQUEST)
        member, _ = OrganizationMember.objects.update_or_create(
            organization=invite.organization,
            user=request.user,
            defaults={"role": invite.role, "status": "active"},
        )
        invite.status = "accepted"
        invite.save(update_fields=["status"])
        return Response(OrganizationMemberSerializer(member).data, status=status.HTTP_200_OK)
