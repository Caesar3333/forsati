import hashlib
import json
import os
from typing import Any, Dict, List

from fastapi import Body, FastAPI

app = FastAPI(title="Forsati AI Orchestrator")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()


def _payload_seed(payload: Dict[str, Any]) -> str:
    try:
        return json.dumps(payload, sort_keys=True, ensure_ascii=False)
    except TypeError:
        return str(payload)


def _score_from_seed(seed: str) -> int:
    digest = hashlib.sha256(seed.encode("utf-8")).hexdigest()
    return 60 + (int(digest[:2], 16) % 41)


def _pick_list(seed: str, items: List[str], count: int) -> List[str]:
    digest = hashlib.sha256(seed.encode("utf-8")).hexdigest()
    base = int(digest[:8], 16)
    results: List[str] = []
    for i in range(count):
        results.append(items[(base + i) % len(items)])
    return results


def _provider() -> str:
    return "openai" if OPENAI_API_KEY else "stub"


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-orchestrator"}


@app.get("/ready")
def ready():
    return {"status": "ready", "service": "ai-orchestrator", "provider": _provider()}


@app.post("/cv/analyze")
def cv_analyze(payload: Dict[str, Any] = Body(default={})):  # type: ignore[valid-type]
    seed = _payload_seed(payload)
    score = _score_from_seed(seed)
    strengths = _pick_list(
        seed,
        [
            "Clear role alignment",
            "Strong communication",
            "Relevant project experience",
            "Consistent career progression",
            "Quantified impact"
        ],
        3
    )
    gaps = _pick_list(
        seed[::-1],
        [
            "Add measurable outcomes",
            "Clarify tech stack depth",
            "Highlight leadership moments",
            "Add portfolio links",
            "Polish summary"
        ],
        3
    )
    return {
        "status": "ok",
        "provider": _provider(),
        "score": score,
        "strengths": strengths,
        "gaps": gaps,
        "summary": "Deterministic demo response. Connect OpenAI for real analysis."
    }


@app.post("/cv/improve")
def cv_improve(payload: Dict[str, Any] = Body(default={})):  # type: ignore[valid-type]
    seed = _payload_seed(payload)
    improvements = _pick_list(
        seed,
        [
            "Rewrite summary with a clear target role.",
            "Add 2-3 quantified achievements per role.",
            "Move top skills to the first section.",
            "Add keywords matching the job description.",
            "Shorten long paragraphs into bullet points."
        ],
        3
    )
    return {
        "status": "ok",
        "provider": _provider(),
        "improvements": improvements,
        "sample_summary": "Focused professional summary tailored to the opportunity."
    }


@app.post("/interview/questions")
def interview_questions(payload: Dict[str, Any] = Body(default={})):  # type: ignore[valid-type]
    seed = _payload_seed(payload)
    questions = _pick_list(
        seed,
        [
            "Tell us about a challenge you solved recently.",
            "How do you prioritize tasks under tight deadlines?",
            "Describe a project you are most proud of.",
            "How do you handle feedback from stakeholders?",
            "What would you improve in your last role?",
            "Walk us through your approach to problem solving."
        ],
        5
    )
    return {
        "status": "ok",
        "provider": _provider(),
        "questions": questions
    }


@app.post("/interview/feedback")
def interview_feedback(payload: Dict[str, Any] = Body(default={})):  # type: ignore[valid-type]
    seed = _payload_seed(payload)
    score = _score_from_seed(seed)
    positives = _pick_list(seed, ["Clarity", "Structure", "Confidence", "Examples"], 2)
    improvements = _pick_list(seed[::-1], ["Conciseness", "Storytelling", "Metrics", "Pace"], 2)
    return {
        "status": "ok",
        "provider": _provider(),
        "score": score,
        "positives": positives,
        "improvements": improvements,
        "summary": "Deterministic feedback for demo mode."
    }


@app.post("/match")
def match(payload: Dict[str, Any] = Body(default={})):  # type: ignore[valid-type]
    seed = _payload_seed(payload)
    roles = _pick_list(
        seed,
        ["Product Designer", "Frontend Engineer", "Data Analyst", "Project Coordinator", "UX Researcher"],
        3
    )
    return {
        "status": "ok",
        "provider": _provider(),
        "matches": [{"title": role, "score": _score_from_seed(seed + role)} for role in roles]
    }


@app.get("/")
def root():
    return {"service": "ai-orchestrator", "message": "Forsati AI stub running"}
