import { serve } from 'std/server';
import { createClient } from '@supabase/supabase-js';

// This function marks a booking invoice_status to 'pending'.
// The actual PDF generation is handled by a worker that polls for 'pending' bookings.

serve(async (req) => {
  try {
    const body = await req.json();
    const { bookingId } = body;
    if (!bookingId) return new Response(JSON.stringify({ error: 'bookingId required' }), { status: 400 });

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // mark pending so worker picks it up
    const { error } = await supabase.from('bookings').update({ invoice_status: 'pending' }).eq('id', bookingId);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});