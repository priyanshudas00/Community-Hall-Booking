# Admin User Setup Guide

This guide will help you create an admin account for your The Red Garden application.

## Method 1: Using Supabase Dashboard (Recommended)

### Step 1: Create User Account
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project
3. Go to **Authentication > Users**
4. Click **"Add User"**
5. Enter your details:
   - **Email**: Your email address
   - **Password**: A secure password
   - **Auto-confirm user**: ✅ Check this box
6. Click **"Create User"**

### Step 2: Assign Admin Role
1. Go to **SQL Editor** in your Supabase dashboard
2. Run the following SQL query (replace `your-email@example.com` with your actual email):

```sql
-- Assign admin role to user
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Create/update profile
INSERT INTO public.profiles (id, email, full_name)
SELECT id, 'your-email@example.com', 'Admin User'
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();
```

## Method 2: Using Migration File

1. Edit the file `supabase/migrations/20251228120000_create_admin_user.sql`
2. Replace `'your-admin-email@example.com'` with your actual email
3. First create the user account through Supabase Auth UI
4. Then run: `supabase db push`

## Method 3: Using PowerShell Script

1. Open PowerShell in the project root
2. Run: `.\setup-admin.ps1 -AdminEmail "your-email@example.com" -AdminPassword "your-password"`

## Login to Admin Panel

Once setup is complete:
1. Go to `/admin` on your website
2. Use your admin email and password to log in
3. You should now have access to the admin dashboard

## Troubleshooting

- **"User not found" error**: Make sure you've created the user account first
- **"Access denied"**: Check that the SQL query executed successfully
- **Can't login**: Verify your email and password are correct

## Security Notes

- Choose a strong password
- Keep your admin credentials secure
- Consider enabling 2FA for additional security
- Regularly update your password