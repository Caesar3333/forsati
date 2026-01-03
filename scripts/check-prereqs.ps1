Write-Host "Checking prerequisites..."

$docker = Get-Command docker -ErrorAction SilentlyContinue
if (-not $docker) {
    Write-Error "Docker not found. Install Docker Desktop."
    exit 1
}

$compose = & docker compose version 2>$null
if (-not $compose) {
    Write-Error "Docker Compose v2 not found."
    exit 1
}

Write-Host "OK: Docker and Docker Compose v2 are available."
