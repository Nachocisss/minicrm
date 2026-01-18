# MiniCRM — Roadmap (Epics & Tareas)

Resumen: Roadmap orientado a un MVP defendible en entrevistas: mini CRM con pipeline, proposals, roles y auditoría. Dividido en Frontend, Backend y Build/DevOps.

**Frontend**

- **Epic: Autenticación & Layout**
  - Tareas:
    - Página de login (JWT). 
    - Protección de rutas y guardas por rol.
    - Layout principal (header, sidebar, responsive).
    - Gestión de sesión (refresh tokens, expiración).
  - Criterio de aceptación: Login funcional, rutas protegidas y UI base navegable.

- **Epic: Dashboard & Pipeline**
  - Tareas:
    - Dashboard con métricas (deals por etapa, pipeline value).
    - Vista de lista de deals y búsqueda/filtrado.
    - Vista tipo Kanban para mover deals entre etapas (drag & drop).
    - Detail drawer/modal del deal.
  - Criterio de aceptación: Mover deals cambia etapa en backend y UI refleja estado.

- **Epic: Accounts & Contacts**
  - Tareas:
    - CRUD de Accounts.
    - CRUD de Contacts vinculados a Accounts.
    - Validación y formularios reutilizables.
    - Paginación y búsqueda.
  - Criterio de aceptación: Crear/editar/listar accounts y contacts.

- **Epic: Proposals (Oferta) UI**
  - Tareas:
    - Crear/editar proposal asociada a un deal.
    - Flujo submit → reviewer (notificaciones UI) → approve/reject.
    - Historial visible en UI.
  - Criterio de aceptación: Proposals pasan por estados y se muestran en UI.

- **Epic: Activities & Audit View**
  - Tareas:
    - Registrar actividades (notes, calls) en la UI.
    - Ver audit events (quién cambió qué y cuándo).
  - Criterio de aceptación: Feed de actividad y audit log accesible.

- **Epic: Tests & E2E**
  - Tareas:
    - Tests unitarios de componentes críticos.
    - E2E: login, crear deal, mover etapa, submit & approve proposal.


**Backend**

- **Epic: Auth & Users**
  - Tareas:
    - JWT auth, refresh tokens, password hashing (bcrypt).
    - Endpoints: login, refresh, user CRUD.
    - Seed de roles (Admin, Agent, Analyst).
  - Criterio de aceptación: Autenticación segura y roles preconfigurados.

- **Epic: Modelo de datos & DB**
  - Tareas:
    - Migraciones: users, roles, accounts, contacts, deals, proposals, activities, audit_events.
    - Seed data para desarrollo.
    - Índices básicos y constraints.
  - Criterio de aceptación: Esquema migrable y datos de prueba funcionales.

- **Epic: Core APIs (CRUD)**
  - Tareas:
    - Endpoints REST para Accounts, Contacts, Deals, Activities.
    - Paginación, filtrado y validación (DTOs/schemas).
  - Criterio de aceptación: APIs CRUD con validación y tests.

- **Epic: Proposal Workflow**
  - Tareas:
    - Endpoints para submit, approve, reject.
    - Validaciones de transición de estado.
    - Transacción para cambios críticos y creación de audit events.
  - Criterio de aceptación: Estados consistentes y audit trail.

- **Epic: RBAC & Permisos**
  - Tareas:
    - Middleware de autorización por rol y por recurso.
    - Reglas: p.ej., sólo reviewer aproba proposals.
  - Criterio de aceptación: Acceso denegado cuando corresponde.

- **Epic: Audit Logging**
  - Tareas:
    - Registrar AuditEvent (userId, action, resourceType, resourceId, diff, timestamp).
    - Endpoint read-only para auditoría.
  - Criterio de aceptación: Cambios críticos quedan registrados.

- **Epic: Tests & CI**
  - Tareas:
    - Unit tests para servicios/logic.
    - Integration tests con DB en CI.

- **Epic: Concurrencia & Consistencia**
  - Tareas:
    - Optimistic locking/version fields para deals/proposals.
    - Manejo de conflictos y respuestas claras a cliente.


**Build / DevOps**

- **Epic: Entorno de desarrollo (Docker)**
  - Tareas:
    - `Dockerfile` para backend y frontend.
    - `docker-compose` con Postgres y servicio web.
    - `env.example` con variables necesarias.
  - Criterio de aceptación: `docker-compose up` levanta la app localmente.

- **Epic: CI/CD**
  - Tareas:
    - GitHub Actions: lint, tests, build, publicar imágenes.
    - Pipeline de despliegue a staging (manual) y production (manual/automático opcional).

- **Epic: Despliegue**
  - Tareas:
    - Scripts para despliegue (Cloud Run, Heroku o VPS).
    - Migraciones automatizadas en despliegue.

- **Epic: Observabilidad**
  - Tareas:
    - Logs estructurados, health-check endpoints.
    - Integración con Sentry o similar para errores.

- **Epic: Documentación & Demo**
  - Tareas:
    - README con pasos de setup local y despliegue.
    - OpenAPI/Swagger para la API.
    - Guion de demo para la entrevista (pasos y puntos a destacar).

- **Epic: Seguridad & Operaciones**
  - Tareas:
    - Gestión de secretos, CORS, rate limiting, validaciones y sanitización.
    - Backups y estrategia de restauración para DB.


## MVP — Criterios de aceptación generales

- Registrarse / Iniciar sesión con roles.
- CRUD de Accounts/Contacts.
- Crear Deals y mover entre etapas (pipeline) persistente.
- Crear Proposal, submit y approve/reject con audit log.
- UI para ver pipeline y detalle de entidades.
- Docker + README para levantar localmente.


## Siguientes pasos recomendados

1. Detallar `Modelo de datos` (ERD + campos) — lo hago a continuación si quieres.
2. Crear repositorio inicial + estructura (packages, eslintrc, tsconfig, etc.).
3. Implementar Auth y DB con migraciones.

---

Si quieres, genero ahora el ERD y las migraciones iniciales para PostgreSQL.