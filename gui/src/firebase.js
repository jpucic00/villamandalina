import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { getDatabase, ref, onValue } from "firebase/database";

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

const getDates = async () => {
  console.log(db);
  try {
    const refrence = ref(db, "/bookedDates/");
    onValue(refrence, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

export { auth, db, logInWithEmailAndPassword, logout, getDates };
