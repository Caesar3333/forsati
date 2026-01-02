from rest_framework import serializers

from forsati_overlay.keywords.services import extract_keywords
from forsati_overlay.opportunities.models import Opportunity, OpportunityApplication, OpportunityAttachment


class OpportunityAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportunityAttachment
        fields = ["id", "label", "object_uri", "uploaded_at"]


class OpportunityApplicationSerializer(serializers.ModelSerializer):
    attachments = OpportunityAttachmentSerializer(many=True, required=False, read_only=True)
    mock_ats_score = serializers.SerializerMethodField()

    class Meta:
        model = OpportunityApplication
        fields = [
            "id",
            "opportunity",
            "applicant",
            "cover_letter",
            "resume_object_uri",
            "status",
            "notes",
            "created_at",
            "updated_at",
            "attachments",
            "mock_ats_score",
        ]
        read_only_fields = ["status", "created_at", "updated_at"]

    def get_mock_ats_score(self, obj: OpportunityApplication):
        if not obj.cover_letter:
            return None
        result = extract_keywords(
            text=obj.cover_letter,
            language=obj.opportunity.language if obj.opportunity else "ar",
            country="JO",
        )
        return result.get("score")


class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "type",
            "organization_name",
            "location",
            "is_remote",
            "language",
            "published",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]
