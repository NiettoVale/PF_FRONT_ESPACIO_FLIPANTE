import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import validationRegister from "./validationRegister";
import NavBar from "../NavBar/navBar";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
    const { name, value } = event.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validar los campos en tiempo real al cambiar
    setRegisterErrors(validationRegister({ ...newUser, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validar los campos antes de enviar la solicitud
    const validationErrors = validationRegister(newUser);

    if (Object.keys(validationErrors).length > 0) {
      // Mostrar una alerta al usuario si hay errores
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, complete correctamente la información del formulario.",
      });
      setRegisterErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`${back}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        try {
          const auth = getAuth();
          const userCredentials = await createUserWithEmailAndPassword(
            auth,
            newUser.email,
            newUser.password
          );
          await sendEmailVerification(userCredentials.user);
        } catch (error) {
          console.error("Error:", error.message);
        }

        MySwal.fire({
          icon: "success",
          title: "Éxito",
          text: "Usuario registrado exitosamente. Correo de verificación enviado.",
        });
        navigate("/login");
      } else if (response.status === 400) {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: responseData.message,
        });
      } else if (response.status === 500) {
        setRegisterErrors({ serverError: responseData.message });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Algo salió mal.",
      });
      console.log(error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.navLog}>
        <NavBar />
      </div>
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
            {registerErrors.badRequest ? (
              <p className={styles.error}>{registerErrors.badRequest}</p>
            ) : (
              registerErrors.invalidPassword && (
                <p className={styles.error}>{registerErrors.invalidPassword}</p>
              )
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
