// import React, {useState, useEffect} from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
// import {useSelector, useDispatch} from "react-redux"

const NavBar = () => {
  // const user = useSelector((state) => state.infoUser);
  // const userInfo = user.length > 0 ? user[0] : null;
  // const dispatch = useDispatch();

  // const googleName = localStorage.getItem("googleName");
  // const googleImage = localStorage.getItem("googleImage");
  // const [storedUsername, setStoredUsername] = useState(
  //   localStorage.getItem("username")
  // );

  // useEffect(() => {
  //   // Actualiza storedUsername cuando el usuario inicia sesión o cierra sesión
  //   setStoredUsername(localStorage.getItem("username"));
  // }, []);

  // const logOut = () => {
  //   localStorage.removeItem("username");
  //   window.location.reload();
  // };

  // const logOutGoogle = () => {
  //   localStorage.removeItem("googleName");
  //   localStorage.removeItem("googleImage");
  //   window.location.reload();
  // };

  const handleClickScroll = () => {
    window.scrollTo({ top: 1600, behavior: "smooth" });
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <Link to={"/"}>
          <div className={styles.logo}>
            <h2>
              <span>ESPACIO</span>
            </h2>
            <h2> FLIPANTE</h2>
          </div>
        </Link>
        <Link to={"/"} className={styles.link}>
          INICIO
        </Link>
        <Link to={"/"} className={styles.link} onClick={handleClickScroll}>
          CATALOGO
        </Link>

        {/* {storedUsername ? (
          <Link to={"/userProfile"}>
            <p>{storedUsername}</p>
          </Link>
        ) : (
          <Link to={"/userProfile"}>
            <p>{googleName}</p>
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default NavBar;
