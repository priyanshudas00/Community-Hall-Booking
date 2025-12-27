# Admin User Setup Script for Windows
# Run this script to create an admin user for your The Red Garden application

param(
    [Parameter(Mandatory=$true)]
    [string]$AdminEmail,

    [Parameter(Mandatory=$true)]
    [string]$AdminPassword
)

Write-Host "🔐 The Red Garden Admin User Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the project directory
if (!(Test-Path "supabase\config.toml")) {
    Write-Host "❌ Not in a Supabase project directory. Please run this from the project root." -ForegroundColor Red
    exit 1
}

Write-Host "📧 Admin Email: $AdminEmail" -ForegroundColor Yellow
Write-Host "⏳ Creating admin user..." -ForegroundColor Green

# Note: This script assumes you have Supabase CLI installed
# For manual setup, follow the instructions below

Write-Host ""
Write-Host "📋 MANUAL SETUP INSTRUCTIONS:" -ForegroundColor Magenta
Write-Host "=============================" -ForegroundColor Magenta
Write-Host ""
Write-Host "1. Go to your Supabase Dashboard: https://supabase.com/dashboard" -ForegroundColor White
Write-Host "2. Navigate to your project" -ForegroundColor White
Write-Host "3. Go to Authentication > Users" -ForegroundColor White
Write-Host "4. Click 'Add User'" -ForegroundColor White
Write-Host "5. Enter the following details:" -ForegroundColor White
Write-Host "   - Email: $AdminEmail" -ForegroundColor Yellow
Write-Host "   - Password: $AdminPassword" -ForegroundColor Yellow
Write-Host "   - Auto-confirm user: ✅ Checked" -ForegroundColor Green
Write-Host "6. Click 'Create User'" -ForegroundColor White
Write-Host ""
Write-Host "7. After creating the user, run this SQL in the SQL Editor:" -ForegroundColor White
Write-Host ""

$sqlQuery = @"
-- Replace 'your-admin-email@example.com' with your actual email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = '$AdminEmail'
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.profiles (id, email, full_name)
SELECT id, '$AdminEmail', 'Admin User'
FROM auth.users
WHERE email = '$AdminEmail'
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();
"@

Write-Host $sqlQuery -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 After completing these steps, you can log in to the admin panel at /admin" -ForegroundColor Green
Write-Host "📧 Email: $AdminEmail" -ForegroundColor Yellow
Write-Host "🔑 Password: $AdminPassword" -ForegroundColor Yellow