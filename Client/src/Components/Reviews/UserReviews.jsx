import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./UserReview.module.css"; // Importa tus estilos CSS Modules
import NavBar from "../NavBar/navBar";
import Footer from "../Footer/Footer";

const UserReviews = () => {
  const { userId } = useParams();
  const [userReviews, setUserReviews] = useState([]);
  
  useEffect(() => {
    const getReviewsById = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/reviews-user/${userId}`
        );

        if (!response.ok) {
          throw new Error(
            `Error al obtener las reseñas: ${response.statusText}`
          );
        }

        const data = await response.json();
        setUserReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    getReviewsById();
  }, [userId]);

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
      <NavBar />
      <div className={styles.userReviewsContainer}>
        {reviewsInRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.reviewRow}>
            {row.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.rating}>
                  Rating: {renderStars(review.rating)}
                </div>
                <p className={styles.comment}>Comentario: {review.comment}</p>
                <p className={styles.product}>Producto: {review.Product}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default UserReviews;
