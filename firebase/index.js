// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzYU0AfsGenlsE5GhtTdAmihs-yqTRGKQ",
  authDomain: "week07-hackernoon-tutorial.firebaseapp.com",
  projectId: "week07-hackernoon-tutorial",
  storageBucket: "week07-hackernoon-tutorial.appspot.com",
  messagingSenderId: "128477068556",
  appId: "1:128477068556:web:8e7b85a8334478916f5d29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// connect for authentication
const auth = getAuth(app);

// connect to firestore DB
const db =  getFirestore(app);

export { auth, db }; 