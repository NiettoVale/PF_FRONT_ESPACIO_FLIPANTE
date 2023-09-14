import React from "react";
import styles from "../userProfile/userProfile.module.css";
import SideBar from "../SideBar/SideBar";
import { useParams } from "react-router-dom"; // Importa el hook useParams de React Router

const Orders = () => {
  // Usa el hook useParams para acceder a todos los parámetros de la URL
  const {
    collection_id,
    collection_status,
    payment_id,
    status,
    external_reference,
    payment_type,
    merchant_order_id,
    preference_id,
    site_id,
    processing_mode,
    merchant_account_id,
  } = useParams();

  // Verifica si alguno de los parámetros es undefined o nulo
  if (
    !collection_id ||
    !collection_status ||
    !payment_id ||
    !status ||
    !external_reference ||
    !payment_type ||
    !merchant_order_id ||
    !preference_id ||
    !site_id ||
    !processing_mode ||
    !merchant_account_id
  ) {
    return (
      <div>
        <h2>HISTORIAL DE COMPRAS</h2>
        <p>
          Lo sentimos, algunos parámetros de la URL son nulos o están
          indefinidos.
        </p>
      </div>
    );
  }

  // Si todos los parámetros están presentes, muestra la información
  return (
    <div>

      <SideBar />
      <h2 className={styles.purchaseTitle}>HISTORIAL DE COMPRAS</h2>
      <h2>HISTORIAL DE COMPRAS</h2>
      <p>collection_id: {collection_id}</p>
      <p>collection_status: {collection_status}</p>
      <p>payment_id: {payment_id}</p>
      <p>status: {status}</p>
      <p>external_reference: {external_reference}</p>
      <p>payment_type: {payment_type}</p>
      <p>merchant_order_id: {merchant_order_id}</p>
      <p>preference_id: {preference_id}</p>
      <p>site_id: {site_id}</p>
      <p>processing_mode: {processing_mode}</p>
      <p>merchant_account_id: {merchant_account_id}</p>
    </div>
  );
};

export default Orders;
