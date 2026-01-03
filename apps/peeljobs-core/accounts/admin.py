from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from accounts.models import CandidateProfile, OrganizationProfile, User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    ordering = ("-created_at",)
    list_display = ("id", "email", "role", "status", "is_staff", "created_at")
    list_filter = ("role", "status", "is_staff")
    search_fields = ("email", "id")
    fieldsets = (
        (None, {"fields": ("id", "email", "password")}),
        ("Status", {"fields": ("role", "status", "is_active", "is_staff", "is_superuser")}),
        ("Dates", {"fields": ("last_login", "created_at", "updated_at")}),
        ("Permissions", {"fields": ("groups", "user_permissions")}),
    )
    readonly_fields = ("id", "created_at", "updated_at")
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "role", "status"),
            },
        ),
    )


@admin.register(CandidateProfile)
class CandidateProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "city", "country", "availability", "experience_years")
    search_fields = ("user__email", "headline", "city")


@admin.register(OrganizationProfile)
class OrganizationProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "brand_name", "industry", "verification_status", "trust_score")
    search_fields = ("brand_name", "legal_name", "industry")
