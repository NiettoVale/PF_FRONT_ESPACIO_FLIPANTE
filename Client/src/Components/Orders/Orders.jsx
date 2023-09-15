import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { paymentOrder } from "../../Redux/actions/productsActions";
import Swal from "sweetalert2";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import styles from "./Orders.module.css";

const Orders = () => {
  const dispatch = useDispatch();
  const [ArrayOrders, setArrayOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  // Info Mercado Pago
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Obtén los parámetros que necesitas
  const collectionStatus = queryParams.get("collection_status");
  const status = queryParams.get("status");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
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
       
          setArrayOrders(data); // Actualiza el estado con los datos de la API
        }
      } catch (error) {
        
        // Maneja el error según tu lógica (por ejemplo, mostrar un mensaje al usuario)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al obtener los datos de la API.",
        });
      }
    };

    fetchOrders(); // Llama a la función para cargar los datos
  }, [dispatch, status, collectionStatus, userId]);

  return (
    <div>
      <SideBar />
      <div className={styles.orderscontainer}>
        {ArrayOrders.map((order) => (
          <div className={styles.ordercard} key={order.id}>
            <p>Compra {order.id}</p>
            <p>Producto: {order.productName}</p>
            <Link to={`/detail-order/${order.id}`}>Ver Detalle de Compra</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
