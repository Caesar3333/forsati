from typing import Dict, Iterable, List

from .defaults import PERMISSIONS, ROLE_DEFINITIONS, SCOPES


def resolve_role_permissions(role_key: str) -> List[str]:
    role = ROLE_DEFINITIONS[role_key]
    if "*" in role.permissions:
        return list(PERMISSIONS.keys())
    return role.permissions


def allowed_scopes(role_key: str) -> List[str]:
    role = ROLE_DEFINITIONS[role_key]
    return list(role.default_scopes)


def can(role_key: str, permission_key: str, scope: str) -> bool:
    if role_key not in ROLE_DEFINITIONS:
        return False
    if permission_key not in PERMISSIONS:
        return False
    if scope not in SCOPES:
        return False

    role = ROLE_DEFINITIONS[role_key]
    permission = PERMISSIONS[permission_key]
    permissions = resolve_role_permissions(role_key)

    if permission_key not in permissions:
        return False

    if scope not in role.default_scopes:
        return False

    return scope in permission.scopes


def summarize_permissions(role_keys: Iterable[str]) -> Dict[str, List[str]]:
    summary: Dict[str, List[str]] = {}
    for role_key in role_keys:
        summary[role_key] = resolve_role_permissions(role_key)
    return summary
