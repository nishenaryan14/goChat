const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotification = functions.https.onCall((data) => {
  const { token, message } = data;

  const payload = {
    notification: {
      title: 'New Message',
      body: message,
    },
  };

  return admin
    .messaging()
    .sendToDevice(token, payload)
    .then((response) => {
      console.log('Notification sent successfully:', response);
      return { success: true };
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
      return { success: false, error: error.message };
    });
});
