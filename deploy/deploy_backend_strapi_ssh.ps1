# ==============================================================================
# deploy_backend_strapi_ssh.ps1 — Despliegue backend Strapi v5 (VPS / SSH)
# CostaSol Alquiler
# ------------------------------------------------------------------------------
# Flujo:
#   1. Copia el código backend al VPS con rsync (excluye node_modules, .env, DB)
#   2. En el servidor: npm ci --omit=dev + npm run build
#   3. Reinicia el proceso con PM2 (o systemd como alternativa)
#
# Uso:
#   .\deploy\deploy_backend_strapi_ssh.ps1
#   .\deploy\deploy_backend_strapi_ssh.ps1 -DryRun
#
# Requisitos en el VPS:
#   - Node.js 20 LTS + npm
#   - PM2: npm install -g pm2
#   - Directorio $REMOTE_PATH creado con permisos del usuario SSH
# ==============================================================================

param(
    [switch]$DryRun
)

# ── CONFIGURA ESTAS VARIABLES ANTES DEL PRIMER DESPLIEGUE ─────────────────────
$SERVER_HOST   = "TU_IP_O_DOMINIO"           # IP o dominio del VPS
$SERVER_USER   = "ubuntu"                    # Usuario SSH
$SERVER_PORT   = 22                          # Puerto SSH
$REMOTE_PATH   = "/var/www/costasol/backend" # Ruta en el servidor
$SSH_KEY       = ""                          # Ruta a .pem o vacío para ssh-agent

# Nombre del proceso PM2 (debe coincidir con el que está corriendo en el VPS)
$PM2_APP_NAME  = "strapi-costasol"

# ── Directorios locales ───────────────────────────────────────────────────────
$BACKEND_DIR   = "backend"
# ──────────────────────────────────────────────────────────────────────────────

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CostaSol — Deploy Backend Strapi (SSH)"        -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Servidor  : $SERVER_USER@$SERVER_HOST:$SERVER_PORT"
Write-Host "  Destino   : $REMOTE_PATH"
Write-Host "  PM2 app   : $PM2_APP_NAME"
if ($DryRun) {
    Write-Host "  Modo      : DRY-RUN (no se sube nada)" -ForegroundColor Yellow
}
Write-Host ""

# ── Argumentos SSH ────────────────────────────────────────────────────────────
$sshArgs = @("-p", $SERVER_PORT, "-o", "StrictHostKeyChecking=no")
if ($SSH_KEY -ne "") {
    $sshArgs += @("-i", $SSH_KEY)
}
$remoteUser = "${SERVER_USER}@${SERVER_HOST}"

# ── 1. Verificar que el directorio backend existe ─────────────────────────────
Write-Host "[1/4] Verificando directorio backend local..." -ForegroundColor Green

if (-not (Test-Path $BACKEND_DIR)) {
    throw "No se encontró el directorio '$BACKEND_DIR'. Ejecuta desde la raíz del proyecto."
}

# ── 2. Rsync — sincroniza código, omite node_modules, .env y base de datos ───
Write-Host "[2/4] Sincronizando código con rsync..." -ForegroundColor Green
Write-Host "      (node_modules, .env y *.db se excluyen automáticamente)"

if (-not $DryRun) {
    # rsync disponible en Git for Windows y WSL
    # --delete elimina en remoto archivos que ya no existen en local
    $rsyncArgs = @(
        "-avz",
        "--delete",
        "--exclude", "node_modules/",
        "--exclude", ".env",
        "--exclude", "*.db",
        "--exclude", ".tmp/",
        "--exclude", "dist/",
        "-e", "ssh $($sshArgs -join ' ')",
        "$BACKEND_DIR/",
        "${remoteUser}:${REMOTE_PATH}/"
    )

    & rsync @rsyncArgs
    if ($LASTEXITCODE -ne 0) { throw "rsync falló (código $LASTEXITCODE)" }
} else {
    Write-Host "      [DRY-RUN] rsync $BACKEND_DIR/ → ${remoteUser}:${REMOTE_PATH}/" -ForegroundColor Yellow
}

# ── 3. En el servidor: npm ci + npm run build ─────────────────────────────────
Write-Host "[3/4] Instalando dependencias y construyendo en el servidor..." -ForegroundColor Green

$remoteCommands = @"
set -e
cd $REMOTE_PATH
echo '-- npm ci --omit=dev'
npm ci --omit=dev
echo '-- npm run build'
npm run build
echo 'Build completado'
"@

if (-not $DryRun) {
    & ssh @sshArgs $remoteUser $remoteCommands
    if ($LASTEXITCODE -ne 0) { throw "Falló la instalación/build remoto" }
} else {
    Write-Host "      [DRY-RUN] Se ejecutaría en remoto: npm ci + npm run build" -ForegroundColor Yellow
}

# ── 4. Reiniciar Strapi con PM2 ───────────────────────────────────────────────
Write-Host "[4/4] Reiniciando Strapi con PM2..." -ForegroundColor Green

$restartCmd = "pm2 restart $PM2_APP_NAME || pm2 start $REMOTE_PATH/node_modules/.bin/strapi --name $PM2_APP_NAME -- start && pm2 save"

if (-not $DryRun) {
    & ssh @sshArgs $remoteUser $restartCmd
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  AVISO: PM2 devolvió error. Comprueba el estado manualmente:" -ForegroundColor Yellow
        Write-Host "  ssh $remoteUser 'pm2 list'" -ForegroundColor Yellow
    }
} else {
    Write-Host "      [DRY-RUN] Se ejecutaría: pm2 restart $PM2_APP_NAME" -ForegroundColor Yellow
}

# ── Nota sobre systemd (alternativa a PM2) ────────────────────────────────────
# Si prefieres systemd en lugar de PM2, comenta el bloque [4/4] y usa:
#   & ssh @sshArgs $remoteUser "sudo systemctl restart strapi-costasol"

# ── Resultado ─────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
if ($DryRun) {
    Write-Host "  DRY-RUN completado — no se realizaron cambios" -ForegroundColor Yellow
} else {
    Write-Host "  DEPLOY OK" -ForegroundColor Green
    Write-Host "  Publicado en: http://$SERVER_HOST:1337/admin"
}
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
