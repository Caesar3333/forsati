import json
from pathlib import Path
from typing import Dict, List

from django.conf import settings

from rbac.models import Permission, Role


def _load_json(path: Path) -> Dict:
    return json.loads(path.read_text(encoding="utf-8"))


def sync_rbac_from_configs() -> None:
    base_dir = Path(settings.BASE_DIR)
    config_dir = base_dir.parents[1] / "configs" / "rbac"
    permissions_path = config_dir / "permissions.json"
    roles_path = config_dir / "roles.json"

    if not permissions_path.exists() or not roles_path.exists():
        return

    permissions_payload = _load_json(permissions_path)
    roles_payload = _load_json(roles_path)

    permission_records: Dict[str, Permission] = {}
    for item in permissions_payload.get("permissions", []):
        perm, _ = Permission.objects.update_or_create(
            key=item["key"],
            defaults={"description": item.get("description", "")},
        )
        permission_records[perm.key] = perm

    for role_item in roles_payload.get("roles", []):
        role, _ = Role.objects.update_or_create(
            key=role_item["key"],
            defaults={
                "label": role_item.get("label", role_item["key"]),
                "description": role_item.get("description", ""),
                "is_system": True,
            },
        )
        permissions: List[str] = role_item.get("permissions", [])
        if "*" in permissions:
            role.permissions.set(Permission.objects.all())
        else:
            role.permissions.set([permission_records[p] for p in permissions if p in permission_records])
