# RBAC Overview (Forsati)

Forsati uses role-based access control with explicit scopes. Permissions are grouped by domain and can be assigned per role with one or more scopes.

## Scopes
- `platform`: full platform access across tenants.
- `organization`: access limited to a single organization.
- `marketplace_provider`: access limited to a provider account.
- `self`: access limited to the authenticated user.

## Sources of truth
- Config files:
  - `configs/rbac/scopes.json`
  - `configs/rbac/permissions.json`
  - `configs/rbac/roles.json`
- Backend defaults:
  - `apps/ai-orchestrator/rbac/defaults.py`
  - `apps/ai-orchestrator/rbac/policy.py`

## Permission groups
Permissions are grouped by domain (users, roles, opportunities, applications, marketplace, programs, billing, content, support, audit, reports, settings).

## Role policy evaluation
Use the helper in `apps/ai-orchestrator/rbac/policy.py`:
```
from rbac.policy import can

if can(role_key="super_admin", permission_key="opp.publish", scope="platform"):
    ...
```

Rules:
1) Role must include the permission.
2) Scope must be allowed by the role.
3) Permission must allow the scope.

## Admin Owner requirements
The Admin Owner role is configured with `permissions=["*"]` and can:
- Create/edit roles.
- Toggle permissions.
- Assign scopes per role.

## Extending RBAC
1) Add permissions to `configs/rbac/permissions.json` and `apps/ai-orchestrator/rbac/defaults.py`.
2) Attach them to roles in `configs/rbac/roles.json`.
3) Update UI role editor to expose new permissions.
