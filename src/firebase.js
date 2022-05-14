import "firebase/auth";
import {initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB5LJyq-2714ZKQ_iQeSJYHapwdKbKPD7I",
    authDomain: "final-hackathon-b856e.firebaseapp.com",
    projectId: "final-hackathon-b856e",
    storageBucket: "final-hackathon-b856e.appspot.com",
    messagingSenderId: "29478131327",
    appId: "1:29478131327:web:406dd2a84fb7d5e25c114a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export default app;
export const auth = getAuth();