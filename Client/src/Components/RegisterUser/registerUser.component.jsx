import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import validationRegister from "./validationRegister";
const back = process.env.REACT_APP_BACK;

const Registro = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registerErrors, setRegisterErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    // Destructuramos dos valores de target -> (name, value)
    const { name, value } = event.target;

    // Seteamos la información del nuevo usuario
    setNewUser((prevData) => ({
      // Tomamos la información anterior del usuario y la guardamos junto con el cambio realizado
      ...prevData,
      [name]: value,
    }));

    // Seteamos errores que puedan surgir al registrar al usuario.
    setRegisterErrors(
      // Llamamos a la función validar y le pasamos el nuevo usuario y los cambios que se registraron.
      validationRegister({
        ...newUser,
        [name]: value,
      })
    );
  };

  const handleSubmit = async () => {
    try {
      console.log(JSON.stringify(newUser));
      const response = await fetch(`${back}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        alert(responseData.message);
        navigate("/login");
      } else if (response.status === 400) {
        alert(responseData.message);
      } else if (response.status === 500) {
        setRegisterErrors({ serverError: responseData.message });
      }
    } catch (error) {
      alert("Algo salió mal.");
      console.log(error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerImage}></div>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h2 className={styles.title}>Registro</h2>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            />
            {registerErrors.invalidName && (
              <p className={styles.error}>{registerErrors.invalidName}</p>
            )}
            <input
              className={styles.input}
              type="text"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
            />
            {registerErrors.invalidEmail && (
              <p className={styles.error}>{registerErrors.invalidEmail}</p>
            )}
            <input
              className={styles.input}
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
            {registerErrors.invalidPassword && (
              <p className={styles.error}>{registerErrors.invalidPassword}</p>
            )}
          </div>

          <button className={styles.button} onClick={handleSubmit}>
            Registrar
          </button>

          <Link to={"/login"}>
            ¿Ya tienes una cuenta? <span>Inicia sesión</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
