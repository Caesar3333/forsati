from django.core.exceptions import ValidationError
from django.db import models
from pgvector.django import VectorField

from accounts.models import User
from jobs.models import Opportunity
from keywords.models import KeywordItem

EMBEDDING_DIMENSIONS = 1536
DISALLOWED_SOURCE_TYPES = {
    "official_document",
    "passport",
    "national_id",
    "government_id",
}


class EmbeddingBase(models.Model):
    embedding = VectorField(dimensions=EMBEDDING_DIMENSIONS)
    model_name = models.CharField(max_length=100, default="unknown")
    source_type = models.CharField(max_length=50, default="user_content")
    metadata_json = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def clean(self) -> None:
        if self.source_type in DISALLOWED_SOURCE_TYPES:
            raise ValidationError("Official documents must not be embedded.")
        if self.metadata_json.get("contains_official_document"):
            raise ValidationError("Official documents must not be embedded.")

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)


class KeywordEmbedding(EmbeddingBase):
    keyword_item = models.OneToOneField(KeywordItem, on_delete=models.CASCADE, related_name="embedding")

    class Meta:
        db_table = "keyword_embeddings"

    def __str__(self) -> str:
        return f"KeywordEmbedding({self.keyword_item_id})"


class OpportunityEmbedding(EmbeddingBase):
    opportunity = models.OneToOneField(Opportunity, on_delete=models.CASCADE, related_name="embedding")

    class Meta:
        db_table = "opportunity_embeddings"

    def __str__(self) -> str:
        return f"OpportunityEmbedding({self.opportunity_id})"


class CandidateEmbedding(EmbeddingBase):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="embedding")

    class Meta:
        db_table = "candidate_embeddings"

    def __str__(self) -> str:
        return f"CandidateEmbedding({self.user_id})"
