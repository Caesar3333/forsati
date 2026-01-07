from django.contrib.auth import get_user_model
from django.test import TestCase

from rbac.models import Permission, Role, UserRole

User = get_user_model()


class RbacTests(TestCase):
    def test_role_permissions_attach(self):
        permission = Permission.objects.create(key="opp.read", description="Read opportunities")
        role = Role.objects.create(key="recruiter", label="Recruiter")
        role.permissions.add(permission)
        self.assertEqual(role.permissions.count(), 1)

    def test_user_role_assignment(self):
        role = Role.objects.create(key="org_owner", label="Organization owner")
        user = User.objects.create_user(email="owner@forsati.local", password="Pass12345!")
        assignment = UserRole.objects.create(user=user, role=role, scope="organization")
        self.assertEqual(assignment.role.key, "org_owner")
