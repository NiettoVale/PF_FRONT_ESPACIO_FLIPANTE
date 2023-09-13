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
  size,
}) => {
  const back = process.env.REACT_APP_BACK;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.myCart);
  const user = useSelector((state) => state.infoUser);
  const name = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");

  const [quantity, setQuantity] = useState(cantidad);
  const [productSize, setProductSize] = useState(null);

  // Información del Usuario
  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }

  // Buscar el producto correspondiente en el carrito
  const cartItem = cart.find((item) => item.id === id);

  const handleIncrement = () => {
    if (cartItem && quantity < cartItem.stock) {
      // Comprobar si la cantidad es menor que el stock
      dispatch(addproductCart(userId, id, cartItem.sizeId));
      setQuantity(quantity + 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + cartItem.price);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      // Comprobar si la cantidad es mayor que 1
      dispatch(removeproductCart(userId, id, cartItem.sizeId));
      setQuantity(quantity - 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - cartItem.price);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${back}detail/${id}`);
        const data = await response.json();
        // Obtener el tamaño correspondiente al sizeId
        const sizeData = data.Sizes.find(
          (sizeItem) => sizeItem.id === cartItem.sizeId
        );
        setProductSize(sizeData); // Almacenar el tamaño en el estado local
      } catch (error) {
        console.log("Algo salió mal!!!");
        console.log(error.message);
      }
    };

    fetchData();
  }, [id, back, cartItem.sizeId]);

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
      <div className={styles.cardInfo}>
        <p className={styles.cardName}>
          {nameProduct}, Cantidad: {quantity}, Size:{" "}
          {productSize ? productSize.name : "Cargando..."}
        </p>
        <p className={styles.cardCategory}>{category}</p>
        <p className={styles.cardPrice}>${price * quantity}</p>
      </div>
      <div>
        {quantity > 1 && <button onClick={handleDecrement}>-</button>}
        {quantity < cartItem.stock && (
          <button onClick={handleIncrement}>+</button>
        )}
      </div>
    </div>
  );
};

export default Card;
