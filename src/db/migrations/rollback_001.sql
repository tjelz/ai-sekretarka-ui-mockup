-- ============================================================================
-- ROLLBACK: 001 - Initial Authentication Schema
-- Description: Rollback initial authentication schema migration
-- Author: Analyst Agent (Hive Mind)
-- Date: 2025-11-01
-- ============================================================================

BEGIN;

-- Drop views first
DROP VIEW IF EXISTS user_security_status;
DROP VIEW IF EXISTS active_sessions;

-- Drop functions
DROP FUNCTION IF EXISTS cleanup_expired_tokens();
DROP FUNCTION IF EXISTS cleanup_expired_sessions();
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS refresh_tokens CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS email_verification_tokens CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop extensions if no other tables use them
-- (Comment out if other parts of the database use these extensions)
-- DROP EXTENSION IF EXISTS "pgcrypto";
-- DROP EXTENSION IF EXISTS "uuid-ossp";

RAISE NOTICE 'Rollback successful: All authentication tables and objects removed';

COMMIT;
