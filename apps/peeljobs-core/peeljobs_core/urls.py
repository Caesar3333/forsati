from django.contrib import admin
from django.urls import include, path

from peeljobs_core import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health", views.health, name="health"),
    path("api/ready", views.ready, name="ready"),
    path("api/auth/", include("accounts.urls")),
    path("api/", include("jobs.urls")),
    path("api/", include("applications.urls")),
    path("api/", include("keywords.urls")),
    path("api/", include("embeddings.urls")),
    path("api/", include("verification.urls")),
    path("about/", views.public_page, {"page_key": "about"}, name="about"),
    path("privacy/", views.public_page, {"page_key": "privacy"}, name="privacy"),
    path("cookies/", views.public_page, {"page_key": "cookies"}, name="cookies"),
    path("terms/", views.public_page, {"page_key": "terms"}, name="terms"),
    path("security/", views.public_page, {"page_key": "security"}, name="security"),
    path("", views.index, name="index"),
]
