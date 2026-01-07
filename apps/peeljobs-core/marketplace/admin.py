from django.contrib import admin

from marketplace.models import ProviderProfile, ProviderService, ServiceOrder


admin.site.register(ProviderProfile)
admin.site.register(ProviderService)
admin.site.register(ServiceOrder)
