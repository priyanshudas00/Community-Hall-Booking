-- Create admin user and assign admin role
-- INSTRUCTIONS:
-- 1. Replace 'your-admin-email@example.com' below with your actual email
-- 2. First create a user account through Supabase Auth UI or signup
-- 3. Then run this migration

DO $$
DECLARE
    admin_user_id UUID;
    admin_email TEXT := 'admin@theredgarden.com'; -- 🔴 CHANGE THIS TO YOUR EMAIL
BEGIN
    -- Get the user ID for the admin email
    SELECT id INTO admin_user_id
    FROM auth.users
    WHERE email = admin_email;

    -- If user exists, assign admin role
    IF admin_user_id IS NOT NULL THEN
        -- Insert admin role if not already exists
        INSERT INTO public.user_roles (user_id, role)
        VALUES (admin_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;

        -- Update or insert profile
        INSERT INTO public.profiles (id, email, full_name)
        VALUES (admin_user_id, admin_email, 'Admin User')
        ON CONFLICT (id) DO UPDATE SET
            email = EXCLUDED.email,
            full_name = EXCLUDED.full_name,
            updated_at = NOW();

        RAISE NOTICE '✅ Admin user setup complete for email: %', admin_email;
    ELSE
        RAISE EXCEPTION '❌ User with email % not found. Please create the user account first through Supabase Auth UI.', admin_email;
    END IF;
END $$;