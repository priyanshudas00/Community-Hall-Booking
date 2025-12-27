import { execSync } from 'child_process';
import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function fetchPending() {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, invoice_status')
    .eq('invoice_status', 'pending')
    .limit(10);

  if (error) {
    console.error('Error fetching pending bookings:', error);
    return [];
  }
  return data || [];
}

async function processBooking(id: string) {
  try {
    console.log('Generating invoice for booking', id);
    execSync(`node scripts/generate_invoice.js ${id}`, { stdio: 'inherit' });
    // optionally update status is handled by generate script
  } catch (e) {
    console.error('Generation failed for', id, e);
  }
}

async function runOnce() {
  const pending = await fetchPending();
  for (const b of pending) {
    await processBooking(b.id);
  }
}

// Simple poll loop
async function main() {
  console.log('Invoice worker started');
  while (true) {
    await runOnce();
    await new Promise((r) => setTimeout(r, 15000)); // 15s
  }
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
