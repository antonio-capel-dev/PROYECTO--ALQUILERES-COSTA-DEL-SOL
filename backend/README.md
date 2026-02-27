# Backend – Alquileres Costa del Sol (Strapi 5)

API y panel de administración para los alquileres. El frontend (Astro) consume `http://localhost:1337/api/rentals?populate=*`.

## Requisitos

- Node.js >= 20
- npm o yarn

## Arrancar el backend

```bash
cd backend
npm install
npm run develop
```

- **API:** http://localhost:1337  
- **Admin:** http://localhost:1337/admin  

La primera vez te pedirá crear un usuario administrador (email y contraseña).

## Permisos para el frontend

Para que la web pública pueda listar propiedades sin login:

1. Entra en http://localhost:1337/admin
2. **Settings** (engranaje) → **Users & Permissions** → **Roles** → **Public**
3. En **Rental** activa: **find** y **findOne**
4. Guarda

Así `GET /api/rentals?populate=*` y `GET /api/rentals/:slug` funcionarán sin token.

## Content-type: Rental

Cada entrada tiene:

| Campo        | Tipo      | Uso en frontend      |
|-------------|-----------|------------------------|
| title       | string    | Título de la ficha    |
| description | richtext  | Descripción           |
| price       | decimal   | Precio por noche (€)  |
| slug        | uid       | URL `/propiedad/:slug`|
| location    | string    | Ej. "Marbella"       |
| image       | media (1) | Imagen principal      |

Solo se muestran registros **publicados** (draftAndPublish).

---

# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
