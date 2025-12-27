Notification system (admin alerts)

Overview
- Adds server-side notification queue and worker so admins receive alerts even when the website is closed.
- Notifications are stored in `public.notifications` and a worker `scripts/notification_worker.ts` polls and sends via configured providers.

Providers supported (configure env vars):
- SendGrid (email): SENDGRID_API_KEY, ADMIN_EMAIL
- Twilio (SMS): TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, ADMIN_PHONE
- Telegram: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

How it works
- DB triggers enqueue notifications for: new bookings, new enquiries, invoice generated.
- Worker polls `notifications` with `status='pending'` and attempts to send via configured channels; updates `status` to `sent` and sets `sent_at` on success.
- You can also manually insert into `notifications` via an Edge Function or server script to send ad-hoc alerts.

Setup
1. Set env vars for SUPABASE_URL and SUPABASE_SERVICE_KEY (service role key) for worker and scripts.
2. Configure provider keys (SendGrid/Twilio/Telegram) and admin contact details.
3. Run worker: `SUPABASE_URL=... SUPABASE_SERVICE_KEY=... SENDGRID_API_KEY=... ADMIN_EMAIL=... node scripts/notification_worker.js`
4. Run as a background service (pm2/systemd) or host it in a serverless service that supports long running processes.

Security
- Use Supabase Service Role key only in server-side environment or Edge Function secrets.

Notes
- Worker is resilient: on failure it increments `attempts` and logs `last_error`.
- You can add other providers by extending `scripts/notification_worker.ts`.
