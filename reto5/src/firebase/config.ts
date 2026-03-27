import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8l-lA59lYAdI6UTxvqbUNPxSkpdjVlWI",
  authDomain: "reto5-b35c1.firebaseapp.com",
  projectId: "reto5-b35c1",
  storageBucket: "reto5-b35c1.firebasestorage.app",
  messagingSenderId: "792063169848",
  appId: "1:792063169848:web:d8dcdb1f4f698796bd5dcd",
  measurementId: "G-W01SDYE922"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };