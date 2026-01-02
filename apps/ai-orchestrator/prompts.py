"""In-memory prompt store schema for AI orchestrator stubs."""
from __future__ import annotations

from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class Prompt(BaseModel):
    name: str
    version: str
    content: str
    variables: List[str] = Field(default_factory=list)
    enabled: bool = True
    locale: Optional[str] = None
    description: Optional[str] = None


PROMPT_STORE: Dict[str, List[Prompt]] = {
    "cv_analyze": [
        Prompt(
            name="cv_analyze",
            version="v1",
            content="Analyze CV for key skills, experience, and gaps in ${language}.",
            variables=["language"],
            locale="ar",
            description="Default Arabic-first CV analysis prompt",
        )
    ],
    "cv_generate": [
        Prompt(
            name="cv_generate",
            version="v1",
            content="Generate a structured CV using provided bio and role preferences.",
            variables=["bio", "role"],
            description="Template generator prompt",
        )
    ],
    "jd_enhance": [
        Prompt(
            name="jd_enhance",
            version="v1",
            content="Rewrite and enrich the job description with clarity and inclusive language.",
            variables=["role", "language"],
            description="Enhance JD copy",
        )
    ],
}


def latest_prompt(name: str) -> Optional[Prompt]:
    prompts = PROMPT_STORE.get(name, [])
    for prompt in reversed(prompts):
        if prompt.enabled:
            return prompt
    return prompts[-1] if prompts else None
