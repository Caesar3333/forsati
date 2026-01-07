import uuid

from django.conf import settings
from django.db import models


class OrganizationMember(models.Model):
    ROLE_CHOICES = [
        ("org_owner", "Organization owner"),
        ("hr_manager", "HR manager"),
        ("recruiter", "Recruiter"),
        ("interviewer", "Interviewer"),
        ("opportunity_manager", "Opportunity manager"),
    ]

    STATUS_CHOICES = [
        ("active", "Active"),
        ("invited", "Invited"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(
        "accounts.OrganizationProfile",
        on_delete=models.CASCADE,
        related_name="members",
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="org_memberships")
    role = models.CharField(max_length=40, choices=ROLE_CHOICES, default="recruiter")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "organization_members"
        unique_together = ("organization", "user")

    def __str__(self) -> str:
        return f"OrganizationMember({self.organization_id}, {self.user_id})"


class OrganizationInvite(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("expired", "Expired"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(
        "accounts.OrganizationProfile",
        on_delete=models.CASCADE,
        related_name="invites",
    )
    email = models.EmailField()
    role = models.CharField(max_length=40, choices=OrganizationMember.ROLE_CHOICES)
    token = models.UUIDField(default=uuid.uuid4, editable=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "organization_invites"

    def __str__(self) -> str:
        return f"OrganizationInvite({self.email})"
