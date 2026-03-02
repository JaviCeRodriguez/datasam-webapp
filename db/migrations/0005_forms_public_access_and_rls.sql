ALTER TABLE "forms"
ADD COLUMN IF NOT EXISTS "status" text NOT NULL DEFAULT 'draft';

ALTER TABLE "forms"
ADD COLUMN IF NOT EXISTS "response_access" text NOT NULL DEFAULT 'anonymous';

ALTER TABLE "forms"
ADD COLUMN IF NOT EXISTS "published_at" timestamptz;

ALTER TABLE "form_responses"
ADD COLUMN IF NOT EXISTS "submitted_at" timestamptz NOT NULL DEFAULT timezone('utc', now());

ALTER TABLE "forms"
DROP CONSTRAINT IF EXISTS "forms_status_check";

ALTER TABLE "forms"
ADD CONSTRAINT "forms_status_check"
CHECK ("status" IN ('draft', 'published', 'closed'));

ALTER TABLE "forms"
DROP CONSTRAINT IF EXISTS "forms_response_access_check";

ALTER TABLE "forms"
ADD CONSTRAINT "forms_response_access_check"
CHECK ("response_access" IN ('anonymous', 'authenticated'));

CREATE INDEX IF NOT EXISTS "forms_status_idx" ON "forms" ("status");
CREATE INDEX IF NOT EXISTS "forms_created_by_idx" ON "forms" ("created_by");
CREATE INDEX IF NOT EXISTS "form_responses_form_id_submitted_at_idx" ON "form_responses" ("form_id", "submitted_at" DESC);

ALTER TABLE "forms" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "form_responses" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published forms" ON "forms";
CREATE POLICY "Public can read published forms"
ON "forms"
FOR SELECT
TO anon, authenticated
USING ("status" = 'published');

DROP POLICY IF EXISTS "Admin can read forms" ON "forms";
CREATE POLICY "Admin can read forms"
ON "forms"
FOR SELECT
TO authenticated
USING (
  "public"."has_admin_dashboard_access"(auth.uid())
  OR "created_by" = auth.uid()
);

DROP POLICY IF EXISTS "Admin can create forms" ON "forms";
CREATE POLICY "Admin can create forms"
ON "forms"
FOR INSERT
TO authenticated
WITH CHECK (
  "public"."has_admin_dashboard_access"(auth.uid())
  AND "created_by" = auth.uid()
);

DROP POLICY IF EXISTS "Admin can update forms" ON "forms";
CREATE POLICY "Admin can update forms"
ON "forms"
FOR UPDATE
TO authenticated
USING (
  "public"."has_admin_dashboard_access"(auth.uid())
  OR "created_by" = auth.uid()
)
WITH CHECK (
  "public"."has_admin_dashboard_access"(auth.uid())
  OR "created_by" = auth.uid()
);

DROP POLICY IF EXISTS "Admin can delete forms" ON "forms";
CREATE POLICY "Admin can delete forms"
ON "forms"
FOR DELETE
TO authenticated
USING (
  "public"."has_admin_dashboard_access"(auth.uid())
  OR "created_by" = auth.uid()
);

DROP POLICY IF EXISTS "Admin can read form responses" ON "form_responses";
CREATE POLICY "Admin can read form responses"
ON "form_responses"
FOR SELECT
TO authenticated
USING (
  "public"."has_admin_dashboard_access"(auth.uid())
  OR EXISTS (
    SELECT 1
    FROM "forms" f
    WHERE f."id" = "form_responses"."form_id"
      AND f."created_by" = auth.uid()
  )
);

DROP POLICY IF EXISTS "Public can submit form responses" ON "form_responses";
CREATE POLICY "Public can submit form responses"
ON "form_responses"
FOR INSERT
TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "forms" f
    WHERE f."id" = "form_responses"."form_id"
      AND f."status" = 'published'
      AND (
        f."response_access" = 'anonymous'
        OR (f."response_access" = 'authenticated' AND auth.uid() IS NOT NULL)
      )
  )
  AND (
    auth.uid() IS NULL
    OR "user_id" = auth.uid()
  )
);
