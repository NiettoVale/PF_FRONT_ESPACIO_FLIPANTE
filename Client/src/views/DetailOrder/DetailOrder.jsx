import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../Components/NavBar/navBar";

const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(""); // Nuevo estado para el userId

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios(`http://localhost:3001/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error("Error al obtener la orden:", error);
      }
    };
    getOrder();
  }, [id]);

  useEffect(() => {
    // Extraer el userName de la orden
    const name = order.userName;

    // Verificar si el userName está disponible
    if (name) {
      const getUser = async () => {
        try {
          const { data } = await axios(`http://localhost:3001/profile/${name}`);
          setUser(data.id); // Establecer el userId desde la data del usuario
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
        }
      };
      getUser();
    }
  }, [order]);

  return (
    <div>
      <NavBar />
      <h1>Usuario: {order.userName}</h1>
      <h2>Producto: {order.productName}</h2>
      <p>Cantidad: {order.quantity}</p>
      <p>Precio Total: {order.totalPrice}</p>
      <p>Fecha: {order.purchaseDate}</p>
      <Link to={`/review/${user}/${order.productId}`}>
        <button>Dejar reseña</button>
      </Link>
      {order.image &&
        Array.isArray(order.image) &&
        order.image.map((img, index) => (
          <img key={index} src={img} alt={`Ropa ${index}`} />
        ))}
    </div>
  );
};

export default DetailOrder;
