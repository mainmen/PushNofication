console.log('service worker loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push received...');
    self.registration.showNotification(data.title, {
        body: 'Notified by Teksavvy Solutions Inc',
        icon: 'img1.jpg'
    });
});