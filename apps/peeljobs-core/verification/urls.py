from django.urls import path

from verification import views

urlpatterns = [
    path("verify/request", views.verification_request, name="verify-request"),
    path("verify/upload-url", views.verification_upload_url, name="verify-upload-url"),
    path("verify/consent", views.verification_consent, name="verify-consent"),
    path("verify/status", views.verification_status, name="verify-status"),
    path("audit", views.audit_logs, name="audit-logs"),
]
