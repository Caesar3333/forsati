from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class KeywordItem(models.Model):
    country = models.CharField(max_length=5, db_index=True)
    language = models.CharField(max_length=8, db_index=True)
    pack = models.CharField(max_length=255, db_index=True)
    kw = models.CharField(max_length=255)
    weight = models.PositiveIntegerField(default=1)
    syn_json = models.JSONField(default=list, blank=True)
    tags_json = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Keyword")
        verbose_name_plural = _("Keywords")
        unique_together = ("country", "language", "kw")
        ordering = ["country", "language", "pack", "-weight", "kw"]

    def __str__(self):
        return f"{self.kw} ({self.language}-{self.country})"


class KeywordUsage(models.Model):
    actor_type = models.CharField(max_length=50, blank=True)
    actor_id = models.PositiveIntegerField(null=True, blank=True)
    context_type = models.CharField(max_length=50, blank=True)
    context_id = models.PositiveIntegerField(null=True, blank=True)
    kw = models.CharField(max_length=255)
    action = models.CharField(max_length=50, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Keyword usage event")
        verbose_name_plural = _("Keyword usage events")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.action}: {self.kw} ({self.actor_type}:{self.actor_id})"
