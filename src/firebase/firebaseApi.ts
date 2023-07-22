import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig"; // Import the firebaseConfig from the file we created

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
