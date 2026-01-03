import uuid

from django.conf import settings
from django.db import models

from jobs.models import Opportunity


class Application(models.Model):
    STATUS_CHOICES = [
        ("applied", "Applied"),
        ("screening", "Screening"),
        ("test", "Test"),
        ("interview", "Interview"),
        ("offer", "Offer"),
        ("hired", "Hired"),
        ("rejected", "Rejected"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    opportunity = models.ForeignKey(
        Opportunity,
        on_delete=models.CASCADE,
        related_name="applications",
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications",
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="applied")
    recruiter_notes = models.TextField(blank=True)
    chat_thread_id = models.CharField(max_length=255, blank=True)
    screening_at = models.DateTimeField(null=True, blank=True)
    test_at = models.DateTimeField(null=True, blank=True)
    interview_at = models.DateTimeField(null=True, blank=True)
    offer_at = models.DateTimeField(null=True, blank=True)
    hired_at = models.DateTimeField(null=True, blank=True)
    rejected_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "applications"
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(fields=["opportunity", "user"], name="unique_application"),
        ]
        indexes = [
            models.Index(fields=["opportunity", "status"]),
        ]

    def __str__(self) -> str:
        return f"Application({self.opportunity_id}, {self.user_id})"


class ApplicationNote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE,
        related_name="notes",
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="application_notes",
    )
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "application_notes"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"ApplicationNote({self.application_id})"
