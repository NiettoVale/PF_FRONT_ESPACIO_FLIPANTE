import React from "react";
import styles from "./Footer.module.css";
import MapComponent from "../Mapa/MapComponent";
import { Link } from "react-router-dom";
import { BsInstagram, BsFacebook } from "react-icons/bs";

const Footer = () => {
  const handleClickScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClickCatalog = () => {
    window.scrollTo({ top: 1500, behavior: "smooth" });
  };
  return (
    <div className={styles.footer}>
      <div className={styles.leftFooter}>
        <h1>
          ESPACIO <br />
          FLIPANTE
        </h1>
        <ul>
          <li>Síguenos!</li>
          <div className={styles.redes}>
            <li>
              <a href="https://www.instagram.com/espacio_flipante/">
                <BsInstagram />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/p/Espacio-Flipante-100087886206668/">
                <BsFacebook />
              </a>
            </li>
          </div>
        </ul>
      </div>

      <div className={styles.mapContainer}>
        <MapComponent />
      </div>

      <div className={styles.rightFooter}>
        <ul className={styles.appData}>
          <Link to={"/"}>
            <li onClick={handleClickScroll}>Inicio</li>
          </Link>
          <li onClick={handleClickCatalog}>Catálogo</li>
        </ul>

        <ul className={styles.contactData}>
          <li>Contacto</li>
          <li>flipante@eshop.com</li>
          <li>+54 11 123-456-789</li>
          <Link to={"/about"}>
            <li>¿Quienes somos?</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
