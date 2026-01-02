from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Opportunity(models.Model):
    class OpportunityType(models.TextChoices):
        JOB = "job", _("Job")
        INTERNSHIP = "internship", _("Internship")
        VOLUNTEERING = "volunteering", _("Volunteering")
        SCHOLARSHIP = "scholarship", _("Scholarship")
        FREELANCE = "freelance", _("Freelance")

    LANGUAGE_CHOICES = (
        ("ar", _("Arabic")),
        ("en", _("English")),
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=OpportunityType.choices, default=OpportunityType.JOB)
    organization_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    is_remote = models.BooleanField(default=False)
    language = models.CharField(max_length=5, choices=LANGUAGE_CHOICES, default="ar")
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Opportunity")
        verbose_name_plural = _("Opportunities")
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class OpportunityApplication(models.Model):
    class Status(models.TextChoices):
        SUBMITTED = "submitted", _("Submitted")
        IN_REVIEW = "in_review", _("In review")
        SHORTLISTED = "shortlisted", _("Shortlisted")
        REJECTED = "rejected", _("Rejected")
        OFFERED = "offered", _("Offer extended")

    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="forsati_applications")
    cover_letter = models.TextField(blank=True)
    resume_object_uri = models.URLField(
        help_text=_("Object storage URI for the applicant resume. Do not store raw documents in DB."),
    )
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SUBMITTED)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Opportunity application")
        verbose_name_plural = _("Opportunity applications")
        unique_together = ("opportunity", "applicant")

    def __str__(self):
        return f"{self.applicant} -> {self.opportunity}"


class OpportunityAttachment(models.Model):
    application = models.ForeignKey(OpportunityApplication, on_delete=models.CASCADE, related_name="attachments")
    label = models.CharField(max_length=255)
    object_uri = models.URLField(
        help_text=_("Encrypted object storage URI; file data is not stored in the database."),
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Application attachment")
        verbose_name_plural = _("Application attachments")

    def __str__(self):
        return f"Attachment: {self.label}"
