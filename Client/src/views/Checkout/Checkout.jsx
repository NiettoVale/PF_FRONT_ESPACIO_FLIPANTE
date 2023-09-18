import styles from "./Checkout.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Swal from "sweetalert2";
import axios from "axios";
import NavBar from "../../Components/NavBar/navBar";
import CountrySelect from "./CountrySelect";
import BuyButton from "../../Components/BuyButton/BuyButton";
import {
  getproductCart,
  getUserByName,
  addOrder,
  removeCart,
} from "../../Redux/actions/productsActions";

const Checkout = () => {
  //Info Extra
  const mercadoPagoKey = process.env.REACT_APP_MERCADO_PAGO_KEY;
  const back = process.env.REACT_APP_BACK;
  const dispatch = useDispatch();
  //Estados Globales
  const user = useSelector((state) => state.infoUser);
  const cart = useSelector((state) => state.myCart);
  //Estados Locales
  const [hasPurchased, setHasPurchased] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBuyButton, setShowBuyButton] = useState(false);
  //LocalStorage
  const name = localStorage.getItem("username");
  const googleEmail = localStorage.getItem("googleName");
  const googleName = localStorage.getItem("googleName");
  //Funciones
  let userId = 0;
  let userEmail = null;
  if (user.length > 0) {
    userId = user[0].id;
    userEmail = user[0].email;
  } else {
    userEmail = googleEmail;
  }

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
      console.error("Error al crear preferencia:", error);
    }
  };

  const handleBuy = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: "¿Estás seguro de realizar la compra?",
      text: "Una vez realizada la compra, no podrás deshacerla.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = await createPreference(totalPrice);
          if (id) {
            setPreferenceId(id);
            setShowBuyButton(true);
            setHasPurchased(true);
            // Procesa las órdenes primero
            for (const product of cart) {
              const { productId, cantidad: quantity, price, sizeId } = product;
              const totalPrice = quantity * price;
              dispatch(
                addOrder(
                  userId,
                  productId,
                  sizeId,
                  quantity,
                  totalPrice,
                  userEmail
                )
              );
            }
          }
        } catch (error) {
          console.error("Error al procesar la compra:", error);
        }
      }
    });
  };

  //UseEffects
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
    initMercadoPago(mercadoPagoKey);
  }, [mercadoPagoKey]);

  useEffect(() => {
    const calculatePrice = cart.reduce((total, product) => {
      return total + product.price * product.cantidad;
    }, 0);
    setTotalPrice(calculatePrice);
  }, [cart]);

  useEffect(() => {
    if (hasPurchased && showBuyButton) {
      dispatch(removeCart(userId));
    }
  }, [hasPurchased, showBuyButton, dispatch, userId]);

  return (
    <div>
      <div className={styles.checkNav}>
        <NavBar />
      </div>
      <h2 className={styles.checkTitle}>DATOS DE ENVIO</h2>

      <div className={styles.checkContainer}>
        <div className={styles.checkImage}></div>
        <div className={styles.checkForm}>
          <form>
            <div>
              <CountrySelect />
              <div className={styles.horizontal}>
                <input type="text" name="nombre" placeholder="Nombre" />
                <input type="text" name="apellido" placeholder="Apellido" />
              </div>

              <div className={styles.vertical}>
                <input
                  type="text"
                  name="DNI"
                  placeholder="  DNI / CUIT / CUIL"
                />
                <input type="text" name="direccion" placeholder="  Dirección" />
                <input
                  type="text"
                  name="apartamento"
                  placeholder="  Apartamento, local, piso"
                />
              </div>

              <div className={styles.horizontal}>
                <input type="text" name="cp" placeholder="Código Postal" />
                <input type="text" name="ciudad" placeholder="Ciudad" />
                <input type="text" name="Provincia" placeholder="Provincia" />
              </div>

              <div className={styles.vertical}>
                <input type="number" name="telefono" placeholder="  Teléfono" />
              </div>
            </div>
          </form>
          <div className={styles.checkButtons}>
            <a href="/cart">◀ Volver al carrito</a>
            <p>Precio Total: {totalPrice}</p>
            <button type="button" onClick={handleBuy} disabled={hasPurchased}>
              CONFIRMAR COMPRA
            </button>
          </div>
          {showBuyButton && (
            <div className={styles.overlay}>
              <BuyButton preferenceId={preferenceId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
