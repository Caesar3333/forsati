"""Forsati AI orchestrator FastAPI service with stubbed AI endpoints."""
from __future__ import annotations

from typing import Callable
from uuid import uuid4

from fastapi import Body, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request as StarletteRequest
from starlette.types import Message

from prompts import PROMPT_STORE, latest_prompt
from redaction import redact_text
from schemas import (
    AIStubResponse,
    CVAnalyzeRequest,
    CVGenerateRequest,
    FraudDetectRequest,
    InterviewQuestionsRequest,
    JDEnhanceRequest,
    MatchJobRequest,
    SkillGapRequest,
    SupportChatRequest,
)


def _set_body(request: StarletteRequest, body: bytes) -> None:
    async def receive() -> Message:
        return {"type": "http.request", "body": body, "more_body": False}

    request._receive = receive  # type: ignore[attr-defined]


class RedactionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable):
        raw_body = await request.body()
        redacted_text, redaction_types = redact_text(raw_body.decode("utf-8", errors="ignore"))

        request.state.redacted_body = redacted_text
        request.state.redaction_types = redaction_types
        _set_body(request, raw_body)

        response = await call_next(request)
        response.headers["X-Redaction-Applied"] = "1" if redaction_types else "0"
        return response


def create_app() -> FastAPI:
    app = FastAPI(title="Forsati AI Orchestrator", version="0.1.0", default_response_class=JSONResponse)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RedactionMiddleware)

    @app.get("/health")
    async def health() -> dict:
        return {"status": "ok"}

    @app.get("/ready")
    async def ready() -> dict:
        return {"status": "ready", "prompt_groups": len(PROMPT_STORE)}

    @app.get("/ai/prompts")
    async def list_prompts() -> dict:
        return {
            "count": sum(len(items) for items in PROMPT_STORE.values()),
            "prompts": {key: [prompt.dict() for prompt in prompts] for key, prompts in PROMPT_STORE.items()},
        }

    @app.post("/ai/cv/analyze", response_model=AIStubResponse)
    async def cv_analyze(request: Request, payload: CVAnalyzeRequest = Body(...)) -> AIStubResponse:
        return _stub_response("cv_analyze", request, payload)

    @app.post("/ai/cv/generate", response_model=AIStubResponse)
    async def cv_generate(request: Request, payload: CVGenerateRequest = Body(...)) -> AIStubResponse:
        return _stub_response("cv_generate", request, payload)

    @app.post("/ai/jd/enhance", response_model=AIStubResponse)
    async def jd_enhance(request: Request, payload: JDEnhanceRequest = Body(...)) -> AIStubResponse:
        return _stub_response("jd_enhance", request, payload)

    @app.post("/ai/match/job", response_model=AIStubResponse)
    async def match_job(request: Request, payload: MatchJobRequest = Body(...)) -> AIStubResponse:
        return _stub_response("match_job", request, payload)

    @app.post("/ai/skill-gap", response_model=AIStubResponse)
    async def skill_gap(request: Request, payload: SkillGapRequest = Body(...)) -> AIStubResponse:
        return _stub_response("skill_gap", request, payload)

    @app.post("/ai/interview/questions", response_model=AIStubResponse)
    async def interview_questions(request: Request, payload: InterviewQuestionsRequest = Body(...)) -> AIStubResponse:
        return _stub_response("interview_questions", request, payload)

    @app.post("/ai/fraud/detect", response_model=AIStubResponse)
    async def fraud_detect(request: Request, payload: FraudDetectRequest = Body(...)) -> AIStubResponse:
        return _stub_response("fraud_detect", request, payload)

    @app.post("/ai/support/chat", response_model=AIStubResponse)
    async def support_chat(request: Request, payload: SupportChatRequest = Body(...)) -> AIStubResponse:
        return _stub_response("support_chat", request, payload)

    return app


def _stub_response(action: str, request: Request, payload) -> AIStubResponse:
    prompt = latest_prompt(action)
    redaction_types = getattr(request.state, "redaction_types", [])
    return AIStubResponse(
        request_id=str(uuid4()),
        action=action,
        prompt_version=prompt.version if prompt else None,
        redaction_applied=bool(redaction_types),
        redaction_types=redaction_types or None,
        echo=payload.dict(exclude_none=True),
    )


app = create_app()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8003)
