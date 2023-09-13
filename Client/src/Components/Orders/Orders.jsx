import React from "react";
import styles from "../userProfile/userProfile.module.css";
import SideBar from "../SideBar/SideBar";
import { useParams } from "react-router-dom";
const Orders = () => {
  const { preferenceId } = useParams();
  console.log(preferenceId);
  return (
    <div>
      <SideBar />
      <h2 className={styles.purchaseTitle}>HISTORIAL DE COMPRAS</h2>
      <div>{preferenceId}</div>
      <div className={styles.purchaseContainer}>
        <p className={styles.singlePurchase}>COMPRA 1</p>
        <p className={styles.singlePurchase}>COMPRA 2</p>
        <p className={styles.singlePurchase}>COMPRA 3</p>
        <p className={styles.singlePurchase}>COMPRA 4</p>
        <p className={styles.singlePurchase}>COMPRA 5</p>
        <p className={styles.singlePurchase}>COMPRA 6</p>
        <p className={styles.singlePurchase}>COMPRA 7</p>
        <p className={styles.singlePurchase}>COMPRA 8</p>
        <p className={styles.singlePurchase}>COMPRA 9</p>
        <p className={styles.singlePurchase}>COMPRA 10</p>
        <p className={styles.singlePurchase}>COMPRA 11</p>
        <p className={styles.singlePurchase}>COMPRA 12</p>
        <p className={styles.singlePurchase}>COMPRA 13</p>
        <p className={styles.singlePurchase}>COMPRA 14</p>
        <p className={styles.singlePurchase}>COMPRA 15</p>
        <p className={styles.singlePurchase}>COMPRA 16</p>
      </div>
    </div>
  );
};

export default Orders;
