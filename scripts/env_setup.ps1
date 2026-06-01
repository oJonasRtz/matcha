$ErrorActionPreference = "Stop"

Write-Host "Generating .env files..."

function New-HexString {
    param([int]$ByteCount = 32)
    $bytes = New-Object byte[] $ByteCount
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    -join ($bytes | ForEach-Object { $_.ToString("x2") })
}

$dbUser = "user"
$dbPassword = New-HexString
$dbName = "mydb"
$jwtSecret = New-HexString
$jwtTime = 2

@"
DB_HOST=database
DB_USER=$dbUser
DB_PASSWORD=$dbPassword
DB_NAME=$dbName
JWT_SECRET=$jwtSecret
JWT_ALGORITHM=HS256
JWT_EXP_HOURS=$jwtTime
"@ | Set-Content -Path "backend/.env" -NoNewline

@"
JWT_EXP_HOURS=$jwtTime
"@ | Set-Content -Path "frontend/.env" -NoNewline

@"
POSTGRES_USER=$dbUser
POSTGRES_PASSWORD=$dbPassword
POSTGRES_DB=$dbName
"@ | Set-Content -Path "database/.env" -NoNewline

Write-Host ".env files generated successfully."
