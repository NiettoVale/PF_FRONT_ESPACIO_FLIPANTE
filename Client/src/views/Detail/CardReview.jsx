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
  console.log(reviewsProducts);
  return (
    <div className={styles.carouselContainer}>
      {reviewsProducts.length > 0 ? (
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={reviewsProducts.length}
          slidesToScroll={2}
        >
          {reviewsProducts.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewCardContainer}>
                <p className={styles.reviewText}>{review.comment}</p>
                <div>
                  <p className={styles.rating}>{renderStars(review.rating)}</p>
                </div>
                <p>{review.user}</p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className={styles.reviewCard}>
          <div className={styles.reviewCardContainer}>
            <p className={styles.reviewText}>No hay reseñas disponibles.</p>
            <div>
              <p className={styles.rating}>- - - - -</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardReview;
