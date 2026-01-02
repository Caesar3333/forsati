# Forsati Overlay for PeelJobs Core

This overlay keeps Forsati-specific functionality separated from the upstream marketplace codebase. It is designed to be dropped into `apps/peeljobs-core` without modifying upstream files directly.

## Included overlays
- **i18n & RTL**: Arabic-first language middleware, context helpers, and templates that render correct directionality. Settings overrides are provided in `settings_overrides.py`.
- **Opportunities**: Unified `Opportunity` model (job/internship/volunteering/scholarship/freelance), application metadata, and API endpoints for Forsati flows. File uploads are represented by external object storage URIs—no raw documents are stored in the database.
- **Keywords & matching**: Keyword bank loader/importer, ATS scoring, and suggestion/matching APIs backed by Forsati keyword tables.

## How to use
1. Add the overlay apps to `INSTALLED_APPS` after upstream apps:
   ```python
   INSTALLED_APPS += [
       "forsati_overlay.i18n",
       "forsati_overlay.opportunities",
   ]
   ```
2. Include the settings overrides:
   ```python
   from forsati_overlay.settings_overrides import *  # noqa
   ```
3. Add URLs:
   ```python
   from django.urls import include, path
   urlpatterns += [
       path("", include("forsati_overlay.urls_overlay")),
   ]
   ```
4. Collect static files to pick up RTL helpers: `python manage.py collectstatic`.

## Notes
- Keep Forsati additions isolated here to minimize drift from upstream.
- Sensitive documents must live in encrypted object storage; the database only stores metadata/URIs.
- Extend serializers or viewsets here instead of editing upstream modules.
