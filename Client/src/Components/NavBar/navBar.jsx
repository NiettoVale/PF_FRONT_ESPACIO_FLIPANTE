import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const storedUsername = localStorage.getItem("username");

  const logOut = () => {
    // Elimina la clave "username" del localStorage
    localStorage.removeItem("username");
    window.location.reload();

    // También puedes redirigir al usuario a una página de inicio de sesión o a donde sea necesario después de cerrar sesión.
    // window.location.href = "/login"; // Por ejemplo, redirige a la página de inicio de sesión
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <Link to={"/"} className={styles.link}>
          INICIO
        </Link>
        <Link to={"/"} className={styles.link}>
          CATALOGO
        </Link>

        {storedUsername ? (
          <div>
            <Link to={"/userProfile"}>{storedUsername.toUpperCase()}</Link>
            <Link to={"/userProfile"}>
              <img src="https://acortar.link/ny88Fm" alt="profile" />
            </Link>
            <Link to={"/"}>
              <img
                src="https://acortar.link/stkkZX"
                alt="logOut"
                onClick={logOut}
              />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
