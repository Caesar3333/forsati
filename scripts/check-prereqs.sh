#!/usr/bin/env bash
set -euo pipefail

missing=()

if ! command -v docker >/dev/null 2>&1; then
  missing+=("Docker (https://docs.docker.com/engine/install/)")
fi

compose_msg=""
if command -v docker >/dev/null 2>&1; then
  if docker compose version >/dev/null 2>&1; then
    compose_msg="Docker Compose v2 (docker compose) detected"
  elif command -v docker-compose >/dev/null 2>&1; then
    compose_msg="Docker Compose v1 (docker-compose) detected"
  else
    missing+=("Docker Compose plugin (https://docs.docker.com/compose/install/)")
  fi
fi

if [ ${#missing[@]} -ne 0 ]; then
  echo "Missing prerequisites:\n- ${missing[*]}" >&2
  exit 1
fi

echo "Prerequisites OK"
[ -n "$compose_msg" ] && echo "$compose_msg"
