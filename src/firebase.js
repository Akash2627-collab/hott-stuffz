import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCwPR7_oRPVze0Q5oFoXpP28SQU31gwhsY",
  authDomain: "hott-stffz.firebaseapp.com",
  projectId: "hott-stffz",
  storageBucket: "hott-stffz.firebasestorage.app",
  messagingSenderId: "872341388970",
  appId: "1:872341388970:web:4f2c04a5c41f22b545dad3"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)