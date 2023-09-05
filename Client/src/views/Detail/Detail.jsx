import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import NavBar from "../../Components/NavBar/navBar";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  getFavorites,
  getUserByName,
  removeFromFavorites,
} from "../../Redux/actions/productsActions";

export default function Detail() {
  const { id } = useParams();
  const [cardDetail, setCardDetail] = useState({});
  const [imageDetail, setImageDetail] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const favorites = useSelector((state) => state.myFavorites);

  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByName(name));
    if (userId) {
      dispatch(getFavorites(userId));
    }
  }, [dispatch, name, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://espacioflipante.onrender.com/detail/${id}`
        );

        const data = await response.json();

        if (response.status === 200) {
          setCardDetail(data);
          setImageDetail(data.images);
        } else if (response.status === 400) {
          alert(data.error);
        } else if (response.status === 500) {
          alert(data.error);
        }
      } catch (error) {
        alert("Algo salió mal!!!");
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleToggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(userId, id)); // Elimina de favoritos
    } else {
      dispatch(addFavorite(userId, id)); // Agrega a favoritos
    }
    // Actualiza el estado después de que la acción se haya completado
    setIsFavorite(!isFavorite); // Cambia el estado para reflejar si es favorito o no
  };

  useEffect(() => {
    if (user && user.length > 0 && favorites) {
      const favoriteProductIds = favorites.map((favorite) => favorite.id);
      setIsFavorite(favoriteProductIds.includes(parseInt(id)));
    }
  }, [id, user]);

  return (
    <div>
      <NavBar />
      <Link to={"/"}>
        <button className={styles.backButton}>⬅</button>
      </Link>

      <div className={styles.detailContainer}>
        <div className={styles.imgContainer}>
          {imageDetail.map((url, index) =>
            url ? (
              <img
                key={index}
                src={url}
                alt={cardDetail.name}
                className={index === 0 ? styles.mainImage : styles.thumbnail}
              />
            ) : null
          )}
        </div>

        <div className={styles.detailInfo}>
          <p className={styles.detailName}>{cardDetail.name}</p>

          <div className={styles.sizesButtons}>
            <button key="S">S</button>
            <button key="M">M</button>
            <button key="L">L</button>
            <button key="XL">XL</button>
            <button key="XXL">XXL</button>
          </div>

          <div>
            <p className={styles.detailDescription}>{cardDetail.description}</p>
            <p className={styles.detailGender}>Genero: {cardDetail.gender}</p>
            <p className={styles.detailCategory}>
              Categoria: {cardDetail.category}
            </p>
            <p className={styles.detailMaterial}>
              Material Principal: {cardDetail.mainMaterial}
            </p>
          </div>

          <p className={styles.detailPrice}>${cardDetail.price}</p>

          <div className={styles.detailButtons}>
            <button
              className={styles.favButton}
              onClick={handleToggleFavorites}
            >
              {isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
            </button>

            <button className={styles.cartButton}>AGREGAR AL CARRITO</button>
          </div>
        </div>
      </div>
    </div>
  );
}
