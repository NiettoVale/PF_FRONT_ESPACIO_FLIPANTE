import SideBar from "../SideBar/SideBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorites,
  getUserByName,
} from "../../Redux/actions/productsActions";
import Cards from "../cards/cards.component";
import styles from "./Favorites.module.css";
import { Link } from "react-router-dom";

const Favorites = () => {
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const favorites = useSelector((state) => state.myFavorites);
  const dispatch = useDispatch();
  let userId = null;

  if (user.length > 0) {
    userId = user[0].id;
  }

  useEffect(() => {
    dispatch(getUserByName(name));
    if (userId) {
      dispatch(getFavorites(userId));
    }
  }, [dispatch, name, userId]);

  return (
    <div className={styles.favoritesContainer}>
      <SideBar />
      {favorites.length > 0 ? (
        <Cards products={favorites} />
      ) : (
        <div className={styles.favoritesTitle}>
          <h1>No tienes favoritos</h1>
          <Link to="/">
            <button className={styles.catalogoButton}>Ir al catálogo</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
