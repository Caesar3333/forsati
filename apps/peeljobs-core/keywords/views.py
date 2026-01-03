import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from keywords.services import (
    ats_score,
    extract_keywords,
    match_candidates,
    match_opportunities,
    suggest_keywords,
)


def _parse_body(request):
    if not request.body:
        return {}
    try:
        return json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return {}


def _resolve_language(request, payload=None):
    payload = payload or {}
    lang = payload.get("lang") or payload.get("language") or request.GET.get("lang")
    if not lang:
        lang = request.headers.get("Accept-Language", "ar")
    return lang.split(",")[0].split("-")[0]


@require_http_methods(["GET"])
def keyword_suggest(request):
    query = request.GET.get("q", "") or request.GET.get("query", "")
    pack_type = request.GET.get("pack") or request.GET.get("type")
    country = request.GET.get("country", "JO")
    language = request.GET.get("lang") or _resolve_language(request)
    limit = int(request.GET.get("limit", 50))
    suggestions = suggest_keywords(
        query=query,
        language=language,
        country=country,
        pack_type=pack_type,
        limit=limit,
        request=request,
    )
    return JsonResponse(
        {
            "language": language,
            "country": country,
            "pack": pack_type,
            "limit": limit,
            "suggestions": suggestions,
        }
    )


@csrf_exempt
@require_http_methods(["POST"])
def keyword_extract(request):
    payload = _parse_body(request)
    text = payload.get("text", "")
    language = _resolve_language(request, payload)
    country = payload.get("country", "JO")
    pack_type = payload.get("pack") or payload.get("type")
    result = extract_keywords(
        text=text,
        language=language,
        country=country,
        pack_type=pack_type,
        request=request,
    )
    result["pack"] = pack_type
    return JsonResponse(result)


@csrf_exempt
@require_http_methods(["POST"])
def ats_score_view(request):
    payload = _parse_body(request)
    cv_text = payload.get("cv_text", "")
    job_text = payload.get("job_text", "")
    job_keywords = payload.get("job_keywords") or []
    language = _resolve_language(request, payload)
    country = payload.get("country", "JO")
    pack_type = payload.get("pack") or payload.get("type")
    result = ats_score(
        job_text=job_text,
        cv_text=cv_text,
        language=language,
        country=country,
        pack_type=pack_type,
        job_keywords=job_keywords,
    )
    return JsonResponse(result)


@csrf_exempt
@require_http_methods(["POST"])
def match_candidates_view(request):
    payload = _parse_body(request)
    job_text = payload.get("job_text", "")
    candidates = payload.get("candidates") or []
    limit = int(payload.get("limit", 5))
    language = _resolve_language(request, payload)
    country = payload.get("country", "JO")
    pack_type = payload.get("pack") or payload.get("type")
    matches = match_candidates(
        job_text=job_text,
        candidates=candidates,
        language=language,
        country=country,
        pack_type=pack_type,
        limit=limit,
    )
    return JsonResponse({"results": matches})


@csrf_exempt
@require_http_methods(["POST"])
def match_opportunities_view(request):
    payload = _parse_body(request)
    user_text = payload.get("user_text", "")
    opportunities = payload.get("opportunities") or []
    limit = int(payload.get("limit", 5))
    language = _resolve_language(request, payload)
    country = payload.get("country", "JO")
    pack_type = payload.get("pack") or payload.get("type")
    matches = match_opportunities(
        user_text=user_text,
        opportunities=opportunities,
        language=language,
        country=country,
        pack_type=pack_type,
        limit=limit,
    )
    return JsonResponse({"results": matches})
