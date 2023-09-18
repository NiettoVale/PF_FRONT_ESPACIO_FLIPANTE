import React, { useEffect, useState } from "react";
import CartCards from "./CartCards/CartCards.component";
import { useDispatch, useSelector } from "react-redux";
import {
  getproductCart,
  getUserByName,
  removeCart,
} from "../../Redux/actions/productsActions";
import NavBar from "../../Components/NavBar/navBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import styles from "./CartView.module.css";
import Swal from "sweetalert2";

const CartView = () => {
  const name = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");
  const user = useSelector((state) => state.infoUser);
  const cart = useSelector((state) => state.myCart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }

  useEffect(() => {
    if (!googleName) {
      dispatch(getUserByName(name));
    } else {
      dispatch(getUserByName(googleName));
    }

    if (userId) {
      dispatch(getproductCart(userId));
    }
  }, [dispatch, name, userId, googleName]);

  useEffect(() => {
    const calculatePrice = cart.reduce((total, product) => {
      return total + product.price * product.cantidad;
    }, 0);
    setTotalPrice(calculatePrice);
  }, [cart]);

  useEffect(() => {
    localStorage.removeItem("orders");
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará todos los productos del carrito. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          dispatch(removeCart(userId));
          // Puedes redirigir al usuario después de eliminar el carrito si es necesario
        } catch (error) {
          console.error("Error al eliminar el carrito:", error);
        }
      }
    });
  };

  return (
    <div className={styles.fullContainer}>
      <div className={styles.cartNav}>
        <NavBar />
        <SearchBar />
      </div>
      {cart.length > 0 ? (
        <div>
          <h2 className={styles.cartTitle}>Carrito de Compra</h2>

          <CartCards
            products={cart}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
          />

          <button className={styles.deleteButton} onClick={handleDelete}>
            Eliminar carrito
          </button>

          <div className={styles.lastFlex}>
            <p>Total de la compra</p>
            <h2 className={styles.totalPrice}>${totalPrice}</h2>
            <Link to={"/checkout"}>
              <button className={styles.buyButton}>Continuar Compra</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1>El carrito se encuentra vacío</h1>
          <Link to={"/"}>
            <button className={styles.catalogButton}>Agregar Productos</button>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CartView;
