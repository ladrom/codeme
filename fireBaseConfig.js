import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAb5Mzg5_oFLypBvePtjUFxEiWKZIDHh6Y",
  authDomain: "mon-projet-8d1a5.firebaseapp.com",
  databaseURL: "https://mon-projet-8d1a5-default-rtdb.firebaseio.com",
  projectId: "mon-projet-8d1a5",
  storageBucket: "mon-projet-8d1a5.appspot.com",
  messagingSenderId: "137389578087",
  appId: "1:137389578087:web:cbfba49320b348a6f581c2",
  measurementId: "G-8GPQJ6J55L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
export const database = getDatabase(app);
