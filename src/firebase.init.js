// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8XeG03T-ISfB8nZPYSTB6qFjtDcmGbAs",
  authDomain: "email-password-89666.firebaseapp.com",
  projectId: "email-password-89666",
  storageBucket: "email-password-89666.firebasestorage.app",
  messagingSenderId: "659281085680",
  appId: "1:659281085680:web:4c7a747567897915e96e35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);