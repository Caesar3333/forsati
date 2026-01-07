from django.urls import path

from organizations.views import (
    OrganizationInviteAcceptView,
    OrganizationInvitesView,
    OrganizationMembersView,
)

urlpatterns = [
    path("orgs/members", OrganizationMembersView.as_view(), name="org-members"),
    path("orgs/invites", OrganizationInvitesView.as_view(), name="org-invites"),
    path("orgs/invites/accept", OrganizationInviteAcceptView.as_view(), name="org-invites-accept"),
]
