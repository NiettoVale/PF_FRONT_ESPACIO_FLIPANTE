import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import { useSelector } from "react-redux";

import styles from "./ChangePassword.module.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const back = process.env.REACT_APP_BACK;

const ChangePassword = () => {
  const user = useSelector((state) => state.infoUser);
  const userInfo = user.length > 0 ? user[0] : null; // Accede al primer elemento del array

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reiniciar los errores al enviar el formulario
    setErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    let hasErrors = false;

    // Validar la longitud y la igualdad de las contraseñas nuevas
    if (newPassword.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "La nueva contraseña debe tener al menos 6 caracteres",
      }));
      hasErrors = true;
    } else if (newPassword !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "Las contraseñas nuevas no coinciden",
        confirmPassword: "Las contraseñas nuevas no coinciden",
      }));
      hasErrors = true;
    }

    // Si hay errores, no se realiza el cambio de contraseña
    if (hasErrors) {
      return;
    }

    try {
      // Crear un objeto con los datos de la solicitud
      const requestData = {
        currentPassword,
        newPassword,
      };

      // Realizar la solicitud al servidor para cambiar la contraseña
      const response = await fetch(`${back}update-password/${userInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        // Cambio de contraseña exitoso
        console.log("Cambio de contraseña exitoso.");
        MySwal.fire({
          icon: "success",
          title: "Éxito",
          text: "Cambio de contraseña exitoso.",
        });
        // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
      } else {
        // Manejar errores en caso de una respuesta no exitosa
        const data = await response.json();
        if (data.error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            currentPassword: data.error,
          }));
        }
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error("Error al cambiar la contraseña: ", error);
      MySwal.fire({
        icon: "success",
        title: "Éxito",
        text: ("Error al cambiar la contraseña: ", error),
      });
    }
  };

  return (
    <div className={styles.passwordContainer}>
      <SideBar />
      <h2 className={styles.passwordTitle}>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.passwordInputs}>
          <label htmlFor="currentPassword">Contraseña Actual:</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
          />
          {errors.currentPassword && (
            <p className={styles.error}>{errors.currentPassword}</p>
          )}
        </div>
        <div className={styles.passwordInputs}>
          <label htmlFor="newPassword">Nueva Contraseña:</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
          />
          {errors.newPassword && (
            <p className={styles.error}>{errors.newPassword}</p>
          )}
        </div>
        <div className={styles.passwordInputs}>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className={styles.passwordButton}>
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
