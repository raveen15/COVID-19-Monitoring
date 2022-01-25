import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4ECXP8Fx1OYdEqV_Xip6D75c5jdlHv0g",
  authDomain: "real-time-covid-monitoring.firebaseapp.com",
  databaseURL: "https://real-time-covid-monitoring-default-rtdb.firebaseio.com",
  projectId: "real-time-covid-monitoring",
  storageBucket: "real-time-covid-monitoring.appspot.com",
  messagingSenderId: "492386887520",
  appId: "1:492386887520:web:db83a1ea979b5f868da005",
  measurementId: "G-FV25RHFLDS"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export { firebase as firebaseRealtime};
