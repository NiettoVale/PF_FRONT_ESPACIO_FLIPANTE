import React from "react";
import NavBar from "../../Components/NavBar/navBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Footer from "../../Components/Footer/Footer";

import styles from "./BadURL.module.css";

const BadURL = () => {
  return (
    <div className={styles.bad}>
      <div className={styles.badNav}>
        <NavBar />
        <SearchBar />
      </div>
      <div>
        <h1>¡UPS!</h1>
        <h2>Esta página no existe.</h2>
        <p>
          La URL que has ingresado es incorrecta o la página que buscas no está
          disponible.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default BadURL;
