import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      setBookings(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const generateInvoice = async (id: string) => {
    // Mark booking as pending for worker
    await supabase.from('bookings').update({ invoice_status: 'pending' }).eq('id', id);
    // Optionally trigger a function or notify worker (worker polls)
    alert('Invoice generation requested. Worker will process shortly.');
  };

  const markPaid = async (id: string) => {
    await supabase.from('bookings').update({ payment_status: 'paid', amount_paid:  (bookings.find(b=>b.id===id)?.total_amount || 0) }).eq('id', id);
    alert('Marked as paid');
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <h2 className="font-heading text-2xl font-bold mb-4">Bookings</h2>
        {loading ? <div>Loading...</div> : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 bg-card rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium">{b.user_name} — {b.user_mobile}</div>
                  <div className="text-sm text-muted-foreground">{b.event_type} on {b.event_date}</div>
                  {b.invoice_url && <a href={b.invoice_url} target="_blank" rel="noreferrer" className="text-primary underline">Download Invoice</a>}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => generateInvoice(b.id)}>Generate Invoice</Button>
                  <Button onClick={() => markPaid(b.id)} variant="ghost">Mark Paid</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
