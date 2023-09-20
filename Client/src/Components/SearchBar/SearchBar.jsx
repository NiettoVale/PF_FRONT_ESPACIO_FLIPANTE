// SearchBar.js

import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
  HiOutlineShoppingCart,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineHeart,
  HiOutlineUser,
  HiMenu,
} from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { getUserByName } from "../../Redux/actions/productsActions";

export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
  const googleName = localStorage.getItem("googleName");
  const googleImage = localStorage.getItem("googleImage");
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const root = localStorage.getItem("root");
  const userInfo = user.length > 0 ? user[0] : "";
  const dispatch = useDispatch();

  const location = useLocation();

  const [storedUsername, setStoredUsername] = useState(
    localStorage.getItem("username")
  );

  useEffect(() => {
    setStoredUsername(localStorage.getItem("username"));
    dispatch(getUserByName(name));
  }, [dispatch, name]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickScroll = () => {
    window.scrollTo({ top: 1650, behavior: "smooth" });
  };

  const logOutGoogle = () => {
    localStorage.removeItem("googleImage");
    localStorage.removeItem("googleName");
    localStorage.removeItem("username");
    localStorage.removeItem("root");
    localStorage.clear();
    window.location.reload();
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filterSearch(event.target.value);
  };

  const isLoggedIn = storedUsername || googleName;
  const imageProfile = isLoggedIn
    ? googleName
      ? googleImage
      : userInfo.imageProfile
      ? userInfo.imageProfile
      : root
      ? "https://acortar.link/wrpVGk"
      : "https://acortar.link/9rBdMA"
    : null;

  const isHomeView = location.pathname === "/";

  return (
    <div className={styles.searchBarContainer}>
      {isHomeView && (
        <>
          <input
            type="search"
            value={busqueda}
            onChange={handleChange}
            className={styles.searchInput}
            placeholder="BUSCAR"
            onClick={handleClickScroll}
          />
        </>
      )}
      {googleImage ? (
        <img src={imageProfile} className={styles.userIcon} alt="PEPEss" />
      ) : user.length > 0 && user[0].name ? (
        <img
          src={
            userInfo && userInfo.imageProfile
              ? userInfo.imageProfile
              : "https://acortar.link/9rBdMA"
          }
          className={styles.userIcon}
          alt="profile"
          onError={(e) => {
            e.target.onerror = null; // Evitar un bucle infinito si la imagen de carga también falla
            e.target.src =
              "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"; // Reemplaza "URL_DEL_GIF_DE_CARGA" con la URL de tu GIF de carga
          }}
        />
      ) : null}
      {isLoggedIn ? (
        <div className={styles.hamburgerMenu} onClick={toggleMenu}>
          <GiHamburgerMenu />
        </div>
      ) : (
        <Link to={"/login"} className={styles.loginIcon}>
          <HiOutlineLogin />
        </Link>
      )}
      {isMenuOpen && (
        <div className={styles.menu}>
          {isLoggedIn ? (
            <div className={styles.profileContainer}>
              <p className={styles.username}>{name || googleName}</p>
            </div>
          ) : (
            <Link to={"/login"}>
              <HiOutlineLogin className={styles.loginIcon} />
            </Link>
          )}
          <Link to={"/cart"} className={styles.menuItem}>
            <HiOutlineShoppingCart /> Carrito
          </Link>
          {user || googleName ? (
            <Link to={"/favorites"} className={styles.menuItem}>
              <HiOutlineHeart /> Favoritos
            </Link>
          ) : null}
          <Link to={"/userProfile"} className={styles.menuItem}>
            <HiOutlineUser /> Perfil
          </Link>
          {isLoggedIn && (
            <Link to={"/"} className={styles.menuItem} onClick={logOutGoogle}>
              <HiOutlineLogout /> Salir
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
