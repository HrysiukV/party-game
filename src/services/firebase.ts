import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIi4LVGizk1a7LxcetDYFj7B0zx13UVbo",
  authDomain: "after-d0763.firebaseapp.com",
  projectId: "after-d0763",
  storageBucket: "after-d0763.firebasestorage.app",
  messagingSenderId: "176908700648",
  appId: "1:176908700648:web:931f163426f4fd6772725d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);