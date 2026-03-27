import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8l-lA59lYAdI6UTxvqbUNPxSkpdjVlWI",
  authDomain: "reto5-b35c1.firebaseapp.com",
  projectId: "reto5-b35c1",
  storageBucket: "reto5-b35c1.firebasestorage.app",
  messagingSenderId: "792063169848",
  appId: "1:792063169848:web:d8dcdb1f4f698796bd5dcd",
  measurementId: "G-W01SDYE922",
  databaseURL: "https://reto5-b35c1-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

export default app;