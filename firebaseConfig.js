// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFV9MqJAnxwe-po0E1Enjk5r4BXsfbf0E",
  authDomain: "react-native-chat-94449.firebaseapp.com",
  projectId: "react-native-chat-94449",
  storageBucket: "react-native-chat-94449.appspot.com",
  messagingSenderId: "545117708379",
  appId: "1:545117708379:web:7d72ff001058063cba1f7e",
  databaseURL: "https://react-native-chat-94449-default-rtdb.firebaseio.com/", 
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// setPersistence(getAuth(FirebaseApp), ReactNativeAsyncStorage)