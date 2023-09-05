import { Link } from "react-router-dom";
import styles from "./ProductSlider.module.css";

const SliderCard = ({ name, images, price, category, id }) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className={styles.cardContainer}>
        <p className={styles.hoverMessage}>VER DETALLES</p>

        {images ? (
          <img src={images[0]} alt={name} className={styles.imgCard} />
        ) : (
          <img
            src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            alt="Cargando..."
          />
        )}

        <div className={styles.cardInfo}>
          <p className={styles.cardName}>{name}</p>
          <p className={styles.cardCategory}>{category}</p>
          <p className={styles.cardPrice}>${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default SliderCard;
