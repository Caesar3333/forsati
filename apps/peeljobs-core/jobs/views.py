from django.db.models import Q
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import OrganizationProfile
from jobs.models import Opportunity
from jobs.serializers import OpportunitySerializer


class OpportunityViewSet(viewsets.ModelViewSet):
    serializer_class = OpportunitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Opportunity.objects.all()

    def perform_create(self, serializer):
        org = OrganizationProfile.objects.filter(user=self.request.user).first()
        serializer.save(organization=org)


class OpportunitySearchView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        q = request.GET.get("q", "")
        city = request.GET.get("city", "")
        country = request.GET.get("country", "")
        opportunity_type = request.GET.get("type", "")
        queryset = Opportunity.objects.all()
        if q:
            queryset = queryset.filter(
                Q(title_en__icontains=q)
                | Q(title_ar__icontains=q)
                | Q(description_en__icontains=q)
                | Q(description_ar__icontains=q)
            )
        if city:
            queryset = queryset.filter(city__iexact=city)
        if country:
            queryset = queryset.filter(country__iexact=country)
        if opportunity_type:
            queryset = queryset.filter(type=opportunity_type)
        serializer = OpportunitySerializer(queryset[:200], many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
