console.log('Custom service worker!')
console.log('Permission', Notification.permission)

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)
  const title = 'Push Codelab'
  const options = {
    body: 'Yay it works!!!!'
  }
  event.waitUntil(self.registration.showNotification(title, options))
})