import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineLogin,
  HiOutlineLogout,
} from "react-icons/hi";
import { getUserByName } from "../../Redux/actions/productsActions";

export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
  const googleName = localStorage.getItem("googleName");
  const googleImage = localStorage.getItem("googleImage");
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const userInfo = user.length > 0 ? user[0] : "";
  const imageProfile = userInfo.imageProfile
    ? userInfo.imageProfile
    : "https://acortar.link/9rBdMA";
  const dispatch = useDispatch();

  const [storedUsername, setStoredUsername] = useState(
    localStorage.getItem("username")
  );

  useEffect(() => {
    // Actualiza storedUsername cuando el usuario inicia sesión o cierra sesión
    setStoredUsername(localStorage.getItem("username"));
    dispatch(getUserByName(name));
  }, [dispatch, name]);

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
  console.log(imageProfile);
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
            {imageProfile ? (
              <img
                src={imageProfile}
                className={styles.userIcon}
                alt="profile"
              />
            ) : (
              <img
                src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif" // Reemplaza con la URL del GIF de carga
                alt="Cargando..."
                className={styles.loadingIcon}
              />
            )}
          </Link>

          <Link to={"/"}>
            <HiOutlineLogout className={styles.logOutIcon} onClick={logOut} />
          </Link>
        </div>
      ) : googleName ? (
        <div>
          {console.log(googleImage)}
          <Link to={"/userProfile"}>
            {googleImage ? (
              <img
                src={googleImage}
                alt="profile"
                className={styles.userImage}
              />
            ) : (
              <img
                src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif" // Reemplaza con la URL del GIF de carga
                alt="Cargando..."
              />
            )}
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
