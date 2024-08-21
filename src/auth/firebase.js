// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBccoFetujZu0iAPL8XjabMi0u8t12IPLg",
  authDomain: "recivecitasks.firebaseapp.com",
  projectId: "recivecitasks",
  storageBucket: "recivecitasks.appspot.com",
  messagingSenderId: "674355794302",
  appId: "1:674355794302:web:b9631922a2008615fea32f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
