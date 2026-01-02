import json
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError

from forsati_overlay.keywords.models import KeywordItem


class Command(BaseCommand):
    help = "Import Forsati keyword banks with upsert behavior"

    def add_arguments(self, parser):
        parser.add_argument("--country", required=True, help="Country code (e.g., JO)")
        parser.add_argument("--file", required=True, help="Path to the keyword bank JSON file")

    def handle(self, *args, **options):
        country = options["country"]
        file_path = Path(options["file"])
        if not file_path.exists():
            raise CommandError(f"File not found: {file_path}")

        with file_path.open(encoding="utf-8") as f:
            data = json.load(f)

        if str(data.get("country", "")).upper() != country.upper():
            self.stdout.write(self.style.WARNING("Country mismatch; proceeding with provided flag"))

        language = data.get("language") or "ar"
        created, updated = 0, 0
        for pack in data.get("packs", []):
            for item in pack.get("items", []):
                kw = item.get("kw")
                if not kw:
                    continue
                obj, was_created = KeywordItem.objects.update_or_create(
                    country=country,
                    language=language,
                    kw=kw,
                    defaults={
                        "pack": pack.get("name", "unspecified"),
                        "weight": item.get("weight", 1),
                        "syn_json": item.get("syn", []) or [],
                        "tags_json": item.get("tags", []) or [],
                    },
                )
                created += 1 if was_created else 0
                updated += 0 if was_created else 1

        self.stdout.write(self.style.SUCCESS(f"Import complete: created={created}, updated={updated}"))
