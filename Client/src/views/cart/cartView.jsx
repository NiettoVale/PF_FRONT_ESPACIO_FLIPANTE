import React, { useEffect, useState } from "react";
import CartCards from "./CartCards/CartCards.component";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import {
  getproductCart,
  getUserByName,
  removeCart,
} from "../../Redux/actions/productsActions";
import { Link } from "react-router-dom";
import styles from "./CartView.module.css";

const back = process.env.REACT_APP_BACK;

const CartView = () => {
  //Estados Globales - Dispach - MP - LocalStorage
  const mercadoPagoKey = process.env.REACT_APP_MERCADO_PAGO_KEY;
  const name = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");
  const user = useSelector((state) => state.infoUser);
  const cart = useSelector((state) => state.myCart);
  const dispatch = useDispatch();

  // Declaración de preferenceId y totalPrice como Estados Locales
  const [preferenceId, setPreferenceId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Inicialmente 0

  // Información del Usuario
  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }
  //UseEffects:
  //Busco el Usuario
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

  // Inicializar Mercado Pago
  useEffect(() => {
    initMercadoPago(mercadoPagoKey);
  }, [mercadoPagoKey]);

  useEffect(() => {
    // Calcular el precio total y actualizar el estado
    const calculatePrice = cart.reduce((total, product) => {
      return total + product.price * product.cantidad;
    }, 0);
    setTotalPrice(calculatePrice);
  }, [cart]);

  // Función para crear la preferencia de Mercado Pago
  const createPreference = async (totalPrice) => {
    try {
      const response = await axios.post(`${back}create_preference`, {
        description: "Indumentaria",
        price: totalPrice,
        quantity: 1,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  // Maneja el proceso de compra
  const handleBuy = async () => {
    const id = await createPreference(totalPrice);
    if (id) {
      setPreferenceId(id); // Establecer preferenceId en el estado
    }
  };

  const handleDelete = async (userId) => {
    try {
      // Llamar a la acción para eliminar el carrito completo
      dispatch(removeCart(userId));

      // Después de eliminar el carrito, puedes redirigir al usuario a la página de inicio u otra página
      // Reemplaza '/home' con la ruta a la página a la que deseas redirigir al usuario
      window.location.href = "/cart";
    } catch (error) {
      console.error("Error al eliminar el carrito:", error);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Carrito de Compra</h2>
      <button onClick={() => handleDelete(user[0].id)}>
        Eliminar Carrito Completo
      </button>

      <CartCards products={cart} setTotalPrice={setTotalPrice} />
      <h2>Precio Total : ${totalPrice}</h2>
      <button className={styles.buyButton} onClick={handleBuy}>
        Comprar
      </button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
      <Link to={"/"}>
        <button className={styles.backButton}>⬅</button>
      </Link>
    </div>
  );
};

export default CartView;
