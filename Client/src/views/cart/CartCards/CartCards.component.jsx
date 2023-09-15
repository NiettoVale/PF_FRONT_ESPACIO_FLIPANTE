import CartCard from "../CartCard/CartCard.component";
import styles from "./CartCards.module.css";
import { useSelector } from "react-redux";

const Cards = ({ products, setTotalPrice, totalPrice }) => {
  const orderByName = useSelector((state) => state.order);
  let sortedProducts = []; // Inicializa la variable fuera del condicional

  if (products.length > 0) {
    sortedProducts = [...products].sort((a, b) => {
      if (orderByName === "asc") {
        return a.name.localeCompare(b.name);
      } else if (orderByName === "desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }

  return (
    <div className={styles.contenedorCards}>
      {sortedProducts.map((product) => (
        <CartCard
          key={product.id}
          size={product.sizeId}
          id={product.id}
          nameProduct={product.name}
          gender={product.gender}
          category={product.category}
          mainMaterial={product.mainMaterial}
          images={product.images}
          price={product.price}
          cantidad={product.cantidad}
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
        />
      ))}
    </div>
  );
};

export default Cards;
