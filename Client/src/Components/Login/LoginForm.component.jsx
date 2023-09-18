import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/navBar";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formData.name === "" || formData.password === "") {
        MySwal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "Por favor, complete correctamente la información del formulario.",
        });
      } else {
        // Verifica si formData.name es un correo electrónico
        const isEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(formData.name);

        // Construye la URL de la petición en función de si es un correo electrónico o no
        const apiUrl = isEmail
          ? `${back}user/${formData.name}`
          : `${back}profile/${formData.name}`;

        // Realiza la petición
        const responseUser = await fetch(apiUrl);

        const userData = await responseUser.json();
        const isGoogle = userData.isGoogle;

        if (isGoogle) {
          // Si isGoogle es true, muestra una alerta
          MySwal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Este usuario esta registrado con google, por favor inicia sesion con google.",
          });
          return; // No continúes con el inicio de sesión normal
        } else {
          const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Asegúrate de establecer el tipo de contenido adecuado
            },
            body: JSON.stringify(formData),
          });

          if (response.status === 200) {
            const data = await response.json();
            const superUser = data.isSuperuser;

            if (superUser) {
              localStorage.setItem("root", data.name);
              localStorage.setItem("AdminId", data.id);
              navigate("/admin");
            } else {
              localStorage.setItem("username", data.name);
              localStorage.setItem("userId", data.id);
              navigate("/");
            }

            const email = data.email; // Aquí se descomentó la línea que estaba comentada

            // Comprueba si el correo de bienvenida ya se ha enviado
            const welcomeEmailSent = localStorage.getItem("welcomeEmailSent");

            if (welcomeEmailSent === "false") {
              // Envía el correo electrónico cuando se inicia sesión con éxito
              enviarMail(email, "BIENVENIDO", "Hola bienvenido");

              // Establece la bandera en "true" para que no se envíe nuevamente
              localStorage.setItem("welcomeEmailSent", "true");
            }

            localStorage.setItem("username", formData.name);

            navigate("/");

            MySwal.fire({
              icon: "success",
              title: superUser ? "Éxito" : "Éxito",
              text: superUser
                ? "Bienvenido Administrador!."
                : "Inicio de sesión exitoso.",
            });
          } else if (response.status === 401) {
            MySwal.fire({
              icon: "error",
              title: "Error:",
              text: "Contraseña incorrecta.",
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
              text: "Acceso prohibido: Este usuario ha sido baneado. Comunicarse al siguiente email: flipante@admin.com",
            });
          }
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.loginView}>
      <div className={styles.navLog}>
        <NavBar />
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
        </div>

        <p className={styles.registrate}>
          ¿No tienes una cuenta?
          <Link to="/register">¡Regístrate!</Link>
        </p>

        <p>
          ¿Sos boludo y te olvidaste tu password?{" "}
          <Link to={"/reset-password"}>recuperala</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
