import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserReview.module.css";
import NavBar from "../NavBar/navBar";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";

const UserReviews = () => {
  const { userId } = useParams();
  const [userReviews, setUserReviews] = useState([]);
  const [notReviews, setNotReviews] = useState(false);
  const navigate = useNavigate();

  // Función para verificar si el usuario no tiene reseñas y mostrar la alerta
  const checkForNoReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/reviews-user/${userId}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setUserReviews(data);
      } else if (response.status === 404) {
        // Mostrar una alerta indicando que no hay reseñas
        setNotReviews(true);

        // Utiliza SweetAlert2 para mostrar la alerta
        Swal.fire({
          icon: "info",
          title: "No tienes reseñas",
          text: "¿Qué te gustaría hacer?",
          showCancelButton: true,
          confirmButtonText: "Ir a tu perfil",
          cancelButtonText: "Ir a mis compras",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir al usuario a la página userProfile
            navigate("/userProfile");
          } else {
            // Redirigir al usuario a la página de compras
            navigate("/orders");
          }
        });
      } else {
        // Manejo de errores aquí si es necesario
      }
    } catch (error) {
      // Manejo de errores aquí si es necesario
    }
  };

  // Llama a la función para verificar si no hay reseñas al cargar el componente
  useEffect(() => {
    checkForNoReviews();
  }, [userId, navigate]);

  // Divide las reseñas en grupos de tres por fila
  const reviewsInRows = [];
  for (let i = 0; i < userReviews.length; i += 3) {
    reviewsInRows.push(userReviews.slice(i, i + 3));
  }

  // Función para convertir el rating en estrellas
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className={styles.starFilled}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={styles.starEmpty}>
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div>
      {!notReviews ? (
        <div>
          <NavBar />
          <div className={styles.userReviewsContainer}>
            {reviewsInRows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.reviewRow}>
                {row.map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.rating}>
                      Rating: {renderStars(review.rating)}
                    </div>
                    <p className={styles.comment}>
                      Comentario: {review.comment}
                    </p>
                    <p className={styles.product}>Producto: {review.Product}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserReviews;
