import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "../firebase/LoginFacebook";
import GoogleLogin from "../firebase/LoginGoogle";
import styles from "./LoginForm.module.css";
const back = process.env.REACT_APP_BACK;

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
      const response = await fetch(`${back}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        // Al inicio de sesión exitoso, guarda la información en localStorage
        localStorage.setItem("username", formData.name);
        alert("Inicio de sesion exitoso!!");
        navigate("/");
      } else if (response.status === 404) {
        alert(responseData.error);
      } else if (response.status === 401) {
        alert(responseData.error);
      } else if (response.status === 500) {
        alert(responseData.error);
      }
    } catch (error) {
      alert("Algo salió mal.");
      console.log(error.message);
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

          <div className={styles.externalLogin}>
            <p>También puedes:</p>
            <GoogleLogin />
            <FacebookLogin />
          </div>
        </form>
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
