const { execSync } = require("node:child_process")

const MIGRATIONS = [
  "src/db/migrations/001_initial_schema.sql",
  "src/db/migrations/002_onboarding_submissions.sql"
]

const connectionString = process.env.POSTGRES_URL

if (!connectionString) {
  console.error("POSTGRES_URL is not defined. Set it before running migrations.")
  process.exit(1)
}

try {
  MIGRATIONS.forEach((file) => {
    console.log(`Running migration: ${file}`)
    execSync(`psql "${connectionString}" -f ${file}`, { stdio: "inherit" })
  })
  console.log("All migrations applied successfully.")
} catch (error) {
  console.error("Migration failed:", error)
  process.exit(1)
}

