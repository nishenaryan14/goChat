importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD-S6mXSGSJT8BSqfsXYfPBHiuu8ZuN6ik",
  authDomain: "chatapp-6b154.firebaseapp.com",
  projectId: "chatapp-6b154",
  storageBucket: "chatapp-6b154.appspot.com",
  messagingSenderId: "224838760293",
  appId: "1:224838760293:web:762427ed2541fbb8cd138c",
  measurementId: "G-9MYKC2MRR0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
