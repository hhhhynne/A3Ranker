import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAO9cDxKLefOq-8M-WTpH3Tlh9cbu-jyPk",
    authDomain: "a3ranker-59a7c.firebaseapp.com",
    projectId: "a3ranker-59a7c",
    storageBucket: "a3ranker-59a7c.firebasestorage.app",
    messagingSenderId: "143013007813",
    appId: "1:143013007813:web:b8bacde7b3bfd9333e7bac"
  };
  

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);