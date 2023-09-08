import React from "react";
import Cards from "../../Components/cards/cards.component";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import {
  addproductCart,
  getproductCart,
  getUserByName,
  removeproductCart,
} from "../../Redux/actions/productsActions";
import { Link } from "react-router-dom";
import styles from "../Detail/Detail.module.css";

const back = process.env.REACT_APP_BACK;

const CartView = () => {
  const mercadoPagoKey = process.env.REACT_APP_MERCADO_PAGO_KEY;

  // Informacion del Usuario
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const cart = useSelector((state) => state.myCart);
  const dispatch = useDispatch();
  //Informacion del Usuario

  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }

  useEffect(() => {
    dispatch(getUserByName(name));
    if (userId) {
      dispatch(getproductCart(userId));
    }
  }, [dispatch, name, userId]);

  // Declaración de preferenceId y totalPrice como Estados Locales
  const [preferenceId, setPreferenceId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Inicialmente 0

  initMercadoPago(mercadoPagoKey);

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

  const handleBuy = async () => {
    const calculatePrice = cart.reduce((total, product) => {
      return total + product.price * product.cantidad;
    }, 0);
    setTotalPrice(calculatePrice); // Actualizar el precio total

    const id = await createPreference(calculatePrice);

    if (id) {
      setPreferenceId(id); // Establecer preferenceId en el estado
    }
  };

  useEffect(() => {
    // Calcular el precio total y actualizar el estado
    const calculatePrice = cart.reduce((total, product) => {
      return total + product.price * product.cantidad;
    }, 0);
    setTotalPrice(calculatePrice);
  }, [cart]);

  useEffect(() => {
    dispatch(getUserByName(name));
    if (userId) {
      dispatch(getproductCart(userId));
    }
  }, [dispatch, name, userId]);

  return (
    <div className="create-product">
      <h2>Carrito de Compra</h2>
      <Cards products={cart} />
      <h2>Precio Total : ${totalPrice}</h2> {/* Mostrar el precio total */}
      <button className="btn-clear-all" onClick={handleBuy}>
        Comprar
      </button>
      <Link to={"/"}>
        <button className={styles.backButton}>⬅</button>
      </Link>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
};

export default CartView;
