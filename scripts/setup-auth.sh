#!/bin/bash

# Authentication System Setup Script
# This script helps you set up Vercel Postgres and KV for the authentication system

set -e

echo "🔐 Authentication System Setup"
echo "=============================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing now..."
    npm install -g vercel
    echo "✅ Vercel CLI installed successfully"
else
    echo "✅ Vercel CLI is already installed"
fi

echo ""
echo "📦 Step 1: Link your project to Vercel"
echo "Run: vercel link"
echo ""
read -p "Have you linked your project? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please run 'vercel link' first and then run this script again."
    exit 1
fi

echo ""
echo "📊 Step 2: Create Vercel Postgres database"
echo "This will create a Postgres database in your Vercel project"
echo ""
read -p "Create Postgres database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel storage create postgres
    echo "✅ Postgres database created"
else
    echo "⏭️  Skipped Postgres creation"
fi

echo ""
echo "💾 Step 3: Create Vercel KV database"
echo "This will create a KV database for session management"
echo ""
read -p "Create KV database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel storage create kv
    echo "✅ KV database created"
else
    echo "⏭️  Skipped KV creation"
fi

echo ""
echo "🔑 Step 4: Pull environment variables"
vercel env pull .env.local
echo "✅ Environment variables pulled to .env.local"

echo ""
echo "🔐 Step 5: Generate JWT Secret"
JWT_SECRET=$(openssl rand -base64 32 2>/dev/null || node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
echo "Generated JWT Secret: $JWT_SECRET"

# Add JWT_SECRET to .env.local if it doesn't exist
if ! grep -q "JWT_SECRET" .env.local; then
    echo "" >> .env.local
    echo "# JWT Secret for authentication" >> .env.local
    echo "JWT_SECRET=$JWT_SECRET" >> .env.local
    echo "✅ JWT_SECRET added to .env.local"
else
    echo "ℹ️  JWT_SECRET already exists in .env.local"
fi

echo ""
echo "✨ Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Review your .env.local file"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Navigate to http://localhost:3000/login to test authentication"
echo ""
echo "For more information, see docs/AUTH_SETUP.md"
