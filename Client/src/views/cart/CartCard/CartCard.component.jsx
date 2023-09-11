import React from "react";
import styles from "./CartCard.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, images, price, category, id }) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className={styles.cardContainer}>
        <div className={styles.cardImageContainer}>
          {/* Mostrar la imagen */}
          {images ? (
            <img src={images[0]} alt={name} className={styles.imgCard} />
          ) : (
            <img
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
              alt="Cargando..."
            />
          )}
        </div>

        {/* Información relevante */}
        <div className={styles.cardInfo}>
          <p className={styles.cardName}>{name}</p>
          <p className={styles.cardCategory}>{category}</p>
          <p className={styles.cardPrice}>${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
