import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjZEr85ha51yAgv7wIFY6o9s1YtgKrqCc",
  authDomain: "new-week7.firebaseapp.com",
  projectId: "new-week7",
  storageBucket: "new-week7.appspot.com",
  messagingSenderId: "512699226462",
  appId: "1:512699226462:web:e7d64810904fb3109c17cf",
  measurementId: "G-LVMH1Q8BLN"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db;