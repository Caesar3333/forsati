"""Utilities for redacting sensitive content from requests before logging.
"""
from __future__ import annotations

import re
from typing import List, Tuple

EMAIL_PATTERN = re.compile(r"[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}")
PHONE_PATTERN = re.compile(r"\+?\d[\d\s\-]{7,}\d")


def redact_text(raw: str) -> Tuple[str, List[str]]:
    """Redact common sensitive tokens from a string.

    Currently masks email addresses and phone-like numbers. Returns the
    redacted text and the list of redaction types applied.
    """

    redaction_hits: List[str] = []
    redacted = raw

    if raw:
        if EMAIL_PATTERN.search(raw):
            redaction_hits.append("email")
            redacted = EMAIL_PATTERN.sub("[REDACTED_EMAIL]", redacted)

        if PHONE_PATTERN.search(raw):
            redaction_hits.append("phone")
            redacted = PHONE_PATTERN.sub("[REDACTED_PHONE]", redacted)

    return redacted, redaction_hits
