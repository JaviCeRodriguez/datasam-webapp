CREATE TABLE IF NOT EXISTS "professional_profiles" (
  "user_id" uuid PRIMARY KEY NOT NULL,
  "source" varchar(100) NOT NULL DEFAULT 'linkedin_pdf_llm',
  "file_name" text,
  "language" varchar(10),
  "experience" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "education" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "skills" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "extracted_text" text,
  "parser_model" varchar(100),
  "parser_confidence" numeric(4,3),
  "created_at" timestamptz NOT NULL DEFAULT timezone('utc', now()),
  "updated_at" timestamptz NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT "professional_profiles_user_id_users_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "professional_profiles_experience_is_array"
    CHECK (jsonb_typeof("experience") = 'array'),
  CONSTRAINT "professional_profiles_education_is_array"
    CHECK (jsonb_typeof("education") = 'array'),
  CONSTRAINT "professional_profiles_skills_is_array"
    CHECK (jsonb_typeof("skills") = 'array')
);

ALTER TABLE "professional_profiles" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own professional profile" ON "professional_profiles";
CREATE POLICY "Users can read own professional profile"
ON "professional_profiles"
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own professional profile" ON "professional_profiles";
CREATE POLICY "Users can insert own professional profile"
ON "professional_profiles"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own professional profile" ON "professional_profiles";
CREATE POLICY "Users can update own professional profile"
ON "professional_profiles"
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own professional profile" ON "professional_profiles";
CREATE POLICY "Users can delete own professional profile"
ON "professional_profiles"
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
