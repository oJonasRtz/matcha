$ErrorActionPreference = "Stop"

$requiredDirs = @("backend", "frontend", "database")
$missing = $false

foreach ($dir in $requiredDirs) {
    $envPath = Join-Path $dir ".env"
    if (-not (Test-Path $envPath)) {
        Write-Host "===== Warning: .env file not found in $dir directory. ====="
        $missing = $true
    }
}

if ($missing) {
    & powershell -NoProfile -ExecutionPolicy Bypass -File "./scripts/env_setup.ps1"
}
