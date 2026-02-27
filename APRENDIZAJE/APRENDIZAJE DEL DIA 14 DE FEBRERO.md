# 📘 Diario de Aprendizaje: Despliegue Full Stack en AWS

Este documento recopila todos los conceptos técnicos y soluciones que hemos aprendido durante el despliegue de Astro + Strapi + Nginx.

---

## 🏗️ Fase 1: Infraestructura y Redes (AWS)

### 🛑 Error: "Took too long to respond" (Timeout)

- **Síntoma:** El navegador se queda cargando eternamente al intentar entrar en la IP.
- **Diagnóstico:** El cartero (tu navegador) intenta llamar a la puerta, pero el muro exterior de AWS lo bloquea.
- **Causa:** El **Security Group** de AWS es un cortafuegos que bloquea todo el tráfico por defecto (excepto SSH puerto 22).
- **Solución:** Abrir el **Puerto 80 (HTTP)** y **443 (HTTPS)** a `0.0.0.0/0` (Todo el mundo).

### 📶 Ping: ¿Por qué "100% Packet Loss"?

- **El Susto:** Haces `ping` y dice que ha perdido todos los paquetes.
- **La Realidad:** Si sale la IP correcta (`3.78...`), el DNS **FUNCIONA**.
- **La Causa:** Los Security Groups de AWS bloquean los "Pings" (protocolo ICMP) por defecto para evitar escaneos de hackers.
- **Lección:** Si resuelve la IP, ignora el "Loss".

---

## 🚪 Fase 2: El Servidor Web (Nginx)

### 🛡️ Estrategia "Static First" (Reverse Proxy)

- **El Reto:** Tenemos dos aplicaciones: Astro (Frontend Estático) y Strapi (Backend Node.js).
- **La Solución:** `try_files $uri $uri/ @backend`
- **Configuración:**
  1.  Si el usuario pide la web (`/`), Nginx sirve la carpeta `dist` (Rápido).
  2.  Si pide algo que no existe (como `/admin` o `/api`), Nginx lo deriva a Strapi (`localhost:1337`).

### 🛑 Error 500: Permission Denied (El Pestillo)

- **Síntoma:** `stat() failed (13: Permission denied)` en `/var/log/nginx/error.log`.
- **La Causa:** Nginx (usuario `www-data`) intentaba entrar en `/home/ubuntu` y la puerta estaba cerrada.
- **La Solución:** `chmod o+x /home/ubuntu/...` (Dar permiso de "ejecución/paso" a otros usuarios en todas las carpetas padre).
- **Lección:** En Linux, para leer un archivo, necesitas permiso de paso (+x) en TODAS las carpetas que llevan a él.

---

## 🏷️ Fase 3: Dominios y SSL

### 🛡️ ¿Por qué no HTTPS desde la IP?

- Los certificados SSL (el candado verde) se emiten a **Nombres de Dominio** (`miweb.com`), no a direcciones IP.
- Por eso el despliegue es en orden: `HTTP (IP)` -> `Dominio (DNS)` -> `HTTPS (Certificado)`.

### 🔎 Google Search Console (Verificación DNS)

- **El Reto:** Demostrarle a Google que eres el dueño del dominio.
- **La Trampa:** Los asistentes automáticos de los registradores a veces pueden borrar configuraciones personalizadas.
- **La Solución Profesional:** Usar el **Registro TXT**.
  - Google te da un código (`google-site-verification=...`).
  - Tú lo pegas en tu DNS como texto (TXT).
  - Es inocuo y 100% seguro.

### 🤖 Certbot y Let's Encrypt

- **Certbot:** Herramienta que automatiza la obtención de certificados gratuitos.
- **Importante:** Forzar la redirección HTTP -> HTTPS para seguridad.
- **Renovación:** Certbot crea una tarea programada (cron) para renovarlos automáticamente antes de que caduquen.

---

## 🎓 Conclusión

Un despliegue profesional no es solo "subir archivos". Es orquestar:

1.  **Redes:** DNS, Puertos, Firewalls.
2.  **Sistema Operativo:** Permisos de Linux, Servicios (Systemd).
3.  **Aplicación:** Builds, Variables de Entorno.
4.  **Seguridad:** SSL, Proxy Inverso.

¡Ahora eres un SysAdmin junior! 🐧🎩
