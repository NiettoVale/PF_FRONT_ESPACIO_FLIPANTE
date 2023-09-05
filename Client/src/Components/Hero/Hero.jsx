import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  const handleClickScroll = () => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <h3>DEL 2 AL 20 DE SEPTIEMBRE</h3>
        <h1>HOT SALE</h1>
        <h2>HASTA 40% OFF</h2>
        <button onClick={handleClickScroll}>VER MAS</button>
      </div>
    </div>
  );
};

export default Hero;
