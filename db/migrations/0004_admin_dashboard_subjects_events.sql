ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "linked_providers" text[] NOT NULL DEFAULT ARRAY[]::text[];

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "primary_provider" text;

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "identities_count" integer NOT NULL DEFAULT 0;

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "identities_synced_at" timestamptz;

CREATE TABLE IF NOT EXISTS "subjects" (
  "code" text PRIMARY KEY,
  "name" text NOT NULL,
  "academic_year" integer NOT NULL CHECK ("academic_year" >= 1),
  "quarter" integer,
  "credits" integer,
  "created_at" timestamptz NOT NULL DEFAULT timezone('utc', now()),
  "updated_at" timestamptz NOT NULL DEFAULT timezone('utc', now())
);

INSERT INTO "subjects" ("code", "name", "academic_year", "quarter", "credits")
VALUES
  ('N1', 'Análisis 1', 1, 1, 8),
  ('CD01', 'Introducción a la Ciencia de Datos', 1, 1, 6),
  ('CD02', 'Programación 1', 1, 1, 6),
  ('N10', 'Análisis 2', 1, 2, 8),
  ('CD03', 'Matemática Discreta', 1, 2, 8),
  ('CD04', 'Introducción al Aprendizaje Automático', 1, 2, 6),
  ('CD05', 'Infraestructura para Ciencia de Datos', 2, 1, 6),
  ('TPI07', 'Algoritmos I', 2, 1, 10),
  ('CB34', 'Probabilidad y Estadística', 2, 1, 4),
  ('CD06', 'Estadística e Inferencia I', 2, 2, 8),
  ('TPI10', 'Algoritmos II', 2, 2, 9),
  ('Electiva 1', 'Electiva 1', 2, 2, 4),
  ('CD07', 'Estadística e Inferencia II', 3, 1, 8),
  ('CD08', 'Programación 2', 3, 1, 6),
  ('Electiva 2', 'Electiva 2', 3, 1, 6),
  ('CD09', 'Ciencia de Datos', 3, 2, 8),
  ('TPI14', 'Bases de Datos', 3, 2, 8),
  ('CD10', 'Ingeniería de Software', 3, 2, 6),
  ('CD11', 'Aprendizaje Automático', 4, 1, 6),
  ('Electiva 3', 'Electiva 3', 4, 1, 8),
  ('Optativa 1', 'Optativa 1', 4, 1, 6),
  ('CD12', 'Aprendizaje Profundo', 4, 2, 6),
  ('Optativa 3', 'Optativa 3', 4, 2, 6),
  ('Optativa 2', 'Optativa 2', 4, 2, 8)
ON CONFLICT ("code") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "academic_year" = EXCLUDED."academic_year",
  "quarter" = EXCLUDED."quarter",
  "credits" = EXCLUDED."credits",
  "updated_at" = timezone('utc', now());

CREATE INDEX IF NOT EXISTS "subjects_academic_year_idx" ON "subjects" ("academic_year");

CREATE TABLE IF NOT EXISTS "events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT timezone('utc', now()),
  "type" text NOT NULL,
  "user_id" uuid,
  "user_full_name" text,
  "connector_text" text NOT NULL,
  "target" text,
  "target_type" text,
  "target_id" text,
  "metadata" jsonb NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT "events_user_id_users_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL,
  CONSTRAINT "events_metadata_is_object"
    CHECK (jsonb_typeof("metadata") = 'object')
);

CREATE INDEX IF NOT EXISTS "events_created_at_idx" ON "events" ("created_at" DESC);
CREATE INDEX IF NOT EXISTS "events_type_idx" ON "events" ("type");
CREATE INDEX IF NOT EXISTS "events_user_id_idx" ON "events" ("user_id");

CREATE OR REPLACE FUNCTION "public"."has_admin_dashboard_access"("check_user_id" uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM "user_roles" ur
    INNER JOIN "roles" r ON r."id" = ur."role_id"
    WHERE ur."user_id" = "check_user_id"
      AND r."name" IN ('admin', 'collaborator')
  );
$$;

GRANT EXECUTE ON FUNCTION "public"."has_admin_dashboard_access"(uuid) TO authenticated;

DROP POLICY IF EXISTS "Admin can read all subject progress" ON "user_subject_progress";
CREATE POLICY "Admin can read all subject progress"
ON "user_subject_progress"
FOR SELECT
TO authenticated
USING ("public"."has_admin_dashboard_access"(auth.uid()));

CREATE OR REPLACE FUNCTION "public"."append_event"(
  "event_type" text,
  "event_user_id" uuid,
  "event_connector_text" text,
  "event_target" text,
  "event_target_type" text DEFAULT NULL,
  "event_target_id" text DEFAULT NULL,
  "event_metadata" jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  full_name text;
BEGIN
  IF "event_user_id" IS NOT NULL THEN
    SELECT NULLIF(trim(concat_ws(' ', u."name", u."surname")), '')
    INTO full_name
    FROM "users" u
    WHERE u."id" = "event_user_id";
  END IF;

  INSERT INTO "events" (
    "type",
    "user_id",
    "user_full_name",
    "connector_text",
    "target",
    "target_type",
    "target_id",
    "metadata"
  ) VALUES (
    "event_type",
    "event_user_id",
    full_name,
    "event_connector_text",
    "event_target",
    "event_target_type",
    "event_target_id",
    COALESCE("event_metadata", '{}'::jsonb)
  );
END;
$$;

GRANT EXECUTE ON FUNCTION "public"."append_event"(text, uuid, text, text, text, text, jsonb) TO authenticated;

CREATE OR REPLACE FUNCTION "public"."log_user_registration_event"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM "public"."append_event"(
    'user_registered',
    NEW."id",
    'se registró en',
    'DataSam',
    'platform',
    NEW."id"::text,
    jsonb_build_object('email', NEW."email")
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS "on_user_created_log_event" ON "users";
CREATE TRIGGER "on_user_created_log_event"
AFTER INSERT ON "users"
FOR EACH ROW
EXECUTE FUNCTION "public"."log_user_registration_event"();

CREATE OR REPLACE FUNCTION "public"."log_form_created_event"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM "public"."append_event"(
    'survey_created',
    NEW."created_by",
    'creó la encuesta',
    NEW."title",
    'form',
    NEW."id"::text,
    jsonb_build_object('form_id', NEW."id")
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS "on_form_created_log_event" ON "forms";
CREATE TRIGGER "on_form_created_log_event"
AFTER INSERT ON "forms"
FOR EACH ROW
EXECUTE FUNCTION "public"."log_form_created_event"();

CREATE OR REPLACE FUNCTION "public"."log_form_response_created_event"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  form_title text;
BEGIN
  SELECT f."title"
  INTO form_title
  FROM "forms" f
  WHERE f."id" = NEW."form_id";

  PERFORM "public"."append_event"(
    'survey_answered',
    NEW."user_id",
    'contestó la encuesta',
    COALESCE(form_title, 'Encuesta'),
    'form_response',
    NEW."id"::text,
    jsonb_build_object('form_id', NEW."form_id", 'response_id', NEW."id")
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS "on_form_response_created_log_event" ON "form_responses";
CREATE TRIGGER "on_form_response_created_log_event"
AFTER INSERT ON "form_responses"
FOR EACH ROW
EXECUTE FUNCTION "public"."log_form_response_created_event"();

CREATE INDEX IF NOT EXISTS "user_subject_progress_updated_at_idx"
ON "user_subject_progress" ("updated_at" DESC);
