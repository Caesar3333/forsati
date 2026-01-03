from rest_framework import serializers

from applications.models import Application, ApplicationNote


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class ApplicationNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationNote
        fields = "__all__"
        read_only_fields = ("id", "created_at")
