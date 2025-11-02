import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { sql } from '@/db/client';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds
const SALT_ROUNDS = 10;

export interface SessionUser {
  id: number;
  email: string;
  name: string | null;
}

export interface JWTPayload extends SessionUser {
  iat: number;
  exp: number;
}

/**
 * Hash a password using bcrypt
 * @param password - Plain text password to hash
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 * @param password - Plain text password to verify
 * @param hash - Hashed password to compare against
 * @returns True if password matches hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a JWT token for a user
 * @param user - User data to encode in token
 * @returns JWT token string
 */
export function createToken(user: SessionUser): string {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: SESSION_DURATION,
  });
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded user data or null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Create a session for a user
 * Stores session in Postgres and sets HTTP-only cookie
 * @param user - User data to store in session
 */
export async function createSession(user: SessionUser): Promise<string> {
  const token = createToken(user);
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);

  // Store session in Postgres
  await sql`
    INSERT INTO sessions (user_id, token_hash, expires_at, created_at, last_activity_at)
    VALUES (${user.id}, ${tokenHash}, ${expiresAt.toISOString()}, NOW(), NOW())
  `;

  // Set HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });

  return token;
}

/**
 * Get the current session user from cookies
 * Validates against Postgres sessions table
 * @returns User data from session or null if not authenticated
 */
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    return null;
  }

  const payload = verifyToken(token.value);
  if (!payload) {
    return null;
  }

  // Validate session exists in database and is not expired or revoked
  const tokenHash = crypto.createHash('sha256').update(token.value).digest('hex');
  const result = await sql`
    SELECT s.*, u.email, u.name
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token_hash = ${tokenHash}
      AND s.expires_at > NOW()
      AND s.revoked_at IS NULL
      AND u.deleted_at IS NULL
  `;

  if (result.rows.length === 0) {
    return null;
  }

  // Update last activity
  await sql`
    UPDATE sessions
    SET last_activity_at = NOW()
    WHERE token_hash = ${tokenHash}
  `;

  return {
    id: payload.id,
    email: payload.email,
    name: payload.name,
  };
}

/**
 * Destroy the current session
 * Revokes session in Postgres and clears cookie
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  if (token) {
    const tokenHash = crypto.createHash('sha256').update(token.value).digest('hex');

    // Revoke session in database
    await sql`
      UPDATE sessions
      SET revoked_at = NOW()
      WHERE token_hash = ${tokenHash}
    `;
  }

  cookieStore.delete('auth-token');
}

/**
 * Require authentication - throws error if not authenticated
 * Use in server components and API routes
 */
export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}
