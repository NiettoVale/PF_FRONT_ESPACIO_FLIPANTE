import React, { useEffect, useState } from "react";
import Cards from "../../Components/cards/cards.component";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import {
  getproductCart,
  getUserByName,
  removeproductCart,
} from "../../Redux/actions/productsActions";
import { Link } from "react-router-dom";
import styles from "../Detail/Detail.module.css";

const back = process.env.REACT_APP_BACK;

const CartView = () => {
  const mercadoPagoKey = process.env.REACT_APP_MERCADO_PAGO_KEY;

  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const cart = useSelector((state) => state.myCart);
  const dispatch = useDispatch();
  // Información del Usuario

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

  // Inicializar Mercado Pago
  useEffect(() => {
    initMercadoPago(mercadoPagoKey);
  }, [mercadoPagoKey]);

  useEffect(() => {
    // Función para verificar el estado del pago
    const checkPaymentStatus = async () => {
      try {
        // Obtén el ID de pago de la URL actual (puedes analizar la URL o usar window.location)
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get("payment_id");

        // Realiza una solicitud al servidor para verificar el estado del pago
        //const response = await axios.get(
        //  `http://localhost:3001/check_payment_status?payment_id=${paymentId}`
        //);

        // Aquí puedes procesar la respuesta y mostrar el resultado al usuario
        console.log("Estado de la compra:", urlParams, paymentId);
      } catch (error) {
        console.error("Error al verificar el estado de la compra:", error);
      }
    };

    // Verifica el estado del pago cuando se carga la página
    checkPaymentStatus();
  }, []);

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
    const calculatePrice = cart.reduce((total, product) => {
      return total + product.price * product.cantidad;
    }, 0);
    setTotalPrice(calculatePrice); // Actualizar el precio total

    const id = await createPreference(calculatePrice);

    if (id) {
      setPreferenceId(id); // Establecer preferenceId en el estado
    }
  };

  return (
    <div className="create-product">
      <h2>Carrito de Compra</h2>
      <Cards products={cart} />
      <h2>Precio Total : ${totalPrice}</h2>
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
