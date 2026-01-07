from rest_framework import serializers

from applications.models import Application, ApplicationNote


class ApplicationSerializer(serializers.ModelSerializer):
    timeline = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

    def get_timeline(self, obj):
        return [
            {"status": "applied", "at": obj.created_at},
            {"status": "screening", "at": obj.screening_at},
            {"status": "test", "at": obj.test_at},
            {"status": "interview", "at": obj.interview_at},
            {"status": "offer", "at": obj.offer_at},
            {"status": "hired", "at": obj.hired_at},
            {"status": "rejected", "at": obj.rejected_at},
        ]


class ApplicationNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationNote
        fields = "__all__"
        read_only_fields = ("id", "created_at")
