from rest_framework import serializers

from forsati_overlay.opportunities.models import Opportunity, OpportunityApplication, OpportunityAttachment


class OpportunityAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportunityAttachment
        fields = ["id", "label", "object_uri", "uploaded_at"]


class OpportunityApplicationSerializer(serializers.ModelSerializer):
    attachments = OpportunityAttachmentSerializer(many=True, required=False, read_only=True)

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
        ]
        read_only_fields = ["status", "created_at", "updated_at"]


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
