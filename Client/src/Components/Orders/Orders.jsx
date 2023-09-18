import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { paymentOrder } from "../../Redux/actions/productsActions";
import Swal from "sweetalert2";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import styles from "./Orders.module.css";

const Orders = () => {
  const dispatch = useDispatch();
  const [ArrayOrders, setArrayOrders] = useState([]);
  const [userId, setUserId] = useState();
  const name =
    localStorage.getItem("username") || localStorage.getItem("googleName");

  // Info Mercado Pago
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Obtén los parámetros que necesitas
  const collectionStatus = queryParams.get("collection_status");
  const status = queryParams.get("status");

  const regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const fetchUser = async () => {
      if (regexEmail.test(name)) {
        const { data } = await axios(`http://localhost:3001/user/${name}`);
        setUserId(data.id);
      } else {
        const { data } = await axios(`http://localhost:3001/profile/${name}`);
        setUserId(data.id);
      }
    };

    const fetchOrders = async () => {
      try {
        // Verifica si userId está definido
        if (userId) {
          // Obtener datos del Local Storage
          const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

          // Verifica si se ha recibido la confirmación de pago (status: success)
          if (
            status === "approved" &&
            storedOrders.length > 0 &&
            collectionStatus === "approved"
          ) {
            // Itera sobre cada orden almacenada en el Local Storage y ejecuta paymentOrder
            storedOrders.forEach((order) => {
              const { userId, productId, sizeId, quantity, totalPrice } = order;
              dispatch(
                paymentOrder(userId, productId, sizeId, quantity, totalPrice)
              );
            });
          } else {
            // Si no se cumple la condición, obtén datos de la API
            const response = await axios.get(
              `http://localhost:3001/order/${userId}`
            );
            const data = response.data;

            if (data.length > 0) {
              setArrayOrders(data);
            } else {
              // Si no hay órdenes, muestra la alerta
              showBuyAlert();
            }
          }
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        // Maneja el error según tu lógica (por ejemplo, mostrar un mensaje al usuario)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al obtener los datos de la API.",
        });
      }
    };

    fetchUser();
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, status, collectionStatus, userId, name]);

  // Función para mostrar la alerta de compra
  const showBuyAlert = () => {
    Swal.fire({
      icon: "question",
      title: "No tienes órdenes",
      text: "¿Quieres comprar productos ahora?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir al usuario a la página principal ("/")
        window.location.href = "/";
      } else {
        // Redirigir al usuario a su perfil ("/userProfile")
        window.location.href = "/userProfile";
      }
    });
  };

  return (
    <div>
      <SideBar />
      <div className={styles.orderscontainer}>
        {ArrayOrders.length > 0
          ? ArrayOrders.map((order) => (
              <div className={styles.ordercard} key={order.id}>
                <p>Compra {order.id}</p>
                <p>Producto: {order.productName}</p>
                <Link to={`/detail-order/${order.id}`}>
                  Ver Detalle de Compra
                </Link>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Orders;
