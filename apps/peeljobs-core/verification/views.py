import os
import uuid
from datetime import datetime, timedelta, timezone

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from verification.models import AuditLog, ConsentGrant, SecureDocumentMeta, VerificationRequest


def _parse_body(request):
    if not request.body:
        return {}
    try:
        import json

        return json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return {}


def _client_meta(request):
    return {
        "ip": request.META.get("REMOTE_ADDR", ""),
        "ua": request.META.get("HTTP_USER_AGENT", ""),
    }


def _log_action(action, request, resource_type="", resource_id=""):
    meta = _client_meta(request)
    AuditLog.objects.create(
        actor=request.user if getattr(request, "user", None) and request.user.is_authenticated else None,
        action=action,
        resource_type=resource_type,
        resource_id=str(resource_id),
        ip=meta.get("ip", ""),
        user_agent=meta.get("ua", ""),
    )


@csrf_exempt
@require_http_methods(["POST"])
def verification_request(request):
    payload = _parse_body(request)
    candidate_id = payload.get("candidate_id")
    request_type = payload.get("type")
    org_id = payload.get("org_id")
    if not candidate_id or not request_type:
        return JsonResponse({"detail": "candidate_id and type required"}, status=400)
    vr = VerificationRequest.objects.create(
        candidate_id=candidate_id,
        type=request_type,
        requested_by_org_id=org_id,
        status="requested",
    )
    _log_action("verify.requested", request, "verification_request", vr.id)
    return JsonResponse({"id": str(vr.id), "status": vr.status}, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def verification_upload_url(request):
    payload = _parse_body(request)
    request_id = payload.get("request_id")
    if not request_id:
        return JsonResponse({"detail": "request_id required"}, status=400)
    vr = VerificationRequest.objects.filter(id=request_id).first()
    if not vr:
        return JsonResponse({"detail": "verification request not found"}, status=404)

    filename = payload.get("filename", "")
    mime = payload.get("mime", "")
    size = payload.get("size")
    sha256 = payload.get("sha256", "")
    storage_key = f"verification/{vr.id}/{uuid.uuid4().hex}"

    s3_endpoint = os.getenv("S3_ENDPOINT", "").rstrip("/")
    s3_bucket = os.getenv("S3_BUCKET", "forsati-secure")
    token = uuid.uuid4().hex
    upload_url = f"{s3_endpoint}/{s3_bucket}/{storage_key}?token={token}" if s3_endpoint else f"/uploads/{storage_key}"

    doc = SecureDocumentMeta.objects.create(
        request=vr,
        file_key=storage_key,
        storage_provider="s3",
        sha256=sha256,
        mime=mime,
        size=size or None,
        retention_until=datetime.now(timezone.utc) + timedelta(days=365),
    )
    vr.status = "pending_upload"
    vr.save(update_fields=["status"])

    _log_action("verify.upload_url_issued", request, "secure_document", doc.id)

    return JsonResponse(
        {
            "request_id": str(vr.id),
            "file_key": storage_key,
            "upload_url": upload_url,
        }
    )


@csrf_exempt
@require_http_methods(["POST"])
def verification_consent(request):
    payload = _parse_body(request)
    candidate_id = payload.get("candidate_id")
    org_id = payload.get("org_id")
    scope = payload.get("scope", "")
    expires_at = payload.get("expires_at")
    if not candidate_id or not org_id:
        return JsonResponse({"detail": "candidate_id and org_id required"}, status=400)
    consent = ConsentGrant.objects.create(
        candidate_id=candidate_id,
        org_id=org_id,
        scope=scope,
        expires_at=expires_at,
    )
    _log_action("verify.consent", request, "consent", consent.id)
    return JsonResponse({"id": str(consent.id)}, status=201)


@require_http_methods(["GET"])
def verification_status(request):
    candidate_id = request.GET.get("candidate_id")
    if not candidate_id:
        return JsonResponse({"detail": "candidate_id required"}, status=400)
    requests = VerificationRequest.objects.filter(candidate_id=candidate_id).values("id", "type", "status", "created_at")
    return JsonResponse({"requests": list(requests)}, status=200)


@require_http_methods(["GET"])
def audit_logs(request):
    logs = AuditLog.objects.order_by("-created_at")[:200]
    payload = [
        {
            "id": str(log.id),
            "action": log.action,
            "resource_type": log.resource_type,
            "resource_id": log.resource_id,
            "created_at": log.created_at.isoformat(),
        }
        for log in logs
    ]
    return JsonResponse({"logs": payload}, status=200)
