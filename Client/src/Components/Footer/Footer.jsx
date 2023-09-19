import React from "react";
import styles from "./Footer.module.css";
import MapComponent from "../Mapa/MapComponent";

import { BsInstagram, BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
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
              <a
                href="https://www.instagram.com/espacio_flipante/"
                target="_blank"
              >
                <BsInstagram />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/p/Espacio-Flipante-100087886206668/"
                target="_blank"
              >
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
          <li>E-Shop</li>
          <li>Inicio</li>
          <li>Ofertas</li>
          <li>Catálogo</li>
        </ul>

        <ul className={styles.helpData}>
          <li>¿Necesitas ayuda?</li>
          <a href="https://www.indian.com.uy/public/imgs/wysiwyg/1676909775/0x0/1-guia-de-talles-actualizada-01.jpg">
            Guía de talles
          </a>
          <li>Centro de ayuda</li>
        </ul>

        <ul className={styles.companyData}>
          <li>Legales</li>
          <li>Devoluciones</li>
          <li>Reembolso</li>
          <li>Envíos</li>
          <li>Privacidad</li>
          <li>Términos</li>
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
