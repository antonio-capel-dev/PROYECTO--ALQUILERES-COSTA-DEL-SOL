# ==============================================================================
# deploy_frontend_ssh.ps1 — Despliegue frontend estático (VPS / SSH + SCP)
# CostaSol Alquiler · Astro SSG
# ------------------------------------------------------------------------------
# Uso:
#   .\deploy\deploy_frontend_ssh.ps1
#   .\deploy\deploy_frontend_ssh.ps1 -DryRun   # simula sin subir nada
#
# Requisitos:
#   - ssh y scp disponibles en PATH (Git for Windows los incluye)
#   - Clave SSH configurada (o se usa contraseña si no hay clave)
#   - El servidor debe tener el directorio $REMOTE_PATH creado y con permisos
# ==============================================================================

param(
    [switch]$DryRun
)

# ── CONFIGURA ESTAS VARIABLES ANTES DEL PRIMER DESPLIEGUE ─────────────────────
$SERVER_HOST  = "TU_IP_O_DOMINIO"          # Ej: 123.45.67.89  o  midominio.com
$SERVER_USER  = "ubuntu"                   # Usuario SSH del servidor
$SERVER_PORT  = 22                         # Puerto SSH (defecto 22)
$REMOTE_PATH  = "/var/www/costasol/html"   # Ruta absoluta en el servidor
$SSH_KEY      = ""                         # Ruta a tu clave privada .pem/.ppk
                                           # Deja vacío si usas ssh-agent
# ── Directorio de build local (relativo al raíz del proyecto) ─────────────────
$FRONTEND_DIR = "frontend"
$BUILD_DIR    = "$FRONTEND_DIR\dist"
# ──────────────────────────────────────────────────────────────────────────────

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CostaSol — Deploy Frontend (SSH/SCP)"          -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Servidor : $SERVER_USER@$SERVER_HOST:$SERVER_PORT"
Write-Host "  Destino  : $REMOTE_PATH"
if ($DryRun) {
    Write-Host "  Modo     : DRY-RUN (no se sube nada)" -ForegroundColor Yellow
}
Write-Host ""

# ── 1. Build de Astro ──────────────────────────────────────────────────────────
Write-Host "[1/4] Construyendo el frontend con Astro..." -ForegroundColor Green

if (-not $DryRun) {
    Push-Location $FRONTEND_DIR
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) { throw "npm run build falló (código $LASTEXITCODE)" }
    } finally {
        Pop-Location
    }
} else {
    Write-Host "      [DRY-RUN] Saltando npm run build" -ForegroundColor Yellow
}

# ── 2. Verificar que existe el directorio de build ───────────────────────────
Write-Host "[2/4] Verificando directorio de build..." -ForegroundColor Green

if (-not $DryRun) {
    if (-not (Test-Path $BUILD_DIR)) {
        throw "No se encontró '$BUILD_DIR'. ¿El build falló?"
    }
    $fileCount = (Get-ChildItem -Recurse $BUILD_DIR).Count
    Write-Host "      $fileCount archivos en $BUILD_DIR"
}

# ── 3. Preparar argumentos SSH / SCP ─────────────────────────────────────────
$sshArgs = @("-p", $SERVER_PORT, "-o", "StrictHostKeyChecking=no")
if ($SSH_KEY -ne "") {
    $sshArgs += @("-i", $SSH_KEY)
}
$remoteTarget = "${SERVER_USER}@${SERVER_HOST}:${REMOTE_PATH}"

# ── 4. Limpiar carpeta remota y subir archivos ───────────────────────────────
Write-Host "[3/4] Limpiando carpeta remota..." -ForegroundColor Green

if (-not $DryRun) {
    $cleanCmd = "rm -rf ${REMOTE_PATH}/* && echo 'Limpieza OK'"
    & ssh @sshArgs "${SERVER_USER}@${SERVER_HOST}" $cleanCmd
    if ($LASTEXITCODE -ne 0) { throw "Error al limpiar la carpeta remota" }
}

Write-Host "[4/4] Subiendo archivos con SCP..." -ForegroundColor Green

if (-not $DryRun) {
    # scp -r sube el contenido de dist/ (no el directorio en sí)
    & scp @sshArgs -r "${BUILD_DIR}\." $remoteTarget
    if ($LASTEXITCODE -ne 0) { throw "Error durante scp" }
} else {
    Write-Host "      [DRY-RUN] Se subiría: $BUILD_DIR → $remoteTarget" -ForegroundColor Yellow
}

# ── Resultado ─────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
if ($DryRun) {
    Write-Host "  DRY-RUN completado — no se realizaron cambios" -ForegroundColor Yellow
} else {
    Write-Host "  DEPLOY OK" -ForegroundColor Green
    Write-Host "  Publicado en: http://$SERVER_HOST"
}
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
