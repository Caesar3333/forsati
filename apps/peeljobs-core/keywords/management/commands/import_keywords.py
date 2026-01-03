import json
from pathlib import Path

from django.core.management.base import BaseCommand

from keywords.models import KeywordItem
from keywords.normalize import normalize_keyword


class Command(BaseCommand):
    help = "Import keyword bank JSON files with idempotent upsert."

    def add_arguments(self, parser):
        parser.add_argument("--country", required=True)
        parser.add_argument("--file", required=True)
        parser.add_argument("--lang", default=None)

    def handle(self, *args, **options):
        country = options["country"]
        filepath = Path(options["file"])
        lang_override = options["lang"]
        if not filepath.exists():
            self.stderr.write(self.style.ERROR(f"File not found: {filepath}"))
            return
        data = json.loads(filepath.read_text(encoding="utf-8"))
        upserted = 0
        for item in data:
            kw = item.get("kw") or item.get("keyword")
            if not kw:
                continue
            language = lang_override or item.get("lang") or item.get("language") or "ar"
            pack = item.get("pack", "")
            weight = int(item.get("weight", 1))
            syn = item.get("syn", item.get("synonyms", [])) or []
            tags = item.get("tags", []) or []
            source = item.get("source", "")
            norm_kw = normalize_keyword(kw, language)
            KeywordItem.objects.update_or_create(
                country=country,
                language=language,
                pack=pack,
                kw=kw,
                defaults={
                    "norm_kw": norm_kw,
                    "weight": weight,
                    "syn_json": syn,
                    "tags_json": tags,
                    "source": source,
                },
            )
            upserted += 1
        self.stdout.write(self.style.SUCCESS(f"Upserted {upserted} keywords."))
