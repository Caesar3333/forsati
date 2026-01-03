from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from keywords.services import ats_score, extract_keywords, suggest_keywords


class KeywordSuggestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        country = request.GET.get("country", "JO")
        language = request.GET.get("lang", "ar")
        query = request.GET.get("q", "")
        pack = request.GET.get("pack", "")
        limit = int(request.GET.get("limit", "50"))
        items = suggest_keywords(country, language, query, pack=pack, limit=limit)
        payload = [{"id": str(item.id), "kw": item.kw, "weight": item.weight} for item in items]
        return Response(payload, status=status.HTTP_200_OK)


class KeywordExtractView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        country = request.data.get("country", "JO")
        language = request.data.get("lang", "ar")
        text = request.data.get("text", "")
        limit = int(request.data.get("limit", 50))
        keywords = extract_keywords(country, language, text, limit=limit)
        return Response({"keywords": keywords}, status=status.HTTP_200_OK)


class AtsScoreView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "ai"

    def post(self, request):
        lang = request.data.get("lang", "ar")
        job_text = request.data.get("job_text", "")
        cv_text = request.data.get("cv_text", "")
        result = ats_score(lang, job_text, cv_text)
        return Response(result, status=status.HTTP_200_OK)


class MatchOpportunitiesView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "ai"

    def post(self, request):
        user_id = request.data.get("user_id")
        limit = int(request.data.get("limit", 10))
        return Response({"user_id": user_id, "limit": limit, "matches": []}, status=status.HTTP_200_OK)


class MatchCandidatesView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "ai"

    def post(self, request):
        opportunity_id = request.data.get("opportunity_id")
        limit = int(request.data.get("limit", 10))
        return Response({"opportunity_id": opportunity_id, "limit": limit, "matches": []}, status=status.HTTP_200_OK)
