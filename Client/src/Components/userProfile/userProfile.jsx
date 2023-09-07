import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorites,
  getUserByName,
} from "../../Redux/actions/productsActions";
import Cards from "../cards/cards.component";
import { Link } from "react-router-dom";

import styles from "./userProfile.module.css";
import NavBar from "../NavBar/navBar";

import {
  AiOutlineMail,
  AiOutlineEnvironment,
  AiOutlinePhone,
} from "react-icons/ai";

const UserProfile = () => {
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const favorites = useSelector((state) => state.myFavorites);
  const dispatch = useDispatch();
  let userId = null;

  if (user.length > 0) {
    userId = user[0].id;
  }

  const [isLoading, setIsLoading] = useState(true); // Estado para el indicador de carga

  useEffect(() => {
    dispatch(getUserByName(name));
    if (userId) {
      dispatch(getFavorites(userId));
    }
  }, [dispatch, name, userId]);

  // Cuando se complete la carga de usuario, establece isLoading en false
  useEffect(() => {
    if (user.length > 0) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className={styles.userView}>
      <NavBar />

      <Link to={"/"}>
        <button className={styles.backButton}>⬅</button>
      </Link>

      {isLoading ? (
        <div>
          <img
            src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            alt="Cargando..."
          />
        </div>
      ) : (
        <div className={styles.userContainer}>
          <div className={styles.flexContainer}>
            <div>
              <div className={styles.userImage}></div>
              {user.map((obj) => (
                <div key={obj.id} className={styles.userInfo}>
                  <div className={styles.userName}>
                    {name ? <h2>{name}</h2> : <h2>Hola Invitado</h2>}
                    <p>Benjamín Pepeabuser</p>
                  </div>

                  <h3>DETALLES DE LA CUENTA</h3>
                  <p>
                    <AiOutlineMail className={styles.userIcons} /> {obj.email}
                  </p>
                  <p>
                    <AiOutlinePhone className={styles.userIcons} />{" "}
                    {obj.phone ? obj.phone : "Sin información"}
                  </p>
                  <p>
                    <AiOutlineEnvironment className={styles.userIcons} />
                    {obj.address ? obj.address : "Sin información"}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.purchaseContainer}>
              <h2>HISTORIAL DE COMPRAS</h2>
              <p className={styles.singlePurchase}>COMPRA 1</p>
              <p className={styles.singlePurchase}>COMPRA 2</p>
              <p className={styles.singlePurchase}>COMPRA 3</p>
              <p className={styles.singlePurchase}>COMPRA 4</p>
              <p className={styles.singlePurchase}>COMPRA 5</p>
              <p className={styles.singlePurchase}>COMPRA 6</p>
              <p className={styles.singlePurchase}>COMPRA 7</p>
              <p className={styles.singlePurchase}>COMPRA 8</p>
              <p className={styles.singlePurchase}>COMPRA 9</p>
              <p className={styles.singlePurchase}>COMPRA 10</p>
              <p className={styles.singlePurchase}>COMPRA 11</p>
              <p className={styles.singlePurchase}>COMPRA 12</p>
              <p className={styles.singlePurchase}>COMPRA 13</p>
              <p className={styles.singlePurchase}>COMPRA 14</p>
              <p className={styles.singlePurchase}>COMPRA 15</p>
              <p className={styles.singlePurchase}>COMPRA 16</p>
            </div>
          </div>

          <div className={styles.favoritesContainer}>
            <h2>TUS FAVORITOS</h2>
            {favorites && favorites.length > 0 ? (
              <Cards products={favorites} />
            ) : (
              <p>No hay favoritos</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
