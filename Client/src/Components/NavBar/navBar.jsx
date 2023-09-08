import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName } from "../../Redux/actions/productsActions";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const storedUsername = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const userInfo = user.length > 0 ? user[0] : null;
  const dispatch = useDispatch();
  const googleName = localStorage.getItem("googleName");
  const googleImage = localStorage.getItem("googleImage");

  // Agregar el estado para rastrear si se están cargando los datos
  const [isLoading, setIsLoading] = useState(true);

  const logOut = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };

  const logOutGoogle = () => {
    localStorage.removeItem("googleName");
    localStorage.removeItem("googleImage");
    window.location.reload();
  };

  useEffect(() => {
    // Iniciar la carga de datos
    setIsLoading(true);

    dispatch(getUserByName(storedUsername))
      .then(() => {
        // Cuando los datos se cargan correctamente, establecer isLoading en falso
        setIsLoading(false);
      })
      .catch((error) => {
        // Manejar errores aquí si es necesario
        console.error("Error al cargar datos:", error);
        setIsLoading(false);
      });
  }, [dispatch, storedUsername]);

  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <Link to={"/"} className={styles.link}>
          INICIO
        </Link>
        <Link to={"/"} className={styles.link}>
          CATALOGO
        </Link>

        {isLoading && (storedUsername || googleName) ? (
          <div>
            {/* Muestra un gif de carga mientras se cargan los datos */}
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
      </div>
    </div>
  );
};

export default NavBar;
