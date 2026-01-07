from rest_framework import serializers

from jobs.models import Opportunity, SavedOpportunity


class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at", "published_at")


class SavedOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedOpportunity
        fields = "__all__"
        read_only_fields = ("id", "created_at")
