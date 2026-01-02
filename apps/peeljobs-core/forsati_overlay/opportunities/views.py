from django.views.generic import TemplateView

from forsati_overlay.opportunities.models import Opportunity


class OpportunityListView(TemplateView):
    template_name = "forsati/opportunities/list.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["opportunities"] = Opportunity.objects.filter(published=True)[:20]
        return ctx


class OpportunityDetailView(TemplateView):
    template_name = "forsati/opportunities/detail.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        slug = kwargs.get("slug")
        ctx["opportunity"] = Opportunity.objects.filter(slug=slug).first()
        return ctx
