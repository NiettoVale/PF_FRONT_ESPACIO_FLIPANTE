import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const googleName = localStorage.getItem("googleName");
  const logOut = () => {
    // Elimina la clave "username" del localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("googleName");
    window.location.href = "/";
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
          <Link to="/cart">Tu carrito</Link>
        </li>
        <li>
          <Link to="/">Volver al Inicio</Link>
        </li>
        {googleName ? null : (
          <li>
            <Link to="/change-password">Cambiar Contraseña</Link>
          </li>
        )}
        <li>
          <Link onClick={logOut}>Cerrar Sesión</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
