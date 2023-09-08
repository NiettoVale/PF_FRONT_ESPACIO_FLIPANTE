import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const logOut = () => {
    // Elimina la clave "username" del localStorage
    localStorage.removeItem("username");
    window.location.href = "/";

    // También puedes redirigir al usuario a una página de inicio de sesión o a donde sea necesario después de cerrar sesión.
    // window.location.href = "/login"; // Por ejemplo, redirige a la página de inicio de sesión
  };
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/userProfile">Perfil</Link>
        </li>
        <li>
          <Link to="/favorites">Favoritos</Link>
        </li>
        <li>
          <Link to="/orders">Mis Pedidos</Link>
        </li>
        <li>
          <Link onClick={logOut}>Cerrar Sesión</Link>
        </li>
        <li>
          <Link to="/">Volver al Inicio</Link>
        </li>
        <li>
          <Link to="/change-password">Cambiar Contraseña</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
