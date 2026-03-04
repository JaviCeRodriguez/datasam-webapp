CREATE TABLE IF NOT EXISTS "linkedin_pdf_parse_requests" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "file_name" text,
  "model" varchar(100),
  "status" text NOT NULL,
  "error_message" text,
  "metadata" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "created_at" timestamptz NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT "linkedin_pdf_parse_requests_user_id_users_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "linkedin_pdf_parse_requests_status_check"
    CHECK ("status" IN ('processing', 'success', 'failed', 'blocked_daily_limit')),
  CONSTRAINT "linkedin_pdf_parse_requests_metadata_is_object"
    CHECK (jsonb_typeof("metadata") = 'object')
);

CREATE INDEX IF NOT EXISTS "linkedin_pdf_parse_requests_user_created_idx"
ON "linkedin_pdf_parse_requests" ("user_id", "created_at" DESC);

ALTER TABLE "linkedin_pdf_parse_requests" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own linkedin parse requests" ON "linkedin_pdf_parse_requests";
CREATE POLICY "Users can read own linkedin parse requests"
ON "linkedin_pdf_parse_requests"
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own linkedin parse requests" ON "linkedin_pdf_parse_requests";
CREATE POLICY "Users can insert own linkedin parse requests"
ON "linkedin_pdf_parse_requests"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own linkedin parse requests" ON "linkedin_pdf_parse_requests";
CREATE POLICY "Users can update own linkedin parse requests"
ON "linkedin_pdf_parse_requests"
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
