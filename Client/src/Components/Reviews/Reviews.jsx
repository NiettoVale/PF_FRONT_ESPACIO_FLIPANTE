import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserReview.module.css"; // Importa tus estilos CSS Modules
import { Link } from "react-router-dom";
import NavBar from "../NavBar/navBar";
import Footer from "../Footer/Footer";

const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/reviews");
        if (response.ok) {
          const data = await response.json();
          setAllReviews(data);
        } else {
          console.error(
            "Error en la respuesta del servidor:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating) => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? faStar : ["far", "star"]}
          className={styles.starFilled} // Aplica la clase CSS para estrellas llenas
        />
      );
    }
    return starArray;
  };

  return (
    <div>
      <NavBar />
      <div className={styles.userReviewsContainer}>
        {allReviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <p>Comentario: {review.comment}</p>
            <div>
              <p className={styles.rating}>
                Rating: {renderStars(review.rating)}
              </p>
            </div>
            <p>Usuario: {review.User}</p>
            <p>Producto: {review.Product}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
