import React from "react";
import styles from "./Footer.module.css";
import MapComponent from "../Mapa/MapComponent"

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.leftFooter}>
        <h1>
          ESPACIO <br />
          FLIPANTE
        </h1>

        <ul>
          <li>Sígueno en nuestras redes</li>
          <li>Instagram</li>
          <li>Facebook</li>
          <li>Twitter</li>
        </ul>
      </div>
      <MapComponent/>
      <div className={styles.rightFooter}>
        <ul className={styles.appData}>
          <li>Shop</li>
          <li>Inicio</li>
          <li>Ofertas</li>
          <li>Catálogo</li>
        </ul>

        <ul className={styles.helpData}>
          <li>¿Necesitas ayuda?</li>
          <li>Guía de talles</li>
          <li>Centro de ayuda</li>
        </ul>

        <ul className={styles.companyData}>
          <li>Flipante</li>
          <li>Nosotros</li>
          <li>Locales</li>
        </ul>

        <ul className={styles.hourData}>
          <li>Horarios</li>
          <li>08am - 01pm</li>
          <li>04pm - 08pm</li>
        </ul>

        <ul className={styles.contactData}>
          <li>Contacto</li>
          <li>Correo electrónico</li>
          <li>Teléfonos</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
