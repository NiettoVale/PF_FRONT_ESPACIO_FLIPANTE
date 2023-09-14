import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Orders = () => {
  const location = useLocation();
  console.log(location.search);
  const queryParams = new URLSearchParams(location.search);

  // Obtén los parámetros que necesitas
  const collectionId = queryParams.get("collection_id");
  const collectionStatus = queryParams.get("collection_status");
  const paymentId = queryParams.get("payment_id");
  const status = queryParams.get("status");
  // y así sucesivamente para otros parámetros relevantes

  // Ahora puedes utilizar estos valores en tu componente
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
