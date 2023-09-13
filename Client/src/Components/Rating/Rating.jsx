import React, { useState } from "react";
import styles from "./Rating.module.css"; // Agrega estilos CSS personalizados

const Rating = ({ initialValue, onChange }) => {
  const [rating, setRating] = useState(initialValue);

  const handleClick = (newRating) => {
    setRating(newRating);
    onChange(newRating); // Llamar a la función de devolución de llamada para manejar la valoración
  };

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? styles.starfilled : styles.starempty}
          onClick={() => handleClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Rating;
