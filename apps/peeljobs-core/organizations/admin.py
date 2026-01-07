from django.contrib import admin

from organizations.models import OrganizationInvite, OrganizationMember


admin.site.register(OrganizationMember)
admin.site.register(OrganizationInvite)
