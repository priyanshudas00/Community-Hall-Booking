import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
    setNotifications(data || []);
    setLoading(false);
  }

  async function resend(id: string) {
    await supabase.from('notifications').update({ status: 'pending', attempts: 0, last_error: null }).eq('id', id);
    await fetchNotifications();
  }

  async function markSent(id: string) {
    await supabase.from('notifications').update({ status: 'sent', sent_at: new Date().toISOString() }).eq('id', id);
    await fetchNotifications();
  }

  async function remove(id: string) {
    await supabase.from('notifications').delete().eq('id', id);
    await fetchNotifications();
  }

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <h2 className="font-heading text-2xl font-bold mb-4">Notifications</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 bg-card rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{n.type} — {n.status}</div>
                    <div className="text-sm text-muted-foreground">{n.created_at} • {n.channel}</div>
                    <pre className="text-xs mt-2">{JSON.stringify(n.payload, null, 2)}</pre>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => resend(n.id)}>Resend</Button>
                    <Button variant="ghost" onClick={() => markSent(n.id)}>Mark Sent</Button>
                    <Button variant="destructive" onClick={() => remove(n.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
