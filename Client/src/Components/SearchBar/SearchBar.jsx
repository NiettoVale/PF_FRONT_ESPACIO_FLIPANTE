import React from "react";
import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filterSearch(event.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="search"
        value={busqueda}
        onChange={handleChange}
        className={styles.searchInput}
      />
      <div className={styles.flexSpace}></div>
      <Link to={"/login"} className={styles.access}>
        ACCESO
      </Link>

      <Link className={styles.cart}>
        <AiOutlineShoppingCart />
      </Link>
    </div>
  );
}
