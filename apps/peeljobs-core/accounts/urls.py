from django.urls import path

from accounts import views

urlpatterns = [
    path("register", views.RegisterView.as_view(), name="auth-register"),
    path("login", views.LoginView.as_view(), name="auth-login"),
    path("refresh", views.RefreshView.as_view(), name="auth-refresh"),
    path("forgot-password", views.ForgotPasswordView.as_view(), name="auth-forgot-password"),
    path("reset-password", views.ResetPasswordView.as_view(), name="auth-reset-password"),
    path("verify-email", views.VerifyEmailView.as_view(), name="auth-verify-email"),
    path("verify-mobile", views.VerifyMobileView.as_view(), name="auth-verify-mobile"),
    path("me", views.MeView.as_view(), name="auth-me"),
    path("me/candidate-profile", views.CandidateProfileView.as_view(), name="candidate-profile"),
    path("me/org-profile", views.OrganizationProfileView.as_view(), name="org-profile"),
    path("admin/users", views.AdminUsersView.as_view(), name="admin-users"),
    path("admin/users/<uuid:user_id>", views.AdminUserDetailView.as_view(), name="admin-user-detail"),
]
