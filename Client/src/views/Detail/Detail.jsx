import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import NavBar from "../../Components/NavBar/navBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getproductCart,
  addFavorite,
  addproductCart,
  getFavorites,
  getUserByName,
  removeFromFavorites,
  removeproductCart,
} from "../../Redux/actions/productsActions";
import Swal from "sweetalert2"; // Importa SweetAlert2

export default function Detail() {
  const back = process.env.REACT_APP_BACK;

  //----ESTADOS
  const { id } = useParams();
  const [cardDetail, setCardDetail] = useState({});
  const [imageDetail, setImageDetail] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productCart, setProductCart] = useState(false);
  const [availableSizes, setAvailableSizes] = useState([]); // Estado para tallas disponibles
  const [selectedSize, setSelectedSize] = useState(null); // Estado para talla seleccionada
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartproduct, setCartProduct] = useState(null);

  const name = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");
  const user = useSelector((state) => state.infoUser);
  const favorites = useSelector((state) => state.myFavorites);
  const cart = useSelector((state) => state.myCart);

  //----USER
  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }

  const dispatch = useDispatch();

  //----FUNCIONES

  const handleCart = () => {
    if (!googleName & !name) {
    console.log("usuario", !name);
    if (
      googleName === null ||
      googleName === "" ||
      googleName === undefined ||
      name === null ||
      name === "" ||
      name === undefined
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes iniciar sesión o registrarte para agregar al carrito",
      });
    } else {
      if (productCart) {
        dispatch(removeproductCart(userId, id, selectedSize));
      } else {
        dispatch(addproductCart(userId, id, selectedSize));
      }
      setProductCart(!productCart);
    }
    if (!selectedSize) {
      alert("Selecciona una talla antes de agregar al carrito.");
      return;
    }
    // Agregar al carrito
    dispatch(addproductCart(userId, id, selectedSize));
    setIsSizeSelected(false);
    window.alert("Producto Agregado");
  };

  // Función para manejar la selección de tamaño
  const handleSizeSelection = (sizeId) => {
    setSelectedSize(sizeId);
    setIsSizeSelected(true); // Marcar que se ha seleccionado un tamaño
  };

  const handleToggleFavorites = () => {
    if (!googleName & !name) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes iniciar sesión o registrarte para agregar a favoritos",
      });
    } else {
      if (isFavorite) {
        dispatch(removeFromFavorites(userId, id));
        setIsFavorite(false);
      } else {
        dispatch(addFavorite(userId, id));
        setIsFavorite(true);
      }
      setIsFavorite(!isFavorite);
    }
  };

  //----USE_EFFECT
  useEffect(() => {
    if (!googleName) {
      dispatch(getUserByName(name));
    } else {
      dispatch(getUserByName(googleName));
    }

    if (userId) {
      dispatch(getFavorites(userId));
    }
    if (userId) {
      dispatch(getproductCart(userId));
    }
    if (favorites) {
      let isProductInFavorites = false; // Inicializa el estado en falso
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === parseInt(id)) {
          isProductInFavorites = true;
          break; // Sale del bucle tan pronto como encuentra una coincidencia
        }
      }
      setIsFavorite(isProductInFavorites);
    }
  }, [dispatch, name, userId, googleName, isSizeSelected, favorites, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${back}detail/${id}`);

        const data = await response.json();

        if (response.status === 200) {
          setCardDetail(data);
          setImageDetail(data.images);
          // Obtener tallas disponibles del producto
          const sizesWithStock = data.Sizes.filter(
            (size) => size.Stock.quantity > 0
          );
          setAvailableSizes(sizesWithStock);
        } else if (response.status === 400) {
          console.log(data.error);
        } else if (response.status === 500) {
          console.log(data.error);
        }
      } catch (error) {
        console.log("Algo salió mal!!!");
        console.log(error.message);
      }
    };

    fetchData();
  }, [id, back]);

  useEffect(() => {
    if (user && user.length > 0 && cart && isSizeSelected) {
      const cartProduct = cart.find(
        (product) =>
          product.productId === parseInt(id) && product.sizeId === selectedSize
      );
      if (cartProduct) {
        setCartQuantity(cartProduct.cantidad);
        setCartProduct(cartProduct.stock);
      } else {
        setCartQuantity(0);
      }
    } else {
      setCartQuantity(null);
    }
  }, [id, user, cart, selectedSize, isSizeSelected]);

  return (
    <div>
      <div className={styles.navBarDetail}>
        <NavBar />
      </div>
      <Link to={"/"}>
        <button className={styles.backButton}>⬅</button>
      </Link>

      <div className={styles.detailContainer}>
        <div className={styles.imgContainer}>
          {imageDetail.map((url, index) =>
            url ? (
              <img
                key={index}
                src={url}
                alt={cardDetail.name}
                className={index === 0 ? styles.mainImage : styles.thumbnail}
              />
            ) : null
          )}
        </div>

        <div className={styles.detailInfo}>
          <p className={styles.detailName}>{cardDetail.name}</p>

          <div className={styles.sizesInfo}>
            <p className={styles.sizesLabel}>Tallas Disponibles:</p>
            <div className={styles.sizesButtons}>
              {availableSizes.length > 0 ? (
                availableSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeSelection(size.id)} // Llama a la función de manejo de selección de tamaño
                    className={
                      selectedSize === size.id ? styles.selectedSize : ""
                    }
                  >
                    {size.name}
                  </button>
                ))
              ) : (
                <p>No hay talles disponibles</p>
              )}
            </div>
          </div>

          <div>
            <p className={styles.detailDescription}>{cardDetail.description}</p>
            <p className={styles.detailGender}>Genero: {cardDetail.gender}</p>
            <p className={styles.detailCategory}>
              Categoria: {cardDetail.category}
            </p>
            <p className={styles.detailMaterial}>
              Material Principal: {cardDetail.mainMaterial}
            </p>
            <p className={styles.detailMaterial}>
              Cantidad en el Carrito:{" "}
              {isSizeSelected
                ? cartQuantity !== null
                  ? cartQuantity
                  : "Selecciona un Talle"
                : "Selecciona un Talle"}
            </p>
          </div>

          <p className={styles.detailPrice}>${cardDetail.price}</p>

          <div className={styles.detailButtons}>
            <button
              className={styles.favButton}
              onClick={handleToggleFavorites}
            >
              {isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
            </button>

            <button
              className={styles.cartButton}
              onClick={handleCart}
              disabled={!isSizeSelected || cartQuantity === cartproduct}
            >
              {isSizeSelected
                ? cartQuantity === cartproduct
                  ? "Stock No Disponible"
                  : productCart
                  ? "Eliminar del Carrito"
                  : "Agregar al Carrito"
                : "Selecciona un Talle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
