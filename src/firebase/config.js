import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA4ECXP8Fx1OYdEqV_Xip6D75c5jdlHv0g',
  authDomain: 'real-time-covid-monitoring.firebaseapp.com',
  databaseURL: 'https://real-time-covid-monitoring.us-central.firebasedatabase.app',
  projectId: 'real-time-covid-monitoring',
  storageBucket: 'real-time-covid-monitoring.appspot.com',
  messagingSenderId: '525472070731',
  appId: '1:492386887520:android:f1650b3b77a475e98da005',
};

app = firebase.initializeApp(firebaseConfig)


export { firebase };
