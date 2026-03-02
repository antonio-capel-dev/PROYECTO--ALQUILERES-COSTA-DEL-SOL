#!/usr/bin/env bash
# ==============================================================================
# devops_pro_deploy.sh — Senior DevOps Deployment Script
# Targets: Ubuntu/Amazon Linux, Astro 5, Strapi 5, Nginx, SSL, PM2
# ==============================================================================

set -euo pipefail
IFS=$'\n\t'

# ── CONFIGURATION (TODO: update variables if needed) ──────────────────────────
DOMAIN="alquileres-costadelsol.com"
APP_DIR="/var/www/alquileres"
REPO_URL="https://github.com/antonio-capel-dev/PROYECTO--ALQUILERES-COSTA-DEL-SOL.git" # TODO: Verify repo URL
BRANCH="main" # Using main as requested
DEPLOY_USER="deploy"
PUBLIC_IP="3.78.246.203"

# ── LOGGING ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
log_ok()   { echo -e "${GREEN}[OK]${NC} $*"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_fail() { echo -e "${RED}[FAIL]${NC} $*"; exit 1; }
log_info() { echo -e "${CYAN}[INFO]${NC} $*"; }

# ══════════════════════════════════════════════════════════════════════════════
# 1) PRE-CHECKS & SYSTEM PREP
# ══════════════════════════════════════════════════════════════════════════════
log_info "=== STEP 1: Pre-checks & System Prep ==="

# OS Detection
OS_RELEASE=$(grep '^ID=' /etc/os-release | cut -d= -f2 | tr -d '"')
log_info "Detected OS: $OS_RELEASE"

# Create deploy user if not exists
if ! id "$DEPLOY_USER" &>/dev/null; then
    log_info "Creating user '$DEPLOY_USER'..."
    sudo useradd -m -s /bin/bash "$DEPLOY_USER"
    sudo usermod -aG sudo "$DEPLOY_USER"
    echo "$DEPLOY_USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/deploy
else
    log_ok "User '$DEPLOY_USER' already exists"
fi

# Ports check
log_info "Checking open ports..."
ss -tulpn | grep -E ':80|:443|:1337' || log_ok "Ports 80/443/1337 are clear or handled"

# Dependencies installation
log_info "Installing system dependencies..."
if [[ "$OS_RELEASE" == "ubuntu" || "$OS_RELEASE" == "debian" ]]; then
    sudo apt update
    sudo apt install -y git curl nginx certbot python3-certbot-nginx openssl ufw
    # Install Node 20 LTS
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
elif [[ "$OS_RELEASE" == "amzn" || "$OS_RELEASE" == "rhel" || "$OS_RELEASE" == "fedora" ]]; then
    sudo dnf update -y
    sudo dnf install -y git curl nginx openssl firewalld
    # Install Node 20 LTS
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    sudo dnf install -y nodejs
else
    log_warn "Unknown OS: $OS_RELEASE. Manual dependency check required."
fi

# PM2
if ! command -v pm2 &>/dev/null; then
    sudo npm install -g pm2
fi

# Configure SWAP (2GB) for t3.small
if [[ $(free -m | grep -i swap | awk '{print $2}') -lt 1000 ]]; then
    log_info "Configuring 2GB SWAP..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    log_ok "SWAP configured"
else
    log_ok "SWAP already exists"
fi

# App root directory
sudo mkdir -p "$APP_DIR"
sudo chown -R "$DEPLOY_USER":www-data "$APP_DIR"
sudo chmod -R 775 "$APP_DIR"

# ══════════════════════════════════════════════════════════════════════════════
# 2) CODE CLONE & BUILD
# ══════════════════════════════════════════════════════════════════════════════
log_info "=== STEP 2: Code Retrieval & Build ==="

sudo -u "$DEPLOY_USER" bash <<EOF
set -eu
cd "$APP_DIR"
if [ -d ".git" ]; then
    echo " Project exists, pulling latest changes from $BRANCH..."
    git fetch --all
    # Forzar abandono de cualquier cambio fantasma en el servidor para evitar abortos
    git reset --hard HEAD || true
    git clean -fd || true
    git checkout "$BRANCH"
    git reset --hard "origin/$BRANCH"
else
    echo " Cloning repository..."
    git clone -b "$BRANCH" "$REPO_URL" .
fi

# Build Frontend (Astro)
echo " Building Frontend..."
cd frontend
npm ci
npm run build
echo " [OK] Frontend built successfully"

# Build Backend (Strapi)
echo " Building Backend..."
cd ../backend
npm ci
# TODO: SMTP credentials in .env (Placeholder)
if [ ! -f ".env" ]; then
    echo " Generating production secrets..."
    cat > .env <<ENVEOF
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=\$(openssl rand -base64 32),\$(openssl rand -base64 32),\$(openssl rand -base64 32),\$(openssl rand -base64 32)
API_TOKEN_SALT=\$(openssl rand -base64 32)
ADMIN_JWT_SECRET=\$(openssl rand -base64 32)
JWT_SECRET=\$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=\$(openssl rand -base64 32)
PUBLIC_URL=https://$DOMAIN
# SMTP TODO: add SMTP credentials
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USERNAME=
# SMTP_PASSWORD=
ENVEOF
fi
NODE_OPTIONS="--max-old-space-size=1536" npm run build
echo " [OK] Backend built successfully"
EOF

# ══════════════════════════════════════════════════════════════════════════════
# 3) PROCESS MANAGEMENT (PM2)
# ══════════════════════════════════════════════════════════════════════════════
log_info "=== STEP 3: Process Management ==="

sudo -u "$DEPLOY_USER" bash <<EOF
set -eu
cd "$APP_DIR/backend"
if pm2 list | grep -q 'strapi'; then
    pm2 restart strapi
else
    pm2 start npm --name "strapi" -- start
fi
pm2 save
EOF

# Startup script
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u "$DEPLOY_USER" --hp "/home/$DEPLOY_USER" || true

# ══════════════════════════════════════════════════════════════════════════════
# 4) NGINX CONFIGURATION
# ══════════════════════════════════════════════════════════════════════════════
log_info "=== STEP 4: Nginx Configuration ==="

cat <<NGINXEOF | sudo tee /etc/nginx/sites-available/$DOMAIN
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Frontend Static Files
    root $APP_DIR/frontend/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Strapi Admin
    location /admin {
        proxy_pass http://localhost:1337/admin;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Strapi API
    location /api {
        proxy_pass http://localhost:1337/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # (Rate limiting eliminado por conflicto con alcance global/server)

    # Security
    server_tokens off;
    client_max_body_size 10M;
}
NGINXEOF

if [ ! -L /etc/nginx/sites-enabled/$DOMAIN ]; then
    sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
fi
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl restart nginx
log_ok "Nginx configured for $DOMAIN"

# ══════════════════════════════════════════════════════════════════════════════
# 5) SSL (CERTBOT)
# ══════════════════════════════════════════════════════════════════════════════
log_info "=== STEP 5: SSL Setup ==="

# Check if DNS resolves to this machine before attempting certbot
DNS_CHECK=$(dig +short "$DOMAIN" || nslookup "$DOMAIN" | awk '/^Address: / { print $2 }')
if [[ "$DNS_CHECK" == "$PUBLIC_IP" ]]; then
    log_info "DNS matches IP. Running Certbot..."
    sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email admin@$DOMAIN || log_warn "Certbot failed. Check DNS propagation."
else
    log_warn "DNS ($DNS_CHECK) does not match Public IP ($PUBLIC_IP). Certificate generation skipped."
    log_info "TODO: Point A record for $DOMAIN to $PUBLIC_IP"
fi

# ══════════════════════════════════════════════════════════════════════════════
# 6) FIREWALL & HARDENING
# ══════════════════════════════════════════════════════════════════════════════
log_info "=== STEP 6: Hardening & Firewall ==="

if [[ "$OS_RELEASE" == "ubuntu" ]]; then
    sudo ufw allow 'Nginx Full'
    sudo ufw allow 'OpenSSH'
    echo "y" | sudo ufw enable
elif [[ "$OS_RELEASE" == "amzn" ]]; then
    sudo systemctl start firewalld
    sudo systemctl enable firewalld
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --permanent --add-service=ssh
    sudo firewall-cmd --reload
fi

# Fix permissions for the deploy user and nginx
sudo chown -R "$DEPLOY_USER":www-data "$APP_DIR"
sudo find "$APP_DIR" -type d -exec chmod 775 {} +
sudo find "$APP_DIR" -type f -exec chmod 664 {} +

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
echo ""
echo "================================================================================"
echo -e "  ${GREEN}SENIOR DEVOPS DEPLOYMENT COMPLETED${NC}"
echo "================================================================================"
echo "  Frontend URL : https://$DOMAIN"
echo "  Backend API  : https://$DOMAIN/api"
echo "  Admin Panel  : https://$DOMAIN/admin"
echo ""
echo "  Status Checklist:"
echo "  [ ] DNS A Record: $DOMAIN -> $PUBLIC_IP"
echo "  [ ] PM2 processes: pm2 status"
echo "  [ ] SSL Status: Check browser or certbot certificates"
echo "  [ ] TODO: Configure SMTP in $APP_DIR/backend/.env"
echo ""
echo "  Command log: journalctl -u nginx"
echo "  PM2 logs: pm2 logs strapi"
echo "================================================================================"
echo ""
