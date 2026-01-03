from django.contrib import admin

from applications.models import Application, ApplicationNote


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("id", "opportunity", "user", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("user__email",)


@admin.register(ApplicationNote)
class ApplicationNoteAdmin(admin.ModelAdmin):
    list_display = ("application", "author", "created_at")
