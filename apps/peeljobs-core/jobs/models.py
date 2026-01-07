import uuid

from django.db import models


class Opportunity(models.Model):
    TYPE_CHOICES = [
        ("job", "Job"),
        ("internship", "Internship"),
        ("volunteer", "Volunteer"),
        ("scholarship", "Scholarship"),
        ("program", "Program"),
        ("freelance", "Freelance"),
    ]

    WORK_MODE_CHOICES = [
        ("onsite", "On-site"),
        ("remote", "Remote"),
        ("hybrid", "Hybrid"),
    ]

    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("published", "Published"),
        ("archived", "Archived"),
    ]

    MODERATION_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(
        "accounts.OrganizationProfile",
        on_delete=models.CASCADE,
        related_name="opportunities",
    )
    type = models.CharField(max_length=30, choices=TYPE_CHOICES, default="job")
    title_ar = models.CharField(max_length=255, blank=True)
    title_en = models.CharField(max_length=255, blank=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    requirements_ar = models.TextField(blank=True)
    requirements_en = models.TextField(blank=True)
    city = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=5, blank=True)
    work_mode = models.CharField(max_length=20, choices=WORK_MODE_CHOICES, default="onsite")
    salary_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    salary_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=10, blank=True)
    employment_type = models.CharField(max_length=30, blank=True)
    category = models.CharField(max_length=255, blank=True)
    domain = models.CharField(max_length=255, blank=True)
    keywords_json = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    moderation_status = models.CharField(max_length=20, choices=MODERATION_CHOICES, default="pending")
    moderation_notes = models.TextField(blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    program_is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "opportunities"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["organization", "status", "published_at"]),
        ]

    def __str__(self) -> str:
        return self.title_en or self.title_ar or str(self.id)


class SavedOpportunity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="saved_opportunities",
    )
    opportunity = models.ForeignKey(
        Opportunity,
        on_delete=models.CASCADE,
        related_name="saved_by",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "saved_opportunities"
        unique_together = ("user", "opportunity")
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"SavedOpportunity({self.user_id}, {self.opportunity_id})"
