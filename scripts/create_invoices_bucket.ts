import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function run() {
  const bucket = 'invoices';
  const { data, error } = await supabase.storage.createBucket(bucket, {
    public: true,
  });

  if (error) {
    console.error('Failed to create bucket:', error.message || error);
    process.exit(1);
  }
  console.log('Bucket created or already exists:', data);
}

run().catch((e) => { console.error(e); process.exit(1); });
