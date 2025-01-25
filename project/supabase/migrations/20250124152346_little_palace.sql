/*
  # Create jobs table for designer job board

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `location` (text)
      - `description` (text)
      - `salary_range` (text)
      - `job_type` (text)
      - `experience_level` (text)
      - `posted_at` (timestamp)
      - `company_logo` (text, nullable)
      - `apply_url` (text)
      - `skills` (text array)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `jobs` table
    - Add policies for public read access
    - Add policies for authenticated users to manage jobs
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  salary_range text NOT NULL,
  job_type text NOT NULL,
  experience_level text NOT NULL,
  posted_at timestamptz NOT NULL DEFAULT now(),
  company_logo text,
  apply_url text NOT NULL,
  skills text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON jobs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update their jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT created_by
    FROM jobs
    WHERE id = jobs.id
  ));