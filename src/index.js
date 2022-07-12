// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAUAf_v7QxAR5h9wg8sInfi5vqRFiT_S4",
  authDomain: "calculus-baaa7.firebaseapp.com",
  projectId: "calculus-baaa7",
  storageBucket: "calculus-baaa7.appspot.com",
  messagingSenderId: "981685125601",
  appId: "1:981685125601:web:01600e331ac3ada7ca12a0",
  measurementId: "G-M2G4E5V73F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
}

btnLogin.addEventListener("click", loginEmailPassword);
// const analytics = getAnalytics(app);