import uuid

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is required.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "owner")
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ("owner", "Owner"),
        ("admin", "Admin"),
        ("moderator", "Moderator"),
        ("publisher", "Publisher"),
        ("finance", "Finance"),
        ("support", "Support"),
        ("org_owner", "Organization owner"),
        ("hr_manager", "HR manager"),
        ("recruiter", "Recruiter"),
        ("interviewer", "Interviewer"),
        ("opportunity_manager", "Opportunity manager"),
        ("provider_coach", "Provider coach"),
        ("provider_reviewer", "Provider reviewer"),
        ("provider_training", "Provider training"),
        ("job_seeker", "Job seeker"),
    ]

    STATUS_CHOICES = [
        ("active", "Active"),
        ("suspended", "Suspended"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="job_seeker")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        db_table = "users"
        indexes = [
            models.Index(fields=["role", "status"]),
        ]

    def __str__(self) -> str:
        return self.email


class CandidateProfile(models.Model):
    AVAILABILITY_CHOICES = [
        ("available", "Available"),
        ("notice_period", "Notice period"),
        ("not_available", "Not available"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="candidate_profile")
    city = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=5, default="JO")
    phone = models.CharField(max_length=30, blank=True)
    headline = models.CharField(max_length=255, blank=True)
    summary = models.TextField(blank=True)
    skills_text = models.TextField(blank=True)
    experience_years = models.PositiveIntegerField(default=0)
    availability = models.CharField(max_length=30, choices=AVAILABILITY_CHOICES, default="available")
    languages = models.JSONField(default=list, blank=True)
    portfolio_links = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "candidate_profiles"

    def __str__(self) -> str:
        return f"CandidateProfile({self.user_id})"


class OrganizationProfile(models.Model):
    VERIFICATION_CHOICES = [
        ("unverified", "Unverified"),
        ("pending", "Pending"),
        ("verified", "Verified"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="organization_profile")
    legal_name = models.CharField(max_length=255)
    brand_name = models.CharField(max_length=255)
    website = models.URLField(blank=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    industry = models.CharField(max_length=255, blank=True)
    size = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=255, blank=True)
    seo_title_ar = models.CharField(max_length=255, blank=True)
    seo_desc_ar = models.CharField(max_length=255, blank=True)
    seo_title_en = models.CharField(max_length=255, blank=True)
    seo_desc_en = models.CharField(max_length=255, blank=True)
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_CHOICES, default="unverified")
    trust_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "organization_profiles"

    def __str__(self) -> str:
        return self.brand_name
