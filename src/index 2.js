import { initializeApp } from 'firease/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBlZW0z6jJF5ZuY9hjl4ybpt13_R5qn9Go",
    authDomain: "calculus-website-29c1d.firebaseapp.com",
    projectId: "calculus-website-29c1d",
    storageBucket: "calculus-website-29c1d.appspot.com",
    messagingSenderId: "481426982593",
    appId: "1:481426982593:web:1385c8cd99bb1826543640",
    measurementId: "G-1XPJJG0DSZ"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
