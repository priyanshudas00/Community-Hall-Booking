#!/bin/bash

# Admin User Setup Script
# This script helps you create an admin user for your The Red Garden application

echo "🔐 The Red Garden Admin User Setup"
echo "=================================="
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "npm install -g supabase"
    exit 1
fi

# Check if we're in a Supabase project
if [ ! -f "supabase/config.toml" ]; then
    echo "❌ Not in a Supabase project directory. Please run this from the project root."
    exit 1
fi

echo "📧 Please enter your admin email address:"
read -r ADMIN_EMAIL

echo "🔑 Please enter a secure password for the admin account:"
read -s ADMIN_PASSWORD

echo ""
echo "⏳ Creating admin user..."

# Create the user using Supabase Auth
supabase auth signup --email "$ADMIN_EMAIL" --password "$ADMIN_PASSWORD" --data '{"full_name": "Admin User"}'

if [ $? -eq 0 ]; then
    echo "✅ User account created successfully!"
    echo ""
    echo "🔄 Now applying admin role..."

    # Run the migration to assign admin role
    supabase db push

    echo ""
    echo "🎉 Admin user setup complete!"
    echo "📧 Email: $ADMIN_EMAIL"
    echo "🔑 Password: (the one you entered)"
    echo ""
    echo "You can now log in to the admin panel at /admin"
else
    echo "❌ Failed to create user account. Please try again or check your Supabase configuration."
    exit 1
fi