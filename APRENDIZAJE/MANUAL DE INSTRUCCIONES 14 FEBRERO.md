# 🚀 Guía de Despliegue: Alquileres Costa del Sol

**Estado:** ¡ONLINE y SEGURO! 🟢🔒
**URL:** [https://alquileres-costadelsol.com](https://alquileres-costadelsol.com)
**Admin:** [https://alquileres-costadelsol.com/admin](https://alquileres-costadelsol.com/admin)

---

## 🏗️ La Arquitectura de tu Servidor

Así es como funciona por dentro tu "Imperio Digital":

```mermaid
graph LR
    User((Usuario 🌍)) -->|HTTPS - 443| Nginx[Nginx Reverse Proxy 🛡️]
    Nginx -->|/ (Web)| Astro[Astro Static Files 📂]
    Nginx -->|/admin (API)| Strapi[Strapi CMS (PM2) 🚀]
    Strapi -->|SQLite| DB[(Base de Datos 🗄️)]
```

## 🛠️ Comandos de Mantenimiento (La Caja de Herramientas)

### 1. Actualizar la Web (Frontend)

Si haces cambios en Astro (textos, fotos, estilos):

```bash
cd ~/PROYECTO--ALQUILERES-COSTA-DEL-SOL/frontend
git pull
npm install (solo si añadiste librerías nuevas)
NODE_OPTIONS="--max-old-space-size=2048" npm run build
```

_¡Y listo! Nginx servirá los archivos nuevos al instante._

### 2. Actualizar el Panel (Backend)

Si cambias modelos o lógica en Strapi:

```bash
cd ~/PROYECTO--ALQUILERES-COSTA-DEL-SOL/backend
git pull
npm install
npm run build
pm2 restart all
```

### 3. ¿El servidor va lento o falla?

Ver qué está pasando:

```bash
pm2 status       # Ver si Strapi está corriendo
pm2 logs         # Ver los logs en tiempo real
htop             # Ver consumo de CPU/RAM (Salir con F10)
```

### 4. Reiniciar Nginx (El Portero)

Si tocas la configuración de `/etc/nginx/...`:

```bash
sudo nginx -t    # Comprobar que no hay errores de ortografía
sudo systemctl restart nginx
```

---

## 🔐 Certificado SSL

- **Renovación:** Automática (Certbot lo hace solo).
- **Comprobar:** `sudo certbot renew --dry-run`

---

## 📂 Dónde está cada cosa

- **Código Web:** `/home/ubuntu/PROYECTO--ALQUILERES-COSTA-DEL-SOL/frontend`
- **Web Compilada:** `/home/ubuntu/PROYECTO--ALQUILERES-COSTA-DEL-SOL/frontend/dist`
- **Código Backend:** `/home/ubuntu/PROYECTO--ALQUILERES-COSTA-DEL-SOL/backend`
- **Base de Datos:** `/home/ubuntu/PROYECTO--ALQUILERES-COSTA-DEL-SOL/backend/.tmp/data.db`

> **¡IMPORTANTE!** Haz copias de seguridad de tu base de datos (`data.db`) y de la carpeta `public/uploads` de vez en cuando.
