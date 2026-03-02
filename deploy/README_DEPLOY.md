# Guía de Despliegue — CostaSol Alquiler

Tres scripts PowerShell para desplegar el proyecto en distintos entornos.
Ejecuta siempre desde la **raíz del proyecto** (donde están las carpetas `frontend/` y `backend/`).

---

## Requisitos previos

| Herramienta | Para qué | Instalación |
|---|---|---|
| Node.js 20 LTS | Build de Astro y Strapi | https://nodejs.org |
| Git for Windows | `ssh` y `scp` en PATH | https://git-scm.com |
| rsync (opcional) | Sincronizar backend | Incluido en Git for Windows ≥ 2.45 |
| WinSCP (opcional) | Deploy SFTP a cPanel | https://winscp.net |
| PM2 (en el VPS) | Gestionar proceso Strapi | `npm install -g pm2` |

---

## Escenario A — Solo frontend estático

### A1 · VPS con acceso SSH

**Edita las variables** al inicio de [deploy_frontend_ssh.ps1](deploy_frontend_ssh.ps1):

```powershell
$SERVER_HOST  = "123.45.67.89"          # IP o dominio
$SERVER_USER  = "ubuntu"
$SERVER_PORT  = 22
$REMOTE_PATH  = "/var/www/costasol/html"
$SSH_KEY      = "C:\Users\TU_USUARIO\.ssh\mi_clave.pem"  # Vacío = ssh-agent
```

**Ejecutar:**

```powershell
# Desde la raíz del proyecto:
.\deploy\deploy_frontend_ssh.ps1

# Simular sin subir nada (dry-run):
.\deploy\deploy_frontend_ssh.ps1 -DryRun
```

**Lo que hace el script:**
1. `npm run build` en `frontend/` → genera `frontend/dist/`
2. Borra el contenido de `$REMOTE_PATH` en el servidor (limpieza)
3. `scp -r frontend/dist/. usuario@servidor:$REMOTE_PATH`
4. Imprime **DEPLOY OK** con la URL pública

---

### A2 · cPanel / Hosting compartido (SFTP)

**Edita las variables** al inicio de [deploy_frontend_sftp.ps1](deploy_frontend_sftp.ps1):

```powershell
$SFTP_HOST   = "ftp.midominio.com"
$SFTP_USER   = "mi_usuario_cpanel"
$SFTP_PASS   = "mi_contraseña"
$SFTP_PORT   = 22                       # SFTP=22, FTP clásico=21
$REMOTE_PATH = "/public_html"
$WINSCP_EXE  = "C:\Program Files (x86)\WinSCP\WinSCP.com"
```

**Ejecutar:**

```powershell
.\deploy\deploy_frontend_sftp.ps1

# Dry-run:
.\deploy\deploy_frontend_sftp.ps1 -DryRun
```

**Lo que hace el script:**
1. `npm run build`
2. Si WinSCP está instalado: sincroniza con `synchronize remote -delete` (borra archivos obsoletos en remoto)
3. Sin WinSCP: sube con `scp` nativo (sin borrar archivos obsoletos — aviso)
4. Imprime **DEPLOY OK**

> **Seguridad:** no guardes la contraseña en el script en producción.
> Deja `$SFTP_PASS = ""` y WinSCP te pedirá la contraseña interactivamente.

---

## Escenario B — VPS con Strapi (backend)

**Edita las variables** al inicio de [deploy_backend_strapi_ssh.ps1](deploy_backend_strapi_ssh.ps1):

```powershell
$SERVER_HOST  = "123.45.67.89"
$SERVER_USER  = "ubuntu"
$SERVER_PORT  = 22
$REMOTE_PATH  = "/var/www/costasol/backend"
$SSH_KEY      = "C:\Users\TU_USUARIO\.ssh\mi_clave.pem"
$PM2_APP_NAME = "strapi-costasol"
```

**Ejecutar:**

```powershell
.\deploy\deploy_backend_strapi_ssh.ps1

# Dry-run:
.\deploy\deploy_backend_strapi_ssh.ps1 -DryRun
```

**Lo que hace el script:**
1. `rsync` del directorio `backend/` al VPS (excluye `node_modules/`, `.env`, `*.db`, `dist/`)
2. En el servidor: `npm ci --omit=dev` + `npm run build`
3. `pm2 restart strapi-costasol` (o `pm2 start` si aún no existe el proceso)
4. Imprime **DEPLOY OK** con la URL del panel de Strapi

> El archivo `.env` **nunca se sube** con rsync. Debes crearlo manualmente en el
> servidor la primera vez:
> `ssh usuario@servidor "nano /var/www/costasol/backend/.env"`

---

## Primera puesta en marcha del VPS (checklist)

```bash
# En el VPS (Ubuntu/Debian):
sudo apt update && sudo apt install -y nodejs npm nginx
sudo npm install -g pm2

# Crear directorios
sudo mkdir -p /var/www/costasol/html
sudo mkdir -p /var/www/costasol/backend
sudo chown -R $USER:$USER /var/www/costasol

# Configurar .env en el backend (primera vez)
nano /var/www/costasol/backend/.env
# → copia el contenido de backend/.env.example y rellena los valores

# Iniciar Strapi con PM2 (primera vez, tras el primer deploy)
cd /var/www/costasol/backend
pm2 start node_modules/.bin/strapi --name strapi-costasol -- start
pm2 save
pm2 startup   # sigue las instrucciones para arranque automático
```

---

## Troubleshooting rápido

| Síntoma | Causa probable | Solución |
|---|---|---|
| `ssh: command not found` | Git for Windows no está en PATH | Reinstala Git for Windows con opción "Git Bash + tools in PATH" |
| `rsync: command not found` | rsync no incluido | Instala [cwrsync](https://itefix.net/cwrsync) o usa WSL |
| WinSCP falla con código 3 | Contraseña incorrecta o puerto erróneo | Verifica credenciales cPanel |
| PM2 no encuentra el proceso | Primera vez en el servidor | Ejecuta el bloque de primera puesta en marcha |
| `ECONNREFUSED` en Strapi | .env no configurado en el servidor | Crea el .env en el VPS manualmente |
