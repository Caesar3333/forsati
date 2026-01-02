"""Forsati overlay settings for Arabic-first, bilingual UX.

Import this file after the upstream settings to inject Forsati-specific i18n and static resources without modifying upstream code.
"""

import os
from pathlib import Path

from django.utils.translation import gettext_lazy as _

BASE_DIR = Path(__file__).resolve().parent

LANGUAGE_CODE = "ar"
LANGUAGES = (
    ("ar", "العربية"),
    ("en", "English"),
)

LOCALE_PATHS = [
    os.path.join(BASE_DIR, "locale"),
]

# Enforce LocaleMiddleware and Forsati Arabic-first resolver.
MIDDLEWARE = globals().get("MIDDLEWARE", [])
if "django.middleware.locale.LocaleMiddleware" not in MIDDLEWARE:
    insertion_point = 0
    if "django.middleware.common.CommonMiddleware" in MIDDLEWARE:
        insertion_point = MIDDLEWARE.index("django.middleware.common.CommonMiddleware") + 1
    MIDDLEWARE.insert(insertion_point, "django.middleware.locale.LocaleMiddleware")

if "forsati_overlay.i18n.middleware.ForsatiLocaleMiddleware" not in MIDDLEWARE:
    MIDDLEWARE.insert(0, "forsati_overlay.i18n.middleware.ForsatiLocaleMiddleware")

INSTALLED_APPS = globals().get("INSTALLED_APPS", [])
for app in [
    "forsati_overlay.i18n",
    "forsati_overlay.opportunities",
]:
    if app not in INSTALLED_APPS:
        INSTALLED_APPS.append(app)

TEMPLATES = globals().get("TEMPLATES", [])
if TEMPLATES:
    context_processors = TEMPLATES[0].get("OPTIONS", {}).get("context_processors", [])
    for cp in ["forsati_overlay.i18n.context_processors.language_meta"]:
        if cp not in context_processors:
            context_processors.append(cp)
    TEMPLATES[0]["OPTIONS"]["context_processors"] = context_processors

STATICFILES_DIRS = globals().get("STATICFILES_DIRS", [])
rtl_css_path = os.path.join(BASE_DIR, "static")
if rtl_css_path not in STATICFILES_DIRS:
    STATICFILES_DIRS.append(rtl_css_path)

USE_I18N = True
USE_L10N = True
