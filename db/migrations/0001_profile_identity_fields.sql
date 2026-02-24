ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "surname" varchar(255);

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "primary_identity_id" text;