import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderCard from "./SliderCard";
import PropTypes from "prop-types";
import styles from "./ProductSlider.module.css";
import "swiper/swiper-bundle.css";

const ProductSlider = ({ products }) => {
  const first10Products = products.slice(0, 10);

  return (
    <div className={styles.sliderContainer}>
      <h1>PRODUCTOS DESTACADOS</h1>

      <div className={styles.sliderCards}>
        <Swiper
          freeMode={true}
          grabCursor={true}
          className={styles.swiper}
          slidesPerView={5}
          spaceBetween={10}
        >
          {first10Products.map((product) => (
            <SwiperSlide className={styles.product} key={product.id}>
              <SliderCard
                className={styles.sliderCard}
                id={product.id}
                name={product.name}
                images={product.images}
                price={product.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

ProductSlider.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductSlider;
