-- ============================================================================
-- User Authentication Database Schema - SIMPLIFIED VERSION
-- Designed for Vercel Postgres Storage
-- Version: 1.0.1 (Fixed immutable function errors)
-- ============================================================================

-- Enable UUID extension for secure ID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USERS TABLE
-- Core user authentication and profile data
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    password_hash TEXT NOT NULL,

    -- Profile Information
    full_name VARCHAR(255),
    display_name VARCHAR(100),
    avatar_url TEXT,

    -- Security Metadata
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMP WITH TIME ZONE,
    password_changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret TEXT,

    -- Audit Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE,

    -- Constraints
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT failed_attempts_range CHECK (failed_login_attempts >= 0 AND failed_login_attempts <= 10)
);

-- Indexes for Users Table (FIXED - removed CURRENT_TIMESTAMP from predicates)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_users_account_locked ON users(account_locked_until) WHERE account_locked_until IS NOT NULL;

-- ============================================================================
-- SESSIONS TABLE
-- Manage active user sessions with token-based authentication
-- ============================================================================
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Session Token (hashed for security)
    token_hash TEXT UNIQUE NOT NULL,
    refresh_token_hash TEXT UNIQUE,

    -- Session Metadata
    ip_address INET,
    user_agent TEXT,
    device_fingerprint TEXT,

    -- Expiration Management
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    refresh_expires_at TIMESTAMP WITH TIME ZONE,

    -- Session State
    is_active BOOLEAN DEFAULT TRUE,
    revoked_at TIMESTAMP WITH TIME ZONE,
    revoke_reason VARCHAR(100),

    -- Audit Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Sessions Table (FIXED)
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_sessions_last_activity ON sessions(last_activity_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON sessions(user_id, is_active, expires_at);

-- ============================================================================
-- PASSWORD_RESET_TOKENS TABLE
-- Secure password reset flow with time-limited tokens
-- ============================================================================
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Token (hashed)
    token_hash TEXT UNIQUE NOT NULL,

    -- Expiration (1 hour default)
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,

    -- Metadata
    ip_address INET,
    user_agent TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Password Reset Tokens (FIXED)
CREATE INDEX IF NOT EXISTS idx_password_reset_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_token_hash ON password_reset_tokens(token_hash) WHERE used_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_password_reset_expires ON password_reset_tokens(expires_at);

-- ============================================================================
-- EMAIL_VERIFICATION_TOKENS TABLE
-- Email ownership verification tokens
-- ============================================================================
CREATE TABLE IF NOT EXISTS email_verification_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Token (hashed)
    token_hash TEXT UNIQUE NOT NULL,

    -- Email to verify
    email VARCHAR(255) NOT NULL,

    -- Expiration (24 hours default)
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Email Verification Tokens (FIXED)
CREATE INDEX IF NOT EXISTS idx_email_verify_user_id ON email_verification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verify_token_hash ON email_verification_tokens(token_hash) WHERE verified_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_email_verify_expires ON email_verification_tokens(expires_at);

-- ============================================================================
-- AUDIT_LOGS TABLE
-- Security audit trail for all authentication events
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,

    -- Event Details
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,

    -- Request Metadata
    ip_address INET,
    user_agent TEXT,
    request_id VARCHAR(100),

    -- Success/Failure
    success BOOLEAN NOT NULL,
    error_message TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Audit Logs
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_event_type ON audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_success ON audit_logs(success, created_at DESC);

-- ============================================================================
-- REFRESH_TOKENS TABLE
-- Token rotation and theft detection
-- ============================================================================
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,

    -- Token (hashed)
    token_hash TEXT UNIQUE NOT NULL,

    -- Token Family for rotation
    family_id TEXT NOT NULL,
    parent_token_hash TEXT,

    -- Expiration
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

    -- Usage tracking
    used_at TIMESTAMP WITH TIME ZONE,
    revoked_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Refresh Tokens (FIXED)
CREATE INDEX IF NOT EXISTS idx_refresh_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_token_hash ON refresh_tokens(token_hash) WHERE used_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_refresh_family ON refresh_tokens(family_id);
CREATE INDEX IF NOT EXISTS idx_refresh_expires ON refresh_tokens(expires_at);

-- ============================================================================
-- FUNCTIONS
-- Automated cleanup and maintenance functions
-- ============================================================================

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions() RETURNS void AS $$
BEGIN
    DELETE FROM sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens() RETURNS void AS $$
BEGIN
    DELETE FROM password_reset_tokens WHERE expires_at < NOW() AND created_at < NOW() - INTERVAL '7 days';
    DELETE FROM email_verification_tokens WHERE expires_at < NOW() AND created_at < NOW() - INTERVAL '30 days';
    DELETE FROM refresh_tokens WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS
-- Convenient views for common queries
-- ============================================================================

-- Active sessions view
CREATE OR REPLACE VIEW active_sessions AS
SELECT
    s.id,
    s.user_id,
    u.email,
    u.full_name,
    s.ip_address,
    s.user_agent,
    s.created_at,
    s.last_activity_at,
    s.expires_at
FROM sessions s
JOIN users u ON s.user_id = u.id
WHERE s.is_active = TRUE
  AND s.revoked_at IS NULL
  AND s.expires_at > NOW()
  AND u.deleted_at IS NULL;

-- User security status view
CREATE OR REPLACE VIEW user_security_status AS
SELECT
    u.id,
    u.email,
    u.email_verified,
    u.two_factor_enabled,
    u.failed_login_attempts,
    u.account_locked_until,
    u.password_changed_at,
    u.last_login_at,
    COUNT(DISTINCT s.id) AS active_sessions,
    MAX(s.last_activity_at) AS last_session_activity
FROM users u
LEFT JOIN sessions s ON u.id = s.user_id
    AND s.is_active = TRUE
    AND s.revoked_at IS NULL
WHERE u.deleted_at IS NULL
GROUP BY u.id;

-- ============================================================================
-- INITIAL DATA
-- Create a default admin user (optional - remove in production)
-- ============================================================================

-- Comment out or remove this in production
-- INSERT INTO users (email, password_hash, full_name, email_verified)
-- VALUES (
--     'admin@example.com',
--     '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lW7GzS4RWmS2', -- password: changeme
--     'Admin User',
--     TRUE
-- ) ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- COMPLETION
-- ============================================================================

-- Verify table creation
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN ('users', 'sessions', 'password_reset_tokens',
                       'email_verification_tokens', 'audit_logs', 'refresh_tokens');

    RAISE NOTICE 'Successfully created % tables', table_count;
END $$;
