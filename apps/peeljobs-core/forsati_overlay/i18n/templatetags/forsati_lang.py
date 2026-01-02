from django import template
from django.urls import reverse

register = template.Library()


@register.simple_tag(takes_context=True)
def language_toggle_url(context, lang_code):
    request = context.get("request")
    if not request:
        return reverse("forsati-language-switch")
    return f"{reverse('forsati-language-switch')}?next={request.path}&language={lang_code}"
