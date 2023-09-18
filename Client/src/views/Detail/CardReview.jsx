import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./Detail.module.css";

const CardReview = ({ reviewsProducts }) => {
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
    <div className={styles.carouselContainer}>
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {reviewsProducts.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <p>Comentario: {review.comment}</p>
            <div>
              <p className={styles.rating}>
                Rating: {renderStars(review.rating)}
              </p>
            </div>
            <p>Usuario: {review.user}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardReview;
