import uuid

from django.db import models


class KeywordItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    country = models.CharField(max_length=5, db_index=True)
    language = models.CharField(max_length=8, db_index=True)
    pack = models.CharField(max_length=255, blank=True)
    kw = models.CharField(max_length=255, db_index=True)
    norm_kw = models.CharField(max_length=255, db_index=True)
    weight = models.IntegerField(default=1)
    syn_json = models.JSONField(default=list, blank=True)
    tags_json = models.JSONField(default=list, blank=True)
    source = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "keyword_items"
        indexes = [
            models.Index(fields=["country", "language", "pack"]),
        ]

    def __str__(self) -> str:
        return self.kw


class KeywordUsage(models.Model):
    ACTION_CHOICES = [
        ("suggest", "Suggest"),
        ("extract", "Extract"),
        ("score", "Score"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    actor_type = models.CharField(max_length=50, blank=True)
    actor_id = models.CharField(max_length=64, blank=True)
    context_type = models.CharField(max_length=50, blank=True)
    context_id = models.CharField(max_length=64, blank=True)
    kw = models.ForeignKey(KeywordItem, on_delete=models.CASCADE, related_name="usages")
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "keyword_usage"
        indexes = [
            models.Index(fields=["actor_type", "actor_id"]),
        ]

    def __str__(self) -> str:
        return f"KeywordUsage({self.kw_id})"
