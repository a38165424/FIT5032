// import './assets/main.css'
// import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    theme:{
        preset: Aura
    }
})
app.use(router)
app.mount('#app');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAVJ7aaz0bpKKiOma1Mz49hCsO4cQX03Q",
  authDomain: "ass3-e84a3.firebaseapp.com",
  projectId: "ass3-e84a3",
  storageBucket: "ass3-e84a3.appspot.com",
  messagingSenderId: "261369867224",
  appId: "1:261369867224:web:a2d1819e4e713dfc0860ad",
  measurementId: "G-QJ5CHML9YJ"
};

// Initialize Firebase
initializeApp(firebaseConfig);



