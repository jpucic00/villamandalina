import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBPOBXysy30xyIt4k3m7PwqF0IRLy3dWOY",
  authDomain: "villamandalina.firebaseapp.com",
  projectId: "villamandalina",
  storageBucket: "villamandalina.appspot.com",
  messagingSenderId: "973641692268",
  appId: "1:973641692268:web:e7672c2c2fdf7d96765449",
  databaseURL:
    "https://villamandalina-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const logout = () => {
  signOut(auth);
};

const logInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { auth, db, logInWithEmailAndPassword, logout };
