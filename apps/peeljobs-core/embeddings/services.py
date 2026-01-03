import hashlib
import random
import re
from typing import Iterable, List

from pgvector.django import CosineDistance
from django.db.models import ExpressionWrapper, F, FloatField, QuerySet

from embeddings.models import (
    CandidateEmbedding,
    EMBEDDING_DIMENSIONS,
    KeywordEmbedding,
    OpportunityEmbedding,
)


EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PHONE_RE = re.compile(r"\b\d{7,15}\b")
ID_RE = re.compile(r"\b\d{9,14}\b")


def sanitize_text(text: str) -> str:
    if not text:
        return ""
    value = EMAIL_RE.sub("[redacted_email]", text)
    value = PHONE_RE.sub("[redacted_phone]", value)
    value = ID_RE.sub("[redacted_id]", value)
    return value


def _hash_vector(text: str) -> List[float]:
    seed = int(hashlib.sha256(text.encode("utf-8")).hexdigest(), 16) % (2**32)
    rng = random.Random(seed)
    return [rng.uniform(-1, 1) for _ in range(EMBEDDING_DIMENSIONS)]


def _similarity_queryset(qs: QuerySet, vector: Iterable[float], limit: int = 10):
    qs = qs.annotate(distance=CosineDistance("embedding", list(vector)))
    qs = qs.annotate(similarity=ExpressionWrapper(1 - F("distance"), output_field=FloatField()))
    return qs.order_by("distance")[:limit]


def build_keyword_embedding(keyword_item):
    text = sanitize_text(keyword_item.kw)
    vector = _hash_vector(text)
    embedding, _ = KeywordEmbedding.objects.update_or_create(
        keyword_item=keyword_item,
        defaults={"embedding": vector, "model_name": "hash-v1", "source_type": "keyword_bank"},
    )
    return embedding


def build_opportunity_embedding(opportunity):
    text = sanitize_text(" ".join([opportunity.title_en, opportunity.title_ar, opportunity.description_en, opportunity.description_ar]))
    vector = _hash_vector(text)
    embedding, _ = OpportunityEmbedding.objects.update_or_create(
        opportunity=opportunity,
        defaults={"embedding": vector, "model_name": "hash-v1", "source_type": "opportunity"},
    )
    return embedding


def build_candidate_embedding(user, text: str):
    vector = _hash_vector(sanitize_text(text))
    embedding, _ = CandidateEmbedding.objects.update_or_create(
        user=user,
        defaults={"embedding": vector, "model_name": "hash-v1", "source_type": "candidate_profile"},
    )
    return embedding


def search_opportunities(vector: Iterable[float], limit: int = 10):
    return list(_similarity_queryset(OpportunityEmbedding.objects.all(), vector, limit))


def search_candidates(vector: Iterable[float], limit: int = 10):
    return list(_similarity_queryset(CandidateEmbedding.objects.all(), vector, limit))
