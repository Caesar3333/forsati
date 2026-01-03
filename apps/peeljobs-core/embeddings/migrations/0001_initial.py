from django.db import migrations, models
from django.contrib.postgres.operations import CreateExtension
import pgvector.django


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        CreateExtension("vector"),
        migrations.CreateModel(
            name="KeywordEmbedding",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("embedding", pgvector.django.VectorField(dimensions=1536)),
                ("model_name", models.CharField(default="unknown", max_length=100)),
                ("source_type", models.CharField(default="user_content", max_length=50)),
                ("metadata_json", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("keyword", models.CharField(db_index=True, max_length=255)),
                ("country", models.CharField(db_index=True, max_length=5)),
                ("language", models.CharField(db_index=True, max_length=8)),
                ("pack", models.CharField(blank=True, max_length=255)),
            ],
            options={"ordering": ["keyword"]},
        ),
        migrations.CreateModel(
            name="JobEmbedding",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("embedding", pgvector.django.VectorField(dimensions=1536)),
                ("model_name", models.CharField(default="unknown", max_length=100)),
                ("source_type", models.CharField(default="user_content", max_length=50)),
                ("metadata_json", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("job_id", models.CharField(db_index=True, max_length=64)),
                ("country", models.CharField(blank=True, db_index=True, max_length=5)),
                ("language", models.CharField(blank=True, db_index=True, max_length=8)),
            ],
            options={"ordering": ["job_id"]},
        ),
        migrations.CreateModel(
            name="CandidateEmbedding",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("embedding", pgvector.django.VectorField(dimensions=1536)),
                ("model_name", models.CharField(default="unknown", max_length=100)),
                ("source_type", models.CharField(default="user_content", max_length=50)),
                ("metadata_json", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("candidate_id", models.CharField(db_index=True, max_length=64)),
                ("country", models.CharField(blank=True, db_index=True, max_length=5)),
                ("language", models.CharField(blank=True, db_index=True, max_length=8)),
            ],
            options={"ordering": ["candidate_id"]},
        ),
    ]
