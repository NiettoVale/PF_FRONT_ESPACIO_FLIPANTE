import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';
// import { getStorage} from 'firebase/storage';
import { getStorage, ref } from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmAC_gPVXLt7tWZJrd8Iy1T2PfKx67gdQ",
    authDomain: "fir-autenticacion-95e3f.firebaseapp.com",
    projectId: "fir-autenticacion-95e3f",
    storageBucket: "fir-autenticacion-95e3f.appspot.com",
    messagingSenderId: "96827828019",
    appId: "1:96827828019:web:300867b0c2451508c58046",
    measurementId: "G-KVR657L6FT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, GoogleAuthProvider,FacebookAuthProvider,storage,ref,db};