// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK_7ZF8OHO7JszSDlYkNFhUKO_ghACpPI",
  authDomain: "ntut-web-by-kyynk-001.firebaseapp.com",
  databaseURL: "https://ntut-web-by-kyynk-001-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ntut-web-by-kyynk-001",
  storageBucket: "ntut-web-by-kyynk-001.appspot.com",
  messagingSenderId: "387020470735",
  appId: "1:387020470735:web:58aa572e8e8cfc671dfaba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
