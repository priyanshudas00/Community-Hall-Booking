import { serve } from 'std/server';

serve(async () => {
  try {
    const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY') || '';
    if (!VAPID_PUBLIC_KEY) return new Response(JSON.stringify({ error: 'VAPID_PUBLIC_KEY not set' }), { status: 500 });
    return new Response(JSON.stringify({ publicKey: VAPID_PUBLIC_KEY }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});