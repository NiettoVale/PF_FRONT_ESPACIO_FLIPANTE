import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import enviarMail from "../Login/funcionEnviar";

import styles from "./LoginButtons.module.css";
import Swal from "sweetalert2";

const back = process.env.REACT_APP_BACK;

const postUser = async (name, email, imageProfile) => {
  try {
    const userData = {
      name: name,
      email: email,
      imageProfile: imageProfile,
    };

    await fetch(`${back}register-google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

function GoogleLogin() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const name = result.user.displayName;
      const image = result.user.photoURL;
      const email = result.user.email;

      localStorage.setItem("googleName", name);
      localStorage.setItem("googleImage", image);
      localStorage.setItem("googleEmail", email);

      postUser(name, email, image);

      // Aumenta el contador de sesiones de Google en 1
      const googleSessionCount =
        parseInt(localStorage.getItem("googleSessionCount") || "0", 10) + 1;
      localStorage.setItem("googleSessionCount", googleSessionCount.toString());

      // Comprueba si el contador de sesiones de Google es 1 o un múltiplo de 10 para enviar el correo de bienvenida
      if (googleSessionCount === 1 || googleSessionCount % 10 === 0) {
        // Almacena la dirección de correo electrónico de Google
        const googleEmail = localStorage.getItem("googleEmail");

        // Envía el correo electrónico cuando se inicia sesión con éxito
        enviarMail(googleEmail, "BIENVENIDO", "Hola bienvenido");
      }

      navigate("/");
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
