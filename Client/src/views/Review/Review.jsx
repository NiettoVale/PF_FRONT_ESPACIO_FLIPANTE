import React, { useState } from "react";
import styles from "../../Components/Rating/Rating.module.css"; // Agrega estilos CSS personalizados
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ReviewForm = () => {
  const { userId, productId } = useParams();

  // Mover la lógica de Rating a ReviewForm
  const [formData, setFormData] = useState({
    comment: "",
    rating: 1,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:3001/reviews/${userId}/${productId}`;
    try {
      console.log(formData);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        MySwal.fire({
          icon: "success",
          title: "Éxito",
          text: "Mensaje de éxito",
        });
      }
      if (response.status === 404) {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating }); // Actualiza el estado de rating cuando cambia la calificación
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Escribe tu reseña</h2>
      {/* Rating se encuentra integrado en ReviewForm */}
      <div className={styles.rating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= formData.rating ? styles.starfilled : styles.starempty
            }
            onClick={() => handleRatingChange(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <label htmlFor="comment">Comentario</label>
      <input
        type="text"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
      />
      <form onSubmit={handleSubmit}>
        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
};

export default ReviewForm;
