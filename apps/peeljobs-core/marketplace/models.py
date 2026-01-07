import uuid

from django.conf import settings
from django.db import models


class ProviderProfile(models.Model):
    TYPE_CHOICES = [
        ("provider_coach", "Coach"),
        ("provider_reviewer", "Reviewer"),
        ("provider_training", "Training"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("suspended", "Suspended"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="provider_profile")
    provider_type = models.CharField(max_length=40, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    headline = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    skills_json = models.JSONField(default=list, blank=True)
    languages_json = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "provider_profiles"

    def __str__(self) -> str:
        return f"ProviderProfile({self.user_id})"


class ProviderService(models.Model):
    CATEGORY_CHOICES = [
        ("cv_review", "CV review"),
        ("interview_prep", "Interview prep"),
        ("career_strategy", "Career strategy"),
    ]

    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("published", "Published"),
        ("archived", "Archived"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    provider = models.ForeignKey(ProviderProfile, on_delete=models.CASCADE, related_name="services")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=40, choices=CATEGORY_CHOICES, default="cv_review")
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=10, default="USD")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "provider_services"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


class ServiceOrder(models.Model):
    STATUS_CHOICES = [
        ("requested", "Requested"),
        ("accepted", "Accepted"),
        ("in_progress", "In progress"),
        ("completed", "Completed"),
        ("canceled", "Canceled"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    service = models.ForeignKey(ProviderService, on_delete=models.CASCADE, related_name="orders")
    requester = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="service_orders")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="requested")
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "service_orders"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"ServiceOrder({self.id})"
