-- Create notifications table for admin alerts

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- e.g., 'new_booking', 'new_enquiry', 'invoice_generated'
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  channel TEXT DEFAULT 'all', -- 'email', 'sms', 'telegram', 'all'
  status TEXT DEFAULT 'pending', -- 'pending','sent','failed'
  attempts INT DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Allow only admins to view notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view notifications" ON public.notifications
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow inserts by authenticated (for owners or functions) but triggers and server scripts will insert
CREATE POLICY "Anyone can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

-- Admins can update status
CREATE POLICY "Admins can update notifications" ON public.notifications
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to enqueue notifications
CREATE OR REPLACE FUNCTION public.enqueue_notification(_type TEXT, _booking_id UUID DEFAULT NULL, _enquiry_id UUID DEFAULT NULL, _payload JSONB DEFAULT '{}'::jsonb, _channel TEXT DEFAULT 'all')
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.notifications(type, booking_id, enquiry_id, payload, channel) VALUES (_type, _booking_id, _enquiry_id, _payload, _channel);
END;
$$;

-- Trigger on bookings insert to notify admin of new booking
CREATE OR REPLACE FUNCTION public.handle_new_booking_notify()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  PERFORM public.enqueue_notification('new_booking', NEW.id, NULL, jsonb_build_object('user_name', NEW.user_name, 'mobile', NEW.user_mobile, 'event_date', NEW.event_date), 'all');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_booking_created_notify ON public.bookings;
CREATE TRIGGER on_booking_created_notify
  AFTER INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_booking_notify();

-- Trigger on bookings update: when invoice_status changes to 'finalized' enqueue invoice notification
CREATE OR REPLACE FUNCTION public.handle_booking_invoice_notify()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NEW.invoice_status = 'finalized' AND (OLD.invoice_status IS DISTINCT FROM NEW.invoice_status) THEN
    PERFORM public.enqueue_notification('invoice_generated', NEW.id, NULL, jsonb_build_object('invoice_url', NEW.invoice_url), 'all');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_booking_invoice_update_notify ON public.bookings;
CREATE TRIGGER on_booking_invoice_update_notify
  AFTER UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_booking_invoice_notify();

-- Trigger on enquiries insert to notify admin
CREATE OR REPLACE FUNCTION public.handle_new_enquiry_notify()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  PERFORM public.enqueue_notification('new_enquiry', NULL, NEW.id, jsonb_build_object('name', NEW.name, 'mobile', NEW.mobile), 'all');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_enquiry_created_notify ON public.enquiries;
CREATE TRIGGER on_enquiry_created_notify
  AFTER INSERT ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_enquiry_notify();