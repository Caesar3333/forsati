from rest_framework import permissions, routers, viewsets

from forsati_overlay.opportunities.models import Opportunity, OpportunityApplication
from forsati_overlay.opportunities.serializers import OpportunityApplicationSerializer, OpportunitySerializer


class OpportunityViewSet(viewsets.ModelViewSet):
    queryset = Opportunity.objects.filter(published=True)
    serializer_class = OpportunitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
    filterset_fields = ["type", "language", "is_remote", "organization_name"]
    search_fields = ["title", "description", "organization_name", "location"]
    ordering = ["-created_at"]


class OpportunityApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = OpportunityApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return OpportunityApplication.objects.filter(applicant=user)

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)


router = routers.DefaultRouter()
router.register(r"opportunities", OpportunityViewSet, basename="forsati-opportunity")
router.register(r"applications", OpportunityApplicationViewSet, basename="forsati-application")
