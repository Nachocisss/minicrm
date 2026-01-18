# MiniCRM — Backend (Node.js)

Scaffold minimal para el backend del proyecto MiniCRM.

Setup rápido:

```bash
cd minicrm
npm install
cp .env.example .env
npm run dev
```

Rutas iniciales:
- `GET /health` — health check
- `GET /api/contacts` — listar contactos (in-memory)
- `POST /api/contacts` — crear contacto

Próximos pasos recomendados:
- Añadir base de datos (Postgres) y migraciones
- Implementar autenticación JWT y roles
- Añadir tests y Dockerfile
