import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineHeart,
  HiOutlineUser,
} from "react-icons/hi";
import { getUserByName } from "../../Redux/actions/productsActions";

export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
  const googleName = localStorage.getItem("googleName");
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const root = localStorage.getItem("root");
  const dispatch = useDispatch();

  // Mueve la declaración de storedUsername arriba
  const [storedUsername, setStoredUsername] = useState(
    localStorage.getItem("username")
  );

  // Declaración de userInfo
  const userInfo = user.length > 0 ? user[0] : "";

  useEffect(() => {
    // Actualiza storedUsername cuando el usuario inicia sesión o cierra sesión
    setStoredUsername(localStorage.getItem("username"));
    dispatch(getUserByName(name));
  }, [dispatch, name]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logOutGoogle = () => {
    localStorage.removeItem("googleName");
    localStorage.removeItem("googleImage");
    localStorage.removeItem("root");
    window.location.reload();
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filterSearch(event.target.value);
  };

  const isLoggedIn = storedUsername || googleName;
  const imageProfile = isLoggedIn
    ? userInfo.imageProfile
      ? userInfo.imageProfile
      : root
      ? "https://acortar.link/wrpVGk"
      : "https://acortar.link/9rBdMA"
    : null;

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="search"
        value={busqueda}
        onChange={handleChange}
        className={styles.searchInput}
        placeholder="BUSCAR"
      />
      {isLoggedIn ? (
        <Link to={"/cart"} className={styles.cart}>
          <HiOutlineShoppingCart />
        </Link>
      ) : null}
      <div className={styles.flexSpace}></div>
      <div className={styles.profileMenu}>
        <div className={styles.profileImageContainer} onClick={toggleMenu}>
          {isLoggedIn ? (
            <img src={imageProfile} className={styles.userIcon} alt="profile" />
          ) : (
            <Link to={"/login"}>
              <HiOutlineLogin className={styles.loginIcon} />
            </Link>
          )}
          {isMenuOpen && (
            <div className={styles.menu}>
              {user || googleName ? (
                <Link to={"/favorites"}>
                  <HiOutlineHeart />
                </Link>
              ) : null}
              <Link to={"/userProfile"}>
                <HiOutlineUser />
              </Link>
              {isLoggedIn ? (
                <Link
                  to={"/"}
                  className={styles.menuLink}
                  onClick={logOutGoogle}
                >
                  <HiOutlineLogout className={styles.logOutIcon} />
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
