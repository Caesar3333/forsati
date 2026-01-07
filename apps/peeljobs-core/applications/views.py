from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import OrganizationProfile
from organizations.models import OrganizationMember
from applications.models import Application, ApplicationNote
from applications.serializers import ApplicationNoteSerializer, ApplicationSerializer
from jobs.models import Opportunity


def _is_admin(user):
    return user.is_superuser or user.role in {"owner", "admin"}


def _resolve_org(user):
    org = OrganizationProfile.objects.filter(user=user).first()
    if org:
        return org
    membership = OrganizationMember.objects.filter(user=user).select_related("organization").first()
    return membership.organization if membership else None


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if _is_admin(user):
            return Application.objects.all()
        org = _resolve_org(user)
        if org:
            return Application.objects.filter(opportunity__organization=org)
        return Application.objects.filter(user=user)


class ApplyView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, opportunity_id):
        opportunity = Opportunity.objects.filter(id=opportunity_id).first()
        if not opportunity:
            return Response({"detail": "opportunity not found"}, status=status.HTTP_404_NOT_FOUND)
        if opportunity.status != "published" or opportunity.moderation_status != "approved":
            return Response({"detail": "opportunity not open"}, status=status.HTTP_400_BAD_REQUEST)
        application, created = Application.objects.get_or_create(
            opportunity=opportunity,
            user=request.user,
        )
        if not created:
            return Response({"detail": "already applied"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(ApplicationSerializer(application).data, status=status.HTTP_201_CREATED)


class MyApplicationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        applications = Application.objects.filter(user=request.user)
        return Response(ApplicationSerializer(applications, many=True).data)


class OrgApplicationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        org = OrganizationProfile.objects.filter(user=request.user).first()
        if not org:
            membership = OrganizationMember.objects.filter(user=request.user).select_related("organization").first()
            org = membership.organization if membership else None
        if not org:
            return Response([], status=status.HTTP_200_OK)
        applications = Application.objects.filter(opportunity__organization=org)
        return Response(ApplicationSerializer(applications, many=True).data)


class ApplicationStageView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, application_id):
        application = Application.objects.filter(id=application_id).select_related("opportunity__organization").first()
        if not application:
            return Response({"detail": "application not found"}, status=status.HTTP_404_NOT_FOUND)
        if not _is_admin(request.user):
            org = _resolve_org(request.user)
            if not org or application.opportunity.organization_id != org.id:
                return Response({"detail": "forbidden"}, status=status.HTTP_403_FORBIDDEN)
        status_value = request.data.get("status")
        if status_value and status_value in dict(Application.STATUS_CHOICES):
            application.status = status_value
            now = timezone.now()
            if status_value == "screening":
                application.screening_at = now
            elif status_value == "test":
                application.test_at = now
            elif status_value == "interview":
                application.interview_at = now
            elif status_value == "offer":
                application.offer_at = now
            elif status_value == "hired":
                application.hired_at = now
            elif status_value == "rejected":
                application.rejected_at = now
        notes = request.data.get("recruiter_notes")
        if notes is not None:
            application.recruiter_notes = notes
        application.save()
        return Response(ApplicationSerializer(application).data)


class ApplicationNoteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, application_id):
        application = Application.objects.filter(id=application_id).select_related("opportunity__organization").first()
        if not application:
            return Response({"detail": "application not found"}, status=status.HTTP_404_NOT_FOUND)
        if not _is_admin(request.user):
            org = _resolve_org(request.user)
            is_requester = application.user_id == request.user.id
            if not is_requester and (not org or application.opportunity.organization_id != org.id):
                return Response({"detail": "forbidden"}, status=status.HTTP_403_FORBIDDEN)
        serializer = ApplicationNoteSerializer(data={"application": application.id, "author": request.user.id, "note": request.data.get("note", "")})
        serializer.is_valid(raise_exception=True)
        note = ApplicationNote.objects.create(
            application=application,
            author=request.user,
            note=serializer.validated_data["note"],
        )
        return Response(ApplicationNoteSerializer(note).data, status=status.HTTP_201_CREATED)
