"""Request/response schemas for AI orchestrator stub endpoints."""
from __future__ import annotations

from typing import Any, Dict, Optional

from pydantic import BaseModel, Field, HttpUrl


class BaseAIRequest(BaseModel):
    language: Optional[str] = Field(default="ar", description="Preferred language code")
    metadata: Dict[str, Any] = Field(default_factory=dict)


class CVAnalyzeRequest(BaseAIRequest):
    cv_text: Optional[str] = None
    cv_url: Optional[HttpUrl] = None


class CVGenerateRequest(BaseAIRequest):
    bio: Optional[str] = None
    target_role: Optional[str] = None


class JDEnhanceRequest(BaseAIRequest):
    job_description: Optional[str] = None
    title: Optional[str] = None


class MatchJobRequest(BaseAIRequest):
    candidate_profile: Dict[str, Any] = Field(default_factory=dict)
    opportunity: Dict[str, Any] = Field(default_factory=dict)


class SkillGapRequest(BaseAIRequest):
    candidate_profile: Dict[str, Any] = Field(default_factory=dict)
    opportunity_requirements: Dict[str, Any] = Field(default_factory=dict)


class InterviewQuestionsRequest(BaseAIRequest):
    role: Optional[str] = None
    seniority: Optional[str] = None
    focus_areas: Optional[str] = None


class FraudDetectRequest(BaseAIRequest):
    payload: Dict[str, Any] = Field(default_factory=dict)


class SupportChatRequest(BaseAIRequest):
    message: str
    session_id: Optional[str] = None


class AIStubResponse(BaseModel):
    request_id: str
    status: str = "ok"
    action: str
    prompt_version: Optional[str] = None
    redaction_applied: bool = False
    redaction_types: Optional[list[str]] = None
    echo: Dict[str, Any] = Field(default_factory=dict)
