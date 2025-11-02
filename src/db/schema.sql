-- ============================================================================
-- User Authentication Database Schema
-- Designed for Vercel Postgres Storage
-- Version: 1.0.0
-- Created: 2025-11-01
-- ============================================================================

-- Enable UUID extension for secure ID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USERS TABLE
-- Core user authentication and profile data
-- ============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    password_hash TEXT NOT NULL, -- bcrypt hash with salt rounds >= 12

    -- Profile Information
    full_name VARCHAR(255),
    display_name VARCHAR(100),
    avatar_url TEXT,

    -- Security Metadata
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMP WITH TIME ZONE,
    password_changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret TEXT, -- Encrypted TOTP secret

    -- Audit Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE, -- Soft delete support

    -- Constraints
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT failed_attempts_range CHECK (failed_login_attempts >= 0 AND failed_login_attempts <= 10)
);

-- Indexes for Users Table
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_users_last_login ON users(last_login_at DESC NULLS LAST);
CREATE INDEX idx_users_account_locked ON users(account_locked_until) WHERE account_locked_until > CURRENT_TIMESTAMP;

-- ============================================================================
-- SESSIONS TABLE
-- Manage active user sessions with token-based authentication
-- ============================================================================
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

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
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT expires_at_future CHECK (expires_at > created_at),
    CONSTRAINT refresh_expires_after_token CHECK (refresh_expires_at IS NULL OR refresh_expires_at > expires_at)
);

-- Indexes for Sessions Table
CREATE INDEX idx_sessions_user_id ON sessions(user_id) WHERE is_active = TRUE;
CREATE INDEX idx_sessions_token_hash ON sessions(token_hash) WHERE is_active = TRUE;
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at) WHERE is_active = TRUE;
CREATE INDEX idx_sessions_last_activity ON sessions(last_activity_at DESC);
CREATE INDEX idx_sessions_active ON sessions(user_id, is_active, expires_at);

-- ============================================================================
-- PASSWORD_RESET_TOKENS TABLE
-- Secure password reset flow with time-limited tokens
-- ============================================================================
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Token Management
    token_hash TEXT UNIQUE NOT NULL,

    -- Expiration (typically 1 hour)
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

    -- Usage Tracking
    used_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,

    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT token_expires_future CHECK (expires_at > created_at)
);

-- Indexes for Password Reset Tokens
CREATE INDEX idx_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_reset_tokens_hash ON password_reset_tokens(token_hash) WHERE used_at IS NULL;
CREATE INDEX idx_reset_tokens_expires ON password_reset_tokens(expires_at) WHERE used_at IS NULL;

-- ============================================================================
-- EMAIL_VERIFICATION_TOKENS TABLE
-- Email verification workflow
-- ============================================================================
CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Token Management
    token_hash TEXT UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,

    -- Expiration (typically 24 hours)
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

    -- Usage Tracking
    verified_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,

    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT token_expires_future CHECK (expires_at > created_at)
);

-- Indexes for Email Verification Tokens
CREATE INDEX idx_email_verify_user_id ON email_verification_tokens(user_id);
CREATE INDEX idx_email_verify_hash ON email_verification_tokens(token_hash) WHERE verified_at IS NULL;

-- ============================================================================
-- AUDIT_LOGS TABLE
-- Security audit trail for authentication events
-- ============================================================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,

    -- Event Details
    event_type VARCHAR(50) NOT NULL, -- login, logout, password_change, etc.
    event_status VARCHAR(20) NOT NULL, -- success, failure, blocked

    -- Context
    ip_address INET,
    user_agent TEXT,
    details JSONB, -- Additional event-specific data

    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT valid_event_type CHECK (event_type IN (
        'login', 'logout', 'password_change', 'password_reset_request',
        'password_reset_complete', 'email_verification', 'account_locked',
        'account_unlocked', '2fa_enabled', '2fa_disabled', 'session_revoked'
    )),
    CONSTRAINT valid_event_status CHECK (event_status IN ('success', 'failure', 'blocked', 'pending'))
);

-- Indexes for Audit Logs
CREATE INDEX idx_audit_user_id ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_event_type ON audit_logs(event_type, created_at DESC);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_ip_address ON audit_logs(ip_address, created_at DESC);
CREATE INDEX idx_audit_event_status ON audit_logs(event_status, event_type);

-- ============================================================================
-- REFRESH_TOKENS TABLE
-- Separate table for refresh token rotation (optional enhanced security)
-- ============================================================================
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Token Management
    token_hash TEXT UNIQUE NOT NULL,
    parent_token_hash TEXT, -- For token rotation tracking

    -- Expiration
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

    -- Usage Tracking
    used_at TIMESTAMP WITH TIME ZONE,
    revoked_at TIMESTAMP WITH TIME ZONE,

    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT token_expires_future CHECK (expires_at > created_at)
);

-- Indexes for Refresh Tokens
CREATE INDEX idx_refresh_tokens_hash ON refresh_tokens(token_hash) WHERE used_at IS NULL AND revoked_at IS NULL;
CREATE INDEX idx_refresh_tokens_session ON refresh_tokens(session_id);
CREATE INDEX idx_refresh_tokens_expires ON refresh_tokens(expires_at);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-cleanup expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    UPDATE sessions
    SET is_active = FALSE,
        revoked_at = CURRENT_TIMESTAMP,
        revoke_reason = 'expired'
    WHERE expires_at < CURRENT_TIMESTAMP
      AND is_active = TRUE;
END;
$$ LANGUAGE plpgsql;

-- Auto-cleanup expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
    DELETE FROM password_reset_tokens
    WHERE expires_at < CURRENT_TIMESTAMP - INTERVAL '7 days';

    DELETE FROM email_verification_tokens
    WHERE expires_at < CURRENT_TIMESTAMP - INTERVAL '7 days';

    DELETE FROM refresh_tokens
    WHERE expires_at < CURRENT_TIMESTAMP - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- Active sessions view
CREATE VIEW active_sessions AS
SELECT
    s.id,
    s.user_id,
    u.email,
    u.display_name,
    s.ip_address,
    s.user_agent,
    s.expires_at,
    s.last_activity_at,
    s.created_at
FROM sessions s
JOIN users u ON s.user_id = u.id
WHERE s.is_active = TRUE
  AND s.expires_at > CURRENT_TIMESTAMP
  AND u.deleted_at IS NULL;

-- User security status view
CREATE VIEW user_security_status AS
SELECT
    u.id,
    u.email,
    u.failed_login_attempts,
    u.account_locked_until,
    u.two_factor_enabled,
    u.password_changed_at,
    u.last_login_at,
    COUNT(DISTINCT s.id) as active_session_count,
    MAX(al.created_at) as last_security_event
FROM users u
LEFT JOIN sessions s ON u.id = s.user_id AND s.is_active = TRUE AND s.expires_at > CURRENT_TIMESTAMP
LEFT JOIN audit_logs al ON u.id = al.user_id
WHERE u.deleted_at IS NULL
GROUP BY u.id;

-- ============================================================================
-- INITIAL DATA AND SECURITY
-- ============================================================================

-- Row Level Security (RLS) policies can be added here if using Vercel Postgres with RLS support

COMMENT ON TABLE users IS 'Core user authentication and profile data';
COMMENT ON TABLE sessions IS 'Active user sessions with token-based authentication';
COMMENT ON TABLE password_reset_tokens IS 'Time-limited password reset tokens';
COMMENT ON TABLE email_verification_tokens IS 'Email verification tokens';
COMMENT ON TABLE audit_logs IS 'Security audit trail for authentication events';
COMMENT ON TABLE refresh_tokens IS 'Refresh tokens for token rotation';

COMMENT ON COLUMN users.password_hash IS 'bcrypt hash with minimum 12 salt rounds';
COMMENT ON COLUMN sessions.token_hash IS 'SHA-256 hash of session token';
COMMENT ON COLUMN sessions.device_fingerprint IS 'Browser/device fingerprint for anomaly detection';
