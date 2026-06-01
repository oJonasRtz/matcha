$ErrorActionPreference = "Stop"

$certPath = "server/certificates/server.cert"
$keyPath = "server/certificates/server.key"

if ((Test-Path $certPath) -and (Test-Path $keyPath)) {
    Write-Host "===== TLS certificates already exist. Skipping generation. ====="
    exit 0
}

if (-not (Get-Command mkcert -ErrorAction SilentlyContinue)) {
    Write-Error "mkcert is not installed. Install it first (e.g. winget install FiloSottile.mkcert) and run make again."
}

if (-not (Test-Path "server/certificates")) {
    New-Item -ItemType Directory -Path "server/certificates" | Out-Null
}

Write-Host "===== Generating TLS certificates... ====="
& mkcert -install
& mkcert -key-file $keyPath -cert-file $certPath localhost 127.0.0.1 ::1

Write-Host "Certificate generated:"
Write-Host " - $certPath"
Write-Host " - $keyPath"
