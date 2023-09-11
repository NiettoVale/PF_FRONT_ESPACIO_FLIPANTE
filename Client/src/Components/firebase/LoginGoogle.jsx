// GoogleLogin.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import styles from "./LoginButtons.module.css";
import enviar from "../Login/funcionEnviar";
const back = process.env.REACT_APP_BACK;

// Funcion para postear un usuario de firebase a la base de datos:
const postUser = async (name, email, imageProfile) => {
  try {
    const userData = {
      name: name,
      email: email,
      imageProfile: imageProfile,
    };

    // Realizar la solicitud POST al servidor
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
      submitHandler(email);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  function submitHandler(email) {
    let correo = email;
    let asunto = "BIENVENIDO";
    let texto = "Hola bienvenido";
    enviar(correo, asunto, texto);
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
