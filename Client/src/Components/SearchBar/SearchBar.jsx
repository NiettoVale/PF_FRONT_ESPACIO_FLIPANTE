import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from "react-icons/hi";

export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
  // const storedUsername = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");
  const googleImage = localStorage.getItem("googleImage");
  const [storedUsername, setStoredUsername] = useState(
    localStorage.getItem("username")
  );

  useEffect(() => {
    // Actualiza storedUsername cuando el usuario inicia sesión o cierra sesión
    setStoredUsername(localStorage.getItem("username"));
  }, []);

  const logOut = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filterSearch(event.target.value);
  };

  const logOutGoogle = () => {
    localStorage.removeItem("googleName");
    localStorage.removeItem("googleImage");
    window.location.reload();
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
            <HiOutlineLogout className={styles.logOutIcon} onClick={logOut} />
          </Link>
        </div>
      ) : googleName ? (
        <div>
          <Link to={"/userProfile"}>
            <img src={googleImage} alt="profile" className={styles.userImage} />
          </Link>
          <Link to={"/"}>
            <HiOutlineLogout
              className={styles.logOutIcon}
              onClick={logOutGoogle}
            />
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
