from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_GET


@require_GET
def index(request):
    html = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Forsati API</title>
  </head>
  <body>
    <h1>Forsati API</h1>
    <p>Django REST backend is running.</p>
    <ul>
      <li><a href="/api/health">/api/health</a></li>
      <li><a href="/api/ready">/api/ready</a></li>
      <li><a href="/admin/">/admin/</a></li>
    </ul>
  </body>
</html>
"""
    return HttpResponse(html)


@require_GET
def health(request):
    return JsonResponse({"status": "ok", "service": "peeljobs-core"})


@require_GET
def ready(request):
    return JsonResponse({"status": "ready", "service": "peeljobs-core"})


def _resolve_language(request):
    lang = request.GET.get("lang") or request.headers.get("Accept-Language", "ar")
    return lang.split(",")[0].split("-")[0]


PAGES = {
    "about": {
        "en": {
            "title": "About Forsati",
            "body": "Forsati is an Arabic-first opportunity platform connecting candidates with trusted organizations.",
        },
        "ar": {
            "title": "عن فرصتي",
            "body": "فرصتي منصة فرص عربية أولاً تربط المرشحين بجهات موثوقة بطريقة عادلة وسريعة.",
        },
    },
    "privacy": {
        "en": {
            "title": "Privacy Policy",
            "body": "We store only the minimum metadata needed to operate the platform and never store identity files in the database.",
        },
        "ar": {
            "title": "سياسة الخصوصية",
            "body": "نحفظ الحد الأدنى من البيانات اللازمة لتشغيل المنصة ولا نخزن ملفات الهوية داخل قاعدة البيانات.",
        },
    },
    "cookies": {
        "en": {
            "title": "Cookies Policy",
            "body": "We use essential cookies to keep sessions secure and improve the experience.",
        },
        "ar": {
            "title": "سياسة ملفات تعريف الارتباط",
            "body": "نستخدم ملفات تعريف ارتباط أساسية للحفاظ على الجلسات آمنة وتحسين التجربة.",
        },
    },
    "terms": {
        "en": {
            "title": "Terms & Conditions",
            "body": "By using Forsati you agree to provide accurate information and respect the platform guidelines.",
        },
        "ar": {
            "title": "الشروط والأحكام",
            "body": "باستخدام فرصتي أنت توافق على تقديم معلومات دقيقة واحترام سياسات المنصة.",
        },
    },
    "security": {
        "en": {
            "title": "Security",
            "body": "Forsati applies encryption, access controls, and audit logging to protect users and data.",
        },
        "ar": {
            "title": "الأمن",
            "body": "تطبق فرصتي التشفير وضوابط الوصول وسجلات التدقيق لحماية المستخدمين والبيانات.",
        },
    },
}


@require_GET
def public_page(request, page_key):
    lang = _resolve_language(request)
    content = PAGES.get(page_key, {}).get(lang) or PAGES.get(page_key, {}).get("en")
    if not content:
        return JsonResponse({"detail": "page not found"}, status=404)
    html = f"""<!doctype html>
<html lang="{lang}" dir="{'rtl' if lang == 'ar' else 'ltr'}">
  <head>
    <meta charset="utf-8">
    <title>{content["title"]}</title>
  </head>
  <body>
    <h1>{content["title"]}</h1>
    <p>{content["body"]}</p>
  </body>
</html>
"""
    return HttpResponse(html)
