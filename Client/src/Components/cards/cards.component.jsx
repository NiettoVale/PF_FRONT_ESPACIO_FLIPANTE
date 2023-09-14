import Card from "../card/card.component";
import styles from "./cards.module.css";
import { useSelector } from "react-redux";

const Cards = ({ products }) => {
  const order = useSelector((state) => state.order);

  let sortedProducts = [];

  if (products.length > 0) {
    if (order === "asc" || order === "desc") {
      sortedProducts = [...products].sort((a, b) => {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    } else if (order === "priceAsc" || order === "priceDesc") {
      sortedProducts = [...products].sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        return order === "priceAsc" ? priceA - priceB : priceB - priceA;
      });
    }
  }

  return (
    <div className={styles.contenedorCards}>
      {sortedProducts.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          name={product.name}
          gender={product.gender}
          category={product.category}
          mainMaterial={product.mainMaterial}
          images={product.images}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default Cards;
