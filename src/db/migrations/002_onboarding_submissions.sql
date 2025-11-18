-- ============================================================================
-- MIGRATION: 002 - Onboarding Submissions Storage
-- Description: Create table to persist onboarding submissions and agent metadata
-- Author: Cursor Coding Agent
-- Date: 2025-11-14
-- ============================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id UUID PRIMARY KEY,
  company_url TEXT NOT NULL,
  email TEXT,
  agent_id TEXT,
  agent_name TEXT,
  is_mock BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_submissions_agent_id
  ON onboarding_submissions(agent_id);

CREATE INDEX IF NOT EXISTS idx_onboarding_submissions_status_created_at
  ON onboarding_submissions(status, created_at DESC);

COMMIT;

