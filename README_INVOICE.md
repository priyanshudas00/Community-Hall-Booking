Invoice/Quotation generation guide

Overview
- The project now supports generating PDF invoices/quotations from booking records using a LaTeX template in `templates/invoice.tex`.
- Generated PDFs are uploaded to Supabase Storage `invoices` (bucket must be created) and the booking row is updated with `invoice_url` and `invoice_status`.

Requirements
- Docker (for the easiest LaTeX runtime) OR a local TeX Live distribution.
- Node 18+ and `npm install` to install `@supabase/supabase-js` and `mustache`.

Quick steps (local)
1. Create `invoices` bucket in Supabase Storage and set permissions (public read or private depending on your policy).
2. Install dependencies: `npm install`.
3. Set env vars: `SUPABASE_URL` and `SUPABASE_KEY` (service role key recommended for server-side script).
4. Run: `npx ts-node scripts/generate_invoice.ts <booking_id>` (ensure Docker is running).

Notes
- The script uses `blang/latex:ctanfull` Docker image to compile LaTeX. If you prefer Tectonic or a local texlive, adapt the compile step.
- Add a company logo by setting a `logo_path` entry in `site_settings` (path to public or storage path). The template will include the file name from `logo_filename` variable.
- The script expects site_settings to contain bank details and contact info for the invoice header.

Security
- Use Supabase service role key for the script because it needs to upload to storage and update bookings.

Next steps
- Add an Admin button to generate invoice from the UI (calls a serverless function or runs the script on your server).
- Add tests and CI job to run invoice generation in a controlled environment (Docker available in CI).
