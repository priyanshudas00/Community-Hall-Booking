-- Add invoice and payment fields to bookings

ALTER TABLE public.bookings
  ADD COLUMN invoice_number TEXT,
  ADD COLUMN invoice_url TEXT,
  ADD COLUMN total_amount NUMERIC DEFAULT 0,
  ADD COLUMN gst NUMERIC DEFAULT 0,
  ADD COLUMN amount_paid NUMERIC DEFAULT 0,
  ADD COLUMN payment_status TEXT DEFAULT 'unpaid',
  ADD COLUMN invoice_status TEXT DEFAULT 'draft';

-- Add constraints for payment_status and invoice_status
ALTER TABLE public.bookings ADD CONSTRAINT bookings_payment_status_check CHECK (payment_status IN ('unpaid','partial','paid'));
ALTER TABLE public.bookings ADD CONSTRAINT bookings_invoice_status_check CHECK (invoice_status IN ('draft','finalized'));

-- Grant select/update to admins via existing RLS policies (Admins already allowed to update bookings)
