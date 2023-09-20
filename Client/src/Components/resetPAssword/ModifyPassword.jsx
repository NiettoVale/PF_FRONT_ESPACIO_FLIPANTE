import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ModifyPassword.module.css";
const back = process.env.REACT_APP_BACK;

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
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Realiza la solicitud GET con fetch
      const response = await fetch(`${back}user/${correoElectronico}`);

      if (!response.ok) {
        // Correo no registrado, muestra una alerta
        alert("El correo electrónico no está registrado.");
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
      alert("Contraseña cambiada exitosamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      // Maneja otros errores si es necesario
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Cambiar Contraseña</h2>
        <p>Correo Electrónico: {correoElectronico}</p>
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
    </div>
  );
}

export default ModifyPassword;
