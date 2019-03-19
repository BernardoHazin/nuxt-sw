const applicationServerPublicKey = 'BH6Eaa4Ri16O-zHo734aZ6xTiMIQvaItBNnuteOVl0cykjGfmbW1z0gnU8-ElCQx_RBxqLVuYK1aRDF5kKDg8MQ'

if (Notification.permission !== 'granted') {
  Notification.requestPermission()
}

function urlB64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
async function subscribe () {
  if ('serviceWorker' in navigator) {
    let sw
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      sw = registrations[0]
    })
    if (sw) {
      const sub = await sw.pushManager.getSubscription()
      if (sub) {
        swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
        })
        .then(subscription => {
          console.log('User is subscribed:', subscription)
        })
        .catch(err => {
          console.log('Failed to subscribe the user: ', err.message)
        })
      }
    }
  }
}

subscribe()
