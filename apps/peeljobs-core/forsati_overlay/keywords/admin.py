from django.contrib import admin

from forsati_overlay.keywords.models import KeywordItem, KeywordUsage


@admin.register(KeywordItem)
class KeywordItemAdmin(admin.ModelAdmin):
    list_display = ("kw", "language", "country", "pack", "weight")
    list_filter = ("language", "country", "pack")
    search_fields = ("kw", "syn_json")
    ordering = ("country", "language", "pack", "-weight")


@admin.register(KeywordUsage)
class KeywordUsageAdmin(admin.ModelAdmin):
    list_display = ("kw", "action", "actor_type", "actor_id", "created_at")
    list_filter = ("action", "actor_type")
    search_fields = ("kw", "context_type")
    readonly_fields = ("created_at",)
