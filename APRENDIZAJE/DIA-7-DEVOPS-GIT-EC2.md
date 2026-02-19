# DÍA 7 — DevOps: Git Avanzado + Seguridad + Despliegue EC2
## Ramas · .gitignore · SSH · PM2 · Ubuntu 24.04

---

## ÍNDICE

1. [Git: ramas y flujo de trabajo](#1-git-ramas-y-flujo-de-trabajo)
2. [.gitignore: blindar secretos y artefactos](#2-gitignore-blindar-secretos-y-artefactos)
3. [SSH y claves .pem: cómo funciona](#3-ssh-y-claves-pem-cómo-funciona)
4. [EC2 Ubuntu 24.04: preparar el servidor](#4-ec2-ubuntu-2404-preparar-el-servidor)
5. [PM2: gestión de procesos Node.js](#5-pm2-gestión-de-procesos-nodejs)
6. [El script ec2_deploy.sh explicado línea a línea](#6-el-script-ec2_deploysh-explicado-línea-a-línea)
7. [Flujo completo de despliegue](#7-flujo-completo-de-despliegue)
8. [Errores comunes y cómo resolverlos](#8-errores-comunes-y-cómo-resolverlos)
9. [Preguntas de examen tipo test](#9-preguntas-de-examen-tipo-test)

---

## 1. Git: ramas y flujo de trabajo

### ¿Qué es una rama (branch)?

Una rama es una línea de desarrollo independiente.
Permite trabajar en nuevas funcionalidades sin afectar al código principal.

```
main ──────────────────────────────────────────► (producción estable)
        │
        └── clase ──────────────────────────────► (trabajo diario)
                  │
                  └── hecho-en-clase ──────────► (trabajo de hoy)
                                        │
                                        └── merge → clase
```

### Comandos Git usados hoy

```bash
# Ver en qué rama estás
git branch --show-current

# Ver todas las ramas (locales y remotas)
git branch -a

# Cambiar de rama
git checkout clase

# Crear rama nueva y moverse a ella
git checkout -b nueva-rama

# Fusionar rama en la actual (fast-forward si es posible)
git merge hecho-en-clase

# Ver los últimos commits
git log --oneline -5

# Ver estado del repositorio
git status
git status --short   # versión compacta

# Subir rama al remoto
git push origin clase

# Ver diferencias entre rama local y remota
git log --oneline origin/clase | head -5
```

### Fast-forward merge vs merge con commit

```bash
# Situación antes del merge:
#   clase:         A → B → C
#   hecho-en-clase:            D → E

# FAST-FORWARD (no hay divergencia): clase simplemente avanza el puntero
#   clase: A → B → C → D → E   (sin commit de merge)

# MERGE COMMIT (hay divergencia): crea un commit extra
#   clase: A → B → C → F   (F = commit de merge)
#                    ↗
#                D → E
```

Hoy hicimos **fast-forward** porque `clase` no tenía commits propios después de donde se bifurcó `hecho-en-clase`.

### git reset --hard origin/clase (en el servidor)

```bash
# Este comando en el servidor descarta TODO lo local y pone el repo
# exactamente como está en GitHub (origin/clase)
git fetch --all --prune          # descarga cambios remotos sin aplicar
git reset --hard origin/clase   # sobreescribe el working directory
git clean -fd                   # elimina archivos sin trackear (f=force, d=directorios)
```

**PELIGRO:** `git reset --hard` destruye cambios locales sin commit. En un servidor de producción eso es lo que queremos (siempre desplegamos desde GitHub, nunca editamos en el servidor).

### ¿Por qué `git clean -fd` en el servidor?

Strapi genera archivos temporales en `.tmp/` y `dist/`. Algunos no están en .gitignore del servidor. `git clean -fd` los elimina para que el repo quede limpio antes del build.

---

## 2. .gitignore: blindar secretos y artefactos

### ¿Para qué sirve .gitignore?

Le dice a Git qué archivos NUNCA debe trackear.
Si un archivo está en .gitignore, `git add .` lo ignora completamente.

### Reglas de nuestro .gitignore

```gitignore
# ── SEGURIDAD: nunca subir secretos ──────────────────────────────────
*.pem          # Claves privadas SSH de AWS (si subes esto, comprometes el servidor)
*.key          # Claves privadas genéricas
.env           # Variables de entorno (contraseñas, API keys, secretos)
.env.production

# Belt-and-suspenders (doble seguro por subcarpeta):
backend/.env   # Explícito para el backend de Strapi
frontend/.env  # Explícito para el frontend de Astro

# ── DEPENDENCIAS: node_modules pesa cientos de MB ────────────────────
node_modules/
**/node_modules/   # En cualquier subcarpeta

# ── BUILDS: archivos generados, no código fuente ─────────────────────
dist/           # Output de npm run build
**/dist/        # En cualquier subcarpeta
build/
.output/

# ── STRAPI específico ────────────────────────────────────────────────
.tmp/           # Archivos temporales de Strapi
backend/.cache/ # Caché del build de Strapi
public/uploads/ # Imágenes subidas por usuarios (van en S3/CDN, no en Git)

# ── OS ───────────────────────────────────────────────────────────────
.DS_Store      # Metadatos de macOS (inútil para el proyecto)
Thumbs.db      # Miniaturas de Windows
```

### ¿Qué pasa si ya subiste un archivo sensible?

```bash
# Esto NO basta (el archivo sigue en el historial):
echo ".env" >> .gitignore
git add .gitignore && git commit -m "add gitignore"

# Hay que eliminarlo del índice de git (sin borrar el archivo local):
git rm --cached backend/.env
git commit -m "security: remove .env from tracking"
git push origin clase

# ¡IMPORTANTE! El .env sigue existiendo en el historial anterior.
# Para eliminar completamente del historial:
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch backend/.env' HEAD
# O usar la herramienta más moderna: git-filter-repo
```

### Verificar que un archivo está siendo ignorado

```bash
# ¿Está ignorado? Muestra qué regla lo ignora
git check-ignore -v backend/.env
# Output: backend/.gitignore:124:.env   backend/.env

# ¿Está trackeado? Si no devuelve nada → no está trackeado (bien)
git ls-files backend/.env
```

### El .env.example — el patrón correcto

```
backend/
├── .env           ← NO en git (contiene secretos reales)
├── .env.example   ← SÍ en git (plantilla vacía para orientar al equipo)
```

```bash
# .env.example (en git):
HOST=0.0.0.0
PORT=1337
APP_KEYS=clave1,clave2,clave3,clave4
ADMIN_JWT_SECRET=
JWT_SECRET=

# .env (NO en git, relleno con valores reales):
HOST=0.0.0.0
PORT=1337
APP_KEYS=aX9kPm3...,bY7lQn4...,...
ADMIN_JWT_SECRET=jJ5lM8nO1qR4sT7uV...
JWT_SECRET=mM8oP1qR4sT7uV0wX3...
```

---

## 3. SSH y claves .pem: cómo funciona

### ¿Qué es SSH?

SSH (Secure Shell) es un protocolo para conectarse a un servidor remoto de forma cifrada.

```
Tu PC (Windows)                    Servidor (EC2 Ubuntu)
─────────────────                  ──────────────────────
ssh -i clave.pem                   Verifica la clave
ubuntu@3.78.246.203    ─────────►  con la clave pública
                                   almacenada en el server
                       ◄─────────  "Adelante, reconocido"
Terminal remoto        ═══════════  Sesión cifrada activa
```

### Par de claves: pública y privada

```
CLAVE PRIVADA (.pem)              CLAVE PÚBLICA
────────────────────              ─────────────
Queda en TU PC                    Está en el servidor
NUNCA se comparte                 (/home/ubuntu/.ssh/authorized_keys)
Es el "llavero"                   Es la "cerradura"
```

### Comandos SSH básicos

```bash
# Conectar al servidor
ssh -i mis-llaves.pem ubuntu@3.78.246.203

# Ejecutar un comando remoto sin abrir sesión interactiva
ssh -i mis-llaves.pem ubuntu@3.78.246.203 "pm2 status"

# Copiar archivos al servidor (scp = secure copy)
scp -i mis-llaves.pem archivo.sh ubuntu@3.78.246.203:/tmp/

# Copiar carpeta entera al servidor (recursivo)
scp -r -i mis-llaves.pem frontend/dist/ ubuntu@3.78.246.203:/var/www/html/

# Opciones útiles:
# -p 22          → puerto (22 es el defecto)
# -o StrictHostKeyChecking=no  → no pregunta "¿confías en este host?"
```

### Permisos del .pem en Windows

Windows es estricto: si el .pem tiene permisos muy abiertos, SSH lo rechaza.

```powershell
# Arreglar permisos en PowerShell:
icacls "mis-llaves.pem" /inheritance:r /grant:r "$env:USERNAME:R"
```

En Linux/Mac:
```bash
chmod 400 mis-llaves.pem   # Solo lectura por el propietario
```

### Security Groups de AWS (firewall en la nube)

Para que el servidor sea accesible, los Security Groups de EC2 deben permitir:

| Puerto | Protocolo | Para qué |
|---|---|---|
| 22 | TCP | SSH (conectarte) |
| 80 | TCP | HTTP (web normal) |
| 443 | TCP | HTTPS (web cifrada) |
| 1337 | TCP | Strapi backend |
| 3000 | TCP | Frontend (serve) |

---

## 4. EC2 Ubuntu 24.04: preparar el servidor

### ¿Qué es EC2?

EC2 (Elastic Compute Cloud) es el servicio de máquinas virtuales de AWS.
Una instancia EC2 es básicamente un ordenador en la nube con Ubuntu.

### Estructura de carpetas en el servidor

```
/var/www/                    ← Carpeta estándar para webs en Linux
└── alquileres/              ← Nuestro proyecto
    ├── backend/             ← Strapi
    │   ├── .env             ← Secretos (solo en el servidor, nunca en git)
    │   ├── dist/            ← Build de Strapi (generado por npm run build)
    │   └── .tmp/            ← BD SQLite y temporales de Strapi
    └── frontend/
        └── dist/            ← HTML estático generado por Astro
```

### Instalar Node 20 en Ubuntu 24.04

```bash
# Método con NodeSource (repositorio oficial de Node)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar:
node -v   # → v20.x.x
npm -v    # → 10.x.x
```

### ¿Por qué Node 20 LTS?

| Versión | Estado | Soportado hasta |
|---|---|---|
| Node 18 | LTS (antiguo) | Abril 2025 |
| **Node 20** | **LTS (activo)** | **Abril 2026** |
| Node 22 | LTS (reciente) | Abril 2027 |
| Node 21 | No LTS (experimental) | Junio 2024 |

Strapi v5 requiere Node ≥ 18. Node 20 LTS es la opción más estable y soportada.

---

## 5. PM2: gestión de procesos Node.js

### ¿Qué problema resuelve PM2?

Sin PM2:
```bash
node app.js   # ← Si cierras la terminal, el proceso muere
              # ← Si hay un error, el proceso muere y no vuelve
```

Con PM2:
```bash
pm2 start npm --name "strapi" -- start
# ← El proceso sigue vivo aunque cierres la terminal
# ← Si muere por error, PM2 lo reinicia automáticamente
# ← Se puede configurar para arrancar al reiniciar el servidor
```

### Comandos PM2 esenciales

```bash
# Ver todos los procesos gestionados
pm2 status
pm2 list

# Iniciar un proceso nuevo
pm2 start npm --name "strapi" -- start
pm2 start serve --name "frontend" -- -s dist -l 3000

# Reiniciar un proceso (tras actualizar código)
pm2 restart strapi
pm2 restart frontend
pm2 restart all

# Parar un proceso
pm2 stop strapi

# Ver logs en tiempo real
pm2 logs strapi
pm2 logs strapi --lines 50    # últimas 50 líneas

# Guardar la configuración actual (para que persista al reiniciar)
pm2 save

# Configurar PM2 para arrancar con el sistema operativo
pm2 startup
# → genera un comando sudo que debes ejecutar
```

### La salida de `pm2 status`

```
┌─────┬──────────┬─────────┬───────┬────────┬──────┬──────────┐
│ id  │ name     │ mode    │ pid   │ status │ cpu  │ memory   │
├─────┼──────────┼─────────┼───────┼────────┼──────┼──────────┤
│ 0   │ strapi   │ fork    │ 12345 │ online │ 0.5% │ 350 MB   │
│ 1   │ frontend │ fork    │ 12346 │ online │ 0%   │ 15 MB    │
└─────┴──────────┴─────────┴───────┴────────┴──────┴──────────┘
```

- `status: online` → proceso funcionando correctamente
- `status: errored` → proceso cayó con error
- `status: stopped` → proceso parado manualmente

### `serve` — servidor de archivos estáticos

```bash
# serve convierte una carpeta en un servidor HTTP sencillo
# -s = SPA mode (sirve index.html para cualquier ruta)
# -l 3000 = escuchar en puerto 3000
serve -s dist -l 3000
```

---

## 6. El script ec2_deploy.sh explicado línea a línea

### Encabezado: opciones de seguridad bash

```bash
#!/usr/bin/env bash
# Busca bash en el PATH del sistema (más portable que #!/bin/bash fijo)

set -euo pipefail
# -e: salir inmediatamente si cualquier comando falla (exit code ≠ 0)
# -u: error si se usa una variable no definida
# -o pipefail: si falla cualquier parte de un pipe (|), el pipe falla

IFS=$'\n\t'
# IFS = Internal Field Separator
# Cambiamos de espacio a newline+tab para manejar nombres con espacios seguros
```

### Módulo openssl para generar secretos

```bash
# Generar secreto aleatorio de 32 bytes en base64
openssl rand -base64 32 | tr -d '\n=/'
# openssl rand -base64 32 → genera 32 bytes aleatorios y los codifica en base64
# tr -d '\n=/'           → elimina saltos de línea, = y / (caracteres problemáticos en .env)
```

### Creación segura del .env

```bash
if [ -f ".env" ]; then
  echo ".env ya existe — no se toca"
  # Verificar que tiene las claves mínimas
  for KEY in ADMIN_JWT_SECRET APP_KEYS JWT_SECRET; do
    if ! grep -q "^${KEY}=" .env; then
      echo "${KEY}=$(openssl rand -base64 32 | tr -d '\n=/')" >> .env
    fi
  done
else
  # Solo se crea si NO existe
  cat > .env <<ENVEOF
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
APP_KEYS=${K1},${K2},${K3},${K4}
ADMIN_JWT_SECRET=$(openssl rand -base64 32 | tr -d '\n=/')
ENVEOF
fi
```

**Regla de oro:** el `.env` del servidor se crea una vez, manualmente o con el script. Nunca se sobreescribe automáticamente en deploys posteriores. Los secretos no cambian entre deploys.

### Health-check final

```bash
# curl con opciones específicas:
# -s = silent (sin barra de progreso)
# -f = falla si HTTP >= 400 (así el if detecta el error)
# --max-time 10 = timeout de 10 segundos

if curl -sf --max-time 10 "http://localhost:1337/_health" > /dev/null; then
  echo "Strapi responde"
fi

# Para obtener el código HTTP sin el body:
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
```

---

## 7. Flujo completo de despliegue

### Desde Windows (un solo comando)

```powershell
.\deploy\run_ec2_deploy.ps1 -PemPath "C:\Users\antonio\.ssh\mis-llaves.pem"
```

Lo que hace internamente:
```
1. Verifica que el .pem existe en local
2. Ajusta permisos del .pem (Windows)
3. ssh → "echo SSH OK" (test de conectividad)
4. scp → sube ec2_deploy.sh a /tmp/ del servidor
5. ssh → chmod +x /tmp/ec2_deploy.sh && bash /tmp/ec2_deploy.sh
6. El output del servidor aparece en tu terminal en tiempo real
```

### Desde el servidor directamente (alternativa)

```bash
# Conectar
ssh -i mis-llaves.pem ubuntu@3.78.246.203

# Opción A: descargar y ejecutar el script desde GitHub
curl -fsSL https://raw.githubusercontent.com/antonio-capel-dev/\
PROYECTO--ALQUILERES-COSTA-DEL-SOL/clase/deploy/ec2_deploy.sh | bash

# Opción B: si el repo ya está en el servidor
cd /var/www/alquileres
git reset --hard origin/clase
bash deploy/ec2_deploy.sh
```

### Diagrama del flujo completo

```
DESARROLLO LOCAL                         SERVIDOR EC2
────────────────                         ────────────
1. Escribir código
2. git add + commit
3. git push origin clase   ──────────►  GitHub (rama: clase)
                                               │
4. .\run_ec2_deploy.ps1    ──SSH──►    5. git reset --hard origin/clase
                                       6. cd backend && npm ci
                                       7. npm run build
                                       8. pm2 restart strapi
                                       9. cd frontend && npm ci
                                      10. npm run build
                                      11. pm2 restart frontend
                                      12. curl health-checks
                           ◄──────────  "DEPLOY OK"
```

---

## 8. Errores comunes y cómo resolverlos

### Error: Permission denied (publickey)
```bash
# Síntoma:
ssh: Permission denied (publickey)

# Causas y soluciones:
# 1. El .pem tiene permisos incorrectos
chmod 400 mis-llaves.pem   # Linux/Mac
icacls mis-llaves.pem /inheritance:r /grant:r "%USERNAME%:R"  # Windows

# 2. Usas el usuario incorrecto (Ubuntu EC2 usa "ubuntu", Amazon Linux usa "ec2-user")
ssh -i clave.pem ubuntu@IP    # Ubuntu
ssh -i clave.pem ec2-user@IP  # Amazon Linux

# 3. El Security Group no tiene el puerto 22 abierto → abrirlo en AWS Console
```

### Error: Connection refused o timeout
```bash
# Síntoma:
ssh: connect to host 3.78.246.203 port 22: Connection refused

# Causas:
# 1. La instancia EC2 está parada → iniciarla en AWS Console
# 2. Security Group no tiene puerto 22 → añadir regla inbound TCP 22
# 3. IP incorrecta → verificar la IP pública en AWS Console
```

### Error: npm ci falla por node_modules corrupto
```bash
# Síntoma:
npm ci: EINTEGRITY checksum mismatch

# Solución:
rm -rf node_modules package-lock.json
npm install
```

### Error: PM2 proceso en estado "errored"
```bash
# Ver qué falló:
pm2 logs strapi --lines 50

# Causa más común: falta .env o tiene variables vacías
cat backend/.env

# Reintentar:
pm2 delete strapi
cd /var/www/alquileres/backend
pm2 start npm --name "strapi" -- start
```

---

## 9. Preguntas de examen tipo test

**1. ¿Qué hace `git reset --hard origin/clase`?**
- A) Crea una nueva rama llamada origin/clase
- B) Descarta los cambios locales y pone el repo igual que GitHub/clase ✓
- C) Sube los cambios locales a GitHub
- D) Fusiona origin/clase con la rama actual

**2. ¿Por qué `node_modules/` está en .gitignore?**
- A) Porque contiene código privado
- B) Porque pesa cientos de MB y se regenera con `npm install` ✓
- C) Porque no es código del proyecto
- D) A y B son correctas

**3. ¿Qué hace `set -euo pipefail` en bash?**
- A) Activa el modo de depuración
- B) Sale del script si cualquier comando falla, variable no definida o fallo en pipe ✓
- C) Configura las variables de entorno
- D) Comprueba la sintaxis del script

**4. ¿Qué diferencia hay entre `pm2 restart` y `pm2 reload`?**
- A) Son idénticos
- B) `restart` mata y relanza el proceso; `reload` hace hot-reload sin downtime ✓
- C) `reload` es para aplicaciones Python
- D) `restart` solo funciona en producción

**5. ¿Por qué el .env NO debe subirse a GitHub?**
- A) Porque es muy grande
- B) Porque contiene secretos (passwords, API keys) que expuestos permiten atacar el sistema ✓
- C) Porque GitHub no soporta archivos .env
- D) Porque git no soporta archivos sin extensión

**6. ¿Qué comando muestra si un archivo está siendo ignorado por .gitignore?**
- A) `git status --ignored`
- B) `git check-ignore -v archivo` ✓
- C) `git ls-files --ignored`
- D) `git ignore --check archivo`

**7. ¿Qué hace `pm2 save`?**
- A) Guarda los logs en disco
- B) Hace backup de la aplicación
- C) Guarda la lista de procesos para que persistan tras reiniciar el servidor ✓
- D) Guarda la configuración en GitHub

**Respuestas: 1-B, 2-B, 3-B, 4-B, 5-B, 6-B, 7-C**
