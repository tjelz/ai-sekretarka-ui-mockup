import { NextRequest, NextResponse } from "next/server"
import { Pool } from "pg"
import bcrypt from "bcrypt"

// Create Postgres connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: RegisterRequest = await request.json()
    const { name, email, password } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and password are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password strength (minimum 8 characters)
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email.toLowerCase()]
    )

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Hash password with bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user into database
    const result = await pool.query(
      `INSERT INTO users (name, email, password, "emailVerified", image)
       VALUES ($1, $2, $3, NULL, NULL)
       RETURNING id, name, email`,
      [name, email.toLowerCase(), hashedPassword]
    )

    const newUser = result.rows[0]

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)

    // Handle specific PostgreSQL errors
    if (error instanceof Error) {
      // Duplicate email constraint violation (PostgreSQL error code 23505)
      if ("code" in error && error.code === "23505") {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 409 }
        )
      }

      // Database connection errors
      if ("code" in error && (error.code === "ECONNREFUSED" || error.code === "ETIMEDOUT")) {
        return NextResponse.json(
          { error: "Database connection error. Please try again later." },
          { status: 503 }
        )
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: "An error occurred during registration. Please try again." },
      { status: 500 }
    )
  }
}
