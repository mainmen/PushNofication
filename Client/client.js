const publicVapidKey = 'BMpKOcx38h4BlUyO76KT2FRcs050LcY5MOsC7WNYHskhGrK1ilM6a-3IHC9UTHa-Xnq9PV3seD3yb6C0cJhsEK8';
/*************check for service worker*************/
if ('serviceWorker' in navigator) {
    send().catch(err => console.log(err));
}

/*************Register service worker, Register push, and then send the push or notification*************/
async function send() {
    /***************Register service worker and make it live in the root of our app *************/
    console.log('Registering Service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: "/"
    });
    console.log('Hurray!!! service worker registered.');

    /************* Register Push*************/
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered...");

    /********** Send Push Notification**********/
    console.log("Sending Push...");
    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
    console.log("Push Sent...");
}
/***When using your VAPID key in your web app, you'll need to convert the URL safe base64 string to a 
    Uint8Array to pass into the subscribe call, which you can do like so:
   **/
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}