import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "../firebase/LoginFacebook";
import GoogleLogin from "../firebase/LoginGoogle";
import styles from "./LoginForm.module.css";
import {
  signInWithEmailAndPassword,
  getAuth,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import enviar from "./funcionEnviar";
const back = process.env.REACT_APP_BACK;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (regex.test(formData.name)) {
        const auth = getAuth();
        const email = formData.name;
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods && methods.length > 0) {
          const userCredentials = await signInWithEmailAndPassword(
            auth,
            email,
            formData.password
          );
          if (userCredentials.user.emailVerified) {
            localStorage.setItem("username", formData.name);
            submitHandler(event);
            navigate("/");
          } else {
            alert("Debe verificar el correo");
          }
        } else {
          alert("El usuario no existe");
        }
      } else {
        const response = await fetch(`${back}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          localStorage.setItem("username", formData.name);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Algo salió mal.");
    }
  };

  // Mover la recuperación de datos de localStorage fuera del efecto
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setFormData({ ...formData, name: storedUsername });
    }
  }, [formData]); // Se ejecutará una vez al montar el componente

  function submitHandler(event) {
    event.preventDefault();
    let correo = formData.name;
    let asunto = "BIENVENIDO";
    let texto = "Hola bienvenido";
    enviar(correo, asunto, texto);
    correo = asunto = texto = "";
  }

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
    </div>
  );
};

export default LoginForm;
