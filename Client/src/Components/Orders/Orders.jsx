import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { paymentOrder } from "../../Redux/actions/productsActions";
const Orders = () => {
  const dispatch = useDispatch();

  //Info Mercado Pago
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Obtén los parámetros que necesitas
  const collectionId = queryParams.get("collection_id");
  const collectionStatus = queryParams.get("collection_status");
  const paymentId = queryParams.get("payment_id");
  const status = queryParams.get("status");
  useEffect(() => {
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
        dispatch(paymentOrder(userId, productId, sizeId, quantity, totalPrice));
      });
    } else if (status === null || status == "null" || !status) {
      localStorage.removeItem("orders");
      window.alert("Compra No Confirmada/Realizada");
    }
  }, [dispatch, status]);

  return (
    <div>
      <h2>HISTORIAL DE COMPRAS</h2>
      {collectionId && collectionStatus && paymentId ? (
        <div>
          <p>Detalles de la confirmación de pago:</p>
          <p>Collection ID: {collectionId}</p>
          <p>Collection Status: {collectionStatus}</p>
          <p>Payment ID: {paymentId}</p>
          <p>Status: {status}</p>
          {/* Mostrar más detalles según sea necesario */}
        </div>
      ) : (
        <p>
          Lo sentimos, algunos parámetros de la URL son nulos o están
          indefinidos.
        </p>
      )}
    </div>
  );
};

export default Orders;
