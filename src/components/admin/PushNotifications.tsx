import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export function PushNotifications() {
  const [subscribed, setSubscribed] = useState(false);

  const registerServiceWorkerAndSubscribe = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('Push not supported in this browser');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration);

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Permission denied');
        return;
      }

      // Fetch VAPID public key from server or env via runtime endpoint if needed
      const res = await fetch('/api/vapid');
      const { publicKey } = await res.json();

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      // Save subscription to supabase
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) { alert('Please sign in as admin to register'); return; }

      const { error } = await supabase.from('push_subscriptions').insert([{ user_id: user.id, subscription: subscription.toJSON(), label: 'Admin Browser' }]);
      if (error) throw error;
      setSubscribed(true);
      alert('Subscribed to push notifications');
    } catch (e: any) {
      console.error(e);
      alert('Subscription failed: ' + e.message);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  };

  return (
    <div className="mt-6">
      <Button onClick={registerServiceWorkerAndSubscribe}>{subscribed ? 'Subscribed' : 'Enable Browser Notifications'}</Button>
    </div>
  );
}
