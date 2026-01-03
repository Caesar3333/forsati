from django.contrib import admin

from keywords.models import KeywordItem, KeywordUsage


@admin.register(KeywordItem)
class KeywordItemAdmin(admin.ModelAdmin):
    list_display = ("kw", "country", "language", "pack", "weight")
    search_fields = ("kw", "norm_kw")
    list_filter = ("country", "language")


@admin.register(KeywordUsage)
class KeywordUsageAdmin(admin.ModelAdmin):
    list_display = ("kw", "action", "actor_type", "created_at")
    list_filter = ("action",)
