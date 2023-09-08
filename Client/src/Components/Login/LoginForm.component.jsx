import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "../firebase/LoginFacebook";
import GoogleLogin from "../firebase/LoginGoogle";
import styles from "./LoginForm.module.css";
import {
  signInWithEmailAndPassword,
  getAuth,
  fetchSignInMethodsForEmail, // Importa esta función
} from "firebase/auth";
import enviar from "./funcionEnviar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const back = process.env.REACT_APP_BACK;

const MySwal = withReactContent(Swal);

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Verifica si el usuario existe en Firebase antes de hacer la solicitud POST al servidor
      const auth = getAuth();
      const email = formData.name;
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods && methods.length > 0) {
        // El usuario existe en Firebase, ahora intenta iniciar sesión
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          formData.password
        );
        if (userCredentials.user.emailVerified) {
          // Al inicio de sesión exitoso, guarda la información en localStorage
          localStorage.setItem("username", formData.name);
          submitHandler(event);
          navigate("/");
          MySwal.fire({
            icon: "success",
            title: "Éxito",
            text: "Inicio de sesión exitoso.",
          });
        } else {
          MySwal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Debe verificar el correo.",
          });
        }
      } else {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "El usuario no existe.",
        });
      }
    } catch (error) {
      console.error("Ups!:", error.message);
      MySwal.fire({
        icon: "error",
        title: "Ups!",
        text: "Algo salió mal.",
      });
    }
  };

  useEffect(() => {
    // Verificar si hay información de usuario almacenada en localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      // Si hay información, puedes usarla como necesites, por ejemplo, para llenar un campo de formulario
      setFormData({ ...formData, name: storedUsername });
    }
  }, [formData]);

  function submitHandler(event) {
    event.preventDefault();
    let correo = formData.name;
    let asunto = "BIENVENIDO";
    let texto = "Hola bienvenido";
    enviar(correo, asunto, texto);
    correo = asunto = texto = "";
  }

  return (
    <div className={styles.loginView}>
      <div className={styles.imageContainer}></div>

      <div className={styles.loginContainer}>
        <h2>¡Bienvenido de vuelta!</h2>
        <h4>Ingresa tus datos</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre de Usuario</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="nombre de usuario o email"
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
            />
          </div>

          <div className={styles.internalLogin}>
            <button type="submit">Iniciar Sesión</button>
          </div>
        </form>
        <div className={styles.externalLogin}>
          <p>También puedes:</p>
          <GoogleLogin />
          <FacebookLogin />
        </div>

        <p className={styles.registrate}>
          ¿No tienes una cuenta?
          <Link to="/register">
            <a>¡Regístrate!</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
