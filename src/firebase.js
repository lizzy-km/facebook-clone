import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  { getFirestore } from "@firebase/firestore"
import { getPerformance } from "firebase/performance";


const firebaseConfig = {
  apiKey: "AIzaSyDh2Jc4fV4vyRj7F2KEJS_6ekJcdEpqL-g",
  authDomain: "anynote-m.firebaseapp.com",
  projectId: "anynote-m",
  storageBucket: "anynote-m.appspot.com",
  messagingSenderId: "225963404826",
  appId: "1:225963404826:web:4db79e87629c7046f46ba3",
  measurementId: "G-TZYQ9CGK2R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firebase = getFirestore(app)
export const perf = getPerformance(app);
