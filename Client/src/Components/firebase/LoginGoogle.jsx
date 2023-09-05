// GoogleLogin.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

import styles from "./LoginButtons.module.css";
import { AiFillGoogleCircle } from "react-icons/ai";

function GoogleLogin() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className={styles.loginButtons}>
      <AiFillGoogleCircle className={styles.googleIcon} />
      Accede con Google
    </button>
  );
}

export default GoogleLogin;
