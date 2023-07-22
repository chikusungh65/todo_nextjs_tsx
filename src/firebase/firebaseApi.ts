import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session successfully set");
  })
  .catch((error) => {
    console.error("Error setting session persistence:", error);
  });

  const firestore = getFirestore(); 

export { auth, firestore };
