CREATE TABLE IF NOT EXISTS "user_subject_progress" (
  "user_id" uuid PRIMARY KEY NOT NULL,
  "progress" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "schema_version" integer NOT NULL DEFAULT 1,
  "created_at" timestamptz NOT NULL DEFAULT timezone('utc', now()),
  "updated_at" timestamptz NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT "user_subject_progress_user_id_users_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "user_subject_progress_progress_is_object"
    CHECK (jsonb_typeof("progress") = 'object')
);

ALTER TABLE "user_subject_progress" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own subject progress" ON "user_subject_progress";
CREATE POLICY "Users can read own subject progress"
ON "user_subject_progress"
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own subject progress" ON "user_subject_progress";
CREATE POLICY "Users can insert own subject progress"
ON "user_subject_progress"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own subject progress" ON "user_subject_progress";
CREATE POLICY "Users can update own subject progress"
ON "user_subject_progress"
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own subject progress" ON "user_subject_progress";
CREATE POLICY "Users can delete own subject progress"
ON "user_subject_progress"
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
