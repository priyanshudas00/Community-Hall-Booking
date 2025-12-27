-- Add additional site_settings fields for branding and banking

ALTER TABLE public.site_settings
  ADD COLUMN logo_path TEXT,
  ADD COLUMN contact_email TEXT,
  ADD COLUMN bank_name TEXT,
  ADD COLUMN bank_account TEXT,
  ADD COLUMN ifsc TEXT,
  ADD COLUMN branch TEXT;

-- Note: site_settings table already has RLS policies allowing admin updates
