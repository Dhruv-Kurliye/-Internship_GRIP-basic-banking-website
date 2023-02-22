import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBzvpmt21EiN4OAyYN7asJYOyyAqgSWTQk",
  authDomain: "banking-system-4c660.firebaseapp.com",
  projectId: "banking-system-4c660",
  storageBucket: "banking-system-4c660.appspot.com",
  messagingSenderId: "520511246590",
  appId: "1:520511246590:web:cb4dcf3efb1baf3e3a95af"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };