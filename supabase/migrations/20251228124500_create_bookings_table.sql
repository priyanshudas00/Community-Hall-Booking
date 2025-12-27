-- Create bookings table
-- Stores booking requests and status for admin management

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  facility_id UUID REFERENCES public.facilities(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_email TEXT,
  user_mobile TEXT NOT NULL,
  event_date DATE,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  guest_count INT,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enforce allowed status values
ALTER TABLE public.bookings ADD CONSTRAINT bookings_status_check CHECK (status IN ('pending','confirmed','cancelled'));

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policies
-- Anyone (unauthenticated or authenticated) can create a booking
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Owners (created_by) can view their own bookings
CREATE POLICY "Owners can view their bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (created_by = auth.uid());

-- Admins can view all bookings
CREATE POLICY "Admins can view all bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Owners can update their bookings
CREATE POLICY "Owners can update their bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Admins can update any booking
CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete bookings
CREATE POLICY "Admins can delete bookings" ON public.bookings
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to change booking status (admin or owner)
CREATE OR REPLACE FUNCTION public.update_booking_status(_booking_id UUID, _new_status TEXT)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.bookings WHERE id = _booking_id) THEN
    RAISE EXCEPTION 'Booking not found';
  END IF;

  -- Only admin or owner may change status
  IF public.has_role(auth.uid(), 'admin') OR
     (SELECT created_by FROM public.bookings WHERE id = _booking_id) = auth.uid()
  THEN
    UPDATE public.bookings SET status = _new_status, updated_at = NOW() WHERE id = _booking_id;
  ELSE
    RAISE EXCEPTION 'Permission denied';
  END IF;
END;
$$;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.update_bookings_updated_at();
