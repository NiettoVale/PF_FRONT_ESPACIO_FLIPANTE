// GoogleLogin.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

import styles from "./LoginButtons.module.css";
import { AiFillGoogleCircle } from "react-icons/ai";
import enviar from "../Login/funcionEnviar";

function GoogleLogin() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth,provider);
      const name = result.user.displayName;
      const image = result.user.photoURL;
      const email = result.user.email;

      console.log(result.user);
      localStorage.setItem("googleName",name);
      localStorage.setItem("googleImage",image);
      localStorage.setItem("googleEmail",email);
      
      submitHandler(email);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
   


  };

  function submitHandler(email){
    
    let correo = email;
    let asunto = "BIENVENIDO";
    let texto = "Hola bienvenido";
    enviar(correo,asunto,texto);
    correo = asunto = texto = "";
}


  return (
    <button onClick={handleGoogleLogin} className={styles.loginButtons}>
      <AiFillGoogleCircle className={styles.googleIcon} />
      Accede con Google
    </button>
  );
}

export default GoogleLogin;
