# ==============================================================================
# run_ec2_deploy.ps1 — Lanzador Windows: sube ec2_deploy.sh y lo ejecuta
# CostaSol Alquiler  ·  EC2 Ubuntu 24.04
# ------------------------------------------------------------------------------
# Uso (desde la raíz del proyecto):
#   .\deploy\run_ec2_deploy.ps1
#   .\deploy\run_ec2_deploy.ps1 -PemPath "C:\ruta\a\tu-clave.pem"
# ==============================================================================

param(
    [string]$PemPath   = "mis-llaves.pem",          # ruta a tu .pem local
    [string]$ServerIP  = "3.78.246.203",
    [string]$SshUser   = "ubuntu",
    [int]   $SshPort   = 22
)

$ErrorActionPreference = "Stop"

# ── Verificar que el .pem existe ─────────────────────────────────────────────
if (-not (Test-Path $PemPath)) {
    Write-Host ""
    Write-Host "ERROR: No se encuentra la clave SSH en: $PemPath" -ForegroundColor Red
    Write-Host "Uso: .\deploy\run_ec2_deploy.ps1 -PemPath 'C:\ruta\mi-clave.pem'" -ForegroundColor Yellow
    exit 1
}

# Windows requiere permisos estrictos en el .pem para ssh
# Intentamos corregirlos si icacls está disponible
Write-Host "Ajustando permisos del .pem..." -ForegroundColor Cyan
try {
    icacls $PemPath /inheritance:r /grant:r "${env:USERNAME}:R" | Out-Null
} catch {
    Write-Host "  (No se pudieron ajustar permisos — continúa si ya son correctos)" -ForegroundColor Yellow
}

$Remote   = "${SshUser}@${ServerIP}"
$SshArgs  = @("-i", $PemPath, "-p", $SshPort, "-o", "StrictHostKeyChecking=no", "-o", "ConnectTimeout=15")
$ScriptLocal = "deploy\ec2_deploy.sh"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CostaSol — Deploy remoto EC2"                   -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Servidor  : $Remote"
Write-Host "  Clave SSH : $PemPath"
Write-Host ""

# ── 1. Verificar conectividad SSH ─────────────────────────────────────────────
Write-Host "[1/3] Verificando conectividad SSH..." -ForegroundColor Green
& ssh @sshArgs $Remote "echo 'SSH OK'"
if ($LASTEXITCODE -ne 0) {
    Write-Host "No se puede conectar al servidor. Verifica IP, .pem y Security Groups (puerto $SshPort)." -ForegroundColor Red
    exit 1
}

# ── 2. Subir ec2_deploy.sh al servidor ───────────────────────────────────────
Write-Host "[2/3] Subiendo script de despliegue al servidor..." -ForegroundColor Green
$scpArgs = @("-i", $PemPath, "-P", $SshPort, "-o", "StrictHostKeyChecking=no")
& scp @scpArgs $ScriptLocal "${Remote}:/tmp/ec2_deploy.sh"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al subir el script con scp." -ForegroundColor Red
    exit 1
}

# ── 3. Ejecutar el script en el servidor ─────────────────────────────────────
Write-Host "[3/3] Ejecutando deploy en el servidor (esto tarda unos minutos)..." -ForegroundColor Green
Write-Host ""
& ssh @sshArgs $Remote "chmod +x /tmp/ec2_deploy.sh && bash /tmp/ec2_deploy.sh"

$exitCode = $LASTEXITCODE

Write-Host ""
if ($exitCode -eq 0) {
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "  DEPLOY OK" -ForegroundColor Green
    Write-Host "  Backend  : http://${ServerIP}:1337/admin" -ForegroundColor Green
    Write-Host "  Frontend : http://${ServerIP}:3000"        -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
} else {
    Write-Host "================================================" -ForegroundColor Red
    Write-Host "  El script terminó con error (código $exitCode)." -ForegroundColor Red
    Write-Host "  Conéctate manualmente y revisa los logs:"        -ForegroundColor Yellow
    Write-Host "  ssh -i $PemPath $Remote"                         -ForegroundColor Yellow
    Write-Host "  pm2 logs strapi --lines 50"                      -ForegroundColor Yellow
    Write-Host "================================================" -ForegroundColor Red
    exit $exitCode
}
