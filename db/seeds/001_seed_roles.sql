-- 001_seed_roles.sql
INSERT INTO roles (name) VALUES
  ('Admin'),
  ('Agent'),
  ('Analyst')
ON CONFLICT DO NOTHING;
