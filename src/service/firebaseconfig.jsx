// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB76VENtZfwiRybXH7q6do7G7bX2Q3503c",
  authDomain: "time-t-dbc44.firebaseapp.com",
  projectId: "time-t-dbc44",
  storageBucket: "time-t-dbc44.firebasestorage.app",
  messagingSenderId: "311057015858",
  appId: "1:311057015858:web:0fa6032b8ad555a2ed882b",
  measurementId: "G-DL5E1ZK12D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);