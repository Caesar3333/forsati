from django.db import migrations, models
from django.contrib.postgres.operations import CreateExtension
import django.db.models.deletion
import pgvector.django


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("accounts", "0001_initial"),
        ("jobs", "0001_initial"),
        ("keywords", "0001_initial"),
    ]

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
                ("keyword_item", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="embedding", to="keywords.keyworditem")),
            ],
            options={"db_table": "keyword_embeddings"},
        ),
        migrations.CreateModel(
            name="OpportunityEmbedding",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("embedding", pgvector.django.VectorField(dimensions=1536)),
                ("model_name", models.CharField(default="unknown", max_length=100)),
                ("source_type", models.CharField(default="user_content", max_length=50)),
                ("metadata_json", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("opportunity", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="embedding", to="jobs.opportunity")),
            ],
            options={"db_table": "opportunity_embeddings"},
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
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="embedding", to="accounts.user")),
            ],
            options={"db_table": "candidate_embeddings"},
        ),
    ]
