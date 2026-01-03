from django.urls import path

from embeddings.views import (
    RebuildCandidateEmbeddingsView,
    RebuildKeywordEmbeddingsView,
    RebuildOpportunityEmbeddingsView,
)

urlpatterns = [
    path("embeddings/rebuild/keywords", RebuildKeywordEmbeddingsView.as_view(), name="rebuild-embeddings-keywords"),
    path(
        "embeddings/rebuild/opportunities",
        RebuildOpportunityEmbeddingsView.as_view(),
        name="rebuild-embeddings-opportunities",
    ),
    path(
        "embeddings/rebuild/candidates",
        RebuildCandidateEmbeddingsView.as_view(),
        name="rebuild-embeddings-candidates",
    ),
]
