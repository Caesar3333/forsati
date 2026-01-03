from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import CandidateProfile
from embeddings.services import build_candidate_embedding, build_keyword_embedding, build_opportunity_embedding
from jobs.models import Opportunity
from keywords.models import KeywordItem


class RebuildKeywordEmbeddingsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        count = 0
        for item in KeywordItem.objects.all():
            build_keyword_embedding(item)
            count += 1
        return Response({"updated": count}, status=status.HTTP_200_OK)


class RebuildOpportunityEmbeddingsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        count = 0
        for opportunity in Opportunity.objects.all():
            build_opportunity_embedding(opportunity)
            count += 1
        return Response({"updated": count}, status=status.HTTP_200_OK)


class RebuildCandidateEmbeddingsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        count = 0
        for profile in CandidateProfile.objects.select_related("user"):
            text = " ".join(
                [
                    profile.headline or "",
                    profile.summary or "",
                    profile.skills_text or "",
                ]
            )
            build_candidate_embedding(profile.user, text)
            count += 1
        return Response({"updated": count}, status=status.HTTP_200_OK)
