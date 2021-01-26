importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDc31B3urAJuN2WTDnysXC8BMpQZ3hAubw',
  authDomain: 'chat-efca7.firebaseapp.com',
  databaseURL: 'https://chat-efca7.firebaseio.com',
  projectId: 'chat-efca7',
  storageBucket: 'chat-efca7.appspot.com',
  messagingSenderId: '59785229774',
  appId: '1:59785229774:web:914233c63dd52de4a8679f',
});

const messaging = firebase.messaging();
