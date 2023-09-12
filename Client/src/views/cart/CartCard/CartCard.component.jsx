import styles from "./CartCard.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addproductCart,
  removeproductCart,
  getproductCart,
  getUserByName,
} from "../../../Redux/actions/productsActions";

const Card = ({
  nameProduct,
  images,
  price,
  category,
  id,
  cantidad,
  setTotalPrice,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.myCart);
  const user = useSelector((state) => state.infoUser);
  const name = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");

  const [quantity, setQuantity] = useState(cantidad);

  // Información del Usuario
  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }

  const handleIncrement = () => {
    if (quantity < cart[0].stock) {
      // Comprobar si la cantidad es menor que el stock
      dispatch(addproductCart(userId, id, cart[0].sizeId));
      setQuantity(quantity + 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + cart[0].price);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      // Comprobar si la cantidad es mayor que 1
      dispatch(removeproductCart(userId, id, cart[0].sizeId));
      setQuantity(quantity - 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - cart[0].price);
    }
  };

  useEffect(() => {
    if (!googleName) {
      dispatch(getUserByName(name));
    } else {
      dispatch(getUserByName(googleName));
    }

    if (userId) {
      dispatch(getproductCart(userId));
    }
  }, [dispatch, name, userId, googleName]);

  return (
    <div className={styles.cardContainer}>
      <Link to={`/detail/${id}`}>
        <div className={styles.cardImageContainer}>
          {/* Mostrar la imagen */}
          {images ? (
            <img src={images[0]} alt={nameProduct} className={styles.imgCard} />
          ) : (
            <img
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
              alt="Cargando..."
            />
          )}
        </div>
      </Link>
      {/* Información relevante */}
      <div className={styles.cardInfo}>
        <p className={styles.cardName}>
          {nameProduct}, Cantidad: {quantity}
        </p>
        <p className={styles.cardCategory}>{category}</p>
        <p className={styles.cardPrice}>${price * quantity}</p>
      </div>
      <div>
        {quantity > 1 && <button onClick={handleDecrement}>-</button>}
        {quantity < cart[0].stock && (
          <button onClick={handleIncrement}>+</button>
        )}
      </div>
    </div>
  );
};

export default Card;
