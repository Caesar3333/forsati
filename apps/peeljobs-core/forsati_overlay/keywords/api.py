from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from forsati_overlay.keywords.services import extract_keywords, suggest_keywords


def resolve_language(request):
    lang = request.query_params.get("lang") or request.headers.get("Accept-Language", "ar")
    return lang.split(",")[0].split("-")[0]


class KeywordSuggestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get("query", "")
        pack_type = request.query_params.get("type")
        country = request.query_params.get("country", "JO")
        language = resolve_language(request)
        suggestions = suggest_keywords(query=query, language=language, country=country, pack_type=pack_type)
        return Response({
            "language": language,
            "country": country,
            "type": pack_type,
            "suggestions": suggestions,
        })


class KeywordExtractView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        payload = request.data or {}
        text = payload.get("text", "")
        language = payload.get("language") or resolve_language(request)
        country = payload.get("country", "JO")
        pack_type = payload.get("type")
        result = extract_keywords(text=text, language=language, country=country, pack_type=pack_type)
        result["type"] = pack_type
        result["mock_ats_score"] = result.get("score")
        return Response(result)
