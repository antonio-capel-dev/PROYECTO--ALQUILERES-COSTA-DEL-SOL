# ==============================================================================
# deploy_frontend_sftp.ps1 — Despliegue frontend estático (cPanel / SFTP)
# CostaSol Alquiler · Astro SSG
# ------------------------------------------------------------------------------
# Usa WinSCP CLI cuando está instalado; si no, cae a SCP nativo de Git/Windows.
#
# Uso:
#   .\deploy\deploy_frontend_sftp.ps1
#   .\deploy\deploy_frontend_sftp.ps1 -DryRun
#
# Requisitos:
#   · WinSCP (opcional, recomendado): https://winscp.net/
#     Instalar y añadir al PATH, o indicar ruta en $WINSCP_EXE
#   · Sin WinSCP: ssh/scp de Git for Windows en PATH
# ==============================================================================

param(
    [switch]$DryRun
)

# ── CONFIGURA ESTAS VARIABLES ANTES DEL PRIMER DESPLIEGUE ─────────────────────
$SFTP_HOST    = "ftp.tudominio.com"          # Host SFTP de tu cPanel
$SFTP_USER    = "tu_usuario_cpanel"          # Usuario cPanel (o FTP)
$SFTP_PASS    = "tu_contraseña"              # Contraseña (o déjala vacía y tecléala)
$SFTP_PORT    = 22                           # Puerto SFTP (22) o FTP (21)
$REMOTE_PATH  = "/public_html"               # Carpeta raíz pública en cPanel

# Ruta a WinSCP.com — ajusta si tu instalación es distinta
$WINSCP_EXE   = "C:\Program Files (x86)\WinSCP\WinSCP.com"

# ── Directorio de build local ─────────────────────────────────────────────────
$FRONTEND_DIR = "frontend"
$BUILD_DIR    = "$FRONTEND_DIR\dist"
# ──────────────────────────────────────────────────────────────────────────────

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CostaSol — Deploy Frontend (SFTP / cPanel)"    -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Host    : $SFTP_HOST:$SFTP_PORT"
Write-Host "  Usuario : $SFTP_USER"
Write-Host "  Destino : $REMOTE_PATH"
if ($DryRun) {
    Write-Host "  Modo    : DRY-RUN (no se sube nada)" -ForegroundColor Yellow
}
Write-Host ""

# ── 1. Build de Astro ──────────────────────────────────────────────────────────
Write-Host "[1/3] Construyendo el frontend con Astro..." -ForegroundColor Green

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

# ── 2. Verificar build ────────────────────────────────────────────────────────
Write-Host "[2/3] Verificando directorio de build..." -ForegroundColor Green

if (-not $DryRun) {
    if (-not (Test-Path $BUILD_DIR)) {
        throw "No se encontró '$BUILD_DIR'. ¿El build falló?"
    }
    $fileCount = (Get-ChildItem -Recurse $BUILD_DIR).Count
    Write-Host "      $fileCount archivos en $BUILD_DIR"
}

# ── 3. Subir con WinSCP o SCP ─────────────────────────────────────────────────
Write-Host "[3/3] Subiendo archivos..." -ForegroundColor Green

if (-not $DryRun) {
    $winscpAvailable = (Test-Path $WINSCP_EXE)

    if ($winscpAvailable) {
        Write-Host "      Usando WinSCP CLI..."

        # Script WinSCP temporal
        $winscpScript = @"
open sftp://${SFTP_USER}:${SFTP_PASS}@${SFTP_HOST}:${SFTP_PORT}/ -hostkey=*
synchronize remote -delete "$((Resolve-Path $BUILD_DIR).Path)" "$REMOTE_PATH"
exit
"@
        $tmpScript = [System.IO.Path]::GetTempFileName() + ".txt"
        $winscpScript | Set-Content -Path $tmpScript -Encoding UTF8

        & $WINSCP_EXE /script=$tmpScript /log="deploy\winscp_last.log"
        $exitCode = $LASTEXITCODE
        Remove-Item $tmpScript -ErrorAction SilentlyContinue

        if ($exitCode -ne 0) {
            throw "WinSCP falló (código $exitCode). Revisa deploy\winscp_last.log"
        }
    } else {
        Write-Host "      WinSCP no encontrado — usando SCP nativo..."
        Write-Host "      AVISO: SCP no sincroniza (no borra archivos eliminados)." -ForegroundColor Yellow

        $remoteTarget = "${SFTP_USER}@${SFTP_HOST}:${REMOTE_PATH}"
        $scpArgs = @("-P", $SFTP_PORT, "-o", "StrictHostKeyChecking=no", "-r", "${BUILD_DIR}\.", $remoteTarget)
        & scp @scpArgs
        if ($LASTEXITCODE -ne 0) { throw "SCP falló (código $LASTEXITCODE)" }
    }
} else {
    Write-Host "      [DRY-RUN] Se subiría: $BUILD_DIR → sftp://$SFTP_HOST$REMOTE_PATH" -ForegroundColor Yellow
}

# ── Resultado ─────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
if ($DryRun) {
    Write-Host "  DRY-RUN completado — no se realizaron cambios" -ForegroundColor Yellow
} else {
    Write-Host "  DEPLOY OK" -ForegroundColor Green
    Write-Host "  Publicado en: https://$SFTP_HOST"
}
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
