import React, { useState } from "react";
import enviarMail from "./funcionEnviarPassword";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import NavBar from "../NavBar/navBar";

import SearchBar from "../SearchBar/SearchBar";

import Footer from "../Footer/Footer";

import styles from "./ResetPassword.module.css"; // Importa los estilos CSS
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const back = process.env.REACT_APP_BACK;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Validar el correo electrónico en tiempo real
    if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
      setEmailError("El correo electrónico no es válido");
    } else {
      setEmailError(null); // Borrar el mensaje de error si el correo es válido
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validar el correo electrónico antes de enviar
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("El correo electrónico no es válido");
      return;
    }

    try {
      // Realizar una solicitud GET para verificar si el correo está registrado
      const response = await fetch(`${back}user/${email}`);
      if (!response.ok) {
        MySwal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "El correo electrónico no está registrado.",
        });
        return;
      }

      // Si llegamos aquí, el correo está registrado, por lo que podemos enviar el correo de recuperación
      enviarMail(
        email,
        "Modificar contraseña",
        "Hola , recupera tu contraseña"
      );
      setError(null);
      localStorage.setItem("correoElectronico", email);
      // Mostrar una alerta cuando se envía con éxito
      MySwal.fire({
        icon: "success",
        title: "Perfecto!",
        text: "Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña.",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <NavBar />
      </div>
      <SearchBar />
      {/* Aplica el estilo container */}
      <form onSubmit={handleResetPassword} className={styles.formContainer}>
        <h2>Recuperación de Contraseña</h2>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={handleEmailChange}
          required
          className={styles.inputForm}
        />
        {emailError && <p className={styles.error}>{emailError}</p>}{" "}
        {/* Aplica el estilo error */}
        <button type="submit" className={styles.buttonForm}>
          Recuperar Contraseña
        </button>
        <Link to={"/"}>
          <button className={styles.buttonForm}>Volver</button>
        </Link>
        {error && <p className={styles.error}>{error}</p>}{" "}
        {/* Aplica el estilo error */}
      </form>

      <Footer />
    </div>
  );
};

export default PasswordReset;
