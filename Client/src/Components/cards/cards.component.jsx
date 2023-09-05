import Card from "../card/card.component";
import styles from "./cards.module.css";
import { useSelector } from "react-redux";

const Cards = ({ products }) => {
  const orderByName = useSelector((state) => state.order);
  const sortedProducts = [...products].sort((a, b) => {
    if (orderByName === "asc") {
      return a.name.localeCompare(b.name);
    } else if (orderByName === "desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

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
