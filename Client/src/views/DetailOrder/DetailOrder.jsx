import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});

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

  console.log(order);

  return (
    <div>
      <h1>Usuario: {order.userName}</h1>
      <h2>Producto: {order.productName}</h2>
      <p>Cantidad: {order.quantity}</p>
      <p>Precio Total: {order.totalPrice}</p>
      <p>Fecha: {order.purchaseDate}</p>
      <Link to={`/review/${id}/${order.productId}`}>
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
