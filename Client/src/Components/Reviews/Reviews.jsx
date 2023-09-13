import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
  // El segundo argumento [] asegura que el efecto solo se ejecute una vez al montar el componente

  const renderStars = (rating) => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? faStar : ["far", "star"]}
          style={{ color: "gold" }}
        />
      );
    }
    return starArray;
  };

  return (
    <div>
      {allReviews.map((review) => (
        <div key={review.id}>
          <p>Comentario: {review.comment}</p>
          <div>
            <p>Rating: {renderStars(review.rating)}</p>
          </div>
          <p>Usuario: {review.User}</p>
          <p>Producto: {review.Product}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
