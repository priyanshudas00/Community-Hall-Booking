import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import Mustache from 'mustache';
import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('Please set SUPABASE_URL and SUPABASE_KEY in env');
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function run(bookingId: string) {
  // fetch booking
  const { data: booking } = await supabase
    .from('bookings')
    .select('*, events(name), facilities(name)')
    .eq('id', bookingId)
    .single();

  if (!booking) {
    console.error('Booking not found');
    process.exit(1);
  }

  // fetch site settings
  const { data: settingsArr } = await supabase.from('site_settings').select('*').limit(1);
  const settings = settingsArr && settingsArr[0] ? settingsArr[0] : {};

  // prepare services rows (example: parse notes or use provided breakdown)
  const services_rows = booking.notes ? booking.notes.split('\n').map((line: string, i: number) => `\\\hline\n${i+1} & ${line} & - & - \\\\`) .join('\n') : '';

  const template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'invoice.tex'), 'utf8');

  const logoFilename = settings.logo_path ? settings.logo_path : 'public/logo.png';

  const rendered = Mustache.render(template, {
    company_name: settings.hero_title || 'The Red Garden',
    location: settings.address || 'Patna, Bihar',
    phone: settings.phone_number || '',
    email: settings.contact_email || '',
    quotation_number: booking.invoice_number || `Q-${booking.id.substring(0,8)}`,
    quotation_date: (new Date()).toLocaleDateString(),
    auspicious_timing: '',
    customer_name: booking.user_name,
    customer_mobile: booking.user_mobile,
    customer_address: booking.user_email || '',
    event_type: booking.event_id ? booking.events?.name : '',
    event_date: booking.event_date || '',
    guest_count: booking.guest_count || '',
    duration: '',
    services_rows,
    total_amount: booking.total_amount ?? 0,
    gst: booking.gst ?? 0,
    total_payable: (booking.total_amount ?? 0) + (booking.gst ?? 0),
    bank_name: settings.bank_name || '',
    bank_account: settings.bank_account || '',
    ifsc: settings.ifsc || '',
    branch: settings.branch || '',
    logo_filename: logoFilename,
  });

  const tmpDir = path.join(process.cwd(), 'tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
  const texPath = path.join(tmpDir, `invoice-${bookingId}.tex`);
  fs.writeFileSync(texPath, rendered);

  // Compile with Docker TeX Live image (requires Docker).
  try {
    console.log('Compiling PDF via Docker TeX Live...');
    const cmd = `docker run --rm -v "${tmpDir}:/workdir" -w /workdir blang/latex:ctanfull pdflatex -interaction=nonstopmode -halt-on-error ${path.basename(texPath)}`;
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error('PDF compilation failed. Ensure Docker is running and blang/latex image is available.');
    process.exit(1);
  }

  const pdfPath = path.join(tmpDir, `invoice-${bookingId}.pdf`);
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF not generated');
    process.exit(1);
  }

  // Upload to Supabase storage
  const storagePath = `invoices/invoice-${bookingId}.pdf`;
  const file = fs.readFileSync(pdfPath);
  const { error: uploadError } = await supabase.storage.from('invoices').upload(storagePath, file, { upsert: true });
  if (uploadError) {
    console.error('Upload error', uploadError);
    process.exit(1);
  }

  const { publicURL } = supabase.storage.from('invoices').getPublicUrl(storagePath);

  // Update booking with invoice URL and status
  await supabase.from('bookings').update({ invoice_url: publicURL, invoice_status: 'finalized', invoice_number: booking.invoice_number || `Q-${booking.id.substring(0,8)}` }).eq('id', bookingId);

  console.log('Invoice generated and uploaded:', publicURL);
}

if (require.main === module) {
  const id = process.argv[2];
  if (!id) {
    console.error('Usage: node scripts/generate_invoice.js <booking_id>');
    process.exit(1);
  }
  run(id).catch((e) => { console.error(e); process.exit(1); });
}
