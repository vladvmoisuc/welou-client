import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDc31B3urAJuN2WTDnysXC8BMpQZ3hAubw',
  authDomain: 'chat-efca7.firebaseapp.com',
  databaseURL: 'https://chat-efca7.firebaseio.com',
  projectId: 'chat-efca7',
  storageBucket: 'chat-efca7.appspot.com',
  messagingSenderId: '59785229774',
  appId: '1:59785229774:web:914233c63dd52de4a8679f',
};

const googleFirebase = firebase.initializeApp(firebaseConfig);
export const database = googleFirebase.firestore();
const messaging = firebase.messaging();

export const getMessagingToken = async () => {
  try {
    const currentToken = await messaging.getToken(
      'BOqhmeDir82KlRdfWyAxwwvpMPaQr0Y2OxWP4XV57dEOnPW03ULaz9ozm_QwTtb5QzVYq5e_pUAdzPr9eD3s0xA'
    );
    console.log(currentToken);
    return currentToken;
  } catch (error) {
    return false;
  }
};

export const onMessageListener = (callback) => {
  messaging.onMessage((payload) => {
    callback(payload);
  });
};

export const loginWithFacebook = async () => {
  try {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'ro_RO';
    firebase.auth().signInWithRedirect(provider);
  } catch (error) {
    console.log(`Facebook login error.`);
  }
};

export const getFacebookLoginData = async (callback) => {
  try {
    const {
      credential: { accessToken },
      additionalUserInfo: {
        isNewUser,
        profile: {
          first_name,
          last_name,
          id,
          picture: {
            data: { url },
          },
        },
      },
    } = await firebase.auth().getRedirectResult();
    return {
      accessToken,
      isNewUser,
      first_name,
      last_name,
      id,
      url,
    };
  } catch ({ code, message, email }) {
    console.log(
      `Failure to log the user with email: ${email}. Code ${code} - ${message}`
    );
    callback();
  }
};
