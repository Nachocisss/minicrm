# MiniCRM — ERD & Modelo de datos

## Tablas principales

- **roles**
  - `id` (serial PK)
  - `name` (text, unique)

- **users**
  - `id` (uuid PK, gen_random_uuid())
  - `email` (text, unique, not null)
  - `password_hash` (text, not null)
  - `role_id` (FK -> roles.id)
  - `created_at`, `updated_at`

- **accounts**
  - `id` (uuid PK)
  - `name` (text, not null)
  - `website`, `industry`, `owner_id` (FK -> users.id)
  - `created_at`, `updated_at`

- **contacts**
  - `id` (uuid PK)
  - `account_id` (FK -> accounts.id)
  - `first_name`, `last_name`, `email`, `phone`
  - `created_at`, `updated_at`

- **deals**
  - `id` (uuid PK)
  - `account_id` (FK -> accounts.id)
  - `contact_id` (FK -> contacts.id, nullable)
  - `title`, `description`
  - `value` (numeric)
  - `stage` (varchar) -- pipeline stage
  - `owner_id` (FK -> users.id)
  - `version` (integer) -- optimistic locking
  - `created_at`, `updated_at`

- **proposals**
  - `id` (uuid PK)
  - `deal_id` (FK -> deals.id)
  - `content` (jsonb)
  - `status` (enum: draft, submitted, approved, rejected)
  - `submitted_by`, `reviewer_id` (FK -> users.id)
  - `created_at`, `updated_at`

- **activities**
  - `id` (uuid PK)
  - `deal_id` (FK -> deals.id, nullable)
  - `user_id` (FK -> users.id)
  - `type` (note, call, email)
  - `note` (text)
  - `occurred_at`

- **audit_events**
  - `id` (uuid PK)
  - `user_id` (FK -> users.id)
  - `action` (text)
  - `resource_type` (text)
  - `resource_id` (uuid)
  - `diff` (jsonb)
  - `created_at`

## Índices sugeridos

- `users(email)` unique
- `accounts(name)`
- `deals(stage)`
- `proposals(status)`
