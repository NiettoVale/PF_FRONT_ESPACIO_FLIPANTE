// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth"; // Importa las funciones de Firebase Authentication

const firebaseConfig = {
  apiKey: "AIzaSyAmAC_gPVXLt7tWZJrd8Iy1T2PfKx67gdQ",
  authDomain: "fir-autenticacion-95e3f.firebaseapp.com",
  projectId: "fir-autenticacion-95e3f",
  storageBucket: "fir-autenticacion-95e3f.appspot.com",
  messagingSenderId: "96827828019",
  appId: "1:96827828019:web:300867b0c2451508c58046",
  measurementId: "G-KVR657L6FT",
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de autenticación de Firebase
const auth = getAuth();

export { auth };
