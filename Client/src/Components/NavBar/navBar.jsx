import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const storedUsername = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");

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
          <Link to={"/userProfile"}>
            <p>{storedUsername}</p>
          </Link>
        ) : (
          <Link to={"/userProfile"}>
            <p>{googleName}</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;

/*
        {isLoading && (storedUsername || googleName) ? (
          <div>
            <img
              className={styles.image}
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
              alt="Cargando..."
            />
          </div>
        ) : storedUsername ? (
          <div>
            <Link to={"/userProfile"}>{storedUsername.toUpperCase()}</Link>
            <Link to={"/userProfile"}>
              {userInfo && userInfo.imageProfile && (
                <img
                  className={styles.image}
                  src={userInfo.imageProfile}
                  alt="profile"
                />
              )}
            </Link>
          </div>
        ) : googleName ? (
          <div>
            <Link to={"/userProfile"}>{googleName.toUpperCase()}</Link>
            <Link to={"/userProfile"}>
              {googleImage && <img src={googleImage} alt="profile" />}
            </Link>
          </div>
        ) : null}
*/
