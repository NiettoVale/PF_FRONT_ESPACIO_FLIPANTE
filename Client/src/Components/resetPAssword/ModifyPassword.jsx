import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ModifyPassword.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import NavBar from "../NavBar/navBar";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";

const back = process.env.REACT_APP_BACK;
const MySwal = withReactContent(Swal);

function ModifyPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const correoElectronico = localStorage.getItem("correoElectronico");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // Contraseñas no coinciden, muestra una alerta
      MySwal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    try {
      // Realiza la solicitud GET con fetch
      const response = await fetch(`${back}user/${correoElectronico}`);

      if (!response.ok) {
        // Correo no registrado, muestra una alerta
        MySwal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "El correo electrónico no está registrado.",
        });
        return;
      }

      // Parsea la respuesta como JSON
      const data = await response.json();

      // Realiza la solicitud PUT para cambiar la contraseña
      const putResponse = await fetch(`${back}modify-password/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: password, // Usamos la nueva contraseña del estado
        }),
      });

      if (!putResponse.ok) {
        throw new Error(`Error en la solicitud PUT: ${putResponse.status}`);
      }

      // Limpia los campos del formulario
      setPassword("");
      setConfirmPassword("");
      setMessage("Contraseña cambiada con éxito.");
      MySwal.fire({
        icon: "success",
        title: "Exito!",
        text: "Contraseña cambiada exitosamente.",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      // Maneja otros errores si es necesario
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <SearchBar />
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Cambiar Contraseña</h2>
        <h3>{correoElectronico}</h3>
        <label htmlFor="password">Nueva Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          className={styles.inputForm}
        />
        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
          className={styles.inputForm}
        />

        <button type="submit" className={styles.buttonForm}>
          Cambiar Contraseña
        </button>
        <p>{message}</p>
      </form>
      <Footer className={styles.footer} />
    </div>
  );
}

export default ModifyPassword;
