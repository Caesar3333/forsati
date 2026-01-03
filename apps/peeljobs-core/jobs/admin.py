from django.contrib import admin

from jobs.models import Opportunity


@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = ("id", "title_en", "title_ar", "type", "status", "organization", "created_at")
    list_filter = ("type", "status", "work_mode")
    search_fields = ("title_en", "title_ar", "description_en", "description_ar")
