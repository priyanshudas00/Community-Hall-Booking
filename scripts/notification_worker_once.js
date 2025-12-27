const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');
const webpush = require('web-push');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_FROM = process.env.TWILIO_FROM || '';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PHONE = process.env.ADMIN_PHONE || '';
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails('mailto:' + (ADMIN_EMAIL || 'no-reply@example.com'), VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

async function sendEmail(subject, text) {
  if (!SENDGRID_API_KEY || !ADMIN_EMAIL) throw new Error('SendGrid or ADMIN_EMAIL not configured');
  const body = {
    personalizations: [{ to: [{ email: ADMIN_EMAIL }] }],
    from: { email: ADMIN_EMAIL },
    subject,
    content: [{ type: 'text/plain', value: text }],
  };
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`SendGrid error: ${res.statusText}`);
}

async function sendSms(text) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM || !ADMIN_PHONE) throw new Error('Twilio not configured');
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const body = new URLSearchParams({ To: ADMIN_PHONE, From: TWILIO_FROM, Body: text });
  const res = await fetch(url, { method: 'POST', headers: { Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
  if (!res.ok) throw new Error(`Twilio error: ${res.statusText}`);
}

async function sendTelegram(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) throw new Error('Telegram not configured');
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }) });
  if (!res.ok) throw new Error(`Telegram error: ${res.statusText}`);
}

async function processNotification(n) {
  const text = `[${n.type}] ${JSON.stringify(n.payload)}`;
  const channels = (n.channel || 'all').split(',').map(s => s.trim());

  try {
    if (channels.includes('all') || channels.includes('push')) {
      const { data: subs } = await supabase.from('push_subscriptions').select('id, subscription');
      if (subs && subs.length > 0) {
        for (const s of subs) {
          const pushSub = s.subscription;
          try {
            await webpush.sendNotification(pushSub, JSON.stringify({ title: `Alert: ${n.type}`, body: n.payload ? JSON.stringify(n.payload) : '', url: '/admin' }));
          } catch (pushErr) {
            const status = (pushErr && pushErr.statusCode) || (pushErr && pushErr.body && JSON.parse(pushErr.body).statusCode);
            if (status === 410 || status === 404) {
              await supabase.from('push_subscriptions').delete().eq('id', s.id);
            }
            console.error('Push send error', pushErr.toString());
          }
        }
      }
    }

    if (channels.includes('all') || channels.includes('email')) await sendEmail(`Alert: ${n.type}`, text);
    if (channels.includes('all') || channels.includes('sms')) await sendSms(text);
    if (channels.includes('all') || channels.includes('telegram')) await sendTelegram(text);

    await supabase.from('notifications').update({ status: 'sent', sent_at: new Date().toISOString() }).eq('id', n.id);
  } catch (err) {
    console.error('Notification send failed', err.toString());
    await supabase.from('notifications').update({ attempts: (n.attempts || 0) + 1, last_error: err.toString() }).eq('id', n.id);
  }
}

async function runOnce() {
  const { data, error } = await supabase.from('notifications').select('*').eq('status', 'pending').limit(50);
  if (error) { console.error('Fetch notifications error', error); process.exit(1); }
  for (const n of data) {
    await processNotification(n);
  }
}

runOnce().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
