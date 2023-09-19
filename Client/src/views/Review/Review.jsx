import React, { useState } from "react";
import styles from "../../Components/Rating/Rating.module.css";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import NavBar from "../../Components/NavBar/navBar";

const MySwal = withReactContent(Swal);

const ReviewForm = () => {
  const { userId, productId } = useParams();
  const navigate = useNavigate(); // Obtiene la función navigate

  const [formData, setFormData] = useState({
    comment: "",
    rating: 1,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:3001/reviews/${userId}/${productId}`;

    try {
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
        }).then(() => {
          navigate("/"); // Redirige a la página principal después de la alerta
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
    setFormData({ ...formData, rating: newRating });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <NavBar />
      <h2>Escribe tu reseña</h2>
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
