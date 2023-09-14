import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavBar from "../NavBar/navBar";
import SearchBar from "../SearchBar/SearchBar";

import FacebookLogin from "../firebase/LoginFacebook";
import GoogleLogin from "../firebase/LoginGoogle";
import styles from "./LoginForm.module.css";
import {
  signInWithEmailAndPassword,
  getAuth,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import enviarMail from "./funcionEnviar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const back = process.env.REACT_APP_BACK;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();

  useEffect(() => {
    // Almacena una bandera para verificar si el correo de bienvenida se ha enviado
    if (!localStorage.getItem("welcomeEmailSent")) {
      localStorage.setItem("welcomeEmailSent", "false");
    }

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setFormData({ ...formData, name: storedUsername });
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(regex.test(formData.name));
      if (regex.test(formData.name)) {
        console.log("Soy el email de usuario");

        const auth = getAuth();
        const email = formData.name;
        console.log(formData.name);
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods && methods.length > 0) {
          const userCredentials = await signInWithEmailAndPassword(
            auth,
            email,
            formData.password
          );
          if (userCredentials.user.emailVerified) {
            localStorage.setItem("username", formData.name);

            // Comprueba si el correo de bienvenida ya se ha enviado
            const welcomeEmailSent = localStorage.getItem("welcomeEmailSent");

            if (welcomeEmailSent === "false") {
              // Almacena el nombre de usuario
              localStorage.setItem("username", formData.name);

              // Cambia formData.name a la dirección de correo electrónico
              const email = formData.name;

              // Envía el correo electrónico cuando se inicia sesión con éxito
              enviarMail(email, "BIENVENIDO", "Hola bienvenido");

              // Establece la bandera en "true" para que no se envíe nuevamente
              localStorage.setItem("welcomeEmailSent", "true");
            }

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
      } else {
        console.log("Soy el nombre de usuario");
        const response = await fetch(`${back}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          localStorage.setItem("username", formData.name);

          const name = localStorage.getItem("username");
          const response = await fetch(`${back}profile/${name}`);

          const data = await response.json();
          const email = data.email;

          // Comprueba si el correo de bienvenida ya se ha enviado
          const welcomeEmailSent = localStorage.getItem("welcomeEmailSent");

          if (welcomeEmailSent === "false") {
            // Envía el correo electrónico cuando se inicia sesión con éxito
            enviarMail(email, "BIENVENIDO", "Hola bienvenido");

            // Establece la bandera en "true" para que no se envíe nuevamente
            localStorage.setItem("welcomeEmailSent", "true");
          }

          navigate("/");
          MySwal.fire({
            icon: "success",
            title: "Éxito",
            text: "Inicio de sesión exitoso.",
          });
        } else if (response.status === 404) {
          MySwal.fire({
            icon: "error",
            title: "Error:",
            text: "Usuario no encontrado.",
          });
        } else if (response.status === 403) {
          MySwal.fire({
            icon: "error",
            title: "Error:",
            text: "Acceso prohibido: Este usuario ha sido baneado.",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Algo salió mal.",
      });
    }
  };

  return (
    <div className={styles.loginView}>
      <div className={styles.navLog}>
        <NavBar />
        <SearchBar />
      </div>
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
          <Link to="/register">¡Regístrate!</Link>
        </p>
      </div>
      <Link to={"/"}>
        <button className={styles.backButton}>⬅</button>
      </Link>
    </div>
  );
};

export default LoginForm;
