#!/usr/bin/env bash
set -euo pipefail

echo "Checking prerequisites..."

command -v docker >/dev/null 2>&1 || { echo "Docker not found. Install Docker Desktop."; exit 1; }
docker compose version >/dev/null 2>&1 || { echo "Docker Compose v2 not found."; exit 1; }

echo "OK: Docker and Docker Compose v2 are available."
