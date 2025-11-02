-- ============================================================================
-- MIGRATION: 001 - Initial Authentication Schema
-- Description: Create core authentication tables and indexes
-- Author: Analyst Agent (Hive Mind)
-- Date: 2025-11-01
-- ============================================================================

-- This migration creates the foundational database schema for user authentication
-- including users, sessions, password reset, email verification, and audit logging

BEGIN;

-- Import the main schema
\i ../schema.sql

-- Verify tables were created
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN ('users', 'sessions', 'password_reset_tokens',
                       'email_verification_tokens', 'audit_logs', 'refresh_tokens');

    IF table_count <> 6 THEN
        RAISE EXCEPTION 'Migration failed: Expected 6 tables, found %', table_count;
    END IF;

    RAISE NOTICE 'Migration successful: All 6 tables created';
END $$;

COMMIT;
