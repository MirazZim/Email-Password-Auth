import { initializeApp } from 'firebase/app';

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBgivkdnXUzCfo3Nww4EjTT-Qx1-zPXXZw",
    authDomain: "email-password-auth-fa89f.firebaseapp.com",
    projectId: "email-password-auth-fa89f",
    storageBucket: "email-password-auth-fa89f.firebasestorage.app",
    messagingSenderId: "860599942590",
    appId: "1:860599942590:web:943dfd3fe792635c4d0def"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;