#!/usr/bin/env bash
set -euo pipefail

docker-compose --env-file .env -f docker-compose.prod.yml up --build -d
