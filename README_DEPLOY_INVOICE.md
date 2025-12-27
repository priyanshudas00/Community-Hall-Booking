Deploying invoice generation worker & bucket

1) Create `invoices` bucket (recommended public read):
   - Locally: `node scripts/create_invoices_bucket.js` after setting `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` env vars.
   - Or via Supabase CLI: `supabase storage create invoices --public`

2) Start worker to process pending invoices:
   - Install deps: `npm install`
   - Run: `SUPABASE_URL=<url> SUPABASE_SERVICE_KEY=<service-role-key> node scripts/worker_generate_invoices.js`
   - Run worker as a background service (pm2/systemd) for reliability.

3) Edge Function trigger (optional):
   - Deploy `supabase/functions/generate_invoice` using `supabase functions deploy generate_invoice` and set `SUPABASE_SERVICE_ROLE_KEY` in function env.
   - Admin UI calls the Edge Function to mark booking as pending for worker.

4) CI / GitHub Action (optional):
   - Add a job to run `scripts/generate_invoice.ts` inside Docker (setup Docker service) when a booking is marked `pending` or via manual dispatch.

Security
- Use the Supabase Service Role key only on the server or CI; never expose it in browser code.
