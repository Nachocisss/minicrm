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

## Relaciones (alto nivel)

- roles 1--* users
- users 1--* accounts (owner_id)
- accounts 1--* contacts
- accounts 1--* deals
- contacts 1--* deals (opcional)
- users 1--* deals (owner_id)
- deals 1--* proposals
- users 1--* proposals (submitted_by, reviewer_id)
- users 1--* activities
- deals 1--* activities (opcional)
- users 1--* audit_events

## Índices sugeridos

- `users(email)` unique
- `accounts(name)`
- `deals(stage)`
- `proposals(status)`

## Definiciones de BBDD (PostgreSQL)

```sql
create extension if not exists pgcrypto;

do $$ begin
  create type deal_stage as enum ('prospecting', 'qualified', 'proposal', 'negotiation', 'won', 'lost');
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_status as enum ('draft', 'submitted', 'approved', 'rejected');
exception when duplicate_object then null; end $$;

do $$ begin
  create type activity_type as enum ('note', 'call', 'email');
exception when duplicate_object then null; end $$;

create table if not exists roles (
  id serial primary key,
  name text not null unique
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role_id integer not null references roles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  industry text,
  owner_id uuid not null references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_accounts_name on accounts (name);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  first_name text,
  last_name text,
  email text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (account_id, email)
);

create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  title text not null,
  description text,
  value numeric(12,2) not null default 0,
  stage deal_stage not null default 'prospecting',
  owner_id uuid not null references users(id),
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_deals_stage on deals (stage);
create index if not exists idx_deals_account on deals (account_id);
create index if not exists idx_deals_owner on deals (owner_id);

create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references deals(id) on delete cascade,
  content jsonb not null default '{}'::jsonb,
  status proposal_status not null default 'draft',
  submitted_by uuid references users(id),
  reviewer_id uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_proposals_status on proposals (status);
create index if not exists idx_proposals_deal on proposals (deal_id);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references deals(id) on delete cascade,
  user_id uuid not null references users(id),
  type activity_type not null,
  note text,
  occurred_at timestamptz not null default now()
);

create index if not exists idx_activities_deal on activities (deal_id);
create index if not exists idx_activities_user on activities (user_id);
create index if not exists idx_activities_occurred_at on activities (occurred_at);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  action text not null,
  resource_type text not null,
  resource_id uuid not null,
  diff jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_events_resource on audit_events (resource_type, resource_id);
create index if not exists idx_audit_events_user on audit_events (user_id);
create index if not exists idx_audit_events_created_at on audit_events (created_at);
```
