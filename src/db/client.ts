import { sql } from '@vercel/postgres';
import { kv } from '@vercel/kv';

/**
 * Vercel Postgres client for database operations
 * Configured to use environment variables for connection
 */
export const db = sql;

/**
 * Vercel KV client for session management and caching
 * Used for storing user sessions and temporary data
 */
export const cache = kv;

/**
 * Initialize database tables if they don't exist
 */
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export type User = {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: Date;
  updated_at: Date;
};
