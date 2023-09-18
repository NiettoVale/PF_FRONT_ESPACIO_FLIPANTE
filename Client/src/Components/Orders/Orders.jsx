import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  paymentOrder,
  deleteOrders,
} from "../../Redux/actions/productsActions";
import Swal from "sweetalert2";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import styles from "./Orders.module.css";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ArrayOrders, setArrayOrders] = useState([]);
  const back = process.env.REACT_APP_BACK;
  const user = useSelector((state) => state.infoUser);
  // Info Mercado Pago
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Obtén los parámetros que necesitas
  const collectionStatus = queryParams.get("collection_status");
  const status = queryParams.get("status");

  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }

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
          if (storedOrders) {
            storedOrders.forEach((order) => {
              const { userId, productId, sizeId, quantity, totalPrice } = order;
              dispatch(
                paymentOrder(userId, productId, sizeId, quantity, totalPrice)
              );
              dispatch(deleteOrders(user[0].id));
            });
          }
        }
        if (userId > 0) {
          // Si no se cumple la condición, obtén datos de la API
          dispatch(deleteOrders(userId));
          const response = await axios.get(`${back}order/${userId}`);
          const data = response.data;
          setArrayOrders(data); // Actualiza el estado con los datos de la API
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        // Maneja el error según tu lógica (por ejemplo, mostrar un mensaje al usuario)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al obtener los datos de la API o al pagar los productos.",
        });
      }
    };
    fetchOrders(); // Llama a la función para cargar los datos
  }, [dispatch, status, collectionStatus]);

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
