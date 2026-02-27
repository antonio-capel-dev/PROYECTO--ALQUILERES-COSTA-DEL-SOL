# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vacation rental platform for Costa del Sol. Headless CMS + Static Site Generation architecture:
- **Frontend:** Astro 5 (SSG) with TailwindCSS 4, TypeScript, 3-language i18n (ES/EN/FR)
- **Backend:** Strapi v5 headless CMS (Node 20-24), SQLite by default

## Commands

### Frontend (`cd frontend`)
```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Build static site to dist/
npm run preview  # Preview production build
```

### Backend (`cd backend`)
```bash
npm run dev      # Strapi dev server → http://localhost:1337
npm run build    # Compile TypeScript to dist/
npm run start    # Production server
```

### Database Seeding
```bash
# Auto-seeding: runs on first `npm run dev` via bootstrap hook in src/index.ts
# Manual seeding:
STRAPI_TOKEN=<token> STRAPI_URL=http://localhost:1337 node scripts/seed-strapi.mjs
```

### Test Email (dev only)
```bash
curl http://localhost:1337/api/contactos/test-email
```

## Architecture

Data flows one-way: **Strapi CMS → build-time fetch → static HTML served to users**. Contact form POSTs go directly to Strapi, which sends email via Gmail SMTP.

```
Frontend (Astro SSG) ──── build-time REST ────► Strapi CMS (/api/rentals, etc.)
       │                                                │
    dist/ (static)                            SQLite (.tmp/data.db)
       │                                       + Gmail SMTP (nodemailer)
    Nginx → users
```

If Strapi is unreachable at build time, frontend falls back to `frontend/src/data/propiedades_20.json`.

## Key Files

### Frontend
| File | Purpose |
|------|---------|
| `src/pages/index.astro` | Home page — fetches and renders rental listings |
| `src/pages/propiedad/[slug].astro` | Property detail (dynamic route) |
| `src/pages/zona/[slug].astro` | Zone detail (dynamic route) |
| `src/utils/normalizadores.ts` | Transforms Strapi API response → local `Propiedad` type |
| `src/utils/imagenes.ts` | Builds Strapi image URLs |
| `src/config/zonas.ts` | Zone→image mappings and deterministic fallback logic |
| `src/i18n/ui.ts` | All translation strings for ES/EN/FR |
| `src/middleware.ts` | 301 redirect rules |

### Backend
| File | Purpose |
|------|---------|
| `src/index.ts` | Bootstrap hook — auto-seeds from `data/seed-rentals.json` |
| `src/api/rental/content-types/rental/schema.json` | Rental content type schema |
| `src/api/contacto/controllers/contacto.js` | Email sending on contact form submit |
| `src/middlewares/rate-limit-contactos.ts` | 5 requests/10 min per IP on POST /api/contactos |
| `config/plugins.ts` | Nodemailer/Gmail SMTP config |
| `config/database.ts` | DB setup (SQLite default, supports MySQL/PostgreSQL) |

## Environment Setup

### Backend `.env`
```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
ENCRYPTION_KEY=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=...
SMTP_PASS=...       # Gmail App Password (16 chars)
MAIL_FROM=...
MAIL_TO=...
MAIL_REPLY_TO=...
```

### Frontend
```env
PUBLIC_STRAPI_URL=http://localhost:1337
```

## Data Model

**Rental** — core entity: `title`, `slug`, `price`, `description`, `image`, `galeria[]`, `featured`, `ubicacion` (→ Ubicacion), `detalles` (habitaciones, banos, metros, capacidad), `Servicios` (wifi, aire_acondicionado, parking, mascotas), `seo`

**Ubicacion** (Zone/Location) — `nombre`, `slug`, `descripcion`, `imagen`, `rentals[]`

**Contacto** — form submissions: `nombre`, `email`, `mensaje`

**FAQ**, **Guia**, **Landing** — supporting content, all support i18n fields.

## i18n

- Default locale: `es` (no URL prefix)
- Other locales: `/en/...`, `/fr/...`
- Translation strings: `frontend/src/i18n/ui.ts`
- Utilities: `frontend/src/i18n/utils.ts`

## Strapi REST API

- `GET /api/rentals` — property listings (use `?populate=...` for relations)
- `GET /api/ubicacions` — zones
- `POST /api/contactos` — contact form (rate-limited)
- `GET /api/faqs`, `GET /api/guias`, `GET /api/landings`
- `GET /admin` — admin panel (JWT auth)

Default API limits: 25 results, max 100. Set in `backend/config/api.ts`.

## Deployment

PowerShell scripts in `deploy/` for Windows:
- `deploy_frontend_ssh.ps1` — build + SSH upload to VPS
- `deploy_frontend_sftp.ps1` — build + SFTP to cPanel
- `deploy_backend_strapi_ssh.ps1` — rsync backend + PM2 restart

Production: Strapi runs under PM2 (`strapi-costasol`), Nginx serves `frontend/dist/`.
