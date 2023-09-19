import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useParams, useNavigate } from "react-router-dom";
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
} from "../../Redux/actions/productsActions";
import Footer from "../../Components/Footer/Footer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import axios from "axios";

// Importa Slick Carousel y los estilos
//import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardReview from "./CardReview";

const MySwal = withReactContent(Swal);

export default function Detail() {
  const back = process.env.REACT_APP_BACK;

  //----ESTADOS
  const { id } = useParams();
  const [cardDetail, setCardDetail] = useState({});
  const [imageDetail, setImageDetail] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [isProductAvailable, setIsProductAvailable] = useState(true);
  const [reviewsProducts, setReviewsProducts] = useState([]);

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
  const navigate = useNavigate();

  // Función para mostrar la alerta cuando no está logueado
  const showLoginAlert = () => {
    MySwal.fire({
      title: "Debes iniciar sesión o registrarte",
      text: "Para realizar esta acción, inicia sesión o regístrate",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Iniciar Sesión",
      cancelButtonText: "Más Tarde",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  const handleCart = () => {
    if (!googleName && !name) {
      // Muestra la alerta de inicio de sesión
      showLoginAlert();
    } else {
      if (!isSizeSelected) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Debes seleccionar un tamaño antes de agregar al carrito.",
        });
      } else if (!isProductAvailable) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "El producto no está disponible en stock.",
        });
      } else {
        dispatch(addproductCart(userId, id, selectedSize));

        setIsSizeSelected(false);
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Producto agregado al carrito",
        });
      }
    }
  };

  const handleSizeSelection = (sizeId) => {
    setSelectedSize(sizeId);
    setIsSizeSelected(true);
  };

  const handleToggleFavorites = () => {
    if (!googleName && !name) {
      // Muestra la alerta de inicio de sesión
      showLoginAlert();
    } else {
      if (isFavorite) {
        if (userId && id) {
          // Asegúrate de que userId e id estén definidos
          dispatch(removeFromFavorites(userId, id));
          setIsFavorite(false);
        }
      } else {
        if (userId && id) {
          // Asegúrate de que userId e id estén definidos
          dispatch(addFavorite(userId, id));
          setIsFavorite(true);
        }
      }
    }
  };

  useEffect(() => {
    if (!googleName) {
      dispatch(getUserByName(name));
    } else {
      dispatch(getUserByName(googleName));
    }

    if (userId) {
      dispatch(getFavorites(userId)).then(() => {});
    }
    if (userId) {
      dispatch(getproductCart(userId));
    }
    if (favorites) {
      let isProductInFavorites = false;
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === parseInt(id)) {
          isProductInFavorites = true;
          break;
        }
      }
      setIsFavorite(isProductInFavorites);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, name, userId, googleName, isSizeSelected, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${back}detail/${id}`);
        const data = await response.json();

        if (response.status === 200) {
          setCardDetail(data);
          setImageDetail(data.images);
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
    const axiosData = async () => {
      try {
        const { data } = await axios(
          `http://localhost:3001/reviews-product/${id}`
        );
        setReviewsProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    axiosData();
    fetchData();
  }, [id, back]);

  useEffect(() => {
    if (user && user.length > 0 && cart && isSizeSelected) {
      const cartProduct = cart.find(
        (product) =>
          product.productId === parseInt(id) && product.sizeId === selectedSize
      );
      if (cartProduct) {
        if (cartProduct.cantidad === cartProduct.stock) {
          setIsProductAvailable(false);
        }
      } else {
        setIsProductAvailable(true);
      }
    }
  }, [id, user, cart, selectedSize, isSizeSelected]);

  return (
    <div>
      <div className={styles.navBarDetail}>
        <NavBar />
        <SearchBar />
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
                    onClick={() => handleSizeSelection(size.id)}
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
            <p className={styles.detailGender}>Género: {cardDetail.gender}</p>
            <p className={styles.detailCategory}>
              Categoría: {cardDetail.category}
            </p>
            <p className={styles.detailMaterial}>
              Material Principal: {cardDetail.mainMaterial}
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

            <button className={styles.cartButton} onClick={handleCart}>
              {isProductAvailable
                ? "Agregar al Carrito"
                : "Stock No Disponible"}
            </button>
          </div>
        </div>
      </div>
      <CardReview reviewsProducts={reviewsProducts} />
      <Footer />
    </div>
  );
}
