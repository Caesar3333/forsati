import os
from datetime import timedelta

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone

from accounts.models import CandidateProfile, OrganizationProfile
from applications.models import Application
from jobs.models import Opportunity
from marketplace.models import ProviderProfile, ProviderService, ServiceOrder
from organizations.models import OrganizationMember
from rbac.services import sync_rbac_from_configs

User = get_user_model()


class Command(BaseCommand):
    help = "Seed Forsati with demo users, orgs, opportunities, and marketplace data."

    def add_arguments(self, parser):
        parser.add_argument("--admin-email", default=None)
        parser.add_argument("--admin-password", default=None)

    def handle(self, *args, **options):
        admin_email = options.get("admin_email") or os.getenv("FORSATI_ADMIN_EMAIL")
        admin_password = options.get("admin_password") or os.getenv("FORSATI_ADMIN_PASSWORD")
        if not admin_email or not admin_password:
            raise CommandError("FORSATI_ADMIN_EMAIL and FORSATI_ADMIN_PASSWORD are required.")

        sample_password = os.getenv("FORSATI_SAMPLE_PASSWORD", "Forsati123!")

        with transaction.atomic():
            sync_rbac_from_configs()

            admin, created = User.objects.get_or_create(email=admin_email)
            if created:
                admin.set_password(admin_password)
            admin.role = "owner"
            admin.is_staff = True
            admin.is_superuser = True
            admin.save()

            seeker, _ = User.objects.get_or_create(email="seeker@forsati.local", defaults={"role": "job_seeker"})
            if not seeker.has_usable_password():
                seeker.set_password(sample_password)
                seeker.save()
            CandidateProfile.objects.get_or_create(user=seeker)

            org_owner, _ = User.objects.get_or_create(
                email="org-owner@forsati.local",
                defaults={"role": "org_owner"},
            )
            if not org_owner.has_usable_password():
                org_owner.set_password(sample_password)
                org_owner.save()

            org_profile, _ = OrganizationProfile.objects.get_or_create(
                user=org_owner,
                defaults={
                    "legal_name": "Forsati Labs",
                    "brand_name": "Forsati Labs",
                    "website": "https://forsati.example",
                    "description_en": "Local demo organization for Forsati.",
                    "description_ar": "\u062c\u0647\u0629 \u062a\u062c\u0631\u064a\u0628\u064a\u0629 \u0644\u062f\u064a\u0645\u0648 \u0641\u0631\u0635\u062a\u064a.",
                    "industry": "Technology",
                },
            )
            OrganizationMember.objects.get_or_create(
                organization=org_profile,
                user=org_owner,
                defaults={"role": "org_owner", "status": "active"},
            )

            recruiter, _ = User.objects.get_or_create(
                email="recruiter@forsati.local",
                defaults={"role": "recruiter"},
            )
            if not recruiter.has_usable_password():
                recruiter.set_password(sample_password)
                recruiter.save()
            OrganizationMember.objects.get_or_create(
                organization=org_profile,
                user=recruiter,
                defaults={"role": "recruiter", "status": "active"},
            )

            provider_user, _ = User.objects.get_or_create(
                email="provider@forsati.local",
                defaults={"role": "provider_coach"},
            )
            if not provider_user.has_usable_password():
                provider_user.set_password(sample_password)
                provider_user.save()
            provider, _ = ProviderProfile.objects.get_or_create(
                user=provider_user,
                defaults={"provider_type": "provider_coach", "status": "pending", "headline": "Career Coach"},
            )

            opportunity_data = [
                {
                    "type": "job",
                    "title_en": "Frontend Engineer",
                    "title_ar": "\u0645\u0647\u0646\u062f\u0633 \u0648\u0627\u062c\u0647\u0627\u062a \u0623\u0645\u0627\u0645\u064a\u0629",
                    "city": "Amman",
                },
                {
                    "type": "internship",
                    "title_en": "Product Design Intern",
                    "title_ar": "\u0645\u062a\u062f\u0631\u0628 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0645\u0646\u062a\u062c",
                    "city": "Amman",
                },
                {
                    "type": "volunteer",
                    "title_en": "Community Volunteer",
                    "title_ar": "\u0645\u062a\u0637\u0648\u0639 \u062f\u0639\u0645 \u0645\u062c\u062a\u0645\u0639\u064a",
                    "city": "Irbid",
                },
                {
                    "type": "scholarship",
                    "title_en": "STEM Scholarship",
                    "title_ar": "\u0645\u0646\u062d\u0629 \u062a\u0639\u0644\u064a\u0645\u064a\u0629 \u0644\u0644\u0631\u064a\u0627\u0636\u064a\u0627\u062a \u0648\u0627\u0644\u0639\u0644\u0648\u0645",
                    "city": "Zarqa",
                },
                {
                    "type": "program",
                    "title_en": "Paid Training Program",
                    "title_ar": "\u0628\u0631\u0646\u0627\u0645\u062c \u062a\u062f\u0631\u064a\u0628 \u0645\u062f\u0641\u0648\u0639",
                    "city": "Amman",
                    "program_is_paid": True,
                },
            ]

            opportunities = []
            for data in opportunity_data:
                opportunity, _ = Opportunity.objects.get_or_create(
                    organization=org_profile,
                    title_en=data["title_en"],
                    defaults={
                        "title_ar": data["title_ar"],
                        "type": data["type"],
                        "description_en": "Demo opportunity for Forsati MVP.",
                        "description_ar": "\u0641\u0631\u0635\u0629 \u062a\u062c\u0631\u064a\u0628\u064a\u0629 \u0644\u0644\u062a\u062c\u0631\u0628\u0629 \u0627\u0644\u0645\u062d\u0644\u064a\u0629.",
                        "requirements_en": "Motivated, ready to learn, and available.",
                        "requirements_ar": "\u0627\u0644\u062a\u0632\u0627\u0645\u060c \u062d\u0645\u0627\u0633\u060c \u0648\u0627\u0644\u062a\u0641\u0631\u063a \u0627\u0644\u0645\u0646\u0627\u0633\u0628.",
                        "city": data["city"],
                        "country": "JO",
                        "status": "published",
                        "moderation_status": "approved",
                        "program_is_paid": data.get("program_is_paid", False),
                        "published_at": timezone.now(),
                    },
                )
                opportunities.append(opportunity)

            if opportunities:
                Application.objects.get_or_create(
                    opportunity=opportunities[0],
                    user=seeker,
                    defaults={"status": "applied"},
                )
                Application.objects.get_or_create(
                    opportunity=opportunities[1],
                    user=seeker,
                    defaults={
                        "status": "screening",
                        "screening_at": timezone.now() - timedelta(days=2),
                    },
                )
                Application.objects.get_or_create(
                    opportunity=opportunities[2],
                    user=seeker,
                    defaults={
                        "status": "interview",
                        "interview_at": timezone.now() - timedelta(days=1),
                    },
                )

            service, _ = ProviderService.objects.get_or_create(
                provider=provider,
                title="CV Review",
                defaults={
                    "description": "Detailed CV review with actionable feedback.",
                    "category": "cv_review",
                    "price": 25,
                    "currency": "USD",
                    "status": "published",
                },
            )
            ServiceOrder.objects.get_or_create(
                service=service,
                requester=seeker,
                defaults={"status": "requested", "notes": "Need feedback on my CV."},
            )

        self.stdout.write(self.style.SUCCESS("Seeded Forsati demo data."))
