import styles from "./CartCard.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addproductCart,
  removeproductCart,
  getproductCart,
  getUserByName,
  removeallproductCart,
} from "../../../Redux/actions/productsActions";
import Swal from "sweetalert2";

import { FaRegTrashCan, FaMinus, FaPlus } from "react-icons/fa6";

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
  const [isRemoved, setIsRemoved] = useState(false); // Estado para controlar si el producto se ha eliminado

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
      dispatch(
        addproductCart(
          userId,
          cartItem.productId,
          cartItem.sizeId,
          cartItem.stock
        )
      );
      setQuantity(quantity + 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + cartItem.price);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      // Comprobar si la cantidad es mayor que 1
      dispatch(removeproductCart(userId, cartItem.productId, cartItem.sizeId));
      setQuantity(quantity - 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - cartItem.price);
    }
  };

  const handledelete = () => {
    // Mostrar la alerta de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este artículo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llama a la acción para eliminar el producto del carrito
        dispatch(
          removeallproductCart(userId, cartItem.productId, cartItem.sizeId)
        );

        // Calcular el precio total después de eliminar el producto
        const productToDelete = cart.find(
          (product) =>
            product.productId === cartItem.productId &&
            product.sizeId === cartItem.sizeId
        );

        if (productToDelete) {
          const productPrice = productToDelete.price * productToDelete.cantidad;
          const newTotalPrice = price * quantity - productPrice;
          setTotalPrice(newTotalPrice);
        }
        setIsRemoved(true);
      }
    });
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
        const response = await fetch(`${back}detail/${cartItem.sizeId}`);
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

  // Renderizado condicional basado en si el producto se ha eliminado o no
  if (isRemoved) {
    return null; // No renderizar la tarjeta si se ha eliminado
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.leftFlex}>
        <Link to={`/detail/${id}`}>
          <div className={styles.cardImageContainer}>
            {/* Mostrar la imagen */}
            {images ? (
              <img
                src={images[0]}
                alt={nameProduct}
                className={styles.imgCard}
              />
            ) : (
              <img
                src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
                alt="Cargando..."
              />
            )}
          </div>
        </Link>
        <div className={styles.cardInfo}>
          <div>
            <p className={styles.cardName}>{nameProduct}</p>
            <p className={styles.cardCategory}>{category}</p>
            <p className={styles.cardSize}>
              Talle: {productSize ? productSize.name : "Cargando..."}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.rightFlex}>
        <p className={styles.unitPrice}>${price}</p>
        <div className={styles.quantityButtons}>
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1} // Deshabilitar si la cantidad es 1 o menos
          >
            <FaMinus />
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            onClick={handleIncrement}
            disabled={quantity >= cartItem.stock} // Deshabilitar si la cantidad alcanza el stock máximo
          >
            <FaPlus />
          </button>
        </div>
        <p className={styles.cardPrice}>${price * quantity}</p>

        <button onClick={handledelete} className={styles.deleteButton}>
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};

export default Card;
