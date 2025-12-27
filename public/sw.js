self.addEventListener('push', function (event) {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: 'Notification', body: event.data?.text() || '' };
  }

  const title = data.title || 'The Red Garden';
  const options = {
    body: data.body || '',
    icon: data.icon || '/logo.png',
    data: data.url || '/',
    badge: data.badge || '/logo.png',
    actions: data.actions || []
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data || '/admin';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then( windowClients => {
      for (let client of windowClients) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});