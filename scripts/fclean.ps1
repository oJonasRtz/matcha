$ErrorActionPreference = "Continue"

$paths = @(
    "server/certificates/*.crt",
    "server/certificates/*.cert",
    "server/certificates/*.key",
    "backend/.env",
    "frontend/.env",
    "database/.env"
)

foreach ($pattern in $paths) {
    $items = Get-Item -Path $pattern -ErrorAction SilentlyContinue
    foreach ($item in $items) {
        try {
            if ($item.PSIsContainer -eq $false) {
                $item.IsReadOnly = $false
            }
            Remove-Item -Path $item.FullName -Force -ErrorAction SilentlyContinue
        } catch {
            Write-Host "Could not remove $($item.FullName): $($_.Exception.Message)"
        }
    }
}
