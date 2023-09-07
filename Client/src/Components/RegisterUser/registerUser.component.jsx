import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import validationRegister from "./validationRegister";
const back = process.env.REACT_APP_BACK;

const Registro = () => {
  // Creamos un estado local para almacenar al nuevo usuario
  const [newUser, setNewUser] = useState({
    // estas son las propiedades necesarias para crear al nuevo usuario
    name: "",
    email: "",
    password: "",
  });

  // Creamos un estado local para almacenar los errores que surjan mediante la validación.
  const [registerErrors, setRegisterErrors] = useState({});
  const navigate = useNavigate();

  // Creamos una función que maneja los cambios de los inputs
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

  // Creamos una función que se ejecuta cuando enviamos el formulario.
  const handleSubmit = async () => {
    try {
      // Realizamos una petición al backend usando fetch y le pasamos el método y lo que le queremos enviar.
      const response = await fetch(`${back}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // Obtenemos los datos de la respuesta de la petición y los almacenamos
      const responseData = await response.json();

      // Verificamos el estado de las posibles respuestas del servidor y mostramos adecuadamente los mensajes:
      if (response.status === 200) {
        alert(responseData.message);
        navigate("/login");
        // window.location.reload();
      } else if (response.status === 400) {
        setRegisterErrors({ badRequest: responseData.message });
      } else if (response.status === 500) {
        setRegisterErrors({ serverError: responseData.message });
      }
    } catch (error) {
      // Si hubo algún error que no es del servidor, lo mostramos
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
            <a>
              ¿Ya tienes una cuenta? <span>Inicia sesión</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
