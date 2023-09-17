import React, { useEffect, useState } from "react";
import CartCards from "./CartCards/CartCards.component";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import {
  getproductCart,
  getUserByName,
  removeCart,
  addOrder,
} from "../../Redux/actions/productsActions";

import NavBar from "../../Components/NavBar/navBar";
import SearchBar from "../../Components/SearchBar/SearchBar";

import { Link } from "react-router-dom";
import styles from "./CartView.module.css";
import Swal from "sweetalert2";

const back = process.env.REACT_APP_BACK;

const CartView = () => {
  const mercadoPagoKey = process.env.REACT_APP_MERCADO_PAGO_KEY;
  const name = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");
  const user = useSelector((state) => state.infoUser);
  const cart = useSelector((state) => state.myCart);
  const dispatch = useDispatch();

  const [preferenceId, setPreferenceId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }

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

  const handleBuy = async () => {
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

            // Procesa las órdenes primero
            for (const product of cart) {
              const { productId, cantidad: quantity, price, sizeId } = product;
              const totalPrice = quantity * price;
              dispatch(
                addOrder(userId, productId, sizeId, quantity, totalPrice)
              );
            }

            // Luego, elimina el carrito después de un retraso de 10 segundos
            setTimeout(() => {
              dispatch(removeCart(userId));
            }, 10 * 1000);
          }
        } catch (error) {
          console.error("Error al procesar la compra:", error);
        }
      }
    });
  };
  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará todos los productos del carrito. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          dispatch(removeCart(userId));
          // Puedes redirigir al usuario después de eliminar el carrito si es necesario
        } catch (error) {
          console.error("Error al eliminar el carrito:", error);
        }
      }
    });
  };

  return (
    <div className={styles.fullContainer}>
      <div className={styles.cartNav}>
        <NavBar />
        <SearchBar />
      </div>
      {cart.length > 0 ? (
        <div>
          <h2 className={styles.cartTitle}>Carrito de Compra</h2>
          <Link to={"/"}>
            <button className={styles.catalogButton}>Volver</button>
          </Link>
          <br />
          <br />
          <button className={styles.deleteButton} onClick={handleDelete}>
            Eliminar Carrito Completo
          </button>

          <CartCards
            products={cart}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
          />
          <h2 className={styles.totalPrice}>Precio Total: ${totalPrice}</h2>
          <button className={styles.buyButton} onClick={handleBuy}>
            Comprar
          </button>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      ) : (
        <div>
          <h1>El carrito se encuentra vacío</h1>
          <Link to={"/"}>
            <button className={styles.catalogButton}>Agregar Productos</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartView;
