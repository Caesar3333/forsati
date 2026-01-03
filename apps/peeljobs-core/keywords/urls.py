from django.urls import path

from keywords.api import (
    AtsScoreView,
    KeywordExtractView,
    KeywordSuggestView,
    MatchCandidatesView,
    MatchOpportunitiesView,
)

urlpatterns = [
    path("keywords/suggest", KeywordSuggestView.as_view(), name="keywords-suggest"),
    path("keywords/extract", KeywordExtractView.as_view(), name="keywords-extract"),
    path("ats/score", AtsScoreView.as_view(), name="ats-score"),
    path("match/opportunities", MatchOpportunitiesView.as_view(), name="match-opportunities"),
    path("match/candidates", MatchCandidatesView.as_view(), name="match-candidates"),
]
