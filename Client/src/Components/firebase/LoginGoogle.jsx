import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import enviar from "../Login/funcionEnviar";
import styles from "./LoginButtons.module.css";
import Swal from "sweetalert2";

const back = process.env.REACT_APP_BACK;

const GoogleLogin = () => {
  const navigate = useNavigate();
  const [isBanned, setIsBanned] = useState(true);
  const [googleEmail, setGoogleEmail] = useState("");

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const name = result.user.displayName;
      const image = result.user.photoURL;
      const email = result.user.email;

      setGoogleEmail(email);

      const response = await fetch(`${back}check-banned-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (
        response.status === 200 ||
        response.status === 202 ||
        response.status === 404
      ) {
        setIsBanned(data.banned);

        if (!data.banned) {
          postUser(name, email, image);
          submitHandler(email);
          localStorage.setItem("googleName", name);
          localStorage.setItem("googleImage", image);
          localStorage.setItem("googleEmail", email);
          navigate("/");
        } else {
          // Si el usuario está baneado, muestra una alerta
          Swal.fire({
            icon: "error",
            title: "Usuario Baneado",
            text: "Acceso prohibido: Este usuario ha sido baneado. Comunicarse al siguiente email: flipante@admin.com",
          });
        }
      }
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

  return (
    <button onClick={handleGoogleLogin} className={styles.loginButtons}>
      <AiFillGoogleCircle className={styles.googleIcon} />
      Accede con Google
    </button>
  );
};

export default GoogleLogin;
