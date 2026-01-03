from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="KeywordItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("country", models.CharField(db_index=True, max_length=5)),
                ("language", models.CharField(db_index=True, max_length=8)),
                ("pack", models.CharField(db_index=True, max_length=255)),
                ("kw", models.CharField(max_length=255)),
                ("norm_kw", models.CharField(db_index=True, max_length=255)),
                ("weight", models.PositiveIntegerField(default=1)),
                ("syn_json", models.JSONField(blank=True, default=list)),
                ("tags_json", models.JSONField(blank=True, default=list)),
                ("source", models.CharField(default="bank", max_length=50)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Keyword",
                "verbose_name_plural": "Keywords",
                "ordering": ["country", "language", "pack", "-weight", "kw"],
                "unique_together": {("country", "language", "norm_kw")},
            },
        ),
        migrations.CreateModel(
            name="KeywordUsage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("actor_type", models.CharField(blank=True, max_length=50)),
                ("actor_id", models.PositiveIntegerField(blank=True, null=True)),
                ("context_type", models.CharField(blank=True, max_length=50)),
                ("context_id", models.PositiveIntegerField(blank=True, null=True)),
                ("action", models.CharField(db_index=True, max_length=50)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "keyword",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="usage",
                        to="keywords.keyworditem",
                    ),
                ),
            ],
            options={
                "verbose_name": "Keyword usage event",
                "verbose_name_plural": "Keyword usage events",
                "ordering": ["-created_at"],
            },
        ),
    ]
