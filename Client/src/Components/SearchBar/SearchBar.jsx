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
  // const storedUsername = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");
  const googleImage = localStorage.getItem("googleImage");
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const root = localStorage.getItem("root");
  const userInfo = user.length > 0 ? user[0] : "";
  const imageProfile = userInfo.imageProfile
    ? userInfo.imageProfile
    : root
    ? "https://acortar.link/wrpVGk"
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
    localStorage.removeItem("root");
    window.location.reload();
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filterSearch(event.target.value);
  };

  const logOutGoogle = () => {
    localStorage.removeItem("googleName");
    localStorage.removeItem("googleImage");
    localStorage.removeItem("root");
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

      {storedUsername || googleName ? (
        <Link to={"/cart"} className={styles.cart}>
          <HiOutlineShoppingCart />
        </Link>
      ) : null}

      <div className={styles.flexSpace}></div>

      {storedUsername ? (
        <div>
          <Link to={"/userProfile"}>
            <img src={imageProfile} className={styles.userIcon} alt="profile" />
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
