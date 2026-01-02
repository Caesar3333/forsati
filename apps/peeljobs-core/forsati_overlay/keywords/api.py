from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from forsati_overlay.keywords.services import (
    ats_score,
    extract_keywords,
    match_candidates,
    match_opportunities,
    suggest_keywords,
)
from forsati_overlay.opportunities.models import Opportunity


def resolve_language(request):
    lang = request.query_params.get("lang") or request.headers.get("Accept-Language", "ar")
    return lang.split(",")[0].split("-")[0]


class KeywordSuggestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get("q", "") or request.query_params.get("query", "")
        pack_type = request.query_params.get("pack") or request.query_params.get("type")
        country = request.query_params.get("country", "JO")
        language = request.query_params.get("lang") or resolve_language(request)
        limit = int(request.query_params.get("limit", 50))
        suggestions = suggest_keywords(
            query=query,
            language=language,
            country=country,
            pack_type=pack_type,
            limit=limit,
            request=request,
        )
        return Response({
            "language": language,
            "country": country,
            "pack": pack_type,
            "limit": limit,
            "suggestions": suggestions,
        })


class KeywordExtractView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        payload = request.data or {}
        text = payload.get("text", "")
        language = payload.get("lang") or payload.get("language") or resolve_language(request)
        country = payload.get("country", "JO")
        pack_type = payload.get("pack") or payload.get("type")
        result = extract_keywords(text=text, language=language, country=country, pack_type=pack_type, request=request)
        result["pack"] = pack_type
        result["mock_ats_score"] = result.get("score")
        return Response(result)


class AtsScoreView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        payload = request.data or {}
        job_id = payload.get("job_id")
        cv_text = payload.get("cv_text", "")
        language = payload.get("lang") or payload.get("language")
        job = Opportunity.objects.filter(id=job_id).first()
        if not job:
            return Response({"detail": "job not found"}, status=404)
        result = ats_score(job=job, cv_text=cv_text, language=language)
        return Response(result)


class MatchCandidatesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        payload = request.data or {}
        job_id = payload.get("job_id")
        limit = int(payload.get("limit", 5))
        job = Opportunity.objects.filter(id=job_id).first()
        if not job:
            return Response({"detail": "job not found"}, status=404)
        matches = match_candidates(job, limit=limit)
        return Response({"job_id": job_id, "results": matches})


class MatchOpportunitiesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        payload = request.data or {}
        user_id = payload.get("user_id") or getattr(request.user, "id", None)
        limit = int(payload.get("limit", 5))
        if not user_id:
            return Response({"detail": "user_id required"}, status=400)
        matches = match_opportunities(user_id=user_id, limit=limit)
        return Response({"user_id": user_id, "results": matches})
