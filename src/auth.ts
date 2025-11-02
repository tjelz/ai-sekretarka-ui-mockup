import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import bcrypt from "bcrypt"

// Create Postgres connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Query user from database
        const result = await pool.query(
          'SELECT * FROM users WHERE email = $1',
          [credentials.email]
        )

        const user = result.rows[0]

        if (!user) {
          return null
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
