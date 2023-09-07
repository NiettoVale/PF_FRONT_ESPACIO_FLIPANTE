import React from "react";
import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";

import {
  HiOutlineShoppingCart,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from "react-icons/hi";

const storedUsername = localStorage.getItem("username");

const logOut = () => {
  // Elimina la clave "username" del localStorage
  localStorage.removeItem("username");
  window.location.reload();

  // También puedes redirigir al usuario a una página de inicio de sesión o a donde sea necesario después de cerrar sesión.
  // window.location.href = "/login"; // Por ejemplo, redirige a la página de inicio de sesión
};

export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filterSearch(event.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="search"
        value={busqueda}
        onChange={handleChange}
        className={styles.searchInput}
        placeholder="BUSCAR"
      />

      <Link to={"/cart"} className={styles.cart}>
        <HiOutlineShoppingCart />
      </Link>

      <div className={styles.flexSpace}></div>

      {storedUsername ? (
        <div>
          <Link to={"/userProfile"}>
            <HiOutlineUserCircle className={styles.userIcon} />
          </Link>

          <Link to={"/"}>
            <HiOutlineLogout className={styles.access} onClick={logOut} />
          </Link>
        </div>
      ) : (
        <Link to={"/login"} className={styles.access}>
          <HiOutlineLogin />
        </Link>
      )}
    </div>
  );
}
