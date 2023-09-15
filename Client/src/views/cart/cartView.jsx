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
import Swal from "sweetalert2"; // Importa SweetAlert2

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
      console.log(error);
    }
  };

  const handleBuy = async () => {
    // Mostrar la alerta de confirmación
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
        const id = await createPreference(totalPrice);
        if (id) {
          setPreferenceId(id);
        }
        try {
          for (const product of cart) {
            const {
              productId: productId,
              cantidad: quantity,
              price,
              sizeId,
            } = product;
            const totalPrice = quantity * price;
            dispatch(addOrder(userId, productId, sizeId, quantity, totalPrice));
          }
          dispatch(removeCart(userId));
        } catch (error) {
          console.error("Error al procesar la compra:", error);
        }
      }
    });
  };

  // Función para mostrar una alerta de confirmación antes de eliminar el carrito
  const handleDelete = (userId) => {
    // Utiliza SweetAlert2 para mostrar una alerta de confirmación
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
        // Si el usuario confirmó, llama a la acción para eliminar el carrito completo
        try {
          dispatch(removeCart(userId));

          // Después de eliminar el carrito, puedes redirigir al usuario a la página de inicio u otra página
          // Reemplaza '/home' con la ruta a la página a la que deseas redirigir al usuario
          window.location.href = "/cart";
        } catch (error) {
          console.error("Error al eliminar el carrito:", error);
        }
      }
    });
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartNav}>
        <NavBar />
        <SearchBar />
      </div>
      <h2>Carrito de Compra</h2>
      <button onClick={() => handleDelete(user[0].id)}>
        Eliminar Carrito Completo
      </button>

      <CartCards
        products={cart}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
      />
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
