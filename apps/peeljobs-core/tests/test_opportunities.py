from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from accounts.models import OrganizationProfile
from jobs.models import Opportunity

User = get_user_model()


class OpportunityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.owner = User.objects.create_user(email="org@forsati.local", password="Pass12345!", role="org_owner")
        self.org = OrganizationProfile.objects.create(user=self.owner, legal_name="Forsati Org", brand_name="Forsati Org")

    def test_search_returns_published_approved(self):
        Opportunity.objects.create(
            organization=self.org,
            type="job",
            title_en="Published Role",
            status="published",
            moderation_status="approved",
        )
        Opportunity.objects.create(
            organization=self.org,
            type="job",
            title_en="Draft Role",
            status="draft",
            moderation_status="pending",
        )

        response = self.client.get("/api/opportunities/search")
        self.assertEqual(response.status_code, 200)
        titles = [item["title_en"] for item in response.json()]
        self.assertIn("Published Role", titles)
        self.assertNotIn("Draft Role", titles)
