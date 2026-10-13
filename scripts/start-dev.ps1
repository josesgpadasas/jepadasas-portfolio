# Starts backend (3000) and frontend (3001) in new Windows Terminal tabs.
# Requires: Docker dev stack up, Node.js, Windows Terminal (wt).

$monoRoot = Split-Path $PSScriptRoot -Parent
$backend = Join-Path $monoRoot "backend"
$frontend = Join-Path $monoRoot "frontend"

if (-not (Test-Path (Join-Path $backend ".env"))) {
  Copy-Item (Join-Path $backend ".env.example") (Join-Path $backend ".env")
}
if (-not (Test-Path (Join-Path $frontend ".env.local"))) {
  Copy-Item (Join-Path $frontend ".env.example") (Join-Path $frontend ".env.local")
}

$backendCmd = "cd '$backend'; npm run start:dev"
$frontendCmd = "cd '$frontend'; npm run dev"

if (Get-Command wt -ErrorAction SilentlyContinue) {
  wt -w 0 new-tab --title "API :3000" powershell -NoExit -Command $backendCmd `
    ; new-tab --title "UI :3001" powershell -NoExit -Command $frontendCmd
} else {
  Write-Host "Start two terminals manually:" -ForegroundColor Yellow
  Write-Host "  1) $backendCmd"
  Write-Host "  2) $frontendCmd"
  Write-Host "Then open http://localhost:3001"
}
