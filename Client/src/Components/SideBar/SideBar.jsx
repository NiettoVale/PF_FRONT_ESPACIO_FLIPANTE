import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
import { getUserByName } from "../../Redux/actions/productsActions";
import { useSelector, useDispatch } from "react-redux";
const SideBar = () => {
  const googleName = localStorage.getItem("googleName");
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const dispatch = useDispatch();
  const userId = user.length > 0 ? user[0].id : null;

  const logOut = () => {
    // Elimina la clave "username" del localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("googleName");
    window.location.href = "/";
  };

  useEffect(() => {
    dispatch(getUserByName(name));
  }, [dispatch, name]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>
          <span>ESPACIO</span>
        </h2>
        <h2> FLIPANTE</h2>
      </div>
      <ul>
        <li>
          <Link to="/userProfile">Perfil</Link>
        </li>
        <li>
          <Link to="/favorites">Favoritos</Link>
        </li>
        <li>
          <Link to="/orders">Mis Pedidos</Link>
        </li>

        <li>
          <Link to="/cart">Tu carrito</Link>
        </li>

        <li>
          <Link to={`/user-reviews/${userId}`}>Mis reseñas</Link>
        </li>
        <li>
          <Link to="/">Volver al Inicio</Link>
        </li>
        {googleName ? null : (
          <li>
            <Link to="/change-password">Cambiar Contraseña</Link>
          </li>
        )}
        <li>
          <Link onClick={logOut}>Cerrar Sesión</Link>
        </li>
      </ul>
      <Link to={"/"}>
        <button className={styles.backButton}>⬅</button>
      </Link>
    </div>
  );
};

export default SideBar;
