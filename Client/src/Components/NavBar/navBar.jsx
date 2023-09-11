import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName } from "../../Redux/actions/productsActions";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

import {
  HiOutlineShoppingCart,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from "react-icons/hi";

const NavBar = () => {
  const user = useSelector((state) => state.infoUser);
  const userInfo = user.length > 0 ? user[0] : null;
  const dispatch = useDispatch();

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

  const logOutGoogle = () => {
    localStorage.removeItem("googleName");
    localStorage.removeItem("googleImage");
    window.location.reload();
  };

  const handleClickScroll = () => {
    window.scrollTo({ top: 1600, behavior: "smooth" });
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <h2>
            <span>ESPACIO</span>
          </h2>
          <h2> FLIPANTE</h2>
        </div>
        <Link to={"/"} className={styles.link}>
          INICIO
        </Link>
        <Link to={"/"} className={styles.link} onClick={handleClickScroll}>
          CATALOGO
        </Link>

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
              <img
                src={googleImage}
                alt="profile"
                className={styles.userImage}
              />
            </Link>
            <Link to={"/"}>
              <HiOutlineLogout
                className={styles.logOutGoogleIcon}
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
    </div>
  );
};

export default NavBar;
