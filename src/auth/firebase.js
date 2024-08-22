// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
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
  databaseURL: "https://recivecitasks-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});



// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { auth, database };
