// CardAbout.js
import React from "react";
import styles from "./cardAbout.module.css";

import { TbRotate360 } from "react-icons/tb";

const CardAbout = ({ name, image, github, linkedin, description }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardFront}>
        <img src={image} alt={name} />
        <h3>{name}</h3>

        <div>
          <p>Volteame!!!</p>
          <TbRotate360 />
        </div>
      </div>
      <div className={styles.cardBack}>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardLinks}>
          <a href={github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardAbout;
