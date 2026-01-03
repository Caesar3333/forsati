from django.urls import path

from accounts import views

urlpatterns = [
    path("register", views.RegisterView.as_view(), name="auth-register"),
    path("login", views.LoginView.as_view(), name="auth-login"),
    path("refresh", views.RefreshView.as_view(), name="auth-refresh"),
    path("me", views.MeView.as_view(), name="auth-me"),
    path("me/candidate-profile", views.CandidateProfileView.as_view(), name="candidate-profile"),
    path("me/org-profile", views.OrganizationProfileView.as_view(), name="org-profile"),
]
