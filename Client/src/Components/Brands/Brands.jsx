import React from "react";
import styles from "./Brands.module.css";

const Brands = () => {
  return (
    <div className={styles.brandsContainer}>
      <div className={styles.brandsImages}>
        <div className={styles.adidas}></div>
        <div className={styles.boss}></div>
        <div className={styles.lacoste}></div>
        <div className={styles.converse}></div>
        <div className={styles.fila}></div>
      </div>
    </div>
  );
};

export default Brands;
