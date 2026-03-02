#!/usr/bin/env bash
# ==============================================================================
# ec2_deploy.sh — Deploy completo en EC2 Ubuntu 24.04
# CostaSol Alquiler  ·  rama: clase
# ------------------------------------------------------------------------------
# Uso en el servidor:
#   bash ec2_deploy.sh
#
# Qué hace:
#   1. Comprobaciones de entorno (Node 20, npm, PM2)
#   2. Clone o Pull del repo (rama clase)
#   3. Backend: npm ci → .env seguro → build → PM2 start/restart
#   4. Frontend: npm ci → build → serve con PM2
#   5. Verificaciones finales (curl health-checks)
# ==============================================================================

set -euo pipefail          # salir en cualquier error
IFS=$'\n\t'

# ── Colores ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
ok()   { echo -e "${GREEN}[OK]${NC} $*"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
fail() { echo -e "${RED}[FAIL]${NC} $*"; exit 1; }
info() { echo -e "${CYAN}[INFO]${NC} $*"; }

# ── Configuración ─────────────────────────────────────────────────────────────
REPO_URL="https://github.com/antonio-capel-dev/PROYECTO--ALQUILERES-COSTA-DEL-SOL.git"
BRANCH="clase"
APP_DIR="/var/www/alquileres"
SERVER_IP="3.78.246.203"

echo ""
echo "================================================================"
echo "  CostaSol — Deploy EC2  ·  rama: $BRANCH"
echo "================================================================"
echo ""

# ══════════════════════════════════════════════════════════════════════════════
# 1) COMPROBACIONES DE ENTORNO
# ══════════════════════════════════════════════════════════════════════════════
info "=== PASO 1: Comprobaciones de entorno ==="

# Node.js ≥ 20
if command -v node &>/dev/null; then
  NODE_VER=$(node -v)
  NODE_MAJOR=$(echo "$NODE_VER" | tr -d 'v' | cut -d. -f1)
  ok "Node.js $NODE_VER encontrado"
  if [ "$NODE_MAJOR" -lt 20 ]; then
    warn "Node $NODE_VER < 20. Instalando Node 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ok "Node $(node -v) instalado"
  fi
else
  info "Node.js no encontrado. Instalando Node 20 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ok "Node $(node -v) instalado"
fi

ok "npm $(npm -v)"

# PM2
if ! command -v pm2 &>/dev/null; then
  info "PM2 no encontrado. Instalando globalmente..."
  sudo npm i -g pm2
fi
ok "PM2 $(pm2 -v)"

# serve (para el frontend estático)
if ! command -v serve &>/dev/null; then
  info "serve no encontrado. Instalando globalmente..."
  sudo npm i -g serve
fi
ok "serve instalado"

# ══════════════════════════════════════════════════════════════════════════════
# 2) REPO: CLONE O PULL
# ══════════════════════════════════════════════════════════════════════════════
info "=== PASO 2: Repositorio ==="

if [ -d "$APP_DIR/.git" ]; then
  ok "Repo encontrado en $APP_DIR → haciendo pull..."
  cd "$APP_DIR"
  git fetch --all --prune
  git checkout "$BRANCH"
  git reset --hard "origin/$BRANCH"
  git clean -fd
else
  info "Repo no encontrado. Clonando en $APP_DIR..."
  sudo mkdir -p "$APP_DIR"
  sudo chown -R "$(whoami)":"$(whoami)" "$APP_DIR"
  git clone -b "$BRANCH" "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

COMMIT=$(git rev-parse --short HEAD)
ok "Commit desplegado: $COMMIT"

# ══════════════════════════════════════════════════════════════════════════════
# 3) BACKEND — STRAPI v5
# ══════════════════════════════════════════════════════════════════════════════
info "=== PASO 3: Backend (Strapi v5) ==="

cd "$APP_DIR/backend"

# 3.1 Dependencias
info "Instalando dependencias del backend..."
npm ci 2>/dev/null || npm install
ok "Dependencias backend instaladas"

# 3.2 .env — solo crear si NO existe (nunca sobreescribir)
if [ -f ".env" ]; then
  ok ".env ya existe — no se toca"
  # Verificar que tiene las claves mínimas
  for KEY in ADMIN_JWT_SECRET APP_KEYS JWT_SECRET API_TOKEN_SALT ENCRYPTION_KEY; do
    if ! grep -q "^${KEY}=" .env; then
      warn "Falta $KEY en .env — añadiendo..."
      echo "${KEY}=$(openssl rand -base64 32 | tr -d '\n=')" >> .env
    fi
  done
else
  info "Creando .env con secretos aleatorios (openssl rand)..."

  # Generar APP_KEYS: 4 claves base64 separadas por coma
  K1=$(openssl rand -base64 24 | tr -d '\n=/')
  K2=$(openssl rand -base64 24 | tr -d '\n=/')
  K3=$(openssl rand -base64 24 | tr -d '\n=/')
  K4=$(openssl rand -base64 24 | tr -d '\n=/')

  cat > .env <<ENVEOF
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

APP_KEYS=${K1},${K2},${K3},${K4}
API_TOKEN_SALT=$(openssl rand -base64 32 | tr -d '\n=/')
ADMIN_JWT_SECRET=$(openssl rand -base64 32 | tr -d '\n=/')
JWT_SECRET=$(openssl rand -base64 32 | tr -d '\n=/')
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32 | tr -d '\n=/')
ENCRYPTION_KEY=$(openssl rand -base64 32 | tr -d '\n=/')
ENVEOF

  ok ".env creado (secretos generados, NO se muestran en consola)"
fi

# 3.3 Build Strapi
info "Construyendo Strapi (npm run build)..."
npm run build
ok "Build de Strapi completado"

# 3.4 PM2: restart o start
if pm2 list | grep -q "strapi"; then
  info "Proceso 'strapi' encontrado en PM2 → reiniciando..."
  pm2 restart strapi
else
  info "Iniciando Strapi con PM2..."
  pm2 start npm --name "strapi" -- start
fi
pm2 save
ok "Strapi gestionado por PM2"

# ══════════════════════════════════════════════════════════════════════════════
# 4) FRONTEND — ASTRO SSG
# ══════════════════════════════════════════════════════════════════════════════
info "=== PASO 4: Frontend (Astro SSG) ==="

cd "$APP_DIR/frontend"

info "Instalando dependencias del frontend..."
npm ci 2>/dev/null || npm install
ok "Dependencias frontend instaladas"

info "Construyendo frontend (npm run build)..."
npm run build
ok "Build del frontend completado"

# Contar archivos generados
FILE_COUNT=$(find dist -type f | wc -l)
ok "$FILE_COUNT archivos estáticos en dist/"

# 4.1 PM2: restart o start del servidor de estáticos
if pm2 list | grep -q "frontend"; then
  info "Proceso 'frontend' encontrado en PM2 → reiniciando..."
  pm2 restart frontend
else
  info "Iniciando servidor estático con PM2 + serve..."
  pm2 start serve --name "frontend" -- -s dist -l 3000
fi
pm2 save
ok "Frontend gestionado por PM2 en puerto 3000"

# ══════════════════════════════════════════════════════════════════════════════
# 5) VERIFICACIONES FINALES
# ══════════════════════════════════════════════════════════════════════════════
info "=== PASO 5: Verificaciones ==="

echo ""
echo "Esperando 8 segundos para que los procesos arranquen..."
sleep 8

echo ""
echo "──── pm2 status ────────────────────────────────────────────────"
pm2 status
echo "────────────────────────────────────────────────────────────────"

echo ""
info "Verificando Backend (Strapi) en localhost:1337..."
if curl -sf --max-time 10 "http://localhost:1337/_health" > /dev/null 2>&1; then
  ok "Strapi responde en /_health"
elif curl -sf --max-time 10 "http://localhost:1337/admin" > /dev/null 2>&1; then
  ok "Strapi responde en /admin"
else
  warn "Strapi aún no responde (puede seguir arrancando). Revisa con: pm2 logs strapi --lines 30"
fi

echo ""
info "Verificando Frontend en localhost:3000..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://localhost:3000" || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
  ok "Frontend devuelve HTTP 200"
else
  warn "Frontend devolvió HTTP $HTTP_CODE (puede seguir iniciando). Revisa con: pm2 logs frontend --lines 20"
fi

echo ""
info "Verificando endpoint /api/rentals..."
RENTALS=$(curl -sf --max-time 10 "http://localhost:1337/api/rentals?pagination[pageSize]=1" 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(f\"Total: {d.get('meta',{}).get('pagination',{}).get('total','?')} alquileres\")" 2>/dev/null || echo "Strapi aún arrancando o colección vacía")
info "  $RENTALS"

# ══════════════════════════════════════════════════════════════════════════════
# RESUMEN FINAL
# ══════════════════════════════════════════════════════════════════════════════
echo ""
echo "================================================================"
echo -e "  ${GREEN}DEPLOY OK${NC}"
echo "================================================================"
echo "  Commit desplegado : $COMMIT  (rama: $BRANCH)"
echo "  Backend  Strapi   : http://${SERVER_IP}:1337"
echo "  Frontend Astro    : http://${SERVER_IP}:3000"
echo "  Panel Strapi      : http://${SERVER_IP}:1337/admin"
echo ""
echo "  Comandos útiles:"
echo "    pm2 logs strapi --lines 50"
echo "    pm2 logs frontend --lines 20"
echo "    pm2 restart all"
echo "    cat $APP_DIR/backend/.env | grep -v SECRET | grep -v KEY"
echo "================================================================"
echo ""
