from dataclasses import dataclass, field
from typing import Dict, List, Literal

Scope = Literal["platform", "organization", "marketplace_provider", "self"]


@dataclass(frozen=True)
class Permission:
    key: str
    description: str
    scopes: List[Scope]


@dataclass(frozen=True)
class Role:
    key: str
    label: str
    description: str
    default_scopes: List[Scope]
    permissions: List[str] = field(default_factory=list)


@dataclass(frozen=True)
class PermissionGroup:
    key: str
    label: str
    permissions: List[str]


@dataclass(frozen=True)
class RBACConfig:
    scopes: Dict[str, str]
    permissions: Dict[str, Permission]
    groups: Dict[str, PermissionGroup]
    roles: Dict[str, Role]
